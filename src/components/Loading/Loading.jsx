import React from 'react'
import { Box, Center, Progress, Spinner } from '@chakra-ui/react'
export function Loading() {
  return (
    <Box m={"40"}>
        <Progress size='xs' isIndeterminate />
    </Box>
    
  )
}
