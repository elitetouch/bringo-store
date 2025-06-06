import React from 'react'
import { Button, Box, Text } from '@chakra-ui/react'
function Filter() {
  return (
    <Button backgroundColor={'transparent'} border="1px" borderColor="gray.300" borderRadius="lg" className=' h-[40px] w-[80px]'>
      <Box className=' flex items-center gap-x-[10px]'>
        <Text className=' text-[12px]'>Filter</Text>
        <Box><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1.06445H17M3.99994 6.06445H13.9999M7.99994 11.0645H9.99994" stroke="#454545" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
</Box>
      </Box>
    </Button>
  )
}

export default Filter