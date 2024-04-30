import { CalendarIcon, CheckIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  useColorMode,
  Avatar,
  Card, CardHeader, CardBody, CardFooter, Image, ListItem, List,
} from '@chakra-ui/react';
import React from 'react'
import { BiMobile } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';

export function Card1({ requestorDetails }) {
  const requestorDetail = JSON.parse(requestorDetails);
  const uid = requestorDetail.uid?.stringValue ?? 'N/A';
  const mobile = requestorDetail.mobile?.stringValue ?? 'N/A';
  const createdAt = requestorDetail.created_at?.stringValue ?? 'N/A';
  const foodType = requestorDetail.food?.mapValue?.fields?.type?.stringValue ?? 'N/A';
  const foodQuantity = requestorDetail.food?.mapValue?.fields?.quantity?.stringValue ?? 'N/A';
  const photoUrl = requestorDetail.photoUrl?.stringValue ?? 'no photo';
  const email = requestorDetail.email?.stringValue ?? 'No email provided';
  const name = requestorDetail.name?.stringValue ?? 'No name provided';
  const { colorMode, toggleColorMode } = useColorMode();
  return (

    <Card
    
    bg={{ base: 'transparent', sm: 'bg.surface' }}
    boxShadow={{ base: 'none', sm: 'md' }}
    borderRadius="xl"
    borderColor="bg.surface"
    >
  <CardHeader>
    <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name={name} src={photoUrl} />

        <Box>
          <Heading size='sm'>{name}</Heading>
          <Text>{uid}</Text>
        </Box>
      </Flex>
    </Flex>
  </CardHeader>
  <CardBody>
    <List spacing={4}>
      <ListItem>
        Mobile : {mobile}
      </ListItem>

      <ListItem>
        Email : {email}
      </ListItem>

      <ListItem>
        Food : {foodType}
      </ListItem>

      <ListItem>
        Quantity : {foodQuantity}
      </ListItem>
      </List>
  </CardBody>
 

  <CardFooter>
    <Button
        mt={10}
        w={'full'}
        
        color={colorMode === "light" ? "light" : "primary.dark"}
        rounded={'xl'}
      >
        Request
      </Button>
  </CardFooter>
</Card>

  );
}
