import { Box } from "@chakra-ui/react";
// import logo from "@/assets/logo2.svg"
import logo from "@/assets/logo.png"
export function Logo(props){
    return (
        <Box> {/* Adjust margin as needed */}
      <img src={logo} alt="logo" height={60} width={140} />
    </Box>
    )
}