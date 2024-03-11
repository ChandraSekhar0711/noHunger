import { FormControl, FormLabel, Input, useColorMode, useColorModeValue } from "@chakra-ui/react";

export function NeumorphicInput(props){
    const { colorMode } = useColorMode();
  const bgColor = useColorModeValue('gray.200', 'gray.700');
  const boxShadowLight = '6px 6px 16px rgba(0, 0, 0, 0.1), -6px -6px 16px rgba(255, 255, 255, 0.5)';
  const boxShadowDark = '6px 6px 16px rgba(0, 0, 0, 0.5), -6px -6px 16px rgba(255, 255, 255, 0.1)';
  const boxShadow = colorMode === 'light' ? boxShadowLight : boxShadowDark;
    return (
        <FormControl>
    <FormLabel>{props.formLabel}</FormLabel>
    <Input
      bg={bgColor}
      color="gray.800"
      boxShadow={boxShadow}
      _focus={{ boxShadow: 'none' }}
      _placeholder={{ color: 'gray.400' }}
      
      onChange={props.handleChange}
      {...props}
    />
  </FormControl>
    )
}