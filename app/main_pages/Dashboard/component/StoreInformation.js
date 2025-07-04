import React, { useState} from 'react'
import { Box, Text } from '@chakra-ui/react'
import DashBoardInput from './DashboardInput'
import Number_country from '@/app/component/DropDown/Number_country'
import Unboarding_input from '@/app/component/Inputs/Unboarding_input'
import CountryDropDown from './CountryDropDown'
import { Button } from '@chakra-ui/react'
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
import SubmitButton from './SubmitButton'
import { LoadScript } from '@react-google-maps/api';
// import LocationInput from './LocationInput';
 import LocationInput  from './GoogleApiInput'

const libraries = ['places'];
function StoreInformation({setPaymentTracker, setFormPage, dropData}) {
  //const ToArray = Object.entries(dropData).map(([key, value])=>([key, value]))
  const ToArray= [dropData]
  console.log([dropData])
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const toast = useToast()
    const [storeInfo, setStoreInfo] = useState({
    storeName:'',
    countryReg:'',
    email:'',
    PhoneNumber:'',
    // company:'',
    addressOne:'',
    addressTwo:'',
    city:'',
    state:'',
    country:'',
    postalCode:'',
    bussinessType:'',
    bussiness_id:''
    })
  const handleInputChange = (e) => {
  const updatedStoreInfo = {
    ...storeInfo,
    [e.target.name]: e.target.value
  };
  console.log(storeInfo)
  setStoreInfo(updatedStoreInfo);

  // const filledCount = Object.values(updatedStoreInfo).filter(value => value.trim() !== '').length;
  // setPaymentTracker(filledCount)
  // console.log(`Filled fields: ${filledCount}`);
};

      const [storeLoader, setStoreLoader]= useState(false)
const [err, setErr]= useState({})
const Validation = () => {
  const errors = {};
  const requiredFields = [
    'storeName', 'email', 'country',
    'bussinessType', 'addressOne', 'addressTwo',
    'city', 'postalCode', 'state', 'bussiness_id'
  ];

  requiredFields.forEach(field => {
    if (!storeInfo[field]) {
      errors[field] = `Please input ${field.replace(/_/g, ' ')}`;
    }
  });

  setErr(errors);
  return Object.keys(errors).length === 0;
};


    const submitStore =()=>{
      if(Validation()){
        console.log(storeInfo)
        setStoreLoader(true)
        const formData= new FormData()
        formData.append('store_name',storeInfo.storeName)
        formData.append('email', storeInfo.email)
        formData.append('business_id', storeInfo.bussiness_id)
        formData.append('business_type', storeInfo.bussinessType)
        formData.append('address', storeInfo.addressOne)
        formData.append('address_2', storeInfo.addressTwo)
        formData.append('city', storeInfo.city)
        formData.append('city_2', storeInfo.city)
        formData.append('postal_code',storeInfo.postalCode)
        formData.append('postal_code_2', storeInfo.postalCode)
        formData.append('state', storeInfo.state)
        formData.append('state_2', storeInfo.state)
        formData.append('country', storeInfo.country)
          axiosInstance
        .post('/api/v1/store-information', formData)
        .then((resp) => {
          setStoreLoader(false);
        toast({
            title: 'Store Information',
            description:'Store information created successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setStoreInfo({
    storeName:'',
    countryReg:'',
    email:'',
    PhoneNumber:'',
    // company:'',
    addressOne:'',
    addressTwo:'',
    city:'',
    state:'',
    country:'',
    postalCode:'',
    bussinessType:'',
    bussiness_id:''
    })
     setFormPage(2)
          console.log(resp)
        })
        .catch((error) => {
          console.log(error)
          setStoreLoader(false);
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
        {/* <LoadScript
      googleMapsApiKey={'AIzaSyA24WJD5u8d-iF4FKwsZB8oOxKundbE2eY'}
      libraries={libraries}
    > */}
    <Box className=' lg:mt-[50px] mt-[20px] w-11/12 m-auto bg-white pt-[20px] mb-[30px] rounded-lg '>
    <div className=' w-11/12 m-auto pb-[30px] '>
        <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit'>
                  <Text className=' pb-[2px] font-bold '>Store Information</Text>
                </Box>
                <Box className=' grid lg:grid-cols-2 gap-y-[20px] lg:gap-x-[40px] mt-[20px] lg:mt-[20px]'>
                  <Box>
                     <DashBoardInput placing={'Nakasero'} icon={<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0003 -0.00195312L4.75346 0.388476C3.26573 0.481459 1.95312 1.39398 1.34772 2.75613L0.801815 3.98443C0.212977 5.30931 0.387154 6.84911 1.25706 8.00898L1.51535 8.35337L1.87118 16.1816C1.96829 18.3179 3.72854 20 5.86706 20H16.1336C18.2721 20 20.0324 18.3179 20.1295 16.1816L20.4788 8.49655C21.4301 7.60721 21.7807 6.21988 21.324 4.96402L20.6115 3.00463C20.0678 1.50945 18.6897 0.478635 17.1019 0.379393L11.0003 -0.00195312ZM3.86912 16.0908L3.5663 9.42869C4.42289 9.52959 5.30703 9.33071 6.05502 8.83205L6.15889 8.76281C6.72364 8.38631 7.44682 8.34128 8.05391 8.64483L9.21147 9.22361C10.3376 9.78666 11.6631 9.78666 12.7892 9.22361L13.9467 8.64483C14.5538 8.34128 15.277 8.38631 15.8418 8.76281L15.9456 8.83205C16.6936 9.33071 17.5778 9.52959 18.4343 9.42869L18.1315 16.0908C18.083 17.159 17.2028 18 16.1336 18H14.0871L14.2893 15.5744C14.4496 13.6503 12.9311 12 11.0003 12C9.0695 12 7.55104 13.6503 7.71139 15.5744L7.91352 18H5.86706C4.7978 18 3.91767 17.159 3.86912 16.0908ZM17.055 7.16795C17.6275 7.54957 18.3732 7.54957 18.9456 7.16795C19.4425 6.8367 19.6485 6.20871 19.4444 5.6475L18.7319 3.68812C18.4601 2.94053 17.771 2.42512 16.9771 2.3755L11.0003 2.00195L4.87821 2.38458C4.13435 2.43107 3.47805 2.88733 3.17535 3.56841L2.62944 4.7967C2.33502 5.45915 2.42211 6.22904 2.85706 6.80898L3.18534 7.24669C3.73731 7.54746 4.41572 7.52121 4.94562 7.16795L5.04949 7.09871C6.21141 6.32409 7.69931 6.23146 8.94834 6.85597L10.1059 7.43475C10.669 7.71628 11.3317 7.71628 11.8947 7.43475L13.0523 6.85597C14.3013 6.23146 15.7892 6.32409 16.9512 7.09871L17.055 7.16795ZM12.2962 15.4083L12.0802 18H9.92045L9.70448 15.4083C9.6413 14.6502 10.2396 14 11.0003 14C11.7611 14 12.3593 14.6502 12.2962 15.4083Z" fill="#A5A6AB" fillOpacity="0.88"/>
</svg>
} names={'storeName'} values={storeInfo.storeName} handleChange={handleInputChange} label={'Store Name'} />   
 {err?.storeName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input Store name</p>
)}
                  </Box>
{/* <Box>
<DashBoardInput placing={'Uganda'}  names={'countryReg'} values={storeInfo.countryReg} handleChange={handleInputChange} label={'Country of registration'} /> 
 {err?.countryReg && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include country of registration</p>
)}
</Box> */}

<Box>
              <DashBoardInput placing={'Nakasero market@gmail.com'} icon={<svg
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
} names={'email'} values={storeInfo.email} handleChange={handleInputChange} label={'Email'} />   
 {err?.countryReg && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include email</p>
)}
</Box>
            {/* <Box>
                <Text className=' text-[15px] font-semibold'>
                            Phone number
                        </Text>
              <Box className=' flex items-center gap-x-[10px] mt-[10px]'>
           <Box>
             <Number_country dashboard />
           </Box>
            <Box className=' w-full'>
               <Unboarding_input dashboard placing={''}  names={'PhoneNumber'} values={storeInfo.PhoneNumber} handleChange={handleInputChange} label={'Phone number'} />
            </Box>
         </Box>
                </Box> */}
                <Box>
                {Object?.keys(dropData).length>0 && <CountryDropDown
                 values={storeInfo.bussiness_id}
                onChangeFunc={handleInputChange}
                 names={'bussiness_id'}
                 label={'Bussiness Name'}
                  dropDownOpt={ToArray||[]}
                  placing={'Select Bussiness Name'}
                />}
                   {err?.bussiness_id && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please select Bussiness name</p>
)}
{/* <p className="text-gray-600 text-[12px] pt-[5px]">Create a new bussiness information on bussiness information tab </p> */}
                </Box>
                <Box>
              <DashBoardInput placing={'Limited'}  names={'bussinessType'} values={storeInfo.bussinessType} handleChange={handleInputChange} label={'Business type'} /> 
                 {err?.bussinessType && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Business type</p>
)}
                </Box>
                <Box>
                  
               <DashBoardInput placing={'Floor/house, apartment, block'}  names={'addressOne'} values={storeInfo.addressOne} handleChange={handleInputChange} label={'Address line 1'} /> 
                 {err?.addressOne && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include First address</p>
)} 
                </Box>
                <Box>
               <DashBoardInput placing={'Floor/house, apartment, No, building..'}  names={'addressTwo'} values={storeInfo.addressTwo} handleChange={handleInputChange} label={'Address line 2'} /> 
                                 {err?.addressTwo && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Second address</p>
)} 
                </Box>
                <Box>
                  {/* <LocationInput city updateStates={setStoreInfo} names={'city'} values={storeInfo.state} label={'City/Town'} /> */}
              <DashBoardInput placing={'District/province'}  names={'city'} values={storeInfo.city} handleChange={handleInputChange} label={'City/Town'} /> 
                {err?.city && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include City name</p>
)}   
                </Box>
                <Box>
              <DashBoardInput placing={'State/region'}  names={'state'} values={storeInfo.state}
               handleChange={handleInputChange} label={'State/Region'} /> 
               {/* <LocationInput updateStates={setStoreInfo} state names={'state'} values={storeInfo.state} label={'State/Region'} /> */}
                  {err?.state && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include State</p>
)}   
                </Box>
                <Box>
              <DashBoardInput placing={'Postal code'}  names={'postalCode'} values={storeInfo.postalCode} handleChange={handleInputChange} label={'Postal code'} />
                 {err?.postalCode && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Postal code</p>
)}   
                </Box>

                <Box>
               <CountryDropDown
                 values={storeInfo.country}
                onChangeFunc={handleInputChange}
                 names={'country'}
                 label={'Country'}
                />
                                   {err?.country && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Country name</p>
)}   
                </Box>
              
              </Box>
              <Box border="1px" borderColor="gray.400" borderRadius="lg" className=' mt-[32px] mb-[40px] '>
                <Box className=' w-11/12 m-auto'>
                <Box>
                        <Box borderBottom="2px" borderColor="#92DF16"  className=' w-fit pt-[20px]'>
                  <Text className=' pb-[2px] font-bold '>Seller’s Contract </Text>
                </Box>
                </Box>
                <Box className=' mt-[25px]'>
                    <Text className=' text-[12px]'>Please, download the Bringo Seller’s contract, sign and upload back for verification</Text>
                </Box>
                <Box className=' lg:flex grid gap-y-[20px] lg:w-full w-10/12 items-center gap-x-[20px] mt-[30px]'>
                    <Button backgroundColor={'#0E4940'}>
                        <Box className=' flex items-center p-[2px] gap-x-[20px]'>
                            <Box>
                                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1673 15.7734L4.69556 9.30168L6.50765 7.42487L9.87297 10.7902V0.241211H12.4617V10.7902L15.827 7.42487L17.6391 9.30168L11.1673 15.7734ZM3.40121 20.9509C2.68931 20.9509 2.07989 20.6974 1.57293 20.1904C1.06598 19.6835 0.8125 19.074 0.8125 18.3621V14.4791H3.40121V18.3621H18.9334V14.4791H21.5221V18.3621C21.5221 19.074 21.2687 19.6835 20.7617 20.1904C20.2548 20.6974 19.6453 20.9509 18.9334 20.9509H3.40121Z" fill="#F5ECBE"/>
</svg>

                            </Box>
                            <Box>
                                <Text className=' text-[12px] text-white'>Download contract</Text>
                            </Box>
                        </Box>
                    </Button>
                     <Button border="1px" borderColor="gray.400" borderRadius="lg">
                        <Box className=' flex items-center p-[2px] gap-x-[20px]'>
                            <Box>
<svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.6425 15.7734V5.22447L6.27718 8.58979L4.46509 6.71297L10.9369 0.241211L17.4086 6.71297L15.5965 8.58979L12.2312 5.22447V15.7734H9.6425ZM3.17074 20.9509C2.45884 20.9509 1.84942 20.6974 1.34246 20.1904C0.835509 19.6835 0.582031 19.074 0.582031 18.3621V14.4791H3.17074V18.3621H18.703V14.4791H21.2917V18.3621C21.2917 19.074 21.0382 19.6835 20.5312 20.1904C20.0243 20.6974 19.4149 20.9509 18.703 20.9509H3.17074Z" fill="#98A2B3"/>
</svg>

                            </Box>
                            <Box>
                                <Text className=' text-[12px] text-gray-400'>Upload signed contract</Text>
                            </Box>
                        </Box>
                    </Button>
                </Box>
                <Box className=' mt-[30px] pb-[20px]'>
                    <Text className=' text-[#007AFF] text-[12px]'>Bringo policies and guidelines | Privacy policy | Cookie</Text>
                </Box>

                </Box>
              </Box>
    </div>

    </Box>
<Box className=' grid w-11/12 justify-end'>
            <SubmitButton submitFunc={submitStore} loading={storeLoader} />
          </Box>

    {/* </LoadScript> */}
    </Box>
  )
}

export default StoreInformation