import { useGeoLocation } from "@/hooks/useGeoLocation";
import useRemainingMinutes from "@/hooks/useRemainingMinutes";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Text,
  Wrap,
  WrapItem,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiLike, BiPhone, BiSolidNavigation } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function RequestList({ list }) {
  const card = (
    <Card size={"sm"}
      onClick={() => navigate("/RequestDetails/" + request.id)}
    >
      <CardHeader>
        <Heading size='md'> </Heading>
      </CardHeader>
      <CardBody>
        <Text></Text>
      </CardBody>
    </Card>
  )
  const navigate = useNavigate();
  const { location } = useGeoLocation();

  const expiryTimestamps = list.map((request) => ({
    id: request.id,
    expiryAt: request.expiryAt,
  }));

  const remainingMinutes = useRemainingMinutes(expiryTimestamps);

  function Direction(lat, lon) {
    console.log(lat, "+", lon);
    if (!location.loaded) {
      alert("Please enable location permission");
    } else {
      alert("Thanks");
      const url = `https://www.google.com/maps?q=${lat},${lon}`;
      window.open(url, "_blank");
    }
  }

 

  return (
    <>
      <TableContainer w={{base:"3xl",md:"7xl"}}>
        <Table variant='simple'>
          <Thead >
            <Tr >
              <Th textAlign={"center"}>Avatar</Th>
              <Th textAlign={"center"}>Name</Th>
              <Th textAlign={"center"}>Created At</Th>
              <Th textAlign={"center"}>Expires In</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>

          {list.map((request, index) => {
            // Replace with the appropriate property from your data
            const minutes = remainingMinutes[request.id] || 0;
            return (
              <Tr key={index}>
                <Td textAlign={"center"}>
                  <Avatar
                    name={request.name}
                    src={request.photoUrl}
                    size={{ base: "xs", md: "md" }}
                  /></Td>
                <Td textAlign={"center"}>{request.name}</Td>
                <Td textAlign={"center"}>
                  <Text>{request.created_at}</Text>
                </Td>
                <Td textAlign={"center"}>
                  <Text>{minutes > 0 ? `${minutes} min` : "Expired"}</Text>
                </Td>
                <Td textAlign={"center"} onClick={() => navigate("/RequestDetails/" + request.id)} cursor={"pointer"} > <ExternalLinkIcon /> </Td>
              </Tr>

              // <Card
              //   key={index}
              //   backdropFilter="blur(9px) saturate(200%)"
              //   backgroundColor="rgba(17, 25, 40, 0.62)"
              //   borderRadius={"12"}
              //   border="1px solid rgba(255, 255, 255, 0.125)"
              //   color="white"
              //   maxW="md"
              //   onClick={() => navigate("/RequestDetails/" + request.id)}
              // >
              //   <CardHeader>
              //     <Flex spacing="4">
              //       <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              //         <Avatar
              //           name={request.name}
              //           src={request.photoUrl}
              //         />

              //         <Box>
              //           <Heading size="sm">{request.name}</Heading>
              //         </Box>
              //       </Flex>
              //       <IconButton
              //         variant="ghost"
              //         colorScheme="gray"
              //         aria-label="See menu"
              //         icon={<BsThreeDotsVertical />}
              //       />
              //     </Flex>
              //   </CardHeader>
              //   <CardBody p={2}>
              //     <div>
              //       <Wrap spacing={10} justify="center">
              //         <WrapItem>
              //           <Text>Food : {request.food.type}</Text>
              //         </WrapItem>
              //         <WrapItem>
              //           <Text>Quantity : {request.food.quantity}</Text>
              //         </WrapItem>
              //       </Wrap>
              //     </div>
              //   </CardBody>

              //   <CardFooter
              //     justify="space-between"
              //     flexWrap={{ base: "1", md: "wrap" }}
              //     sx={{
              //       "& > button": {
              //         minW: "100px",
              //       },
              //     }}
              //   >
              //     <Button flex="1" variant="outlined" leftIcon={<BiLike />}>
              //       <Text display={{ base: "none", md: "block" }}>Like</Text>
              //     </Button>
              //     <Button flex="1" variant="outlined" leftIcon={<BiPhone />}>
              //       <Text display={{ base: "none", md: "block" }}>Phone</Text>
              //     </Button>
              //     <Button
              //       flex="1"
              //       variant="outlined"
              //       leftIcon={
              //         <BiSolidNavigation
              //           onClick={() =>
              //             Direction(`${request.coordinates._lat}`, `${request.coordinates._long}`)
              //           }
              //         />
              //       }
              //     >
              //       <Text display={{ base: "none", md: "block" }}>Directions</Text>
              //     </Button>
              //   </CardFooter>
              // </Card>
            );
          }
          )
          }

        </Table>
      </TableContainer>
    </>
  );
}
