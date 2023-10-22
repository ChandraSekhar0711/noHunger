/* eslint-disable react/prop-types */
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export function FormInputs({
  formLabel,
  type,
  name,
  value,
  handleChange,
  placeholder,
  disable,
}) {
  return (
    <FormControl>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disable}
      />
    </FormControl>
  );
}
