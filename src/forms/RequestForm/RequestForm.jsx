import { FormInputs } from '@/components/Input/FormInputs';
import { Button, FormControl, FormLabel, InputGroup, Select, Spinner, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react'

export function RequestForm({user,onSubmit,isLoading}) {
    const { colorMode, toggleColorMode } = useColorMode();
    const [formData, setFormData] = useState({
        name: `${user.displayName}`,
        email: `${user.email}`,
        mobile: "",
        food: { type: "snack", quantity: "" },
        photoUrl: "",
        uid: ""
      });
    const [errors, setErrors] = useState({
        mobile: "",
        quantity: "",
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name, ":", value);
        setFormData({ ...formData, [name]: value });
      };

      const validateForm = () => {
        let valid = true;
        const newErrors = {};
        if (formData.mobile.length !== 10) {
          console.log("Phone number must be 10 digits.");
          newErrors.mobile = "Phone number must be 10 digits.";
          valid = false;
        }
    
        if (formData.food.quantity < 10) {
          console.log("Quantity must be at least 10.");
          newErrors.quantity = "Quantity must be at least 10.";
          valid = false;
        }
    
        setErrors(newErrors);
        return valid;
      };

      function submit(e) {
        e.preventDefault()
        if(validateForm()){
            console.log("formData before submitting:",formData);
            onSubmit(formData);
        }
        
      }
  return (
   <>
   <FormInputs
                formLabel="Name"
                type="text"
                name="name"
                value={user.displayName}
                handleChange={handleInputChange}
                placeholder="Your Name"
                disable={true}
              />

              <FormInputs
                formLabel="Email"
                type="email"
                name="email"
                value={user.email}
                handleChange={handleInputChange}
                placeholder="Your Email"
                disable={true}
              />

              <FormInputs
                formLabel="Mobile"
                type="number"
                name="mobile"
                value={formData.mobile}
                handleChange={handleInputChange}
                placeholder="Your Mobile"

                isInvalid={!!errors.mobile}
              />

              <FormControl>
                <FormLabel htmlFor="foodType" fontWeight={"bold"} color={colorMode === "light" ? "light" : "primary.dark"}>Food Type</FormLabel>
                <InputGroup>
                  <Select
                    name="foodType"
                    value={formData.food.type}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        food: {
                          ...formData.food,
                          type: e.target.value,
                        },
                      });
                    }}

                  >
                    <option value="snack">Snack</option>
                    <option value="lunch">Lunch</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="juices">Juices</option>
                  </Select>
                </InputGroup>

              </FormControl>

              <FormInputs
                formLabel="Quantity"
                type="number"
                name="quantity"
                value={formData.food.quantity}
                handleChange={(e) => {
                  setFormData({
                    ...formData,
                    food: {
                      ...formData.food,
                      quantity: e.target.value,
                    },
                  });
                }}
                placeholder="Provide quantity more than 10"
                isInvalid={!!errors.quantity}
              />
               <Button onClick={submit} color={colorMode === "light" ? "light" : "primary.dark"}>
                {isLoading ? <Spinner color={colorMode === "light" ? "light" : "primary.dark"} /> : "Submit"}
              </Button>
   </>
  )
}
