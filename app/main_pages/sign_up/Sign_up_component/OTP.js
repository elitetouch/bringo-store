'use client';

import React, { useState } from 'react';
import {
  Box,
  Text,
  Button,
  useToast,
  HStack,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/api/Api_Instance';

function OTP({ setSignUpPage, profile }) {
  const toast = useToast();
  const router = useRouter();

  const [OTP, setOTP] = useState('');
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [resendLoader, setResendLoader] = useState(false);

  const handleFormSubmission = () => {
    if (OTP.length !== 4) {
      toast({
        title: 'Invalid OTP',
        description: 'OTP must be exactly 4 characters.',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top-right',
      });
      return;
    }

    setSignUpLoader(true);
    const formData = new FormData();
    formData.append('otp_code', OTP);

    axiosInstance
      .post('/api/v1/verify-code', formData)
      .then((resp) => {
        setSignUpLoader(false);
        router.push('/');
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

  const resendOTP = () => {
    setResendLoader(true);
    axiosInstance
      .post('/api/v1/resend-otp', {})
      .then(() => {
        setResendLoader(false);
        toast({
          title: 'Resend OTP',
          description: 'OTP sent successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch((error) => {
        setResendLoader(false);
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

  return (
    <Box className="text-white lg:mt-[40px] mt-[20px] lg:w-7/12">
      <Text className="text-[20px] font-bold">Verify your email</Text>
      <Text className="text-[15px] pt-[20px]">
        A 4-character verification code has been sent to email {profile}
      </Text>
<Box className=''>
 <HStack spacing={[2, 4]} mt={10} flex >
  <PinInput otp onChange={setOTP} >
    {[...Array(4)].map((_, idx) => (
      <PinInputField
        key={idx}
        borderColor="#85CB14"
        backgroundColor="transparent"
        color="white"
        width={['60px', '100px']}     // 40px on mobile, 70px on desktop
        height={['60px', '100px']}    // 40px on mobile, 70px on desktop
        fontSize={['20px', '28px']}  // Optional: adjust font size responsively
        textAlign="center"
        _focus={{ borderColor: "#85CB14", boxShadow: '0 0 0 1px #85CB14' }}
        _hover={{ borderColor: "#85CB14" }}
      />
    ))}
  </PinInput>
</HStack>

</Box>


      <Text className="text-white pt-[15px]">Resend code in 01:49</Text>

      <Box className="flex items-center gap-x-[40px] mt-[20px] mb-[30px]">
        <Button
          minWidth={121}
          onClick={handleFormSubmission}
          backgroundColor="#85CB14"
          border="1px"
          borderColor="white"
          isLoading={signUpLoader}
        >
          <Box className="flex items-center gap-x-[10px]">
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.3 14.4L7.7 9L2.3 3.6"
                stroke="#0E4940"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text className="text-[#0E4940] text-[14px]">Verify</Text>
          </Box>
        </Button>

        <Button
          minWidth={121}
          onClick={resendOTP}
          backgroundColor="transparent"
          border="1px"
          borderColor="#85CB14"
          isLoading={resendLoader}
        >
          <Text className="text-[#85CB14] text-[14px]">Resend code</Text>
        </Button>
      </Box>
    </Box>
  );
}

export default OTP;
