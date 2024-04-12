import { FcGoogle } from "react-icons/fc";
import { Button, Center, Text } from "@chakra-ui/react";

export function GoogleSignInForm({ onSubmit }) {
  const googleSignIn = async (e) => {
    e.preventDefault();
    console.log("trying to login")
    onSubmit();
  };
  return (
    <Center p={8}>
      <Button
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text onClick={googleSignIn}> Sign in with Google</Text>
        </Center>
      </Button>
    </Center>
  );
}
