import React from 'react'
import { Button, Box, Text } from '@chakra-ui/react'
function ExportButton() {
  return (
   <Button backgroundColor={'transparent'} border="1px" borderColor="gray.300" borderRadius="lg" className=' h-[40px] w-[88px]'>
         <Box className=' flex items-center gap-x-[10px]'>
           <Text className=' text-[12px]'>Export</Text>
           <Box><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9.06445L10 13.0645M10 13.0645L6 9.06445M10 13.0645V1.06445M19 13.0645V15.0645C19 16.169 18.1046 17.0645 17 17.0645H3C1.89543 17.0645 1 16.169 1 15.0645L1 13.0645" stroke="#454545" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

   </Box>
         </Box>
       </Button>
  )
}

export default ExportButton