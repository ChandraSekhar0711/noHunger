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
import { RequestForm } from "@/forms/RequestForm/RequestForm";
export default function CreatePost() {
  const user = useSelector((store) => store.authSlice.auth.user);
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const showToast = sweetAlert();
  const { location } = useGeoLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const validateForm = (formData) => {
  //   let valid = true;
  //   const newErrors = {};
  //   if (formData.mobile.length !== 10) {
  //     console.log("Phone number must be 10 digits.");
  //     newErrors.mobile = "Phone number must be 10 digits.";
  //     valid = false;
  //   }

  //   if (formData.food.quantity < 10) {
  //     console.log("Quantity must be at least 10.");
  //     newErrors.quantity = "Quantity must be at least 10.";
  //     valid = false;
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };

  const submitData = async (formData) => {
    console.log("submittinfg")
   
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
        console.log(error);
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
              <RequestForm user={user} onSubmit= {submitData} isLoading={loading}/>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
