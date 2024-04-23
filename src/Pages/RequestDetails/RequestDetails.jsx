import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Card } from '@/components/Card/Card';
import { Card1 } from '@/components/Card/Card1';
import { Center, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { firebaseConfig } from '@/config';
import { Loading } from '@/components/Loading/Loading';
export function RequestDetails() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { requestId } = useParams();
    console.log(requestId);
    // const request = useSelector((store)=>
    // store.postSlice.posts.find((request) => request.id === requestId)
    // );

    // console.log(request);
    
    useEffect(() => {
      const fetchData = async (requestId) => {
        
        try {
          const response = await axios.get(
            `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/Requests/${requestId}` // Your API endpoint
          );
          console.log("Api data:",response.data.fields);
          
          setData(response.data.fields); // Set the retrieved data
        } catch (error) {
          setError(error); // Set error state if an error occurs
        } finally {
          setLoading(false); // Set loading state to false
        }
      };
      fetchData(requestId); // Fetch data when component mounts
    },[requestId]);

    if (loading) {
      return <Loading />; // Display loading component while data is being fetched
    }

  return (
    <Center py={6}>

      <Stack direction="column" spacing={2} >

        <BreadCrumb path="Request" requestId = {requestId}/>
        
        { data && <Card requestorDetails={JSON.stringify(data, null, 2)} />}

        
        </Stack>
    </Center>
  )
}
