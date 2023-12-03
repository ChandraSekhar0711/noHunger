/* eslint-disable react/prop-types */
import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export function Menu({ icon, name, url, ...rest }) {
  return (
    <Link to = {url}>
      <Flex
        align="center"
        p="2"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        rounded={"md"}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Link>
  );

  /* <Tooltip label="Home" placement="bottom">
        <Link to="/">
          <IconButton
            icon={<AiTwotoneHome fontSize="24px" />}
            h="12"
            w="12"
            variant={colorMode === "light" ? "solid" : "ghost"}
          />
        </Link>
      </Tooltip>
      <Tooltip label="Posts" placement="bottom">
        <Link to="/Requests">
          <IconButton
            icon={<AiFillCompass fontSize="24px" />}
            h="12"
            w="12"
            variant={colorMode === "light" ? "solid" : "ghost"}
          />
        </Link>
      </Tooltip>

      <Tooltip label="CreatePost" placement="bottom">
        <Link to="/CreatePost">
          <IconButton
            icon={<BiSolidAddToQueue fontSize="24px" />}
            h="12"
            w="12"
            variant={colorMode === "light" ? "solid" : "ghost"}
          />
        </Link>
      </Tooltip>
      <Tooltip label="ContactUs" placement="bottom">
        <Link to="/ContactUs">
          <IconButton
            icon={<BsFillTelephoneFill fontSize="24px" />}
            h="12"
            w="12"
            variant={colorMode === "light" ? "solid" : "ghost"}
          />
        </Link>
      </Tooltip> */
}
