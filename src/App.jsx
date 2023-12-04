import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HamburgerMenu } from "./components/HamburgerMenu/HamburgerMenu";
import { Home } from "./Pages/Home/Home";
import { Box } from "@chakra-ui/react";
// import { Signin } from "./Pages/Signin/Signin";
import { withAuthRequired } from "./hoc/withAuthRequired";
import {lazy, Suspense} from 'react';

const DisplayRequests = lazy(() => import("./Pages/DisplayRequests/DisplayRequests"));
const CreatePost = lazy(() => import("./Pages/CreatePost/CreatePost"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Profile = lazy(() => import("./Pages/Profile/Profile"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"))

//import waveSvg from "@/assets/waveSvg.svg";
export function App() {
  //const [notification, setNotification] = useState();

  return (
    <Box>
      <HamburgerMenu />
      <Suspense fallback = {<p>Loading...</p>}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Requests" element={<DisplayRequests />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </Box>
  );
}

export const ProtectedApp = withAuthRequired(App);
