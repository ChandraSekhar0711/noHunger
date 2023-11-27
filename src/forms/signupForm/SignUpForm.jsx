/* eslint-disable react/prop-types */

import { sweetAlert } from "@/utils/sweetAlert";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  useColorMode,
  Link
} from "@chakra-ui/react";
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ onSubmit }) {
  const showToast = sweetAlert();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  //const [mobile, setMobile] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    mobile: "",
    photoUrl: "",
    firstName: "",
    lastName: "",
  });
  const signup = async (e) => {
    console.log("submitting");
    e.preventDefault();
    //console.log("Submitted : ", email, password);
    if (password == rePassword) {
      //console.log(formData);
      onSubmit(formData, password);
    } else {
      showToast("error", "password didn't match");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, ":", value);
    setFormData({ ...formData, [name]: value });
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
                    name="displayName"
                    onChange={handleInputChange}
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
                    name="email"
                    onChange={handleInputChange}
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
        <Link color="teal.500" onClick={() => navigate("/Signin")}>
          Sign in
        </Link>
      </Box>
    </Flex>
  );
}
