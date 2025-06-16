'use client'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import SubmitButton from './SubmitButton'
import { useState } from 'react'
import DashBoardInput from './DashboardInput'
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
import CountryDropDown from './CountryDropDown'
import { useRouter } from 'next/navigation'
function PaymentInformation({setPaymentTracker, dropData}) {
const router = useRouter()
  const toast = useToast()
    const [businessLoader, setBusinessLoader]= useState(false)
  const [businessData, setBusinessData]= useState({
    beneficiaryName:'',
    acctNum:'',
    iban:'',
    swiftCode:'',
    bankName:'',
    store_id:''
  })
  const handleBusinessInput=(e)=>{
    // setBusinessData({...businessData,[e.target.name]:e.target.value})
       const updatedStoreInfo = {
    ...businessData,
    [e.target.name]: e.target.value
  };
    setBusinessData(updatedStoreInfo);

//   const filledCount = Object.values(updatedStoreInfo).filter(value => value.trim() !== '').length;
//  setPaymentTracker(filledCount)
//   console.log(`Filled fields: ${filledCount}`);
  }

  const [err, setErr]= useState({})
 const Validation = () =>{  
      const errors={}    
      // State parameters to be made compulsory in the form for submission to go through //
      const objectKeys=[ 'beneficiaryName','acctNum','iban',
        'swiftCode','bankName','store_id'
         ]
      objectKeys.forEach((field)=>{
       if(!businessData[field]){
         errors[field]= `Input ${field.replace(/_/g, " ")}`
     }
       errors[field]
       console.log(errors[field])

      })
      //note:This function returns boolean which can be either true or false //
      Object.keys(errors).length && setErr(errors)
      return Object.keys(errors).length === 0
     }

  const handleBussinessSubmitFunc=()=>{
    console.log(businessData)
    if(Validation()){
      setBusinessLoader(true)
      const formData= new FormData()
        //formData.append('user_id',businessData.user_id)
        formData.append('store_id', businessData.store_id)
       // formData.append('business_id', businessData.bussiness_id)
        formData.append('beneficiary_name', businessData.beneficiaryName)
        formData.append('iban', businessData.iban)
        formData.append('bank_name', businessData.bankName)
        formData.append('bank_account_number', businessData.acctNum)
        formData.append('swift_code', businessData.swiftCode)
        axiosInstance
      .post('/api/v1/payment-information', formData)
      .then((resp) => {
        setBusinessLoader(false);
        // router.push('/');
       setBusinessData({
    beneficiaryName:'',
    acctNum:'',
    iban:'',
    swiftCode:'',
    bankName:'',
    bussiness_id:''
  })
        toast({
            title: 'Payment Information',
            description:'Payment information created successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          router.push('../../main_pages/Dashboard/existing_user_dashboard')
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
 else{
        toast({
            title: 'Error',
            description:'Please Fill all required fields',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
      }
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
                              <Box>
                              <DashBoardInput placing={''}  names={'beneficiaryName'} values={businessData.beneficiaryName} handleChange={handleBusinessInput} label={'Beneficiary Name'} />
                               {err?.beneficiaryName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include beneficiary name</p>
)}
                              </Box>
                              <Box>
                               <DashBoardInput placing={''}  names={'bankName'} values={businessData.bankName} handleChange={handleBusinessInput} label={'*Bank Name'} />  
                                {err?.bankName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include bank name</p>
)}
                              </Box>
                              <Box>
                              <DashBoardInput types={'number'}  placing={''}  names={'acctNum'} values={businessData.acctNum} handleChange={handleBusinessInput} label={'*Bank Account Number'} /> 
                              {err?.acctNum && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Account number</p>
)}
                              </Box>
                              <Box>
                              <DashBoardInput placing={''}  names={'iban'} values={businessData.iban} handleChange={handleBusinessInput} label={'*IBAN'} /> 
                               {err?.iban && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input IBAN</p>
)}
                              </Box>
                              <Box>
                              <DashBoardInput types={'number'} placing={''}  names={'swiftCode'} values={businessData.swiftCode} handleChange={handleBusinessInput} label={'*SWIFT Code'} /> 
                              {err?.swiftCode && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include SWIFT CODE</p>
)}
                              </Box>
                              <Box>
                {dropData?.length > 0 && <CountryDropDown
                 values={businessData.store_id}
                onChangeFunc={handleBusinessInput}
                 names={'store_id'}
                 label={'Store Name'}
                  dropDownOpt={dropData || []}
                  placing={'Select Store Name'}
                />}
                   {err?.bussiness_id && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please Store name</p>
)}
<p className="text-gray-600 text-[12px] pt-[5px]">Create a new store information on store information tab </p>
                </Box>
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