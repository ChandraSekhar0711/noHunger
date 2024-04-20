/* eslint-disable react/prop-types */
import { Box, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

export function Menu({ icon, name, url, ...rest }) {
  return (
    <Link to = {url}>
      <Flex
        align="center"
        p="2"
        mx={"3"}
        maxW={"fit-content"}
        role="group"
        cursor="pointer"
        fontFamily={"Jost"} letterSpacing={5}
        
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            color={useColorModeValue("gray.500", "gray.400")}
            _groupHover={{ color: "black" }}
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
