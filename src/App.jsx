import { Route, Routes } from "react-router-dom";
import { HamburgerMenu } from "./components/HamburgerMenu/HamburgerMenu";
import { Home } from "./Pages/Home/Home";
import { Box } from "@chakra-ui/react";
// import { Signin } from "./Pages/Signin/Signin";
import { withAuthRequired } from "./hoc/withAuthRequired";
import {lazy, Suspense} from 'react';

import { useSelector } from "react-redux";

const DisplayRequests = lazy(() => import("./Pages/DisplayRequests/DisplayRequests"));
const CreatePost = lazy(() => import("./Pages/CreatePost/CreatePost"));
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Profile = lazy(() => import("./Pages/Profile/Profile"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));
const Signin = lazy(() => import('./Pages/Signin/Signin'));
const Signup = lazy(() => import('./Pages/Signup/Signup'))

//import waveSvg from "@/assets/waveSvg.svg";
export function App() {
  //const [notification, setNotification] = useState();
  const user = useSelector((store) => store.authSlice.auth.user);
  return (
    <Box>
      <HamburgerMenu />
      <Suspense fallback = {<p>Loading...</p>}>
      <Routes>
        <Route path="/Signin" exact element={!user? <Signin/>: <Home />} />
        <Route path="/Signup" exact element={!user? <Signup/>: <Home />} />
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
