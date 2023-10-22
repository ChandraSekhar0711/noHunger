import { Box, Heading } from "@chakra-ui/react";
import circle from "@/assets/circle.svg";
export function Profile() {
  return (
    <Box
      bgImage={circle}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      h="100vh"
    >
      <Heading alignItems="center">This is a profile page</Heading>
    </Box>
  );
}
