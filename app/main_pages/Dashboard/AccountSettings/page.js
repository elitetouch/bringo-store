'use client'
import React from 'react'
import { Box,Text, IconButton, Button,Input  } from '@chakra-ui/react'
import { useState } from 'react'
import ProfilePicture from '../../../../public/profilePicture.svg'
import DashBoardInput from '../component/DashboardInput'
import Image from 'next/image'
import Number_country from '@/app/component/DropDown/Number_country'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
 
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Subscrption from '../component/Subscrption'
import { ProfileInfo } from '@/app/api/reactQuery'
//import imp from '../../../main_pages/Dashboard/new_user_dashboard'
export const SocialMedia =()=>{
  return(
     <Box className=' flex items-center gap-x-[10px] mt-[10px] justify-center'>
                <Button backgroundColor={'transparent'}>
                  <Box color={'#1877F2'} className=' flex items-center gap-x-[5px]'>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_9685_39582)">
<path d="M6.96721 0.72272C4.9689 1.41595 3.24556 2.73173 2.05032 4.47679C0.855082 6.22184 0.250946 8.3042 0.326651 10.418C0.402355 12.5318 1.15391 14.5656 2.47092 16.2206C3.78794 17.8757 5.60099 19.0648 7.64377 19.6133C9.2999 20.0407 11.035 20.0595 12.7 19.668C14.2083 19.3292 15.6028 18.6045 16.7469 17.5649C17.9376 16.4498 18.802 15.0313 19.2469 13.4618C19.7305 11.755 19.8166 9.96012 19.4985 8.21491H10.1985V12.0727H15.5844C15.4768 12.688 15.2461 13.2753 14.9062 13.7993C14.5663 14.3234 14.1242 14.7735 13.6063 15.1227C12.9486 15.5578 12.2072 15.8505 11.4297 15.9821C10.6499 16.1271 9.85011 16.1271 9.07033 15.9821C8.28 15.8187 7.53236 15.4925 6.87502 15.0243C5.819 14.2768 5.02608 13.2148 4.6094 11.9899C4.18567 10.7421 4.18567 9.38929 4.6094 8.14147C4.906 7.26681 5.39632 6.47043 6.04377 5.81178C6.7847 5.0442 7.72273 4.49553 8.75495 4.22596C9.78718 3.9564 10.8737 3.97636 11.8953 4.28366C12.6934 4.52864 13.4232 4.95669 14.0266 5.53366C14.6339 4.92949 15.2401 4.32376 15.8453 3.71647C16.1578 3.38991 16.4985 3.07897 16.8063 2.7446C15.8853 1.88753 14.8042 1.22062 13.625 0.782095C11.4777 0.00239205 9.12811 -0.0185617 6.96721 0.72272Z" fill="white"/>
<path d="M6.96563 0.722503C9.12635 -0.0192828 11.4759 0.00111945 13.6234 0.780316C14.8028 1.22182 15.8834 1.89194 16.8031 2.75219C16.4906 3.08657 16.1609 3.39907 15.8422 3.72407C15.2359 4.32927 14.6302 4.9324 14.025 5.53344C13.4216 4.95647 12.6918 4.52843 11.8937 4.28344C10.8725 3.97507 9.78597 3.95395 8.75347 4.22241C7.72097 4.49087 6.78236 5.03854 6.04062 5.80532C5.39318 6.46397 4.90285 7.26034 4.60625 8.135L1.36719 5.62719C2.52658 3.32807 4.53398 1.56942 6.96563 0.722503Z" fill="#E33629"/>
<path d="M0.506246 8.11133C0.680341 7.24851 0.969376 6.41293 1.36562 5.62695L4.60468 8.14102C4.18096 9.38884 4.18096 10.7416 4.60468 11.9895C3.52552 12.8228 2.44583 13.6603 1.36562 14.502C0.373668 12.5274 0.0711403 10.2777 0.506246 8.11133Z" fill="#F8BD00"/>
<path d="M10.196 8.21289H19.496C19.8141 9.9581 19.7281 11.753 19.2444 13.4598C18.7995 15.0293 17.9352 16.4478 16.7444 17.5629C15.6991 16.7473 14.6491 15.9379 13.6038 15.1223C14.1221 14.7727 14.5644 14.3221 14.9043 13.7975C15.2442 13.2728 15.4747 12.685 15.5819 12.0691H10.196C10.1944 10.7848 10.196 9.49883 10.196 8.21289Z" fill="#587DBD"/>
<path d="M1.36719 14.502C2.4474 13.6687 3.52708 12.8312 4.60625 11.9895C5.02376 13.2148 5.81782 14.2768 6.875 15.0239C7.53439 15.4899 8.28364 15.8135 9.075 15.9739C9.85478 16.1189 10.6546 16.1189 11.4344 15.9739C12.2119 15.8423 12.9533 15.5495 13.6109 15.1145C14.6562 15.9301 15.7063 16.7395 16.7516 17.5551C15.6076 18.5953 14.2132 19.3206 12.7047 19.6598C11.0397 20.0512 9.30457 20.0325 7.64844 19.6051C6.3386 19.2554 5.11512 18.6389 4.05469 17.7942C2.93228 16.9031 2.01556 15.7801 1.36719 14.502Z" fill="#007460"/>
</g>
<defs>
<clipPath id="clip0_9685_39582">
<rect width="20" height="20" fill="white" transform="translate(0 0.0644531)"/>
</clipPath>
</defs>
</svg>
                  <Box className=' flex items-center gap-x-[5px]'>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.69048 5.15983L2.57375 6.27655C2.15668 6.69362 1.91684 7.2611 1.92122 7.85751C1.92561 8.45392 2.1602 9.02486 2.59706 9.44823C3.0204 9.88509 3.59146 10.1197 4.18777 10.1241C4.79769 10.1285 5.35174 9.90222 5.76883 9.48514L6.88556 8.36841M8.31196 6.96929L9.42869 5.85256C9.84576 5.43549 10.0856 4.86801 10.0812 4.2716C10.0768 3.6752 9.84224 3.10425 9.40538 2.68089C8.98214 2.25764 8.41117 2.02304 7.81477 2.01866C7.21836 2.01427 6.6508 2.2405 6.23371 2.65758L5.11698 3.77431M4.30777 7.72814L7.65795 4.37796" stroke="#007AFF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  <Text className=' text-[12px]'>Linked</Text>
                  </Box>
                  </Box>
                </Button>
 <Button backgroundColor={'transparent'}>
                  <Box color={'#1877F2'} className=' flex items-center gap-x-[5px]'>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_9685_39592)">
<path d="M20 10.0645C20 4.54164 15.5228 0.0644531 10 0.0644531C4.47719 0.0644531 0 4.54164 0 10.0645C0 15.0557 3.65687 19.1928 8.4375 19.943V12.9551H5.89844V10.0645H8.4375V7.86133C8.4375 5.35508 9.93047 3.9707 12.2147 3.9707C13.3088 3.9707 14.4531 4.16602 14.4531 4.16602V6.62695H13.1922C11.9499 6.62695 11.5625 7.39781 11.5625 8.18867V10.0645H14.3359L13.8926 12.9551H11.5625V19.943C16.3431 19.1928 20 15.0558 20 10.0645Z" fill="#1877F2"/>
<path d="M13.8926 12.9551L14.3359 10.0645H11.5625V8.18867C11.5625 7.39773 11.9499 6.62695 13.1922 6.62695H14.4531V4.16602C14.4531 4.16602 13.3088 3.9707 12.2146 3.9707C9.93047 3.9707 8.4375 5.35508 8.4375 7.86133V10.0645H5.89844V12.9551H8.4375V19.943C8.95439 20.024 9.4768 20.0646 10 20.0645C10.5232 20.0646 11.0456 20.024 11.5625 19.943V12.9551H13.8926Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_9685_39592">
<rect width="20" height="20" fill="white" transform="translate(0 0.0644531)"/>
</clipPath>
</defs>
</svg>

                  <Box className=' flex items-center '>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.69048 5.15983L2.57375 6.27655C2.15668 6.69362 1.91684 7.2611 1.92122 7.85751C1.92561 8.45392 2.1602 9.02486 2.59706 9.44823C3.0204 9.88509 3.59146 10.1197 4.18777 10.1241C4.79769 10.1285 5.35174 9.90222 5.76883 9.48514L6.88556 8.36841M8.31196 6.96929L9.42869 5.85256C9.84576 5.43549 10.0856 4.86801 10.0812 4.2716C10.0768 3.6752 9.84224 3.10425 9.40538 2.68089C8.98214 2.25764 8.41117 2.02304 7.81477 2.01866C7.21836 2.01427 6.6508 2.2405 6.23371 2.65758L5.11698 3.77431M4.30777 7.72814L7.65795 4.37796" stroke="#007AFF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  <Text className=' text-[12px]'>Linked</Text>
                  </Box>
                  </Box>
                </Button>
                 <Button backgroundColor={'transparent'}>
                  <Box color={'#1877F2'} className=' flex items-center gap-x-[5px] '>
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_9685_39582)">
<path d="M6.96721 0.72272C4.9689 1.41595 3.24556 2.73173 2.05032 4.47679C0.855082 6.22184 0.250946 8.3042 0.326651 10.418C0.402355 12.5318 1.15391 14.5656 2.47092 16.2206C3.78794 17.8757 5.60099 19.0648 7.64377 19.6133C9.2999 20.0407 11.035 20.0595 12.7 19.668C14.2083 19.3292 15.6028 18.6045 16.7469 17.5649C17.9376 16.4498 18.802 15.0313 19.2469 13.4618C19.7305 11.755 19.8166 9.96012 19.4985 8.21491H10.1985V12.0727H15.5844C15.4768 12.688 15.2461 13.2753 14.9062 13.7993C14.5663 14.3234 14.1242 14.7735 13.6063 15.1227C12.9486 15.5578 12.2072 15.8505 11.4297 15.9821C10.6499 16.1271 9.85011 16.1271 9.07033 15.9821C8.28 15.8187 7.53236 15.4925 6.87502 15.0243C5.819 14.2768 5.02608 13.2148 4.6094 11.9899C4.18567 10.7421 4.18567 9.38929 4.6094 8.14147C4.906 7.26681 5.39632 6.47043 6.04377 5.81178C6.7847 5.0442 7.72273 4.49553 8.75495 4.22596C9.78718 3.9564 10.8737 3.97636 11.8953 4.28366C12.6934 4.52864 13.4232 4.95669 14.0266 5.53366C14.6339 4.92949 15.2401 4.32376 15.8453 3.71647C16.1578 3.38991 16.4985 3.07897 16.8063 2.7446C15.8853 1.88753 14.8042 1.22062 13.625 0.782095C11.4777 0.00239205 9.12811 -0.0185617 6.96721 0.72272Z" fill="white"/>
<path d="M6.96563 0.722503C9.12635 -0.0192828 11.4759 0.00111945 13.6234 0.780316C14.8028 1.22182 15.8834 1.89194 16.8031 2.75219C16.4906 3.08657 16.1609 3.39907 15.8422 3.72407C15.2359 4.32927 14.6302 4.9324 14.025 5.53344C13.4216 4.95647 12.6918 4.52843 11.8937 4.28344C10.8725 3.97507 9.78597 3.95395 8.75347 4.22241C7.72097 4.49087 6.78236 5.03854 6.04062 5.80532C5.39318 6.46397 4.90285 7.26034 4.60625 8.135L1.36719 5.62719C2.52658 3.32807 4.53398 1.56942 6.96563 0.722503Z" fill="#E33629"/>
<path d="M0.506246 8.11133C0.680341 7.24851 0.969376 6.41293 1.36562 5.62695L4.60468 8.14102C4.18096 9.38884 4.18096 10.7416 4.60468 11.9895C3.52552 12.8228 2.44583 13.6603 1.36562 14.502C0.373668 12.5274 0.0711403 10.2777 0.506246 8.11133Z" fill="#F8BD00"/>
<path d="M10.196 8.21289H19.496C19.8141 9.9581 19.7281 11.753 19.2444 13.4598C18.7995 15.0293 17.9352 16.4478 16.7444 17.5629C15.6991 16.7473 14.6491 15.9379 13.6038 15.1223C14.1221 14.7727 14.5644 14.3221 14.9043 13.7975C15.2442 13.2728 15.4747 12.685 15.5819 12.0691H10.196C10.1944 10.7848 10.196 9.49883 10.196 8.21289Z" fill="#587DBD"/>
<path d="M1.36719 14.502C2.4474 13.6687 3.52708 12.8312 4.60625 11.9895C5.02376 13.2148 5.81782 14.2768 6.875 15.0239C7.53439 15.4899 8.28364 15.8135 9.075 15.9739C9.85478 16.1189 10.6546 16.1189 11.4344 15.9739C12.2119 15.8423 12.9533 15.5495 13.6109 15.1145C14.6562 15.9301 15.7063 16.7395 16.7516 17.5551C15.6076 18.5953 14.2132 19.3206 12.7047 19.6598C11.0397 20.0512 9.30457 20.0325 7.64844 19.6051C6.3386 19.2554 5.11512 18.6389 4.05469 17.7942C2.93228 16.9031 2.01556 15.7801 1.36719 14.502Z" fill="#007460"/>
</g>
<defs>
<clipPath id="clip0_9685_39582">
<rect width="20" height="20" fill="white" transform="translate(0 0.0644531)"/>
</clipPath>
</defs>
</svg>
                  <Box className=' flex items-center '>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.69048 5.15983L2.57375 6.27655C2.15668 6.69362 1.91684 7.2611 1.92122 7.85751C1.92561 8.45392 2.1602 9.02486 2.59706 9.44823C3.0204 9.88509 3.59146 10.1197 4.18777 10.1241C4.79769 10.1285 5.35174 9.90222 5.76883 9.48514L6.88556 8.36841M8.31196 6.96929L9.42869 5.85256C9.84576 5.43549 10.0856 4.86801 10.0812 4.2716C10.0768 3.6752 9.84224 3.10425 9.40538 2.68089C8.98214 2.25764 8.41117 2.02304 7.81477 2.01866C7.21836 2.01427 6.6508 2.2405 6.23371 2.65758L5.11698 3.77431M4.30777 7.72814L7.65795 4.37796" stroke="#007AFF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  <Text className=' text-[12px]'>Linked</Text>
                  </Box>
                  </Box>
                </Button>
              </Box>
  )
}

export const CountryPhoneInput=({label, placing,names,values,changes})=>{
  return(
    <Box>
      <Box>
        <Text className=' text-[15px] font-semibold'>{label}</Text>
      </Box>
    <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' h-[50px] mt-[10px]'>
      <Box className=' flex items-center gap-x-[5px]'>
        <Input className=' flex-1' border={'none'} placeholder={placing} name={names} value={values} onChange={changes} />
        <Box className=''>
          <Number_country />
        </Box>
      </Box>
    </Box>
    </Box>
  )
}
export const CreditCardInfo=({value,changes})=>{
   const [selectedPaymentMethod, setPaymentMethod] = useState('ug'); // default selection

  const handleSelect = (value) => {
    setPaymentMethod(value);
    console.log('Selected:', value);
  };
  return(
    <Box>
       <Text className=' text-[18px] font-semibold'>Credit card information</Text>
    <Box className=' grid lg:grid-cols-2 gap-y-[20px] gap-x-[20px] mt-[20px]'>
      <Box className=' '>
         <Box>
          <Text className=' text-[12px]'>Full name</Text>
         </Box>
        <Box borderBottom="1px" borderColor="gray.300" className='mt-[10px]'>
         <Input className=' flex-1' border={'none'} placeholder={'Uzumaki Naruto'} name={'creditFullName'} value={value.creditFullName} onChange={changes} />
        </Box>
      </Box>
      <Box>
         <Box className=''>
         <Box>
          <Text className=' text-[12px]'>Credit Card Number</Text>
         </Box>
        <Box borderBottom="1px" borderColor="gray.300" className='mt-[10px]'>
          <Box className=' flex items-center gap-x-[5px]'>
            <Menu>
  <MenuButton>
    <Box className='flex items-center gap-x-[5px]'>
    <svg width="38" height="25" viewBox="0 0 38 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="26" cy="12.5" r="12" fill="#F9E813"/>
<circle cx="12" cy="12.5" r="12" fill="#F5172E" fill-opacity="0.8"/>
</svg>
<svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.835938 0.833008L5.0026 4.99967L9.16927 0.833008H0.835938Z" fill="#6A717F"/>
</svg>
    </Box>
  </MenuButton>
  <MenuList width={10}>
    <MenuItem onClick={()=>{handleSelect('')}}><svg width="38" height="25" viewBox="0 0 38 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="26" cy="12.5" r="12" fill="#F9E813"/>
<circle cx="12" cy="12.5" r="12" fill="#F5172E" fill-opacity="0.8"/>
</svg></MenuItem>
  </MenuList>
</Menu>
            <Input className=' flex-1' border={'none'} placeholder={'XXXX XXXX XXXX XXXX'} name={'creditNumber'} value={value.creditNumber} onChange={changes} /> 
          </Box>
          <Box></Box>
         {/* <Input className=' flex-1' border={'none'} placeholder={'Uzumaki Naruto'} name={'creditFullName'} value={value.creditFullName} onChange={changes} /> */}
        </Box>
      </Box>
      </Box>
      <Box className=''>
         <Box>
          <Text className=' text-[12px]'>Expiry date</Text>
         </Box>
        <Box borderBottom="1px" borderColor="gray.300" className='mt-[10px]'>
         <Input className=' flex-1 text-[15px]' border={'none'} placeholder={'MM/YY'} name={'expiryDate'} value={value.expiryDate} onChange={changes} />
        </Box>
      </Box>
      <Box>
        <Box>
          <Text className=' text-[12px]'>CVV</Text>
         </Box>
        <Box borderBottom="1px" borderColor="gray.300" className='mt-[10px]'>
         <Input type='password' className=' flex-1' border={'none'} placeholder={'***'} name={'cvv'} value={value.cvv} onChange={changes} />
        </Box>
      </Box>
    </Box>
    <Box className=' w-11/12 m-auto grid justify-end mt-[20px]'>
      <Button height={42} backgroundColor={'#007460'}>
                    <Text color={'white'} className=' text-[14px]'>Link Card</Text>
                  </Button>
    </Box>
    </Box>
  )
}

function Page() {
   const profile= ProfileInfo()
     const ProfileObject= profile?.data?.data?.user || ''
     console.log(ProfileObject)
  const router = useRouter()
  const [subscription, setSuscription]= useState(false)
    const [pages, setPages] = useState(0)
    const [editProfile, setEditProfile] = useState({
      firstName:'',
      lastName:'',
       password:'',
                  phoneNumber:'',
                  date:'',
                  email:'',
                  location:'',
                   cvv:'',
      expiryDate:'',
      creditNumber:'',
      creditFullName:''
    })
    const editFuncChange=(e)=>{
      setEditProfile({...editProfile,[e.target.name]:e.target.value})
    }
    
   const SubmitEditFuncChange=()=>{
    console.log(editProfile)
    const formData= new FormData()
   }
    const [changePassword, setChangePassword] = useState({
      currentPassword:'',
      newPassword:'',
      confirmPassword:''
    })
    const passwordChange=(e)=>{
      setChangePassword({...changePassword,[e.target.name]:e.target.value})
        
    }
 const Validation = () =>{  
      const errors={}    
      // State parameters to be made compulsory in the form for submission to go through //
      const objectKeys=[ 'currentPassword','newPassword','confirmPassword'
         ]
      objectKeys.forEach((field)=>{
       if(!signInDetails[field]){
         errors[field]= `Input ${field.replace(/_/g, " ")}`
     }
       errors[field]
       console.log(errors[field])
      })
      //note:This function returns boolean which can be either true or false... Object.keys get an array of Keys //
      return Object.keys(errors).length === 0
     }
     const submitPasswordFunc=()=>{
      if(Validation()){
        console.log(changePassword)
      }
     }
//For billing validation//
 

    const [billingInfo, setBillingInfo] = useState({
      fullName:'',
      CompanyName:'',
      Address:'',
      TaxID:''
    })
    const ValidationBills = () =>{  
      const errors={}    
      // State parameters to be made compulsory in the form for submission to go through //
      const objectKeys=[ 'fullName','CompanyName','Address','TaxID'
         ]
      objectKeys.forEach((field)=>{
       if(!signInDetails[field]){
         errors[field]= `Input ${field.replace(/_/g, " ")}`
     }
       errors[field]
       console.log(errors[field])
      })
      //note:This function returns boolean which can be either true or false... Object.keys get an array of Keys //
      return Object.keys(errors).length === 0
     }
const handleBillingChange=(e)=>{
  setBillingInfo({...billingInfo, [e.target.name]: e.target.value})
}
const handleBillSubmission=()=>{
  if(ValidationBills()){
console.log(billingInfo)
  }
}
  return (
    <div className=' min-h-screen'>
     {!subscription? <Box>
      <Box>
          <Box className=' w-11/12 m-auto lg:pt-[40px] pt-[20px]'>
                                <Text className=' text-[18px] font-semibold'>Account & Settings</Text>
                                <Box className=' flex items-center gap-x-[10px] text-[14px] mt-[10px]'>
                                     <Text className=' text-[#888888]'>Dashboard</Text>
                                        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
        </svg>
                                      <Text className='  text-[#007460]'>Profile</Text>
                                </Box>
                            </Box>
                            <Box className=' lg:h-[69px] h-[60px] w-11/12 items-center bg-white rounded-lg lg:w-10/12 m-auto grid mt-[20px]'>

                             <Box className=' grid lg:grid-cols-2 grid-cols-2 items-center lg:gap-x-[40px] gap-x-[30px] lg:w-11/12 m-auto  '>
                                        
                                          <Button onClick={()=>setSuscription(false)} _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={pages===0&&'#E6F1EF'||'transparent'} color={'#737373'} height={45} width={''}>
                                            <Text color={pages===0&&'#007460'|| '#737373'} className=' text-[14px] font-semiBold'>Accounts</Text>
                                          </Button>
                                          <Button onClick={()=>router.push('/../../../main_pages/Dashboard/Subscription')} _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={pages===1&&'#E6F1EF'||'transparent'} color={'#737373'} height={45} width={''}>
                                            <Text color={pages===1&&'#007460'|| '#737373'}  className=' text-[14px] font-semiBold'>Subscription</Text>
                                          </Button>
                                        
                                      </Box>
                            </Box>
        </Box>
        
        <Box className=' grid lg:grid-cols-6 lg:w-11/12 m-auto'>
          <Box className=' lg:col-span-2 mt-[20px]'>
            <Box className=' bg-white rounded-lg w-11/12 m-auto mb-[20px]'>
            <Box className=' w-11/12 m-auto'>
              <Box className=' flex items-center pt-[20px] justify-between w-full'>
                <Box>
                 <Text className=' text-[18px] font-semibold'>
                Profile
              </Text> 
                </Box>
                <Box className=' flex items-center gap-x-[10px]'>
                  <IconButton
                  backgroundColor={'transparent'}
                  icon={<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.30402 2.79393H3.95385C2.51233 2.79393 1.34375 3.96251 1.34375 5.40403V14.1044C1.34375 15.546 2.51233 16.7145 3.95385 16.7145H12.6542C14.0957 16.7145 15.2643 15.546 15.2643 14.1044L15.2643 9.75424M5.69392 12.3643L8.85938 11.7265C9.02742 11.6926 9.18172 11.6099 9.3029 11.4886L16.3891 4.39855C16.7288 4.05861 16.7286 3.5076 16.3886 3.16795L14.8875 1.66854C14.5476 1.32903 13.9968 1.32927 13.6572 1.66906L6.5703 8.75987C6.44936 8.88088 6.36678 9.03486 6.33289 9.20256L5.69392 12.3643Z" stroke="#6A717F" strokeWidth="1.45006" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
}
                  />
                  <IconButton
                  backgroundColor={'transparent'}
                  icon={<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 17.3979C12.3056 17.3979 11.7153 17.1548 11.2292 16.6687C10.7431 16.1826 10.5 15.5923 10.5 14.8979C10.5 14.8006 10.5069 14.7 10.5208 14.5958C10.5347 14.4916 10.5556 14.3979 10.5833 14.3145L4.70833 10.8979C4.47222 11.1062 4.20833 11.2694 3.91667 11.3875C3.625 11.5055 3.31944 11.5645 3 11.5645C2.30556 11.5645 1.71528 11.3215 1.22917 10.8354C0.743056 10.3493 0.5 9.75898 0.5 9.06453C0.5 8.37009 0.743056 7.77981 1.22917 7.2937C1.71528 6.80759 2.30556 6.56453 3 6.56453C3.31944 6.56453 3.625 6.62356 3.91667 6.74162C4.20833 6.85967 4.47222 7.02287 4.70833 7.2312L10.5833 3.81453C10.5556 3.7312 10.5347 3.63745 10.5208 3.53328C10.5069 3.42912 10.5 3.32842 10.5 3.2312C10.5 2.53676 10.7431 1.94648 11.2292 1.46037C11.7153 0.974257 12.3056 0.731201 13 0.731201C13.6944 0.731201 14.2847 0.974257 14.7708 1.46037C15.2569 1.94648 15.5 2.53676 15.5 3.2312C15.5 3.92565 15.2569 4.51592 14.7708 5.00203C14.2847 5.48815 13.6944 5.7312 13 5.7312C12.6806 5.7312 12.375 5.67217 12.0833 5.55412C11.7917 5.43606 11.5278 5.27287 11.2917 5.06453L5.41667 8.4812C5.44444 8.56453 5.46528 8.65828 5.47917 8.76245C5.49306 8.86662 5.5 8.96731 5.5 9.06453C5.5 9.16176 5.49306 9.26245 5.47917 9.36662C5.46528 9.47078 5.44444 9.56453 5.41667 9.64787L11.2917 13.0645C11.5278 12.8562 11.7917 12.693 12.0833 12.575C12.375 12.4569 12.6806 12.3979 13 12.3979C13.6944 12.3979 14.2847 12.6409 14.7708 13.127C15.2569 13.6131 15.5 14.2034 15.5 14.8979C15.5 15.5923 15.2569 16.1826 14.7708 16.6687C14.2847 17.1548 13.6944 17.3979 13 17.3979ZM13 4.06453C13.2361 4.06453 13.434 3.98467 13.5938 3.82495C13.7535 3.66523 13.8333 3.46731 13.8333 3.2312C13.8333 2.99509 13.7535 2.79717 13.5938 2.63745C13.434 2.47773 13.2361 2.39787 13 2.39787C12.7639 2.39787 12.566 2.47773 12.4062 2.63745C12.2465 2.79717 12.1667 2.99509 12.1667 3.2312C12.1667 3.46731 12.2465 3.66523 12.4062 3.82495C12.566 3.98467 12.7639 4.06453 13 4.06453ZM3 9.89787C3.23611 9.89787 3.43403 9.81801 3.59375 9.65829C3.75347 9.49856 3.83333 9.30065 3.83333 9.06453C3.83333 8.82842 3.75347 8.63051 3.59375 8.47078C3.43403 8.31106 3.23611 8.2312 3 8.2312C2.76389 8.2312 2.56597 8.31106 2.40625 8.47078C2.24653 8.63051 2.16667 8.82842 2.16667 9.06453C2.16667 9.30065 2.24653 9.49856 2.40625 9.65829C2.56597 9.81801 2.76389 9.89787 3 9.89787ZM13 15.7312C13.2361 15.7312 13.434 15.6513 13.5938 15.4916C13.7535 15.3319 13.8333 15.134 13.8333 14.8979C13.8333 14.6618 13.7535 14.4638 13.5938 14.3041C13.434 14.1444 13.2361 14.0645 13 14.0645C12.7639 14.0645 12.566 14.1444 12.4062 14.3041C12.2465 14.4638 12.1667 14.6618 12.1667 14.8979C12.1667 15.134 12.2465 15.3319 12.4062 15.4916C12.566 15.6513 12.7639 15.7312 13 15.7312Z" fill="#4B5563"/>
</svg>
}
                  />
                </Box>
              </Box>
              <Box>
                <Box className=' mt-[10px] grid w-full justify-center'>
                    {/* <Image alt='' src={ProfilePicture} height={96} width={96} /> */}
                    <svg
  width="96"
  height="96"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
  <path
    d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
    fill="#9CA3AF"
  />
  <path
    d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V33H10V32Z"
    fill="#9CA3AF"
  />
</svg>

                  </Box>
                  <Text className=' mt-[10px] font-semibold text-center'>{ProfileObject?.fullname || ''}</Text>
                  <Box className=' flex items-center gap-x-[5px] justify-center '>
                    <Text className=' text-[14px]'>{ProfileObject?.email || ''}</Text>
                    <IconButton 
                    icon={<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.32812 10.5641H2.66146C2.30784 10.5641 1.9687 10.4237 1.71865 10.1736C1.4686 9.92355 1.32813 9.58442 1.32812 9.23079V3.23079C1.32812 2.87717 1.4686 2.53803 1.71865 2.28799C1.9687 2.03794 2.30784 1.89746 2.66146 1.89746H8.66146C9.01508 1.89746 9.35422 2.03794 9.60427 2.28799C9.85432 2.53803 9.99479 2.87717 9.99479 3.23079V3.89746M7.32812 6.56413H13.3281C14.0645 6.56413 14.6615 7.16108 14.6615 7.89746V13.8975C14.6615 14.6338 14.0645 15.2308 13.3281 15.2308H7.32812C6.59174 15.2308 5.99479 14.6338 5.99479 13.8975V7.89746C5.99479 7.16108 6.59174 6.56413 7.32812 6.56413Z" stroke="#007AFF" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
}
                    backgroundColor={'transparent'} />
                  </Box>
                  <Box className=' mt-[10px]'>
                    <Text className=' text-[15px] text-center text-[#4B5563] font-semibold'>Linked with Social media</Text>
                  </Box>
              </Box>
             <Box>
              <SocialMedia />
             </Box>
              <Box className=' grid  mt-[10px] pb-[20px] justify-center'>
                <Button backgroundColor={'transparent'} border="1px" borderColor="gray.300" borderRadius="lg">
                    <Box className=' flex items-center gap-x-[5px]'>
                     <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="8.25" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="11" cy="11" r="8.25" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 11.0001H13.75" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.25 11.0001H13.75" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.0013 8.25V13.75" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11.0013 8.25V13.75" stroke="#6A717F" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
</svg>        
 <Text color={'#454545'} className=' text-[14px]'>Social media</Text>  
                    </Box>
                  </Button>
              </Box>

            </Box>
            </Box>
           <Box>
            <Box className=' w-11/12 m-auto rounded-lg bg-white'>
            <Box className=' w-11/12 m-auto pt-[20px] flex items-center justify-between'>
              <Text className=' text-[18px] font-semibold'>
                Change Password
              </Text>
              <Box className=' flex items-center gap-x-[5px]'>
                <Text className=' text-[12px] text-[#007AFF]'>Need help</Text>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 10.3333V10.3286M5.09155 5C5.34641 4.22722 6.10446 3.66667 6.99999 3.66667C8.10456 3.66667 8.99999 4.51946 8.99999 5.57143C8.99999 7.07063 7.38171 6.83596 7.05651 8.33333M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" stroke="#007AFF" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              </Box>
            </Box>
            <Box className=' w-11/12 m-auto mt-[20px] grid gap-y-[20px]'>
              <Box>
                <DashBoardInput placing={'Enter password'} 
names={'currentPassword'} 
values={changePassword.currentPassword}
 handleChange={passwordChange}
  label={'Current Password'}
  password
  types={'password'}
  />
  <Text className=' text-[12px] text-[#007AFF] pt-[10px]'>Forgot Current Password? Click here</Text>
              </Box>
              <Box>
                 <DashBoardInput placing={'Enter password'} 
names={'newPassword'} 
values={changePassword.newPassword}
 handleChange={passwordChange}
  label={'New Password'}
  password
  types={'password'}
  />
              </Box>
              <Box>
                <DashBoardInput placing={'Enter password'} 
names={'confirmPassword'} 
values={changePassword.confirmPassword}
 handleChange={passwordChange}
  label={'Re-enter Password'}
  password
  types={'password'}
  />
              </Box>
              <Box className=' mt-[20px] w-7/12 m-auto pb-[20px]'>
                <Button onClick={submitPasswordFunc} height={42} backgroundColor={'#007460'} className=' w-full'>
                    <Text color={'white'} className=' text-[14px]'>Save Change</Text>
                  </Button>
              </Box>
            </Box>
            </Box>
           </Box>
          </Box>
          <Box className=' lg:col-span-4'>
            <Box className=' bg-white rounded-lg w-11/12 m-auto shadow-lg pb-[30px] mb-[40px]'>
            <Box className=' mt-[20px] w-11/12 m-auto'>
              <Box className=' flex items-center justify-between pt-[20px]'>
                <Box>
                  <Text className=' font-bold text-[18px]'>Profile Update</Text>
                </Box>
                <Box className=' '>
                  <Button backgroundColor={'transparent'} border="1px" borderColor="gray.300" borderRadius="lg">
                    <Box className=' flex items-center gap-x-[5px]'>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.30402 2.72948H3.95385C2.51233 2.72948 1.34375 3.89806 1.34375 5.33958V14.04C1.34375 15.4815 2.51233 16.6501 3.95385 16.6501H12.6542C14.0957 16.6501 15.2643 15.4815 15.2643 14.04L15.2643 9.68978M5.69392 12.2998L8.85938 11.662C9.02742 11.6282 9.18172 11.5454 9.3029 11.4242L16.3891 4.33409C16.7288 3.99416 16.7286 3.44315 16.3886 3.1035L14.8875 1.60409C14.5476 1.26458 13.9968 1.26481 13.6572 1.60461L6.5703 8.69542C6.44936 8.81643 6.36678 8.97041 6.33289 9.13811L5.69392 12.2998Z" stroke="#6A717F" stroke-width="1.45006" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                      <Text className=' text-[14px] lg:grid hidden '>Edit</Text>
                    </Box>
                  </Button>
                </Box>
              </Box>
              <Box className=' mt-[10px] flex items-center justify-between '>
                <Box className=' flex items-center gap-x-[20px]'>
                  <Box>
                    <svg
  width="64"
  height="64"
  viewBox="0 0 40 40"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
  <path
    d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
    fill="#9CA3AF"
  />
  <path
    d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V33H10V32Z"
    fill="#9CA3AF"
  />
</svg>

                    {/* <Image alt='' src={ProfilePicture} height={64} width={64} /> */}
                  </Box>
                  <Box className=' flex items-center gap-x-[10px]'>
                    <Box>
                       <Button backgroundColor={'transparent'} border="1px" borderColor="gray.300" borderRadius="lg">
                    <Box className=' flex items-center gap-x-[5px]'>
                       <Text color={'#454545'} className=' text-[14px] lg:grid hidden'>Change Pictures</Text>
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H15C16.1046 18 17 17.1046 17 16V10M6 13V10.5L14.75 1.75C15.4404 1.05964 16.5596 1.05964 17.25 1.75V1.75C17.9404 2.44036 17.9404 3.55964 17.25 4.25L12.5 9L8.5 13H6Z" stroke="#454545" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>                
                    </Box>
                  </Button>
                    </Box>
                    <Box>
                      <Button border="1px" borderColor="gray.300" borderRadius="lg" height={42} backgroundColor={'transparent'}>
                    <Text color={'#4B5563'} className=' text-[14px]'>Delete</Text>
                  </Button>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  {/* <Button height={42} backgroundColor={'#007460'}>
                    <Text color={'white'} className=' text-[14px]'>Invite  new</Text>
                  </Button> */}
                </Box>
              </Box>
              <Box className=' pt-[20px]'>
                <Box className=' grid lg:grid-cols-2 gap-x-[20px] gap-y-[20px]'>
                  <Box>
                    <DashBoardInput placing={'Naruto'} 
names={'firstName'} 
values={editProfile.firstName}
 handleChange={editFuncChange}
  label={'First Name'} /> 
  
                  </Box>
                  <Box>
                    <DashBoardInput placing={'Uzumaki'} 
names={'lastName'} 
values={editProfile.lastName}
 handleChange={editFuncChange}
  label={'Last Name'} /> 
                  </Box>
                  <Box>
                    <DashBoardInput placing={'2345267'} 
names={'password'} 
values={editProfile.password}
 handleChange={editFuncChange}
  label={'Password'}
  types={'password'}
  password
  /> 
                  </Box>
                  <Box>
                    <CountryPhoneInput 
                    values={editProfile.phoneNumber}
                     names={'phoneNumber'} 
                     label={'Phone Number'}
                     placing={'+256- 89070943'}
                     changes={editFuncChange}
                     />
                  </Box>
                  <Box>
                    <DashBoardInput placing={'Narutouzumaki@gmail.com'} 
names={'email'} 
values={editProfile.email}
 handleChange={editFuncChange}
  label={'Email'} /> 
                  </Box>
                    <Box>
                    <DashBoardInput placing={'Narutouzumaki@gmail.com'} 
                    types={'date'}
names={'date'} 
values={editProfile.date}
 handleChange={editFuncChange}
  label={'Date'} /> 
                  </Box>
                </Box>
                <Box>
                   <Box className=' mt-[20px]'>
                    <DashBoardInput placing={'Plot 2, Parliament Avenue, Kampala, Uganda.'} 
names={'location'} 
values={editProfile.location}
 handleChange={editFuncChange}
  label={'Location'} /> 
                  </Box>
                      <Box className=' w-11/12 m-auto grid justify-end mt-[20px]'>
      <Button onClick={SubmitEditFuncChange} height={42} backgroundColor={'#007460'}>
                    <Text color={'white'} className=' text-[14px]'>Submit</Text>
                  </Button>
    </Box>
                </Box>
                {/* <Box className=' mt-[30px]'>
                 <CreditCardInfo value={editProfile}  changes={editFuncChange} />
                </Box> */}
              </Box>
              <Box></Box>
              <Box></Box>
              <Box></Box>
            </Box>
            <Box className=' mt-[20px] w-11/12 m-auto'>
              <Text className=' text-[18px] font-bold'>Shops</Text>
              <Box  border="1px" borderColor="gray.300" borderRadius="lg" className='  h-[68px] grid items-center mt-[10px]'>
              <Box className=' flex justify-between w-11/12 m-auto items-center'>
              <Text className=' lg:text-[18px] text-[14px]'>Nakasero market</Text>
                        <Button onClick={()=>router.push(`/../../../main_pages/Dashboard/new_user_dashboard`)} height={42} backgroundColor={'#007460'}>
                    <Text color={'white'} className=' text-[14px]'>Add new shop</Text>
                  </Button>
              </Box>
              </Box>
            </Box>
            </Box>
          </Box>
        </Box>
          <Box>
        <Box className=' mt-[15px] w-11/12 m-auto '>
           <Text className=' text-[18px] font-semibold'>Billing information</Text>
           <Box className=' mt-[20px] bg-white rounded-lg'>
                      <Box className=' w-11/12 m-auto grid lg:grid-cols-2 gap-y-[20px] gap-x-[20px] pt-[30px] pb-[30px]'>
                          <Box>
                <DashBoardInput placing={'Enter your name'} 
names={'fullName'} 
values={billingInfo.fullName}
 handleChange={handleBillingChange}
  label={'Full Name'}
  />
              </Box>
               <Box>
                <DashBoardInput placing={'Enter Company Name'} 
names={'CompanyName'} 
values={billingInfo.CompanyName}
 handleChange={handleBillingChange}
  label={'Company Name'}
  />
              </Box>
               <Box>
                <DashBoardInput placing={'Enter Address'} 
names={'Address'} 
values={billingInfo.Address}
 handleChange={handleBillingChange}
  label={'Address'}
  />
              </Box>
               <Box>
                <DashBoardInput placing={'Enter Tax ID number'} 
names={'TaxID'} 
values={billingInfo.TaxID}
 handleChange={handleBillingChange}
  label={'Tax ID'}
  />
              </Box>
                      </Box>
           </Box>
        </Box>
           <Box className=' mt-[20px] grid justify-end lg:w-11/12 w-11/12  m-auto pb-[40px]'>
                <Button onClick={handleBillSubmission} height={42} backgroundColor={'#007460'} className=' w-full'>
                    <Text color={'white'} className=' text-[14px]'>Save Change</Text>
                  </Button>
              </Box>

          </Box>

      </Box>:<Box>
        <Subscrption />
        </Box>}
        </div>
  )
}

export default Page