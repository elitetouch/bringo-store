import React from 'react'
import { Button, Text, Box } from '@chakra-ui/react'
function Unboarding_submit({submit_func}) {
  return (
    <div>
     <Button onClick={submit_func} backgroundColor={'#85CB14'} border={'1px'} borderColor={'white'}>
        <Box className=' flex items-center gap-x-[10px]'>
           <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.30078 14.3996L7.70078 8.99961L2.30078 3.59961" stroke="#0E4940" stroke-width="1.5" stroke-miterlimit="3.3333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        <Text className=' text-[#0E4940] text-[14px]'>Login</Text>
        </Box>
     </Button>
    </div>
  )
}

export default Unboarding_submit