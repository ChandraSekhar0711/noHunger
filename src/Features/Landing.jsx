import React from 'react'
import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    Wrap,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import noHunger from "@/assets/1000039974-removebg-preview.png";
export function Landing() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box w={"full"}>
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-evenly"
                mt={{ base: 50, md: 28 }}

            >
                <Box >
                    <Heading
                        fontSize={{ base: "3xl", md: "4xl", xl: "7xl" }}
                        color={colorMode === "light" ? "secondary" : "Light"}
                        whiteSpace="pre-line"
                        fontFamily={"Jost"}
                        textAlign={"center"}
                    >
                        ShareAPlate
                        <Text as="span" color="primary.dark">
                            {":) "}{"\n"}
                            Together We Eat
                        </Text>{" "}
                    </Heading>
                    <Text
                        color={colorMode === "light" ? "secondary" : "Light"}
                        fontSize="lg"
                    >

                        <Text fontWeight="bold" maxW={"3xl"} mt={5} textAlign={"center"}>
                        Fighting Food Waste, One Plate at a Time
                        </Text>

                    </Text>
                   
                </Box>

                <Box mt={{ base: 10, md: 0 }}>
                    <Image src={noHunger} w={700} h={{ base: "auto", md: 400 }} />
                </Box>
            </Flex>
        </Box>

    )
}
