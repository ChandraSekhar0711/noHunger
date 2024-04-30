import { Route, Routes, BrowserRouter } from "react-router-dom";
import { HamburgerMenu } from "./components/HamburgerMenu/HamburgerMenu";
import { Home } from "./Pages/Home/Home";
import { Box } from "@chakra-ui/react";
// import { Signin } from "./Pages/Signin/Signin";
import { withAuthRequired } from "./hoc/withAuthRequired";
import {lazy, Suspense} from 'react';
import { Home1 } from "./Pages/Home/Home1";
import donateImg from "@/assets/donate.jpg"
import { Home4 } from "./Pages/Home/Home4";
import { Home2 } from "./Pages/Home/Home2";
import { RequestDetails } from "./Pages/RequestDetails/RequestDetails";
import { Loading } from "./components/Loading/Loading";
const DisplayRequests = lazy(() => import("./Pages/DisplayRequests/DisplayRequests"));
const CreatePost = lazy(() => import("./Pages/CreatePost/CreatePost"));
const Profile = lazy(() => import("./Pages/Profile/Profile"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"))

//import waveSvg from "@/assets/waveSvg.svg";
export function App() {
  //const [notification, setNotification] = useState();
  return (
    <Box  m={{base:2,md:5}}>
      <HamburgerMenu />
      <Suspense fallback = {<Loading/>}>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Requests" element={<DisplayRequests />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/Requestdetails/:requestId" element={<RequestDetails/>} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Suspense>
    </Box>
  );
}

export const ProtectedApp = withAuthRequired(App);
