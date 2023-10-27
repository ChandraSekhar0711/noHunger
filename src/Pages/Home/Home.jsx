import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getAuth, updateProfile } from "firebase/auth";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import noHunger from "@/assets/noHunger.jpeg";
import { Permissions } from "@/utils/Permissions";
import { useNavigate } from "react-router-dom";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { FirebaseApp } from "@/Services/Firebase";

export function Home() {
  const navigate = useNavigate();
  const auth = getAuth();

  const user = useSelector((store) => store.authSlice.auth.user);
  const { location } = useGeoLocation();
  localStorage.setItem("geolocationPermission", location.loaded);
  const geolocationPermission = localStorage.getItem("geolocationPermission");
  const [permissions, setPermissions] = useState();
  const [emailStatus, setEmailStatus] = useState();

  const addMobile = async (mobile) => {
    // Check if the user is already signed in
    if (auth.currentUser) {
      try {
        // Link phone number to the current user
        const phoneAuthProvider = FirebaseApp.auth.phoneAuthProvider.credential(
          mobile,
          "246330"
        );
        await auth.currentUser.linkWithCredential(phoneAuthProvider);
        // Update the user's profile with the phone number
        await auth.currentUser.updateProfile({
          phoneNumber: mobile,
        });
      } catch (error) {
        console.error("Error linking phone number", error);
      }
    }
  };

  useEffect(() => {
    async function accessNotifications() {
      const notificationPermission = await Permissions.notifications();
      if (notificationPermission === "granted") {
        setPermissions("Granted");
        // eslint-disable-next-line no-unused-vars
        const notification = new Notification("Hello, World!", {
          body: "Thank you for granting the permissions.",
          icon: noHunger,
        });
      } else {
        setPermissions("denied");
      }
    }

    accessNotifications();

    if (auth.currentUser) {
      console.log(auth.currentUser);
      addMobile("+919182886496");
      console.log(auth.currentUser.phoneNumber);
      if (auth.currentUser.emailVerified) {
        setEmailStatus(true);
      } else {
        // sendEmailVerification(auth.currentUser);
        setEmailStatus(false);
      }
    }
  }, [auth.currentUser]);
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            noHunger{" "}
            <Text as={"span"} color={"orange.400"}>
              made easy
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            The "noHunger" application's motive is to address and combat the
            critical issue of hunger and food insecurity. Its primary goal is to
            reduce and eventually eliminate hunger by connecting individuals or
            organizations who have excess food with those who are in need of it.
            Here are some key aspects of the "noHunger" application's motive
          </Text>

          <Stack spacing={6} direction={"row"}>
            <Button
              rounded={"full"}
              px={6}
              colorScheme={"orange"}
              bg={"orange.400"}
              _hover={{ bg: "orange.500" }}
              onClick={() => navigate("/Requests")}
            >
              Explore Requests
            </Button>
            <Button
              rounded={"full"}
              px={6}
              onClick={() => navigate("/CreatePost")}
            >
              Create Request
            </Button>
          </Stack>
        </Stack>
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
