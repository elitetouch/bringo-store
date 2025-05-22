import React from 'react'
import { Box, Text } from '@chakra-ui/react'
function Pagination_component({pagination_determinant, setSignUpPage}) {
  return (
    <div className=' flex items-end  '>
        {/* first page */}
        <Box className=' flex items-center'>
        <Box cursor={'pointer'} onClick={()=>{setSignUpPage(0)}} className={` rounded-full h-[33px] w-[33px] grid items-center justify-center ${pagination_determinant===0 ?'bg-white':'bg-gray-500'} `}>
            <Text>1</Text>
        </Box>
         <Box className={` h-[2px] w-[35px] ${pagination_determinant===0 ?'bg-white':'bg-gray-500'}`}></Box>

        </Box>
         {/* sec page */}
         <Box className=' flex items-center'>
           <Box cursor={'pointer'}
            onClick={()=>{setSignUpPage(1)}}
             className={`${pagination_determinant===1 ?'bg-white':'bg-gray-500'} rounded-full grid h-[33px] w-[33px] items-center justify-center`}>
            <Text>2</Text>
        </Box>
            <Box className={` h-[2px] w-[35px] ${pagination_determinant===1 ?'bg-white':'bg-gray-500'}`}></Box>

         </Box>
            {/* Third page */}
             <Box className=' flex items-center'>
            <Box cursor={'pointer'} 
            onClick={()=>{setSignUpPage(2)}}
             className={` ${pagination_determinant===2 ?'bg-white':'bg-gray-500'} rounded-full h-[33px] w-[33px] grid items-center justify-center`}>
            <Text>3</Text>
        </Box>
             {/* <Box className={` ${pagination_determinant===2 ?'bg-white':'bg-gray-500'} h-[2px] w-[35px]`}></Box> */}
             </Box>
             {/* fourth page */}
              {/* <Box cursor={'pointer'} onClick={()=>{setSignUpPage(3)}} className={`${pagination_determinant===3 ?'bg-white':'bg-gray-500'} rounded-full h-[33px] w-[33px] grid items-center justify-center`}>
            <Text>4</Text>
        </Box> */}
    </div>
  )
}

export default Pagination_component