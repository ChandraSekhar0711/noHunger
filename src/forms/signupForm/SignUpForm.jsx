import React, { useState } from 'react'
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { sweetAlert } from '@/utils/sweetAlert';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { BsFillMoonFill, BsSun } from 'react-icons/bs';
export function SignUpForm({ onSubmit }) {
  const showToast = sweetAlert();
  const { colorMode, toggleColorMode } = useColorMode();
  const sun = <BsSun fontSize="18px" />;
  const moon = <BsFillMoonFill fontSize="18px" />;
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    mobile: "",
    photoUrl: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const signup = async (e) => {
    console.log("submitting");
    e.preventDefault();
    if (password == rePassword) {
      onSubmit(formData, password);

    } else {
      showToast("error", "password didn't match");
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, ":", value);
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Box >
      <IconButton
        icon={colorMode === "light" ? moon : sun}
        onClick={toggleColorMode}
        h="12"
        w="12"
        borderRadius="full"
        variant="ghost"
        position={"absolute"}
        right={"5"}
      />
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} color={colorMode === "light" ? "secondary" : "Light"}>
        <Stack>
          <Stack>
            <Center>
              <Logo />
            </Center>
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }} >Create your account</Heading>
              <Text>
                Already have an account? <Link onClick={() => navigate("/Signin")} color="primary.dark" fontWeight={"bold"}>Sign in</Link>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius="xl"
            borderColor="bg.surface"
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="Name" fontWeight={"bold"}>Name</FormLabel>
                  <InputGroup>
                    <Input id="name" type="text" name="displayName"
                      onChange={handleInputChange} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email" fontWeight={"bold"}>Email</FormLabel>
                  <InputGroup>
                    <Input id="email" type="email" name="email"
                      onChange={handleInputChange} />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password" fontWeight={"bold"} >Password</FormLabel>
                  <InputGroup>
                    <Input id="password" type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} variant={"solid"}>
                        {showPassword ? <UnlockIcon /> : <LockIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="password" fontWeight={"bold"} >RePassword</FormLabel>
                  <InputGroup>
                    <Input id="password" type={showPassword ? "text" : "password"} onChange={(e) => setRePassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} variant={"solid"}>
                        {showPassword ? <UnlockIcon /> : <LockIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="mobile" fontWeight={"bold"}>Mobile</FormLabel>
                  <InputGroup>
                    <Input id="mobile" type="text" name="mobile"
                      onChange={handleInputChange} />
                  </InputGroup>
                </FormControl>

              </Stack>

              <Stack spacing="6">
                <Button onClick={signup}>Sign up</Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
