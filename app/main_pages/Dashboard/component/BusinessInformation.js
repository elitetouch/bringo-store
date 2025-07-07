'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import SubmitButton from './SubmitButton'
import DashboardFileUpload from './DashboardFileUpload'
import DashBoardInput from './DashboardInput'
import CountryDropDown from './CountryDropDown'
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
//  import imp from '../../Dashboard/existing_user_dashboard'
function BusinessInformation({Data, setFormPage,suscribeStatus}) {
  const queryClient = useQueryClient();
console.log(Data&&Data)
 const SingleBussinessData= Data&&Data || {}
  const router = useRouter()
  const [mobilePage, setMobilePage] = useState(0)
  const changeMobilePage=()=>{
    setMobilePage(mobilePage + 1)
    console.log(mobilePage)
  }
  const toast = useToast()
  const initialPaymentData={
    companyName:'',
    regNumber:'',
    taxNumber:'',
    countryReg:'',
    country:'',
    businessType:'',
    addressOne:'',
    addressTwo:'',
    city:'',
    state:'',
    postalCode:'',
    fullName:'',
      idType:'',
      idNumber:'',
      cerfification:'',
      logo:'',
      taxIdentity:'',
      certificate:'',
      cao:''
    }
    const [paymentLoader, setPaymentLoader]= useState(false)
    const [paymentData, setPaymentData] = useState(initialPaymentData)
    const handlePaymentChange=(e)=>{
      // setPaymentData({...paymentData,[e.target.name] : e.target.value})
       const updatedStoreInfo = {
    ...paymentData,
    [e.target.name]: e.target.value
  };
  
  setPaymentData(updatedStoreInfo);
// console.log(paymentData)
  // const filledCount = Object.values(updatedStoreInfo).filter(value => value.trim() !== '').length;
  // setbusinessTracker(filledCount)
  // console.log(`Filled fields: ${filledCount}`);
    }
    //Extract online changed Fields //
    const getChangedFields = () => {
  const changed = {};

  for (const key in paymentData) {
    if (paymentData[key] !== initialPaymentData[key]) {
      changed[key] = paymentData[key];
    }
  }

  return changed;
};

 

const [err, setErr]= useState({})
    const Validation = () =>{  
      const errors={}    
      // State parameters to be made compulsory in the form for submission to go through //
      const objectKeys=[ 'companyName','taxNumber','cao','certificate','logo','fullName','idNumber','idType'
         ]
      objectKeys.forEach((field)=>{
       if(!paymentData[field]){
         errors[field]= `Input ${field.replace(/_/g, " ")}`
     }
       errors[field]
       console.log(errors[field])

      })
      //note:This function returns boolean which can be either true or false //
      Object.keys(errors).length && setErr(errors)
      return Object.keys(errors).length === 0
     }
     console.log(err)
    const handlePaymentDetailsSubmit=()=>{
      console.log(paymentData)
      if(Validation()){
        console.log(paymentData)
        setPaymentLoader(true)
        const formData= new FormData()
        formData.append('company_name',paymentData.companyName)
        formData.append('tin',paymentData.taxNumber)
        formData.append('cac02',paymentData.cao)
        formData.append('cac_certificate',paymentData.certificate)
        formData.append('company_logo',paymentData.logo)
        formData.append('rep_fullname',paymentData.fullName)
        formData.append('rep_id_number',paymentData.idNumber)
        formData.append('rep_id_type',paymentData.idType)
          axiosInstance
        .post('/api/v1/business-information', formData,{
  headers: {
    'Content-Type': 'multipart/form-data', // Let Axios set the boundary
  },
})
        .then((resp) => {
        
          setPaymentLoader(false);
          console.log(resp)
           toast({
            title: 'Bussiness Information',
            description:'Business information created successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setPaymentData(
            {
    companyName:'',
    regNumber:'',
    taxNumber:'',
    countryReg:'',
    country:'',
    businessType:'',
    addressOne:'',
    addressTwo:'',
    city:'',
    state:'',
    postalCode:'',
    fullName:'',
      idType:'',
      idNumber:'',
      cerfification:'',
      logo:'',
      taxIdentity:'',
      certificate:'',
      cao:''
    }
          )
          // router.push('/');
            queryClient.invalidateQueries()
     suscribeStatus === "inactive"?router.push('../../main_pages/Dashboard/Subscription'): setFormPage(0)  
        })
        .catch((error) => {
          setPaymentLoader(false);
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
      }else{
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
    const [editLoader, setEditLoader]= useState(false)

    //Edit Function
const EditBusiness =(id)=>{
  setEditLoader(true)
    const changedFields = getChangedFields();
 console.log(changedFields)
 const formData = new FormData()
  changedFields?.companyName && formData.append('company_name',changedFields?.companyName)
        changedFields?.taxNumber &&formData.append('tin',changedFields?.taxNumber)
        changedFields?.cao &&formData.append('cac02',changedFields?.cao)
        changedFields?.certificate &&formData.append('cac_certificate',changedFields?.certificate)
        changedFields?.logo &&formData.append('company_logo',changedFields?.logo)
        changedFields?.fullName &&formData.append('rep_fullname',changedFields?.fullName)
        changedFields?.idNumber &&formData.append('rep_id_number',changedFields?.idNumber)
        changedFields?.idType &&formData.append('rep_id_type',changedFields?.idType)
        axiosInstance.post(`/api/v1/edit-business-information`, formData,{
  headers: {
    'Content-Type': 'multipart/form-data', // Let Axios set the boundary
  },
})
        .then((resp) => {
           queryClient.invalidateQueries()
          setEditLoader(false);
          console.log(resp)
           toast({
            title: 'Bussiness Information',
            description:'Business information editted successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          }); 
  setPaymentData(
            {
    companyName:'',
    regNumber:'',
    taxNumber:'',
    countryReg:'',
    country:'',
    businessType:'',
    addressOne:'',
    addressTwo:'',
    city:'',
    state:'',
    postalCode:'',
    fullName:'',
      idType:'',
      idNumber:'',
      cerfification:'',
      logo:'',
      taxIdentity:'',
      certificate:'',
      cao:''
    }
      )
          // router.push('/');
        setFormPage(0)  
        })
        .catch((error) => {
          setEditLoader(false);
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
    <Box>
      <Box className=' lg:mt-[50px] mt-[20px] w-11/12 m-auto bg-white pt-[20px] mb-[30px] rounded-lg '>
      <Box className=' w-11/12 m-auto'>
      <Box className={`${mobilePage===0?' grid pb-[20px] lg:pb-0':'hidden lg:grid'}`}>
       <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit'>
                        <Text className=' pb-[2px] font-bold '>Company details</Text>
                      </Box>
                      <Text className=' text-[#332F2F] text-[12px] pt-[15px]'>Please provide the following details of your business</Text>
                       <Box className=' grid lg:grid-cols-2 gap-y-[20px] lg:gap-x-[40px] mt-[20px] lg:mt-[20px]'>
                        <Box>
                       <DashBoardInput placing={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.companyName:'Nakasero'} icon={<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M11.0003 -0.00195312L4.75346 0.388476C3.26573 0.481459 1.95312 1.39398 1.34772 2.75613L0.801815 3.98443C0.212977 5.30931 0.387154 6.84911 1.25706 8.00898L1.51535 8.35337L1.87118 16.1816C1.96829 18.3179 3.72854 20 5.86706 20H16.1336C18.2721 20 20.0324 18.3179 20.1295 16.1816L20.4788 8.49655C21.4301 7.60721 21.7807 6.21988 21.324 4.96402L20.6115 3.00463C20.0678 1.50945 18.6897 0.478635 17.1019 0.379393L11.0003 -0.00195312ZM3.86912 16.0908L3.5663 9.42869C4.42289 9.52959 5.30703 9.33071 6.05502 8.83205L6.15889 8.76281C6.72364 8.38631 7.44682 8.34128 8.05391 8.64483L9.21147 9.22361C10.3376 9.78666 11.6631 9.78666 12.7892 9.22361L13.9467 8.64483C14.5538 8.34128 15.277 8.38631 15.8418 8.76281L15.9456 8.83205C16.6936 9.33071 17.5778 9.52959 18.4343 9.42869L18.1315 16.0908C18.083 17.159 17.2028 18 16.1336 18H14.0871L14.2893 15.5744C14.4496 13.6503 12.9311 12 11.0003 12C9.0695 12 7.55104 13.6503 7.71139 15.5744L7.91352 18H5.86706C4.7978 18 3.91767 17.159 3.86912 16.0908ZM17.055 7.16795C17.6275 7.54957 18.3732 7.54957 18.9456 7.16795C19.4425 6.8367 19.6485 6.20871 19.4444 5.6475L18.7319 3.68812C18.4601 2.94053 17.771 2.42512 16.9771 2.3755L11.0003 2.00195L4.87821 2.38458C4.13435 2.43107 3.47805 2.88733 3.17535 3.56841L2.62944 4.7967C2.33502 5.45915 2.42211 6.22904 2.85706 6.80898L3.18534 7.24669C3.73731 7.54746 4.41572 7.52121 4.94562 7.16795L5.04949 7.09871C6.21141 6.32409 7.69931 6.23146 8.94834 6.85597L10.1059 7.43475C10.669 7.71628 11.3317 7.71628 11.8947 7.43475L13.0523 6.85597C14.3013 6.23146 15.7892 6.32409 16.9512 7.09871L17.055 7.16795ZM12.2962 15.4083L12.0802 18H9.92045L9.70448 15.4083C9.6413 14.6502 10.2396 14 11.0003 14C11.7611 14 12.3593 14.6502 12.2962 15.4083Z" fill="#A5A6AB" fillOpacity="0.88"/>
</svg>
} names={'companyName'} values={paymentData.companyName} handleChange={handlePaymentChange} label={'Company Name'} /> 
 {err?.companyName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input companys name</p>
)}
                        </Box>
<DashBoardInput placing={''} 
names={'regNumber'} 
values={paymentData.regNumber}
 handleChange={handlePaymentChange}
  label={'*Business registration number'} /> 
                      <Box>
                       <DashboardFileUpload
                       UploadedFileName={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.cac02:''}
                       attachFile={setPaymentData} names={'cao'} label={'*CAC02 & CAC07'} />
                          {err?.cao && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please upload your CAC</p>
)}
                      </Box>
                      <Box>
                       <DashboardFileUpload 
                        UploadedFileName={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.cacCertificate:''}
                       attachFile={setPaymentData} names={'certificate'} label={'*Certificate of Registration'} />  
                          {err?.certificate && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please upload your Certificate of registration</p>
)}
                      </Box>
                      <Box>
                          <DashBoardInput placing={Object?.keys(SingleBussinessData).length > 0 ?SingleBussinessData.tin:''} names={'taxNumber'} values={paymentData.taxNumber} handleChange={handlePaymentChange} label={'Tax Identification Number (TIN)'} />               
 {err?.taxNumber && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input Tax identification number</p>
)}
                      </Box>
                        <Box>
                        <DashboardFileUpload attachFile={setPaymentData} names={'taxIdentity'} label={'Upload Tax Identification Number (TIN)'} />
                            
                        </Box>
                        <Box>
                         <DashboardFileUpload UploadedFileName={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.companyLogo:''} attachFile={setPaymentData} names={'logo'} label={'Company logo'} />
                           {err?.logo && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please upload your company's logo</p>
)}
                        </Box>
                      </Box>
      </Box>
      <Box className={`${mobilePage===1?' grid pb-[20px] lg:pb-0':'hidden lg:grid'}`}>
        <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit pt-[30px]'>
                        <Text className=' pb-[2px] font-bold '>Company Address</Text>
                      </Box>
                        <Box className=' grid lg:grid-cols-2 gap-y-[20px] lg:gap-x-[40px] mt-[20px] lg:mt-[20px]'>
                          <CountryDropDown
                 values={paymentData.countryReg}
                onChangeFunc={handlePaymentChange}
                 names={'countryReg'}
                 label={'Country of registration'}
                />
                  <DashBoardInput placing={''} 
names={'businessType'} 
values={paymentData.businessType}
 handleChange={handlePaymentChange}
  label={'Business type'} /> 
   <DashBoardInput placing={'Floor/house, apartment, block'}  names={'addressOne'} values={paymentData.addressOne} handleChange={handlePaymentChange} label={'Address line 1'} /> 
               <DashBoardInput placing={'Floor/house, apartment, No, building..'}  names={'addressTwo'} values={paymentData.addressTwo} handleChange={handlePaymentChange} label={'Address line 2'} /> 
                 <DashBoardInput placing={'District/province'}  names={'city'} values={paymentData.city} handleChange={handlePaymentChange} label={'City/Town'} /> 
              <DashBoardInput placing={'State/region'}  names={'state'} values={paymentData.state} handleChange={handlePaymentChange} label={'State/Region'} /> 
              <DashBoardInput placing={'Postal code'}  names={'postalCode'} values={paymentData.postalCode} handleChange={handlePaymentChange} label={'Postal code'} />
                <CountryDropDown
                 values={paymentData.country}
                onChangeFunc={handlePaymentChange}
                 names={'country'}
                 label={'Country'}
                />
                        </Box>
      </Box>
      <Box className={`${mobilePage===2?' grid ':'hidden lg:grid'}`}>
      <Box  className=' pb-[40px]'>
        <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit pt-[30px]'>
                        <Text className=' pb-[2px] font-bold '>Legal Representative</Text>
                      </Box>
                       <Text className=' text-[#332F2F] text-[12px] pt-[15px]'>Please provide the following details of the owner / legal representative of your business</Text>
                        <Box className=' grid lg:grid-cols-2 gap-y-[20px] lg:gap-x-[40px] mt-[20px] lg:mt-[20px]'>
                          <Box>
                          <DashBoardInput placing={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.repFullname:'Naruto Uzumaki'} 
names={'fullName'} 
values={paymentData.fullName}
 handleChange={handlePaymentChange}
  label={'Full Name'} /> 
                     {err?.fullName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input your full name</p>
)}
                          </Box>
                          <Box>
   <CountryDropDown
                 values={paymentData.idType}
                onChangeFunc={handlePaymentChange}
                 names={'idType'}
                 label={'*ID Type'}
                 dropDownOpt={[{
                  title:'ID',
                  value:'id'
                 }]}
                placing={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.repIdType:'Select ID type'}
                />
   {err?.idType && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please select an appropriate ID type</p>
)}
                          </Box>
                          <Box>
                 <DashBoardInput placing={Object?.keys(SingleBussinessData).length > 0?SingleBussinessData.repIdNumber:'Enter ID number'} 
names={'idNumber'} 
values={paymentData.idNumber}
 handleChange={handlePaymentChange}
  label={'*ID number'} /> 
 {err?.idNumber && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input your ID number</p>
)}
                          </Box>
  <DashboardFileUpload attachFile={setPaymentData} names={'cerfification'} label={'*Certificate of Registration'} />
                        </Box>
      </Box>

      </Box>

      </Box>
      </Box>
      <Box>
{Object?.keys(SingleBussinessData).length > 0?<Box className={` ${mobilePage===0||mobilePage===1?'hidden lg:grid':'grid'} w-11/12 justify-end`}>
            <SubmitButton 
             Edit={'Edit'}
            submitFunc={
              //handlePaymentDetailsSubmit
             ()=> EditBusiness(SingleBussinessData?.id)
              } loading={editLoader} />
          </Box>:
          <Box className={` ${mobilePage===0||mobilePage===1?'hidden lg:grid':'grid'} w-11/12 justify-end`}>
           <SubmitButton
          
           submitFunc={
              handlePaymentDetailsSubmit
             //  ()=>{handlePaymentDetailsSubmit()}
              } loading={paymentLoader} />
          </Box>
          }
          <Box className={`  ${mobilePage===0||mobilePage===1?' grid lg:hidden':'hidden'} w-11/12 justify-end`}>
            <SubmitButton next submitFunc={  
              changeMobilePage
              }  />
          </Box>

      </Box>
    </Box>
  )
}

export default BusinessInformation