'use client'
import React from 'react'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@chakra-ui/react';
import axiosInstance from '@/app/api/Api_Instance';
import { useToast } from '@chakra-ui/react'
import DashBoardInput from '../Dashboard/component/DashboardInput';
import { Text } from '@chakra-ui/react';
//import imp from '../../main_pages/PasswordOTP'
function Page() {
    const router = useRouter()
  const toast = useToast()
  const formdata ={
    "email": "",
  }
  const [forgetPass,setForgetPass] = useState(formdata)
  const handleChange =(e)=>{
    setForgetPass({...forgetPass,
      [e.target.name]:e.target.value}
    )
  }
   const [Loading, setLoading] = useState(false)
  const handleSubmit=()=>{
    setLoading(true)
    console.log(forgetPass)
    const formData = new FormData()
    formData.append('email',forgetPass.email)
      axiosInstance.post('/api/v1/forgot-password',formData).then((resp)=>{
        setLoading(false)
        resp && toast({
          title: resp.data.message,
          description: 'Password Update',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        router.push('/../../main_pages/PasswordOTP')
        console.log(resp)       
      }).catch((error)=>{
        setLoading(false)
        if (error.response) {
          toast({
            title: error.response.data.message || 'An error occurred.',
            description: 'Password Update',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        } 
      })
  }
  return (
    <div className='items-center h-screen lg:grid mt-[40px] lg:mt-0'>
    <div className='w-11/12 m-auto rounded-lg shadow-xl lg:w-6/12 '>
      <div className={`grid lg:w-8/12 w-11/12 m-auto`}>
        <div className=' lg:mt-[40px] mt-[30px]'>
            <h1 className=' text-[20px] font-semibold'>Forget Password</h1>
        </div>
        <div className=' grid w-full lg:gap-y-[32px] gap-y-[20px] lg:mt-[48px] mt-[25px]'>
          <DashBoardInput handleChange={handleChange}  values={forgetPass.otp} names={'email'} label={'Enter Email'} />     
        </div>
        <div className=' mt-[48px] mb-[40px]'>
        <Button
        isLoading={Loading}
        onClick={handleSubmit}
      className={`bg-[#031966] hover:bg-[#FE9534] duration-500 text-white text-[16px] border lg:grid lg:justify-center shadow-xl items-center w-full lg:w-[178px] h-[58px] rounded-full border-[#FE9534]`}>
       <Text>Submit</Text>
    </Button>
        </div>

      </div>
    </div>

    </div>
  )
}

export default Page