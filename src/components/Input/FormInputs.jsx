/* eslint-disable react/prop-types */
import { NeumorphicForm } from "@/Pages/CreatePost/NeumorphicForm";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { NeumorphicInput } from "./NeumorphicInput";

export function FormInputs(props) {
  return (
  //   <FormControl>
  //   <FormLabel>{formLabel}</FormLabel>
  //   <Input
  //     type={type}
  //     name={name}
  //     value={value}
  //     onChange={handleChange}
  //     placeholder={placeholder}
  //     disabled={disable}
  //   />
  // </FormControl>
  <NeumorphicInput {...props} />
    

 
  );
}
