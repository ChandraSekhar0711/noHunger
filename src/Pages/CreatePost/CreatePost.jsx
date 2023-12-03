import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";


import { FormInputs } from "@/components/Input/FormInputs";
import { postsAPI } from "@/api/postAPI";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "@/store/posts/posts-slice";
import { useGeoLocation } from "@/hooks/useGeoLocation";

import { useNavigate } from "react-router-dom";
import { toast } from "@/utils/toast";
import { store } from "@/store";
import { RequestsApi } from "@/api/requests";

//import { navigate } from "vite-plugin-ssr/client/router";
export default function CreatePost() {
  const user = useSelector((store) => store.authSlice.auth.user);
// console.log("user:",user);
  const navigate = useNavigate();
  const toasting = useToast();
  const { location } = useGeoLocation();
  const [formData, setFormData] = useState({
    name: `${user.displayName}`,
    email: `${user.email}`,
    mobile: "",
    food: {type: "snack",quantity:0},
    photoUrl:"",
    uid:""
    
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, ":", value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    const createRequest = await RequestsApi.createRequest({...formData,
      created_at: new Date().toLocaleDateString(),
      photoUrl: user.photoUrl,
      uid: user.uid,
      coordinates: {
        _lat: `${location.coordinates.lat.toString()}`,  // Replace with your actual latitude value
        _long: `${location.coordinates.lon.toString()}`, // Replace with your actual longitude value
      },
    });

    //console.log("Created post : ",createRequest);
    // const createPost = await postsAPI.createPosts({
    //   ...formData,
    //   created_at: new Date().toLocaleDateString(),
    //   photoUrl: user.photoUrl,
    //   uid: user.uid,
    //   coordinates: {
    //     _lat: `${location.coordinates.lat.toString()}`,  // Replace with your actual latitude value
    //     _long: `${location.coordinates.lon.toString()}`, // Replace with your actual longitude value
    //   },
    // });
    dispatch(addPosts(createRequest));

    toast("success", "Post Created");
    navigate("/Requests");
  };

  return (
    <Center
      minH={{ base: "100vh", md: "90vh" }}
      
    >
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        minW={{ base: "90%", md: "90vh" }}
        backdropFilter="blur(9px) saturate(200%)"
        backgroundColor="rgba(17, 25, 40, 0.62)"
        border="1px solid rgba(255, 255, 255, 0.125)"
        color="white"
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
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

            {/* <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
              >
                <HStack spacing="24px">
                  <Radio value="male">male</Radio>
                  <Radio value="female">female</Radio>
                </HStack>
              </RadioGroup>
            </FormControl> */}

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
              <FormLabel>Food Type</FormLabel>
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
                variant="filled"
              >
                <option value="snack">Snack</option>
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="juices">Juices</option>
              </Select>
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

            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}
