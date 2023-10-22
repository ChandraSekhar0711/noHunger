import { useState } from "react";
import {
  IconButton,
  Drawer,
  DrawerContent,
  DrawerBody,
  VStack,
  DrawerFooter,
  HStack,
  Flex,
  Heading,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

import { PopoverBox } from "@/components/PopoverBox/PopoverBox";
import { Menu } from "../Menu/Menu";
import { Link } from "react-router-dom";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Display hamburger icon on mobile */}
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open menu"
        onClick={toggleDrawer}
        variant="outline"
        display={{ base: "block", md: "none" }} // Hide on medium and larger screens
        m={"2"}
      />
      <Flex
        display={{ base: "none", md: "flex" }}
        justify="space-between"
        bg="rgb(14, 34, 51);"
        p="5"
        direction="row"
        h="auto"
        w="auto"
        top="0"
        left="0"
      >
        <Link to="/">
          <Heading size="lg" color="white">
            noHunger
          </Heading>
        </Link>

        <HStack spacing={"20"} mt={4}>
          <Menu />
          <PopoverBox position="bottom" justify="space-between" />
        </HStack>
      </Flex>
      {/* Display sidebar on desktop */}

      {/* Drawer for mobile */}
      <Drawer
        placement="bottom"
        onClose={toggleDrawer}
        isOpen={isOpen}
        display={{ base: "block", md: "none" }}
      >
        <DrawerContent
          bg="rgb(14, 34, 51);"
          w={{ base: "100px", md: "100px" }} // Set the width to 100px for both mobile and desktop
          h="100vh"
          position="fixed"
          top="0"
          left="0"
        >
          <DrawerBody mt="10">
            <VStack spacing={10} p={2} justify="space-between">
              <Menu />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <VStack spacing={5}>
              {/* Badge */}
              <PopoverBox position="right" justify="space-around" />
            </VStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
