import React from 'react'
import { Box, Input} from '@chakra-ui/react'
 import uganda from '../../../public/Uganda.svg'
 import Image from 'next/image'
function Number_country() {
  return (
    <div className=' w-[108px] rounded-l-lg rounded-r-lg h-[48px] bg-white grid items-center'>
   <Box className=' flex gap-x-[10px] items-center w-11/12 m-auto'>
             <Image src={uganda} alt='' />
        <svg
  width="11"
  height="5"
  viewBox="0 0 11 5"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M5.5 5L0.5 0H10.5L5.5 5Z" fill="#1D1B20" />
</svg>
<h1>
    +256
</h1>
 
         </Box>
    </div>
  )
}

export default Number_country