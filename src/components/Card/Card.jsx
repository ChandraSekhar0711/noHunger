import { Box, Image, Badge, Text, Flex, Spacer, Avatar } from '@chakra-ui/react';
import React from 'react'

export function Card({requestorDetails}) {
    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
          <Avatar size='xl' name='Christian Nwamba' src={requestorDetails.photoUrl} />{' '}
    
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                ID: {requestorDetails.id}
              </Badge>
              <Spacer />
              <Text fontSize="sm" color="gray.500">
                Created At: {requestorDetails.created_at}
              </Text>
            </Box>
    
            <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {requestorDetails.name}
            </Box>
    
            <Box>
              <Text mt="2" color="gray.300">
                Email: {requestorDetails.email}
              </Text>
              <Text mt="2" color="gray.300">
                Mobile: {requestorDetails.mobile}
              </Text>
              <Text mt="2" color="gray.300">
                Food: {requestorDetails.food.type} - {requestorDetails.food.quantity}
              </Text>
            </Box>
          </Box>
        </Box>
      );
}
