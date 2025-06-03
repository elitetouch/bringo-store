'use client'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import SubmitButton from './SubmitButton'
import { useState } from 'react'
import DashBoardInput from './DashboardInput'
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
function PaymentInformation({setPaymentTracker}) {
  const toast = useToast()
    const [businessLoader, setBusinessLoader]= useState(false)
  const [businessData, setBusinessData]= useState({
    beneficiaryName:'',
    acctNum:'',
    iban:'',
    swiftCode:''
  })
  const handleBusinessInput=(e)=>{
    // setBusinessData({...businessData,[e.target.name]:e.target.value})
       const updatedStoreInfo = {
    ...businessData,
    [e.target.name]: e.target.value
  };
  
  setBusinessData(updatedStoreInfo);

  const filledCount = Object.values(updatedStoreInfo).filter(value => value.trim() !== '').length;
 setPaymentTracker(filledCount)
  console.log(`Filled fields: ${filledCount}`);
  }
  const handleBussinessSubmitFunc=()=>{
    console.log(businessData)
    setBusinessLoader(true)
    const formData= new FormData()
      formData.append()
        axiosInstance
      .post('', formData)
      .then((resp) => {
        setBusinessLoader(false);
        // router.push('/');
      })
      .catch((error) => {
        setBusinessLoader(false);
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
  }
  return (
    <Box>
      <Box className=' lg:mt-[50px] mt-[20px] w-11/12 m-auto bg-white pt-[20px] mb-[30px] rounded-lg pb-[30px] '>
      <Box className=' w-11/12 m-auto'>
            <Box>
             <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit'>
                              <Text className=' pb-[2px] font-bold '>Payment details</Text>
                            </Box>
                              <Text className=' text-[#332F2F] text-[12px] pt-[15px]'>Select the payment method, if applicable, of your choice, and ensure to provide all required details. We'll review the validity of your documents upon submission.</Text>
                            </Box>
                             <Box className=' grid lg:grid-cols-2 gap-y-[20px] lg:gap-x-[40px] mt-[20px] lg:mt-[20px]'>
                              <DashBoardInput placing={''}  names={'beneficiaryName'} values={businessData.beneficiaryName} handleChange={handleBusinessInput} label={'Beneficiary Name'} /> 
                              <DashBoardInput placing={''}  names={'acctNum'} values={businessData.acctNum} handleChange={handleBusinessInput} label={'*Bank Account Number'} /> 
                              <DashBoardInput placing={''}  names={'iban'} values={businessData.iban} handleChange={handleBusinessInput} label={'*IBAN'} /> 
                              <DashBoardInput placing={''}  names={'swiftCode'} values={businessData.swiftCode} handleChange={handleBusinessInput} label={'*SWIFT Code'} /> 
                             </Box>
                            </Box>
      
      </Box>
      <Box className=' grid w-11/12 justify-end'>
                  <SubmitButton submitFunc={handleBussinessSubmitFunc} loading={businessLoader} />
                </Box>
    </Box>
  )
}

export default PaymentInformation