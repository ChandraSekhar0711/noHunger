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
import { toast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { GoogleSignInForm } from "@/forms/GoogleSignin/GoogleSignInForm";

export function Signin() {
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
      toast("success", "Welcome to noHunger");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast("error", "Failed to sign in with Google");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      toast("success", "Welcome to noHunger");
      navigate("/");
    } catch (error) {
      console.error("Authentication Error:", error);
      toast("error", "Invalid Credentials");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.resetPassword(email);
      toast("success", "Reset password link has been sent");
    } catch (error) {
      console.error("Password Reset Error:", error);
      toast("error", "Unable to reset password");
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor={colorMode === "dark" ? "gray.700" : "gray.200"}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={login}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="teal.900"
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
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
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
