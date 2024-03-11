import { Box } from "@chakra-ui/react";
import logo from "@/assets/logo2.svg"
export function Logo(props){
    return (
        <Box> {/* Adjust margin as needed */}
      <img src={logo} alt="logo" height={70} width={140} />
    </Box>
    )
}