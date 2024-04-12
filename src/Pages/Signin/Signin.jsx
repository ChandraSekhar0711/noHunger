import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { AuthAPI } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/auth-slice";

import { useNavigate } from "react-router-dom";
import { GoogleSignInForm } from "@/forms/GoogleSignin/GoogleSignInForm";
import { sweetAlert } from "@/utils/sweetAlert";

export function Signin() {
  const showToast = sweetAlert();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const googleSignIn = async () => {
    console.log("user creating");
    try {
      const googleAuth = await AuthAPI.googleSignin();
      dispatch(setUser(googleAuth));
      showToast("success", "Welcome to noHunger");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      showToast("error", "Failed to sign in with Google");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    console.log("login in");

    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      showToast("success", "Welcome to noHunger");
      navigate("/");
    } catch (error) {
      console.error("Authentication Error:", error);
      showToast("error", "Invalid Credentials");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.resetPassword(email);
      showToast("success", "Reset password link has been sent");
    } catch (error) {
      console.error("Password Reset Error:", error);
      showToast("error", "Unable to reset password");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="auto"

      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >

        <Box minW={{ base: "90%", md: "468px" }}>
          <Stack
            spacing={4}
            p="1rem"

            boxShadow="md"
          >
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" />
                <Input
                  type="text"
                  placeholder="email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.300" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <FormHelperText textAlign="right">
                <Link onClick={resetPassword}>forgot password?</Link>
              </FormHelperText>
            </FormControl>
            <Button
              borderRadius={0}
              type="button"
              onClick={login}
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Login
            </Button>
          </Stack>
        </Box>
        <GoogleSignInForm onSubmit={googleSignIn} />
      </Stack>
      <Box>
        New to us?{" "}
        <Link color="teal.500" onClick={() => navigate("/Signup")}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
}
