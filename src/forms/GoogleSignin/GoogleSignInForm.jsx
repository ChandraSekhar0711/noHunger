import { FcGoogle } from "react-icons/fc";
import { Button, ButtonGroup, Center, Text } from "@chakra-ui/react";

export function GoogleSignInForm({ onSubmit }) {
  const googleSignIn = async (e) => {
    e.preventDefault();
    console.log("trying to login")
    onSubmit();
  };
  return (
    <ButtonGroup variant="secondary" spacing="4">

      <Button flexGrow={1} variant={"outline"}
        leftIcon={<FcGoogle />}
        onClick={googleSignIn}
        color={"primary.dark"}
      >
        Sign in with Google
      </Button>

    </ButtonGroup>
  );
}
