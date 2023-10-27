import { Flex, HStack, Text } from "@chakra-ui/react";
import { PopoverBox } from "../PopoverBox/PopoverBox";
import { Menu } from "../Menu/Menu";
import { FiCompass, FiHome, FiStar } from "react-icons/fi";
const LinkItems = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Explore", icon: FiCompass, url: "/Requests" },
  { name: "MyPosts", icon: FiStar, url: "/CreatePost" },
];
export function HeadBarContent({ ...rest }) {
  return (
    <Flex h="20" alignItems="center" justifyContent="space-between" {...rest}>
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>

      <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
        {LinkItems.map((link) => (
          <Menu
            key={link.name}
            icon={link.icon}
            name={link.name}
            url={link.url}
          />
        ))}
      </HStack>
      <Flex alignItems="center">
        <PopoverBox position="bottom" justify="space-between" />
      </Flex>
    </Flex>
  );
}
