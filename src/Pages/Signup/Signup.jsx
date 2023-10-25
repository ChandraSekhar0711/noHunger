/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
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
  InputRightElement,
  useColorMode,
  Badge,
  HStack,
  PinInput,
  PinInputField,
  InputLeftAddon,
} from "@chakra-ui/react";
import { AuthAPI } from "@/api/auth";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/auth/auth-slice";
import { toast } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import {
  CheckIcon,
  CloseIcon,
  EmailIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { BsPersonCircle } from "react-icons/bs";
import { BiCross, BiCrosshair } from "react-icons/bi";

export function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [sentOtpStatus, setSentOtpStatus] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerifyStatus, setOtpVerifyStatus] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [authCodeStatus, setAuthCodeStatus] = useState(null);
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);
  const { colorMode } = useColorMode();
  const auth = getAuth();
  const signup = async (e) => {
    console.log("submitting");
    e.preventDefault();
    console.log("Submitted : ", email, password);
    if (password == rePassword && otpVerifyStatus) {
      try {
        const user = await AuthAPI.signup(email, password, displayName, mobile);
        dispatch(setUser(user));
        await toast(
          "success",
          "Account has been created successfully. Verification link has been sent to registered email"
        );
        navigate("/Signin");
      } catch (error) {
        console.log("auth fauiled", error);
        toast("error", "Invalid Credentials");
      }
    } else {
      toast("error", "Password didn't match");
    }
  };
  const sendOTP = async (e) => {
    e.preventDefault();
    const captchaStatus = new RecaptchaVerifier(
      auth,
      "recaptcha-container", // Make sure this matches the ID of your HTML container
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //console.log("reCAPTCHA response:", response);
        },
        "expired-callback": () => {
          // Handle expired reCAPTCHA, if needed
          console.log("reCAPTCHA expired");
        },
      }
    );
    setCaptcha(captchaStatus);
    if (captcha) {
      try {
        console.log(captcha);

        const authCode = await AuthAPI.phoneVerification(
          `+91${mobile}`,
          captcha
        );
        setSentOtpStatus(true);
        toast("success", "OTP sent");
        setAuthCodeStatus(authCode);
        console.log("AuthCode : ", authCode);

        // const otp = "123456";
      } catch (error) {
        toast("error", error);
        console.log("Unable to send OTP");
      }
    }
  };
  const handlePinChange = (event) => {
    const { value } = event.target;
    setOtp((prevOtp) => prevOtp + value);
    // No need to log 'otp' here, as it might not reflect the latest state

    // Log 'otp' in a useEffect to ensure you get the updated value
  };

  // useEffect(() => {
  //   console.log(otp);
  // }, [otp]);
  const verifyOTP = async (e) => {
    e.preventDefault();
    if (await authCodeStatus.confirm(otp)) {
      console.log("otp verified");
      setOtpVerifyStatus(true);
      toast("success", "OTP verified");
    } else {
      toast("error", "Invalid OTP");
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
          <form onSubmit={signup}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="teal.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BsPersonCircle color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <EmailIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <LockIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter Password"
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Badge>
                      {otpVerifyStatus ? (
                        <CheckIcon color="green.500" />
                      ) : (
                        <CloseIcon color="red.500" />
                      )}
                    </Badge>
                  </InputRightElement>
                </InputGroup>
                <Badge
                  borderRadius={5}
                  variant="solid"
                  colorScheme="teal"
                  onClick={!sentOtpStatus ? sendOTP : verifyOTP}
                  cursor="pointer"
                >
                  {!sentOtpStatus ? "send OTP" : "verify"}
                </Badge>
                {sentOtpStatus && (
                  <HStack m="2">
                    <PinInput size="md" variant="flushed">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <PinInputField
                          key={index}
                          onChange={(event) => handlePinChange(event)}
                        />
                      ))}
                    </PinInput>
                  </HStack>
                )}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Aready had account ?{" "}
        <Link color="teal.500" href="/Signin">
          Sign in
        </Link>
      </Box>
    </Flex>
  );
}
