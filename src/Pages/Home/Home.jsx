import {
  Box,
  VStack
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Permissions } from "@/utils/Permissions";
import { useNavigate } from "react-router-dom";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { Landing } from "@/Features/Landing";
import { About } from "@/Features/About";
import { Working } from "@/Features/Working";
export function Home() {
  const navigate = useNavigate();
  const auth = getAuth();

  const user = useSelector((store) => store.authSlice.auth.user);
  const { location } = useGeoLocation();
  localStorage.setItem("geolocationPermission", location.loaded);
  const geolocationPermission = localStorage.getItem("geolocationPermission");
  const [permissions, setPermissions] = useState();
  const [emailStatus, setEmailStatus] = useState();

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
      if (auth.currentUser.emailVerified) {
        setEmailStatus(true);
      } else {
        // sendEmailVerification(auth.currentUser);
        setEmailStatus(false);
      }
    }
  }, [auth.currentUser]);
  return (
    <Box>
      <VStack gap={{ base: 0, md: 15 }}>
        <Landing />
        <About />
        <Working />
      </VStack>

    </Box >

  );
}
