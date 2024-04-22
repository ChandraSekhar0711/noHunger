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
const ContactUs = lazy(() => import("./Pages/ContactUs/ContactUs"));
const Profile = lazy(() => import("./Pages/Profile/Profile"))
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"))

//import waveSvg from "@/assets/waveSvg.svg";
export function App() {
  //const [notification, setNotification] = useState();
const getbackgroundImage = ()=>{
  if(location.pathname=="/"){
    return `url("${donateImg}")`;
  }
  else{
    return "linear-gradient(45deg, rgb(37, 6, 46) 0%, rgb(37, 6, 46) 28%,rgb(66, 27, 59) 28%, rgb(66, 27, 59) 31%,rgb(96, 48, 72) 31%, rgb(96, 48, 72) 59%,rgb(125, 69, 85) 59%, rgb(125, 69, 85) 66%,rgb(154, 90, 97) 66%, rgb(154, 90, 97) 68%,rgb(184, 111, 110) 68%, rgb(184, 111, 110) 94%,rgb(213, 132, 123) 94%, rgb(213, 132, 123) 100%),linear-gradient(112.5deg, rgb(37, 6, 46) 0%, rgb(37, 6, 46) 28%,rgb(66, 27, 59) 28%, rgb(66, 27, 59) 31%,rgb(96, 48, 72) 31%, rgb(96, 48, 72) 59%,rgb(125, 69, 85) 59%, rgb(125, 69, 85) 66%,rgb(154, 90, 97) 66%, rgb(154, 90, 97) 68%,rgb(184, 111, 110) 68%, rgb(184, 111, 110) 94%,rgb(213, 132, 123) 94%, rgb(213, 132, 123) 100%),linear-gradient(90deg, rgb(37, 6, 46) 0%, rgb(37, 6, 46) 28%,rgb(66, 27, 59) 28%, rgb(66, 27, 59) 31%,rgb(96, 48, 72) 31%, rgb(96, 48, 72) 59%,rgb(125, 69, 85) 59%, rgb(125, 69, 85) 66%,rgb(154, 90, 97) 66%, rgb(154, 90, 97) 68%,rgb(184, 111, 110) 68%, rgb(184, 111, 110) 94%,rgb(213, 132, 123) 94%, rgb(213, 132, 123) 100%),linear-gradient(135deg, rgb(37, 6, 46) 0%, rgb(37, 6, 46) 28%,rgb(66, 27, 59) 28%, rgb(66, 27, 59) 31%,rgb(96, 48, 72) 31%, rgb(96, 48, 72) 59%,rgb(125, 69, 85) 59%, rgb(125, 69, 85) 66%,rgb(154, 90, 97) 66%, rgb(154, 90, 97) 68%,rgb(184, 111, 110) 68%, rgb(184, 111, 110) 94%,rgb(213, 132, 123) 94%, rgb(213, 132, 123) 100%),linear-gradient(90deg, rgb(100, 205, 26),rgb(46, 36, 113)); background-blend-mode:overlay,overlay,overlay,overlay,normal; "
  }
}
  return (
    <Box  m={{base:2,md:5}}>
      <HamburgerMenu />
      <Suspense fallback = {<Loading/>}>
    
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Requests" element={<DisplayRequests />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Requestdetails/:requestId" element={<RequestDetails/>} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
     
      </Suspense>
    </Box>
  );
}

export const ProtectedApp = withAuthRequired(App);
