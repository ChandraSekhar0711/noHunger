import { Box, Avatar, Badge, Text, Flex, Spacer, Button,Container, useColorMode } from '@chakra-ui/react';
import React from 'react';

// Card component to display requestor details
export function Card({ requestorDetails }) {
  const { colorMode, toggleColorMode } = useColorMode();
  console.log("requestorDetails",JSON.parse(requestorDetails));
  const requestorDetail = JSON.parse(requestorDetails);
  
  
  if (!requestorDetail) {
    return <Text>No requestor details available.</Text>; // Early check for undefined/null
  }

  // Accessing data with proper handling to avoid undefined values
  const uid = requestorDetail.uid?.stringValue ?? 'N/A';
  const mobile = requestorDetail.mobile?.stringValue ?? 'N/A';
  const createdAt = requestorDetail.created_at?.stringValue ?? 'N/A';
  const foodType = requestorDetail.food?.mapValue?.fields?.type?.stringValue ?? 'N/A';
  const foodQuantity = requestorDetail.food?.mapValue?.fields?.quantity?.stringValue ?? 'N/A';
  const photoUrl = requestorDetail.photoUrl?.stringValue ?? 'no photo';
  const email = requestorDetail.email?.stringValue ?? 'No email provided';
  const name = requestorDetail.name?.stringValue ?? 'No name provided';

  // console.log("uid",uid);
  // console.log("mobile",mobile);
  // console.log("createdAt",createdAt);
  // console.log("foodType",foodType);
  // console.log("foodQuantity",foodQuantity);
  // console.log("photoUrl",photoUrl);
  // console.log("email",email);
  // console.log("name",name);

  return (
    <Container maxW="3xl" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} color={colorMode === "light" ? "secondary" : "Light"}>
      <Flex justifyContent="center">
        <Avatar size="xl" name={name} src={photoUrl} />{' '}
      </Flex>

      <Box p="6">
        <Flex justifyContent="space-between" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            ID: {uid}
          </Badge>
          
         
        </Flex>
        <Text fontSize="sm" color="gray.500">
            Created At: {createdAt}
          </Text>
        <Text mt="4" fontWeight="semibold" fontSize="xl" textAlign="center">
          {name}
        </Text>

        <Box mt="4">
          <Text color="gray.600">Email: {email}</Text>
          <Text color="gray.600">Mobile: {mobile}</Text>
          <Text color="gray.600">
            Food: {foodType} - {foodQuantity}
          </Text>
        </Box>
      </Box>

      <Button
        mt={10}
        w={'full'}
        bg={'green.400'}
        color={'white'}
        rounded={'xl'}
        _hover={{ bg: 'green.500' }}
        _focus={{ bg: 'green.500' }}
      >
        Request
      </Button>

    </Container>
  );
}
