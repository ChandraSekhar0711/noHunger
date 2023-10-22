import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
import { AiFillCompass, AiTwotoneHome } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidAddToQueue } from "react-icons/bi";
import { Link } from "react-router-dom";

export function Menu() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Tooltip label="Home" placement="bottom">
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
      </Tooltip>
    </>
  );
}
