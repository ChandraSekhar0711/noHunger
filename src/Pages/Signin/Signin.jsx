import React, { useState } from 'react'
import {
    Box,
    Button,
    Center,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Stack,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import { GoogleSignInForm } from '@/forms/GoogleSignin/GoogleSignInForm';
import { sweetAlert } from '@/utils/sweetAlert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@/components/Logo/Logo';
import { AuthAPI } from '@/api/auth';
import { setUser } from '@/store/auth/auth-slice';
import { LockIcon, UnlockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { BsFillMoonFill, BsLock, BsPerson, BsSun } from 'react-icons/bs';
import { BiLock } from 'react-icons/bi';
export function Signin() {
    const showToast = sweetAlert();
    const { colorMode, toggleColorMode } = useColorMode();
    const sun = <BsSun fontSize="18px" />;
    const moon = <BsFillMoonFill fontSize="18px" />;
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleShowClick = () => setShowPassword(!showPassword);

    // Google Signin
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

    // Email Login
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

    // Reset Password
    const resetPassword = async (e) => {
        console.log("email:", email);
        e.preventDefault();
        try {
            await AuthAPI.resetPassword(email);
            showToast("success", "Reset password link has been sent");
        } catch (error) {
            console.error("Password Reset Error:", error);
            showToast("error", "Unable to reset password");
        }
    };
    const backgroundImage = "repeating-linear-gradient(220deg, rgb(0,0,0) 0px, rgb(0,0,0) 19px,transparent 19px, transparent 22px),repeating-linear-gradient(189deg, rgb(0,0,0) 0px, rgb(0,0,0) 19px,transparent 19px, transparent 22px),repeating-linear-gradient(148deg, rgb(0,0,0) 0px, rgb(0,0,0) 19px,transparent 19px, transparent 22px),linear-gradient(90deg, rgb(30, 169, 65),rgb(158, 25, 173));"
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
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }} color={colorMode === "light" ? "secondary" :"Light"}>
                <Stack>
                    <Stack>
                        <Center>
                            <Logo />
                        </Center>

                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'xs', md: 'sm' }} >Log in to your account</Heading>
                            <Text>
                                Don't have an account? <Link onClick={() => navigate("/Signup")} color="primary.dark" fontWeight={"bold"}>Sign up</Link>
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
                                    <FormLabel htmlFor="email"  fontWeight={"bold"}>Email</FormLabel>
                                    <InputGroup>

                                        <Input id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
                                    </InputGroup>

                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password"  fontWeight={"bold"} >Password</FormLabel>
                                    <InputGroup>

                                        <Input id="password" type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick} variant={"solid"}>
                                                {showPassword ? <UnlockIcon /> : <LockIcon />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>

                                </FormControl>

                            </Stack>

                            <HStack justify="space-between">
                                <Checkbox defaultChecked>Remember me</Checkbox>
                                <Button variant="text" size="sm" onClick={resetPassword}>Forgot password?</Button>
                            </HStack>

                            <Stack spacing="6">
                                <Button onClick={login}>Sign in</Button>
                                <HStack>
                                    <Divider />
                                    <Text textStyle="sm" whiteSpace="nowrap">
                                        or continue with
                                    </Text>
                                    <Divider />
                                </HStack>
                                <GoogleSignInForm onSubmit={googleSignIn} />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}
