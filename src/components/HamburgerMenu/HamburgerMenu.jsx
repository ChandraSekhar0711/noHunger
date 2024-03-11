import {
  Drawer,
  DrawerContent,
  Flex,
  Box,
  useColorModeValue,
  useDisclosure,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiStar } from "react-icons/fi";

import { Menu } from "../Menu/Menu";
import { HeadBarContent } from "../HeadBarContent/HeadBarContent";
import { MobileNav } from "../MobileNav/MobileNav";
import { Logo } from "../Logo/Logo";

const LinkItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Explore", icon: FiCompass, url: "/Requests" },
  { name: "MyPosts", icon: FiStar, url: "/CreatePost" },
];

// eslint-disable-next-line react/prop-types

export function HamburgerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box px={4}>
      <HeadBarContent
        onClose={() => onClose}
        display={{ base: "none", md: "flex" }}
      />

      {/* Mobile View */}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Flex
            transition="3s ease"
          
            borderRight="1px"
            
            w={{ base: "full" }}
            pos="fixed"
            h="full"
            direction={"column"}
            gap={10}
          >
            <Flex
              h="20"
              alignItems="center"
              mx="8"
              justifyContent="space-between"
            >
              <Text fontSize="3xl" fontFamily="monospace" fontWeight="bold"
              >
                <Logo />
              </Text>
              <CloseButton
                display={{ base: "flex", md: "none" }}
                onClick={onClose}
              />
            </Flex>
            {LinkItems.map((link) => (
              <div 
              key={link.name}          
              onClick={onClose}>
                <Menu
                  icon={link.icon}
                  name={link.name}
                  url={link.url}
                />
              </div>
            ))}
          </Flex>
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} />
    </Box>
  );
}
