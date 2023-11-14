/* eslint-disable react/prop-types */
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { PopoverBox } from "../PopoverBox/PopoverBox";

export function MobileNav({ onOpen }) {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      display={{ base: "flex", md: "none" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Link to="/">Logo</Link>
      </Text>
      <HStack display={{ base: "flex", md: "none" }}>
        <PopoverBox position="bottom" justify="space-between" />
      </HStack>
    </Flex>
  );
}
