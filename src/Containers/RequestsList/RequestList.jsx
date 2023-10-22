import { useGeoLocation } from "@/hooks/useGeoLocation";
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
} from "@chakra-ui/react";
import { BiLike, BiPhone, BiSolidNavigation } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
export function RequestList({ list }) {
  const { location } = useGeoLocation();

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
      {list.map((request, index) => {
        // Replace with the appropriate property from your data
        return (
          <Card
            key={index}
            backdropFilter="blur(9px) saturate(200%)"
            backgroundColor="rgba(17, 25, 40, 0.62)"
            borderRadius={"12"}
            border="1px solid rgba(255, 255, 255, 0.125)"
            color="white"
            maxW="md"
          >
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name={request.name}
                    src="https://bit.ly/sage-adebayo"
                  />

                  <Box>
                    <Heading size="sm">{request.name}</Heading>
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<BsThreeDotsVertical />}
                />
              </Flex>
            </CardHeader>
            <CardBody p={2}>
              <Text>
                <Wrap spacing={10} justify="center">
                  <WrapItem>
                    <Text>Food : {request.foodType}</Text>
                  </WrapItem>
                  <WrapItem>
                    <Text>Quantity : {request.quantity}</Text>
                  </WrapItem>
                </Wrap>
              </Text>
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "100px",
                },
              }}
            >
              <Button flex="1" variant="outlined" leftIcon={<BiLike />}>
                <Text display={{ base: "none", md: "block" }}>Like</Text>
              </Button>
              <Button flex="1" variant="outlined" leftIcon={<BiPhone />}>
                <Text display={{ base: "none", md: "block" }}>Phone</Text>
              </Button>
              <Button
                flex="1"
                variant="outlined"
                leftIcon={
                  <BiSolidNavigation
                    onClick={() =>
                      Direction(`${request.lattitude}`, `${request.longitude}`)
                    }
                  />
                }
              >
                <Text display={{ base: "none", md: "block" }}>Directions</Text>
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}
