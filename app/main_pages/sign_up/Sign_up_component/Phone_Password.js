'use client'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import Number_country from '@/app/component/DropDown/Number_country'
import Unboarding_input from '@/app/component/Inputs/Unboarding_input'
function Phone_Password({signUpDetails, handleSignUpChange}) {
  return (
    <div>
      <Box className=' text-white lg:mt-[40px] mt-[20px]'>
        <Text className=' text-[20px] font-bold'>Create your account</Text>
        <Text className=' text-[15px] pt-[20px]'>Please, enter your phone number and password to create an account.</Text>
      </Box>
       <Box className=' grid gap-y-[20px] mt-[40px]'>
         <Box className=' flex items-center gap-x-[10px]'>
           <Box>
             <Number_country countryDetails={signUpDetails} />
           </Box>
            <Box className=' w-full'>
               <Unboarding_input types={'number'} values={signUpDetails.phone} handleChange={handleSignUpChange} names={'phone'} placing={'+2564567890'} />
            </Box>
         </Box>
          <Box>
            <Unboarding_input password values={signUpDetails.password} handleChange={handleSignUpChange} names={'password'} placing={'Password'}
             icon={<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.8346 12.4997C10.8346 12.0394 10.4615 11.6663 10.0013 11.6663C9.54106 11.6663 9.16797 12.0394 9.16797 12.4997V14.1663C9.16797 14.6266 9.54106 14.9997 10.0013 14.9997C10.4615 14.9997 10.8346 14.6266 10.8346 14.1663V12.4997Z"
    fill="#A5A6AB"
    fillOpacity="0.88"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.0013 5.83301C15.0013 3.07158 12.7627 0.833008 10.0013 0.833008C7.23988 0.833008 5.0013 3.07158 5.0013 5.83301V7.49967C3.16035 7.49967 1.66797 8.99206 1.66797 10.833V15.833C1.66797 17.674 3.16035 19.1663 5.0013 19.1663H15.0013C16.8423 19.1663 18.3346 17.674 18.3346 15.833V10.833C18.3346 8.99206 16.8423 7.49967 15.0013 7.49967V5.83301ZM6.66797 5.83301C6.66797 3.99206 8.16035 2.49967 10.0013 2.49967C11.8423 2.49967 13.3346 3.99206 13.3346 5.83301V7.49967H6.66797V5.83301ZM3.33464 10.833C3.33464 9.91253 4.08083 9.16634 5.0013 9.16634H15.0013C15.9218 9.16634 16.668 9.91253 16.668 10.833V15.833C16.668 16.7535 15.9218 17.4997 15.0013 17.4997H5.0013C4.08083 17.4997 3.33464 16.7535 3.33464 15.833V10.833Z"
    fill="#A5A6AB"
    fillOpacity="0.88"
  />
</svg>

} />
          </Box>
           <Box>
            <Unboarding_input password values={signUpDetails.confirmPassword} handleChange={handleSignUpChange} names={'confirmPassword'} placing={'Confirm password'} icon={<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M10.8346 12.4997C10.8346 12.0394 10.4615 11.6663 10.0013 11.6663C9.54106 11.6663 9.16797 12.0394 9.16797 12.4997V14.1663C9.16797 14.6266 9.54106 14.9997 10.0013 14.9997C10.4615 14.9997 10.8346 14.6266 10.8346 14.1663V12.4997Z"
    fill="#A5A6AB"
    fillOpacity="0.88"
  />
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M15.0013 5.83301C15.0013 3.07158 12.7627 0.833008 10.0013 0.833008C7.23988 0.833008 5.0013 3.07158 5.0013 5.83301V7.49967C3.16035 7.49967 1.66797 8.99206 1.66797 10.833V15.833C1.66797 17.674 3.16035 19.1663 5.0013 19.1663H15.0013C16.8423 19.1663 18.3346 17.674 18.3346 15.833V10.833C18.3346 8.99206 16.8423 7.49967 15.0013 7.49967V5.83301ZM6.66797 5.83301C6.66797 3.99206 8.16035 2.49967 10.0013 2.49967C11.8423 2.49967 13.3346 3.99206 13.3346 5.83301V7.49967H6.66797V5.83301ZM3.33464 10.833C3.33464 9.91253 4.08083 9.16634 5.0013 9.16634H15.0013C15.9218 9.16634 16.668 9.91253 16.668 10.833V15.833C16.668 16.7535 15.9218 17.4997 15.0013 17.4997H5.0013C4.08083 17.4997 3.33464 16.7535 3.33464 15.833V10.833Z"
    fill="#A5A6AB"
    fillOpacity="0.88"
  />
</svg>

} />
<p className=' text-[12px] text-white pt-[8px]'>Password should contain at least 8 characters containing a capital letter, a lower letter, a number and a special character
</p>
           </Box>
       </Box>
        <Box></Box>
    </div>
  )
}

export default Phone_Password