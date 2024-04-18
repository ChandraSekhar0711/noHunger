import { CheckIcon } from '@chakra-ui/icons';
import { Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue, } from '@chakra-ui/react';
import React from 'react'

export function Card1({requestorDetails}) {
    return (
        <Center py={6}>
          <Box
            maxW={'330px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}>
            <Stack
              textAlign={'center'}
              p={6}
              color={useColorModeValue('gray.800', 'white')}
              align={'center'}>
              <Text
                fontSize={'sm'}
                fontWeight={500}
                bg={useColorModeValue('green.50', 'green.900')}
                p={2}
                px={3}
                color={'green.500'}
                rounded={'full'}>
                Request
              </Text>
              <Stack direction={'row'} align={'center'} justify={'center'}>
                <Text fontSize={'3xl'}>$</Text>
                <Text fontSize={'6xl'} fontWeight={800}>
                  {requestorDetails.id}
                </Text>
                <Text color={'gray.500'}>/month</Text>
              </Stack>
            </Stack>
    
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Latitude: {requestorDetails.coordinates._lat}
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Longitude: {requestorDetails.coordinates._long}
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Created At: {requestorDetails.created_at}
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Email: {requestorDetails.email}
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Mobile: {requestorDetails.mobile}
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckIcon} color="green.400" />
                  Food: {requestorDetails.food.type} - {requestorDetails.food.quantity}
                </ListItem>
              </List>
    
              <Button
                mt={10}
                w={'full'}
                bg={'green.400'}
                color={'white'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                _hover={{
                  bg: 'green.500',
                }}
                _focus={{
                  bg: 'green.500',
                }}>
                Request
              </Button>
            </Box>
          </Box>
        </Center>
      );
}
