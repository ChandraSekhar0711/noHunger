import { Box, FormControl, FormLabel, Input, useColorMode } from "@chakra-ui/react";
import { Neumorphic } from "../Home/Neumorphic";

export function NeumorphicForm(){
    const { colorMode } = useColorMode();
    const bgColor = colorMode === 'light' ? 'gray.200' : 'gray.700';
    const boxShadowLight = '6px 6px 16px rgba(0, 0, 0, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.5)';
    const boxShadowDark = '6px 6px 16px rgba(0, 0, 0, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.1)';
    const boxShadow = colorMode === 'light' ? boxShadowLight : boxShadowDark;
  
    return (
      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        boxShadow={boxShadow}
      >
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <Neumorphic onClick={() => navigate("/")} color="white" mt={4}>
        Create Request
      </Neumorphic>
      </Box>
    );
}