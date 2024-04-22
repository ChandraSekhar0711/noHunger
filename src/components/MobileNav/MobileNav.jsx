/* eslint-disable react/prop-types */
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PopoverBox } from "../PopoverBox/PopoverBox";
import { Logo } from "../Logo/Logo";

export function MobileNav({ onOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20  "
      alignItems="center"
     
      
    
      justifyContent={{ base: "space-between", md: "flex-end" }}
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        color={colorMode === "light" ? "secondary" : "Light"}
        aria-label="open menu"
        icon={<FiMenu />}
        
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link to="/"><Logo /></Link>
      </Text>
      <HStack display={{ base: "flex", md: "none" }}>
        <PopoverBox position="bottom" justify="space-between" />
      </HStack>
    </Flex>
  );
}
