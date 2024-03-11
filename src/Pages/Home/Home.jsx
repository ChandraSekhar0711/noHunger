/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

import { getAuth } from "firebase/auth";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import noHunger from "@/assets/noHunger.jpeg";
import { Permissions } from "@/utils/Permissions";
import { useNavigate } from "react-router-dom";
import { useGeoLocation } from "@/hooks/useGeoLocation";

import { AuthAPI } from "@/api/auth";
import { setUser } from "@/store/auth/auth-slice";
import { Neumorphic } from "./Neumorphic";
// import { Fab } from "ui-neumorphism";

export function Home() {
  const navigate = useNavigate();
  const auth = getAuth();
  const dispatch = useDispatch();
  // const user = useSelector((store) => store.authSlice.auth.user);
  const { location } = useGeoLocation();
  localStorage.setItem("geolocationPermission", location.loaded);
  // const geolocationPermission = localStorage.getItem("geolocationPermission");
  // const [permissions, setPermissions] = useState();
  // const [emailStatus, setEmailStatus] = useState();

  useEffect(() => {
    const fetchUser = async (userId) => {
      const userFetching = await AuthAPI.fetchUser(userId);
      dispatch(setUser(userFetching));
      //console.log("user:", userFetching);
    };

    async function accessNotifications() {
      const notificationPermission = await Permissions.notifications();
      // if (notificationPermission === "granted") {
      //   // eslint-disable-next-line no-unused-vars
      //   const notification = new Notification("Hello, World!", {
      //     body: "Thank you for granting the permissions.",
      //     icon: noHunger,
      //   });
      // } else {
      //   console.log("permissions denied");
      // }
    }

    accessNotifications();

    if (auth.currentUser) {
      //console.log(auth.currentUser.uid);
      fetchUser(auth.currentUser.uid);
      if (auth.currentUser.emailVerified) {
        //console.log("email verified:", auth.currentUser.emailVerified);
        // setEmailStatus(true);
      } else {
        // sendEmailVerification(auth.currentUser);
        console.log("email verified:", auth.currentUser.emailVerified);
        // setEmailStatus(false);
      }
    }
  }, [auth.currentUser]);
  return (
    <Container maxW={"7xl"} height={{base:"auto",md:"100vh"}}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 4, md: 20 }}
        direction={{ base: "column", md: "row" }}
        
      >
        <Box
      p={8}
      bg="rgba(255, 255, 255, 0.15)" // Adjust opacity as needed
      borderRadius={"30"}
      boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
      backdropFilter="blur( 10.0px )"
      border="1px solid rgba( 255, 255, 255, 0.18 )" // Adjust opacity and blur as needed
      maxW={{ base: "100%", sm: "80%", md: "70%", lg: "60%" }} // Adjust width for different screen sizes
      mx="auto" // Center the box horizontally
    >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
        
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        color="white"
        mb={4}
      >
        ShareAPlate{" :) "}
        <Text as={"span"} color={"orange.400"}>
         together we eat
        </Text>
      </Heading>
      <Text color={"white"} maxW={"3xl"}>
        The "noHunger" application's motive is to address and combat the
        critical issue of hunger and food insecurity. Its primary goal is to
        reduce and eventually eliminate hunger by connecting individuals or
        organizations who have excess food with those who are in need of it.
        Here are some key aspects of the "noHunger" application's motive
      </Text>
    

          <Stack spacing={6} direction={{base:"column",md:"row"}}>
            <Neumorphic
              
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              
              onClick={() => navigate("/Requests")}
            >
              Explore Requests
            </Neumorphic>
            {/* <Button
              rounded={"full"}
              px={6}
              onClick={() => navigate("/CreatePost")}
            >
              Create Request
            </Button> */}
            <Neumorphic onClick={() => navigate("/CreatePost")} color="white">
        Create Request
      </Neumorphic>
           
          </Stack>
          
        </Stack>
        </Box>
        {/* <Flex w={"full"}>
          <Illustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex> */}
        <Flex flex={1}>
          <Box
            position={"relative"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            overflow={"hidden"}
          >
            {/* <IconButton
              aria-label={'Play Button'}
              variant={'ghost'}
              _hover={{ bg: 'transparent' }}
              icon={<PlayIcon w={12} h={12} />}
              size={'lg'}
              color={'white'}
              position={'absolute'}
              left={'50%'}
              top={'50%'}
              transform={'translateX(-50%) translateY(-50%)'}
            /> */}
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              position={"center"}
              w={"100%"}
              h={"100%"}
              src={noHunger}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
