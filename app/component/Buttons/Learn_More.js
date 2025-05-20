'use client'
import React from 'react'
import { Button, Text, Box } from '@chakra-ui/react'
function Learn_More() {
  return (
    <div>
     <Button backgroundColor={'transparent'} border={'1px'} borderColor={'white'}>
        <Box className=' flex items-center gap-x-[10px]'>
           <svg
  width="18"
  height="17"
  viewBox="0 0 18 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M16.5 1L11.3 16L8.3 9.3L1.5 6.3L16.5 1Z"
    stroke="white"
    strokeWidth="1.5"
    strokeMiterlimit="3.3333"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>

        <Text className=' text-white text-[14px]'>Learn More</Text>
        </Box>
     </Button>
    </div>
  )
}

export default Learn_More