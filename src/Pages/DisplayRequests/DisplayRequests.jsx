//import { DisplayFakeRequests } from "@/api/DisplayRequests";
import { RequestList } from "@/Containers/RequestsList/RequestList";
import { Box, Center, Container, Flex, SimpleGrid, VStack } from "@chakra-ui/react";

import blob from "@/assets/blob.svg";
import { postsAPI } from "@/api/postAPI";
import { setPosts } from "@/store/posts/posts-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RequestsApi } from "@/api/requests";
import useDistanceCalculator from "@/hooks/useDistanceCalculator";
import { useGeoLocation } from "@/hooks/useGeoLocation";
// import { withAuthRequired } from "@/hoc/withAuthRequired";

export default function DisplayRequests() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authSlice.auth.user);
  
  const userLocation = useGeoLocation();
 
  //console.log(isBottom);
  async function fetchAllPosts() {
    const requests = await RequestsApi.fetchRequests();
    // console.log("Requests:", requests);
    //const posts = await postsAPI.fetchAll();
    
    dispatch(setPosts(requests));
  }
  const post = useSelector((store) => store.postSlice.posts);
  // const nearbyRequests = useDistanceCalculator(userLocation,post);
  //  console.log("nearbyRequests:",nearbyRequests);
  // console.log("posts:",post);

  //console.table(post);
  // console.log(post);
  function deleteExpiredRequests() {
    RequestsApi.deleteExpiredRequests(user.id);

  }
  useEffect(() => {
    const fetchData = async () => {
      
      await fetchAllPosts();
    };
    fetchData();
    const unSub = RequestsApi.onShouldSyncNotes(fetchAllPosts)
    return () => {
      unSub();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(deleteExpiredRequests, 60000); // Every minute
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);


  //console.log(List);
  return (
    <>

      {post.length === 0 ? (
        <Box height={"100vh"}>
          <Flex justify="center" p="20" >
            <span>
              You do not have any posts, <Link to="/CreatePost">Create One</Link>{" "}
            </span>
          </Flex>
        </Box>

      ) : (
        <Center width="full" p={{ base: 5, md: 50 }}>
          <RequestList list={post} />
        </Center>



      )}
    </>
  );
}

//export const ProtectedDisplayRequests = withAuthRequired(DisplayRequests);
