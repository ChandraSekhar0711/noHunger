import { FormControl, FormLabel, Input, InputGroup, useColorMode } from "@chakra-ui/react";

export function FormInputs(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
    <FormControl isInvalid={props.isInvalid}>
      <FormLabel htmlFor="Name" fontWeight={"bold"} color={colorMode === "light" ? "light" : "primary.dark"}>{props.formLabel}</FormLabel>
      <InputGroup>
        <Input
          onChange={props.handleChange}
          {...props}
        />
      </InputGroup>

    </FormControl>
    </>
    
  );
}
