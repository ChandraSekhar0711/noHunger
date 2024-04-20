import React from 'react'
import { Center, Box, useColorMode, Heading, Text, Wrap, WrapItem, Flex, VStack, Image } from '@chakra-ui/react'
import donor from "@/assets/donorPostingFood-removebg.png"
import requestor from "@/assets/foodRequests-removebg-preview.png"
import delivery from "@/assets/foodDonating-removebg-preview.png"

export function Working() {
    const steps = [
        {
            img: donor,
            value: "Donors can post their excess food items on ShareAPlate's platform, providing details such as type of food, quantity, and availability. This enables them to share their surplus food with individuals or organizations in need, contributing to the fight against food waste and hunger in their community."
        },
        {
            img: requestor,
            value: "Requestors on ShareAPlate can browse available food listings posted by donors and request items that meet their needs. They can specify their dietary preferences or requirements and submit a request for the desired food items. Once a request is accepted by a donor, the requestor can arrange to pick up or receive the food."
        },
        {
            img: delivery,
            value: "Requestors collect food from donors and distribute it directly to individuals in need or through community organizations, ensuring safe and timely delivery. This direct transfer process facilitates efficient redistribution of surplus food, combating hunger effectively."
        }
    ]
    const { colorMode, toggleColorMode } = useColorMode();
    const heading = (
        <Box textAlign={"center"} >
            <Heading
                as={"h3"}
                color="primary.dark"
                whiteSpace="pre-line"
                fontFamily={"Jost"}
                letterSpacing={5}
            >
                How It Works...
            </Heading>
        </Box>
    )

    const process = (
        <Box >
            <VStack>
                {
                    steps.map((step, index) => {
                        return (
                            <Box w={{ base: "0xl", md: "7xl" }}>
                                <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} key={index} >
                                    <Image src={step.img} boxSize='300px' />

                                    <Center
        color={colorMode === "light" ? "secondary" : "Light"}
        fontSize="lg"
      >
        <Text fontWeight="bold" m={5} maxW={"3xl"}>
          {step.value}
        </Text>

      </Center>
                                </Flex>
                            </Box>


                        )
                    })
                }
            </VStack>
        </Box>
    )
    return (
        <Box mt={10} w={"full"}>
            {heading}
            {process}
        </Box>
    )
}
