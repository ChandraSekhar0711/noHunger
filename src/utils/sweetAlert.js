import { useToast } from "@chakra-ui/react";

export function sweetAlert(){
  const toast = useToast();
  const showToast = (type,msg)=>{
    toast({
      title: msg,
      status: type,
      duration: 2000,
      isClosable: true,
      
      position:"bottom",
     
    });
  }
  return showToast;
}