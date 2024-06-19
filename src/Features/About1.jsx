import { Center, Box, useColorMode, Heading, Text, Wrap, WrapItem, Flex, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export function About1() {
    const visions = [
        { name: "Empower Sharing", value: "Facilitating the sharing of excess food to those in need, fostering community giving." },
        { name: "Reduce Food Waste", value: "Tackling global food waste by redirecting surplus food to maximize impact." },
        { name: "Combat Hunger", value: "Ensuring universal access to nutritious meals, striving to eradicate hunger worldwide." }
    ]
    const { colorMode, toggleColorMode } = useColorMode();
    let sliderRef = useRef(null);

    useEffect(() => {
        // Check if sliderRef is not null before calling methods on it
        if (sliderRef.current) {
            sliderRef.current.slickPlay();
        }
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    const mission = (
        <Box textAlign={"center"} >
            <Heading
                as={"h3"}
                color="primary.dark"
                whiteSpace="pre-line"
                fontFamily={"Jost"}
                letterSpacing={5}
            >
                What Exactly It Is?
            </Heading>
            <Center
                color={colorMode === "light" ? "secondary" : "Light"}
                fontSize="lg"
            >
                <Text fontWeight="bold" m={5} maxW={"3xl"}>
                    The "ShareAPlate" application's motive is to address and combat the
                    critical issue of hunger and food insecurity. Its primary goal is to
                    reduce and eventually eliminate hunger by connecting individuals or
                    organizations who have excess food with those who are in need of it.
                </Text>

            </Center>
        </Box>
    )

    const vision = (
        <Box textAlign={"center"}>
            <Heading
                as={"h3"}
                color="primary.dark"
                whiteSpace="pre-line"
                fontFamily={"Jost"}
                letterSpacing={5}
            >
                Our Mission
            </Heading>

            <Box mt={5}>


                <div className="slider-container">
                    <Slider ref={slider => (sliderRef = slider)} {...settings}>
                        {
                            visions.map((item) => {
                                return (

                                    <Box key={item} maxW={"xs"} bgGradient={colorMode === "light" ? "radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%);" : "black"} borderRadius={10}>

                                        <VStack p={5}>
                                            <Heading as='h4' size='md' color={colorMode === "light" ? "secondary" : "Light"}>
                                                {item.name}
                                            </Heading>
                                            <Text>
                                                {item.value}
                                            </Text>
                                        </VStack>


                                    </Box>

                                )
                            })
                        }
                    </Slider>
                </div>



            </Box>
        </Box>
    )
    return (
        <Box mt={10} w={"full"}>
            {mission}
            {vision}
        </Box>
    )
}
