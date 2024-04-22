/* eslint-disable react/prop-types */
import { NeumorphicForm } from "@/Pages/CreatePost/NeumorphicForm";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { NeumorphicInput } from "./NeumorphicInput";

export function FormInputs(props) {
  return (
    <FormControl>
    <FormLabel>{props.formLabel}</FormLabel>
    <Input
      onChange={props.handleChange}
      {...props}
    />
  </FormControl>
  // <NeumorphicInput {...props} />
    

 
  );
}
