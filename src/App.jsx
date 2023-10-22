import { Route, Routes } from "react-router-dom";
import { HamburgerMenu } from "./components/HamburgerMenu/HamburgerMenu";
import { Home } from "./Pages/Home/Home";
import { Box, Text } from "@chakra-ui/react";
import { DisplayRequests } from "./Pages/DisplayRequests/DisplayRequests";
import { CreatePost } from "./Pages/CreatePost/CreatePost";
import { ContactUs } from "./Pages/ContactUs/ContactUs";
import { Profile } from "./Pages/Profile/Profile";
import blob from "@/assets/blob.svg";
// import { Signin } from "./Pages/Signin/Signin";
import { withAuthRequired } from "./hoc/withAuthRequired";
//import waveSvg from "@/assets/waveSvg.svg";
export function App() {
  //const [notification, setNotification] = useState();

  return (
    <Box
      bgImage={`url(${blob})`}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      //h={isBottom ? "auto" : "100vh"}
      h="100vh"
    >
      <HamburgerMenu />
      <Text
        m="2"
        display={{ base: "block", md: "none" }}
        position="absolute"
        top="0"
        right="5"
      >
        LOGO
      </Text>

      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Requests" element={<DisplayRequests />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Box>
  );
}

export const ProtectedApp = withAuthRequired(App);
