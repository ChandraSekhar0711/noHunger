"use client";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((store) => store.authSlice.auth.user);
  return (
    <Container height={"100vh"}>

    
    <Center py={6} minH={{ base: "70vh", md: "90vh" }}>
      <Box
        maxW={"350px"}
        w={"full"}
        
        rounded={"lg"}
        bg="rgba(255, 255, 255, 0.15)"
        boxShadow="0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"
        backdropFilter="blur( 10.0px )"
        border="1px solid rgba( 255, 255, 255, 0.18 )"
        p={7}
        textAlign={"center"}
      >
        <Avatar size={"xl"} src={user.photoUrl} mb={4} pos={"relative"}>
          <span
            style={{
              content: '""',
              width: "4px",
              height: "4px",
              background: "green.300",
              border: "2px solid white",
              borderRadius: "50%",
              position: "absolute",
              bottom: 0,
              right: "4px",
            }}
          ></span>
        </Avatar>
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {user.displayName}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {user.email}
        </Text>
        <Text
          textAlign={"center"}
          
          px={3}
        >
          Actress, musician, songwriter and artist. PM for work inquires or{" "}
          <Text >#tag</Text> me in your posts
        </Text>

        <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
          <Badge
            px={2}
            py={1}
           
            fontWeight={"400"}
          >
            #art
          </Badge>
          <Badge
            px={2}
            py={1}
           
            fontWeight={"400"}
          >
            #photography
          </Badge>
          <Badge
            px={2}
            py={1}
            
            fontWeight={"400"}
          >
            #music
          </Badge>
        </Stack>

        <Stack mt={8} direction={"row"} spacing={4}>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            _focus={{
              bg: "gray.200",
            }}
          >
            Message
          </Button>
          <Button
            flex={1}
            fontSize={"sm"}
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            boxShadow={
              "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
            }
            _hover={{
              bg: "blue.500",
            }}
            _focus={{
              bg: "blue.500",
            }}
          >
            Follow
          </Button>

        </Stack>
      </Box>
    </Center>
    </Container>
  );
}
