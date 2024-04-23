import { Center, Box, useColorMode, Heading, Text, Wrap, WrapItem, Flex, VStack } from '@chakra-ui/react'
import React from 'react'

export function About() {
  const visions = [
    { name: "Empower Sharing", value: "Facilitating the sharing of excess food to those in need, fostering community giving." },
    { name: "Reduce Food Waste", value: "Tackling global food waste by redirecting surplus food to maximize impact." },
    { name: "Combat Hunger", value: "Ensuring universal access to nutritious meals, striving to eradicate hunger worldwide." }
  ]
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} gap={{ base: 10, md: 20 }}>
          {
            visions.map((item) => {
              return (
                <Box key={item} maxW={"xs"} bgGradient={colorMode==="light"?"radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%);":"black"} borderRadius={10}>
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
        </Flex>
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
