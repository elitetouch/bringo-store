'use client'
import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import PinField from 'react-pin-field';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/api/Api_Instance';
import { useToast } from '@chakra-ui/react';
// import imp from '../../sign_in'
function OTP({setSignUpPage, profile}) {
  const toast = useToast()
  const router = useRouter()
    const [loadOTP, setLoadOTP] = useState(false)
    const [OTP, setOTP] = useState('')
  const handleComplete = (value) => {
    console.log('PIN:', value);
    setOTP(value)
    setLoadOTP(true)
    setSignUpPage(3)
  };
  const [signUpLoader, setSignUpLoader] = useState(false)
   const handleFormSubmission = (value) => {
  setSignUpLoader(true);
  const formData = new FormData();
  formData.append('otp_code', value);
  axiosInstance
    .post('/api/v1/verify-code', formData)
    .then((resp) => {
      setSignUpLoader(false);
      console.log(resp);

      // If needed, store new token here
      // localStorage.setItem('accessToken', resp.data.token);

      // Proceed
      // pagination_function();
      router.push('/')
    })
    .catch((error) => {
      setSignUpLoader(false);
      toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    });
};
 const [resendLoader, setResendLoader] = useState(false)
const resendOTP=()=>{
   setResendLoader(true)
   axiosInstance.post('/api/v1/resend-otp',{}).then((resp)=>{
       setResendLoader(false)
     toast({
        title: 'Resend OTP',
        description:'OTP sent successfully',
        status: 'sucess',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
   }).catch((error)=>{
        setResendLoader(false)
     toast({
        title: 'Error',
        description:
          error.response?.data?.message || 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
   })   
}
  return (
    <div>
       <Box className=' text-white lg:mt-[40px] mt-[20px] lg:w-7/12'>
              <Text className=' text-[20px] font-bold'>Verify your email</Text>
              <Text className=' text-[15px] pt-[20px]'>A 4 digit verification code has been sent to email {profile}</Text>
            </Box>
            <Box className=' mt-[40px]'>
              <Box className=' flex items-center justify-between w-10/12'>
  <PinField
      length={4}
      onComplete={handleFormSubmission}
      // validate={(char) => /\d/.test(char)}
      autoFocus
      className="otp-input h-[20px] w-[20px] lg:w-[70px] lg:h-[70px] text-white "
    />

              </Box>
   
    <Text className=' text-white pt-[15px]'>
      Resend code in 01:49
    </Text>

            </Box>
            <Box className=' flex items-center gap-x-[40px] mt-[20px]  mb-[30px]'>
                          <Box>
                            <Button minWidth={121} className=' w-full lg:w-fit' onClick={()=>{}} backgroundColor={'#85CB14'} border={'1px'} borderColor={'white'}>
                                    <Box className=' flex items-center gap-x-[10px]'>
                                      <svg
                                      width="10"
                                      height="18"
                                      viewBox="0 0 10 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                      d="M2.30078 14.3996L7.70078 8.99961L2.30078 3.59961"
                                stroke="#0E4940"
                                strokeWidth="1.5"
                                strokeMiterlimit="3.3333"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            
                            
                                    <Text className=' text-[#0E4940] text-[14px]'>{!signUpLoader?'Verify':'Loading...'}</Text>
                                    </Box>
                                 </Button>
                          </Box>
                                      <Box>
                                        <Button minWidth={121} className=' w-full lg:w-fit' onClick={()=>{}} backgroundColor={'transparent'} border={'1px'} borderColor={'#85CB14'}>
                                                <Box className=' flex items-center gap-x-[10px]'>
                                                {resendLoader?<Box className='loader'></Box>:<Box cursor={'pointer'} onClick={resendOTP}><Text className=' text-[#85CB14] text-[14px]'>Resend code</Text></Box>}
                                                </Box>
                                             </Button>
                                      </Box>
            </Box>
    </div>
  )
}

export default OTP