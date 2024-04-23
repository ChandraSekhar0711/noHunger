/* eslint-disable react/prop-types */
import { NeumorphicForm } from "@/Pages/CreatePost/NeumorphicForm";
import { FormControl, FormLabel, Input, InputGroup, useColorMode } from "@chakra-ui/react";
import { NeumorphicInput } from "./NeumorphicInput";

export function FormInputs(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl>
    <FormLabel htmlFor="Name" fontWeight={"bold"} color={colorMode === "light" ? "light" : "primary.dark"}>{props.formLabel}</FormLabel>
    <InputGroup>
    <Input
      onChange={props.handleChange}
      {...props}
    />
    </InputGroup>
    
  </FormControl>
  // <NeumorphicInput {...props} />
    

 
  );
}
