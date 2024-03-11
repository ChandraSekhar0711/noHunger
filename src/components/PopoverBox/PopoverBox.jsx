import { AuthAPI } from "@/api/auth";
// import { store } from "@/store";
import { setUser } from "@/store/auth/auth-slice";
import { sweetAlert } from "@/utils/sweetAlert";

import { EditIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useColorMode,
} from "@chakra-ui/react";
//import { getAuth } from "firebase/auth";

import { BsFillMoonFill, BsSun, BsFillPersonVcardFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PopoverBox({ position, justify }) {
  const showToast = sweetAlert();
  //const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authSlice.auth.user);
  //console.log(user);
  const { colorMode, toggleColorMode } = useColorMode();
  const sun = <BsSun fontSize="18px" />;
  const moon = <BsFillMoonFill fontSize="18px" />;
  const logout = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.signOut();
      dispatch(setUser(null));
      showToast("success","successfully logged out")
      navigate("/Signin");
    } catch (error) {
      showToast("error", error);
    }
  };
  return (
    <Popover placement={position} style={{ zIndex: 9999 }}>
      <PopoverTrigger>
        <Avatar
          size={"sm"}
          name={user.displayName}
          src={user.photoUrl}
          cursor="pointer"
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Manage Your Profile
        </PopoverHeader>
        <PopoverArrow bg="blue.800" />
        <PopoverCloseButton />
        <PopoverBody
          border="0"
          display="flex"
          alignItems="center"
          justifyContent={justify}
          pb={4}
        >
          <Box fontSize="20px">My Profile</Box>
          <IconButton
            icon={<EditIcon fontSize="20px" />}
            h="12"
            w="12"
            variant="ghost"
          />
          <Link to="/Profile">
            <IconButton
              icon={<BsFillPersonVcardFill fontSize="20px" />}
              h="12"
              w="12"
              variant="ghost"
            />
          </Link>
        </PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent={justify}
          pb={4}
        >
          {/* <IconButton
            icon={colorMode === "light" ? moon : sun}
            onClick={toggleColorMode}
            h="12"
            w="12"
            borderRadius="full"
            variant="ghost"
          /> */}

          <Button colorScheme="green">
            <Link to={"#"} onClick={logout}>
              Signout
            </Link>
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
