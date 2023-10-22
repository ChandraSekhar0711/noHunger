//import { DisplayFakeRequests } from "@/api/DisplayRequests";
import { RequestList } from "@/Containers/RequestsList/RequestList";
import { Flex, SimpleGrid } from "@chakra-ui/react";

import blob from "@/assets/blob.svg";
import { postsAPI } from "@/api/postAPI";
import { setPosts } from "@/store/posts/posts-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { withAuthRequired } from "@/hoc/withAuthRequired";

export function DisplayRequests() {
  const dispatch = useDispatch();

  //console.log(isBottom);
  async function fetchAllPosts() {
    const posts = await postsAPI.fetchAll();
    dispatch(setPosts(posts));
  }
  const post = useSelector((store) => store.postSlice.posts);
  console.table(post);
  //console.log(post);
  useEffect(() => {
    fetchAllPosts();
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
          bgImage={`url(${blob})`}
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPosition="center"
          //h={isBottom ? "auto" : "100vh"}
          h="auto"
        >
          <RequestList list={post} />
        </SimpleGrid>
      )}
    </>
  );
}

//export const ProtectedDisplayRequests = withAuthRequired(DisplayRequests);
