import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Card } from '@/components/Card/Card';
import { Card1 } from '@/components/Card/Card1';
import { Center, Stack } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
export function RequestDetails() {
    const { requestId } = useParams();
    console.log(requestId);
    const request = useSelector((store)=>
    store.postSlice.posts.find((request) => request.id === requestId)
    );

    console.log(request);
  return (
    <Center py={6}>

      <Stack direction="column" spacing={2} >

        <BreadCrumb path="Request" requestId = {requestId}/>
        <Card requestorDetails={request} />
        </Stack>
    </Center>
  )
}
