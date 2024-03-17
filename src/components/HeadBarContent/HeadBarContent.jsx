import { Flex, HStack, Text } from "@chakra-ui/react";
import { PopoverBox } from "../PopoverBox/PopoverBox";
import { Menu } from "../Menu/Menu";
import { FiCompass, FiHome, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { Neumorphic } from "@/Pages/Home/Neumorphic";

const LinkItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Explore", icon: FiCompass, url: "/Requests" },
  { name: "MyPosts", icon: FiStar, url: "/CreatePost" },
];
export function HeadBarContent({ ...rest }) {
  return (
    <Flex h="20" alignItems="center" justifyContent="space-between" {...rest}>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        <Link to="/">
          <Logo />
        </Link>
      </Text>

      <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
        {LinkItems.map((link) => (
          <Neumorphic rounded={"lg"}
          px={6}
          colorScheme={"orange.400"}
          bg={"orange.400"}>
            <Menu
            key={link.name}
            icon={link.icon}
            name={link.name}
            url={link.url}
          />
          </Neumorphic>
          
        ))}
      </HStack>
      <Flex alignItems="center">
        <PopoverBox position="bottom" justify="space-between" />
      </Flex>
    </Flex>
  );
}
