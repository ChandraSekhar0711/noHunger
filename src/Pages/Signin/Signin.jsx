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
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

export function Signin() {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const auth = getAuth();
  const handleShowClick = () => setShowPassword(!showPassword);
  const login = async (e) => {
    console.log("submitting");
    e.preventDefault();
    console.log("Submitted : ", email, password);
    try {
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      toast("success", "Welcome to noHunger");
      navigate("/");
    } catch (error) {
      console.log("auth fauiled", error);
      toast("error", "Invalid Credentials");
    }
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await AuthAPI.resetPassword(email);
      toast("success", "reset password link has been sent");
    } catch (err) {
      console.log(err);
      toast("error", "unable to reset password");
    }
  };
  // const mobileNumberVerification = async (e) => {
  //   e.preventDefault();
  //   const captcha = new RecaptchaVerifier(
  //     auth,
  //     "recaptcha-container", // Make sure this matches the ID of your HTML container
  //     {
  //       size: "normal",
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         console.log("reCAPTCHA response:", response);
  //       },
  //       "expired-callback": () => {
  //         // Handle expired reCAPTCHA, if needed
  //         console.log("reCAPTCHA expired");
  //       },
  //     }
  //   );
  //   if (captcha) {
  //     console.log(captcha);
  //     const authCode = await AuthAPI.phoneVerification(mobile, captcha);
  //     console.log("AuthCode : ", authCode);
  //     const otp = "123486";
  //     window.confirmationResult = authCode;

  //     console.log(authCode.confirm(otp));
  //     if (authCode.confirm(otp)) {
  //       console.log("Otp verified");
  //     } else {
  //       console.log("invalid otp");
  //     }
  //   }
  // };
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
                    type="email"
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
              {/* <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="text"
                    placeholder="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </InputGroup>
              </FormControl> */}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Login
              </Button>
              {/* <Badge
                borderRadius={0}
                variant="solid"
                colorScheme="teal"
                onClick={mobileNumberVerification}
              >
                Login with number
              </Badge> */}
            </Stack>
          </form>
        </Box>
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
