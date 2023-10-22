import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Permissions } from "@/utils/Permissions";
import noHunger from "@/assets/noHunger.jpeg";
import { useGeoLocation } from "@/hooks/useGeoLocation";
// import { withAuthRequired } from "@/hoc/withAuthRequired";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
export function Home() {
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
      {emailStatus ? (
        <>
          <Text>This Is home page</Text>
          <Text>{auth.currentUser.email}</Text>
          <Box
            h="10"
            color={permissions === "Granted" ? "green.400" : "red.400"}
          >
            Notifications are {permissions}
          </Box>
          <Box
            h="10"
            color={geolocationPermission === "true" ? "green.400" : "red.400"}
          >
            Location permissions are{" "}
            {geolocationPermission === "true" ? "Granted" : "Denied"}
          </Box>
          <Heading>{location.coordinates.lat}</Heading>
          <Heading>{location.coordinates.lon}</Heading>
        </>
      ) : (
        <Text>Email not verified</Text>
      )}
    </Box>
  );
}
