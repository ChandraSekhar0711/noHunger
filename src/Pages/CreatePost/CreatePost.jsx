import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Button,
  Spinner,
  Container,
  useColorMode,
  InputGroup
} from "@chakra-ui/react";
import { useState } from "react";

import { FormInputs } from "@/components/Input/FormInputs";
import { postsAPI } from "@/api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "@/store/posts/posts-slice";
import { useGeoLocation } from "@/hooks/useGeoLocation";

import { useNavigate } from "react-router-dom";

import { store } from "@/store";
import { RequestsApi } from "@/api/requests";
import { sweetAlert } from "@/utils/sweetAlert";
export default function CreatePost() {
  const user = useSelector((store) => store.authSlice.auth.user);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const showToast = sweetAlert();
  const { location } = useGeoLocation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: `${user.displayName}`,
    email: `${user.email}`,
    mobile: "",
    food: { type: "snack", quantity: 0 },
    photoUrl: "",
    uid: ""

  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, ":", value);
    setFormData({ ...formData, [name]: value });
  };

  const submitData = async (e) => {

    e.preventDefault();
    setLoading(true)
    console.log(formData);
    try {
      const createRequest = await RequestsApi.createRequest({
        ...formData,
        created_at: new Date().toLocaleDateString(),
        photoUrl: user.photoUrl,
        uid: user.uid,
        coordinates: {
          _lat: `${location.coordinates.lat.toString()}`,  // Replace with your actual latitude value
          _long: `${location.coordinates.lon.toString()}`, // Replace with your actual longitude value
        },
      });
      dispatch(addPosts(createRequest));
      showToast("success", "Request Created")
      navigate("/Requests");
    } catch (error) {
      shoawToast("error", error);
    }
  };

  return (
    <Container maxW="3xl" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} color={colorMode === "light" ? "secondary" : "Light"}>
      <Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius="xl"
          borderColor="bg.surface"
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <FormInputs
                formLabel="Name"
                type="text"
                name="name"
                value={user.displayName}
                handleChange={handleInputChange}
                placeholder="Your Name"
                disable={true}
              />

              <FormInputs
                formLabel="Email"
                type="email"
                name="email"
                value={user.email}
                handleChange={handleInputChange}
                placeholder="Your Email"
                disable={true}
              />

              <FormInputs
                formLabel="Mobile"
                type="number"
                name="mobile"
                value={formData.mobile}
                handleChange={handleInputChange}
                placeholder="Your Mobile"
                disable={false}
              />

              <FormControl>
                <FormLabel htmlFor="foodType" fontWeight={"bold"} color={colorMode === "light" ? "light" : "primary.dark"}>Food Type</FormLabel>
                <InputGroup>
                <Select
                  name="foodType"
                  value={formData.food.type}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      food: {
                        ...formData.food,
                        type: e.target.value,
                      },
                    });
                  }}
                  
                >
                  <option value="snack">Snack</option>
                  <option value="lunch">Lunch</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="juices">Juices</option>
                </Select>
                </InputGroup>
                
              </FormControl>

              <FormInputs
                formLabel="Quantity"
                type="number"
                name="quantity"
                value={formData.food.quantity}
                handleChange={(e) => {
                  setFormData({
                    ...formData,
                    food: {
                      ...formData.food,
                      quantity: e.target.value,
                    },
                  });
                }}
                placeholder="Provide approx quantity"
                disable={false}
              />
            </Stack>
            <Stack spacing="6">
              <Button onClick={submitData} color={colorMode === "light" ? "light" : "primary.dark"}>
                {loading ? <Spinner color={colorMode === "light" ? "light" : "primary.dark"}/>:"Submit"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
