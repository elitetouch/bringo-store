'use client'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import Unboarding_input from '@/app/component/Inputs/Unboarding_input'
import Location from '@/app/component/DropDown/Location'
import { Checkbox } from '@chakra-ui/react'
function Shop_Setup({signUpDetails,handleSignUpChange}) {
  return (
    <div>
         <Box className=' text-white lg:mt-[40px] mt-[20px] lg:w-10/12'>
                    <Text className=' text-[20px] font-bold'>Set Up your store</Text>
                    <Text className=' text-[15px] pt-[20px]'>Setup your shop by completing the following details
</Text>
                  </Box>
                  <Box>
                   <Box className=' grid gap-y-[16px] mt-[40px]'>
                     <Unboarding_input values={signUpDetails.email} handleChange={handleSignUpChange} names={'storeName'} placing={'Store Name'} icon={<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.8323 17.5C17.6732 17.5 19.1656 16.0076 19.1656 14.1667V6.68557C19.1659 6.67283 19.1659 6.66005 19.1656 6.64725V5.83333C19.1656 3.99238 17.6732 2.5 15.8323 2.5H4.16559C2.32464 2.5 0.832253 3.99238 0.832253 5.83333V6.64726C0.831957 6.66005 0.831958 6.67282 0.832253 6.68557V14.1667C0.832253 16.0076 2.32464 17.5 4.16559 17.5H15.8323ZM2.49892 14.1667C2.49892 15.0871 3.24511 15.8333 4.16559 15.8333H15.8323C16.7527 15.8333 17.4989 15.0871 17.4989 14.1667V7.89753L11.2369 10.4023C10.4422 10.7202 9.55565 10.7202 8.76095 10.4023L2.49892 7.89753V14.1667ZM10.6179 8.85488L17.4989 6.10247V5.83333C17.4989 4.91286 16.7527 4.16667 15.8323 4.16667H4.16559C3.24511 4.16667 2.49892 4.91286 2.49892 5.83333V6.10247L9.37993 8.85488C9.77729 9.01382 10.2206 9.01382 10.6179 8.85488Z"
    fill="#A5A6AB"
  />
</svg>
} />
<Location />
                   </Box>
                  <Box className=' flex items-center gap-x-[10px] mt-[20px] text-white'>
                     <Box>
                      <Checkbox borderColor={'white'}></Checkbox>
                     </Box>
                     <Box className=' text-[12px]'>
                      <Text>I hereby agreed that i have read and agree to the BringoDirect sellers contract <span className=' text-[#A8E545]'>Terms & Condition,</span> and <span className=' text-[#A8E545]'>Privacy policy</span> </Text>
                     </Box>
                  </Box>
                  </Box>
    </div>
  )
}

export default Shop_Setup