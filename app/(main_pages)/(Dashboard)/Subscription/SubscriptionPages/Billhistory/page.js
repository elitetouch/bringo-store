import React from 'react'
import BillTable from '@/app/component/Table/BillTable'
import { Box, Text, Button, Select, IconButton } from '@chakra-ui/react'
function page() {
  return (
    <div>
      <Box className='  pl-[10px] ml-[10px] mt-[20px] pr-[10px]'>
      <Box className=' flex items-center justify-between mb-[20px]'>
        <Box>
          <Text className=' font-semibold text-[18px]'>Billing history</Text>
        </Box>
        <Box></Box>
      </Box>
        <BillTable />

          {/* <Box className=' flex items-center justify-between mt-[30px] lg:w-10/12 w-11/12  m-auto pb-[30px]'>
                                     <Box>
                                       <Text className=' text-[#1A71F6] lg:text-[12px] text-[14px]'><span>1</span> of 13 pages</Text>
                                     </Box>
                                     <Box className=' flex items-center lg:gap-x-[20px] gap-x-[15px]'>
                                       <Text className=' lg:text-[12px] text-[14px]'>The page on</Text>
                                       <Box className=' pr-[5px]'>
                                       <Select width={35} height={30} placeholder=''>
                             <option value='option1'>1</option>
                             <option value='option2'>2</option>
                             <option value='option3'>3</option>
                           </Select>
                                       </Box>
                                       <IconButton
                                       icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M8.5 14.6668L1.83333 8.00016L8.5 1.3335" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                           }
                                       />
                                       <IconButton
                                       icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                           </svg>
                           }
                                       />
                                     </Box>
                                   </Box> */}
      </Box>
    </div>
  )
}

export default page