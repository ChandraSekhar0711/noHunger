//import { DisplayFakeRequests } from "@/api/DisplayRequests";
import { RequestList } from "@/Containers/RequestsList/RequestList";
import { Flex, SimpleGrid } from "@chakra-ui/react";

import blob from "@/assets/blob.svg";
import { postsAPI } from "@/api/postAPI";
import { setPosts } from "@/store/posts/posts-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RequestsApi } from "@/api/requests";
// import { withAuthRequired } from "@/hoc/withAuthRequired";

export default function DisplayRequests() {
  const dispatch = useDispatch();

  //console.log(isBottom);
  async function fetchAllPosts() {
    const requests = await RequestsApi.fetchRequests();
    console.log("Requests:",requests);
    //const posts = await postsAPI.fetchAll();
    dispatch(setPosts(requests));
  }
  const post = useSelector((store) => store.postSlice.posts);
  // console.log("posts:",post);
 
  console.table(post);
  //console.log(post);
  useEffect(() => {
    const fetchData = async () => {
      await fetchAllPosts();
    };
    fetchData();
  }, []);
  //console.log(List);
  return (
    <>
      {post.length === 0 ? (
        <Flex justify="center" p="20">
          <span>
            You do not have any posts, <Link to="/CreatePost">Create One</Link>{" "}
          </span>
        </Flex>
      ) : (
        <SimpleGrid
          spacing={4}
          templateColumns={{
            base: "repeat(auto-fill, minmax(300px, 1fr))",
            md: "repeat(auto-fill, minmax(350px, 1fr))",
          }}
          p={5}
          
        >
          <RequestList list={post} />
        </SimpleGrid>
      )}
    </>
  );
}

//export const ProtectedDisplayRequests = withAuthRequired(DisplayRequests);
