'use client'
import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'
import { MarketData } from '@/app/component/Data/MarketData'
import { IconButton } from '@chakra-ui/react'
import marketicon from '../../../../public/marketicon.svg'
import { Select } from '@chakra-ui/react'
import overlay from '../../../../public/overlay.svg'
import { StoreInfo } from '@/app/api/reactQuery'
import {
  Menu,
  MenuButton,
  MenuList
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/app/api/Api_Instance'
//import imp from '../../../main_pages/Dashboard/new_user_dashboard'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
export const SwitchStoreDropDown=({stores})=>{
     const searchParams = useSearchParams(); 
      const marketId = searchParams.get('marketId');
    const queryClient = useQueryClient();
    const toast = useToast()
    const [switchLoader, setSwitchLoader]= useState(false)
    const router = useRouter()
    const SwitchStoreFunc=(id)=>{
        setSwitchLoader(true)
          const formData = new FormData()
       formData.append('store_id',id)
      console.log(formData)
      axiosInstance.post('/api/v1/switch-store',formData).then((resp)=>{
        queryClient.invalidateQueries()
        setSwitchLoader(false)
  console.log(resp)
  router.push(`../../../main_pages/Dashboard/existing_user_dashboard?newMarketName=${id}`)
   toast({
              title: "Switch Store",
              description:'Store switched successfully',
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            })
      }).catch((error)=>{
        setSwitchLoader(false)
        toast({
              title: "Error",
              description:
                error.response?.data?.message || "Something went wrong. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            })
      })
    }
    return (
        <Box  zIndex={10}   cursor={'pointer'} className='  w-[350px] bg-white rounded-lg '>
            <Box className=' flex justify-between items-center pt-[10px] w-11/12 m-auto'>
                <Text className=' font-semibold text-[20px]'>Stores</Text>
                <IconButton
                onClick={()=>router.push(`../../../main_pages/Dashboard/new_user_dashboard?newSupermarket=true`)}
                backgroundColor={'transparent'}
                icon={<Box className=' h-[36px] w-[36px] grid items-center justify-center bg-[#007460] rounded-full'>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3.76172V14.2617" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.75 9.01172H14.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </Box>}
                />
            </Box>
           {switchLoader?<Box>
            <Text className=' text-center pt-[20px]'>Loading .... </Text>
           </Box> :<Box className=' w-11/12 m-auto mt-[20px] grid gap-y-[20px]'>
            {
                stores?.map((item,index)=>{
                    return(
                            <Box
                            cursor={'pointer'}
                             onClick={()=>{SwitchStoreFunc(item?.id)}}
                            borderBottom="1px" borderColor="gray.300"  key={index} className=' flex items-center gap-x-[10px] pb-[10px]'>
                <Box zIndex={0}>
                    {/* <Image   src={marketicon} alt='' height={44} width={44} /> */}
                           <svg
  width="44"
  height="44"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <circle cx="24" cy="24" r="24" fill="#F3F4F6" /> 

  
  <path
    d="M15 19L17 13H31L33 19"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M20 36V27H28V36"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                </Box>
                <Box>
                    <Text className=' font-semibold'>{item?.storeName}</Text>
                    <Box className=' flex items-center gap-x-[10px] mt-[5px]'>
                        <Box >
                            <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.83333 16.8449C5.63889 16.8449 5.47222 16.7893 5.33333 16.6782C5.19445 16.5671 5.09028 16.4213 5.02083 16.2407C4.75695 15.4629 4.42361 14.7338 4.02083 14.0532C3.63195 13.3727 3.08333 12.5741 2.375 11.6574C1.66667 10.7407 1.09028 9.86572 0.645833 9.03239C0.215278 8.19906 0 7.19211 0 6.01156C0 4.38656 0.5625 3.01156 1.6875 1.88656C2.82639 0.747667 4.20833 0.178223 5.83333 0.178223C7.45833 0.178223 8.83333 0.747667 9.95833 1.88656C11.0972 3.01156 11.6667 4.38656 11.6667 6.01156C11.6667 7.27544 11.4236 8.331 10.9375 9.17822C10.4653 10.0116 9.91667 10.8379 9.29167 11.6574C8.54167 12.6574 7.97222 13.4907 7.58333 14.1574C7.20833 14.8102 6.89583 15.5046 6.64583 16.2407C6.57639 16.4352 6.46528 16.5879 6.3125 16.6991C6.17361 16.7963 6.01389 16.8449 5.83333 16.8449ZM5.83333 13.8657C6.06945 13.3935 6.33333 12.9282 6.625 12.4699C6.93056 12.0116 7.375 11.4004 7.95833 10.6366C8.55556 9.85878 9.04167 9.1435 9.41667 8.49072C9.80556 7.82405 10 6.99767 10 6.01156C10 4.85878 9.59028 3.87961 8.77083 3.07406C7.96528 2.25461 6.98611 1.84489 5.83333 1.84489C4.68056 1.84489 3.69445 2.25461 2.875 3.07406C2.06945 3.87961 1.66667 4.85878 1.66667 6.01156C1.66667 6.99767 1.85417 7.82405 2.22917 8.49072C2.61806 9.1435 3.11111 9.85878 3.70833 10.6366C4.29167 11.4004 4.72917 12.0116 5.02083 12.4699C5.32639 12.9282 5.59722 13.3935 5.83333 13.8657ZM5.83333 8.09489C6.41667 8.09489 6.90972 7.8935 7.3125 7.49072C7.71528 7.08795 7.91667 6.59489 7.91667 6.01156C7.91667 5.42822 7.71528 4.93517 7.3125 4.53239C6.90972 4.12961 6.41667 3.92822 5.83333 3.92822C5.25 3.92822 4.75694 4.12961 4.35417 4.53239C3.95139 4.93517 3.75 5.42822 3.75 6.01156C3.75 6.59489 3.95139 7.08795 4.35417 7.49072C4.75694 7.8935 5.25 8.09489 5.83333 8.09489Z" fill="#A5A6AB"/>
</svg>
                        </Box>
                        <Text className=' text-[14px]'>{item?.city} {item?.state} {item?.country} </Text>
                        </Box>
                </Box>
            </Box>
                    )
                })
            }

            </Box>}
        
        </Box>
    )
}

export const MarketCard=({item})=>{
    return(
        <Box>
            <Box className=' grid items-center justify-center w-full h-[170px] rounded-lg bg-[#F6F6F6]'>
                <Image alt='' src={item.images} />
                       {/* <svg
  width="48"
  height="48"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <circle cx="24" cy="24" r="24" fill="#F3F4F6" /> 

  
  <path
    d="M15 19L17 13H31L33 19"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M20 36V27H28V36"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg> */}
            </Box>
            <Box className=' pt-[10px] w-11/12 m-auto'>
                <Box className=' flex items-center justify-between mt-[10px]'>
                    <Text className=' text-[13px]'>{item.name || ''}</Text>
                    <Text className=' text-[13px]'>{item.price|| ''}</Text>
                </Box>
                <Box className=' flex items-center justify-between mt-[10px]'>
                    <Box className=' flex items-center items-center gap-x-[5px]'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.90104 1.83301L9.96104 6.00634L14.5677 6.67968L11.2344 9.92634L12.021 14.513L7.90104 12.3463L3.78104 14.513L4.56771 9.92634L1.23438 6.67968L5.84104 6.00634L7.90104 1.83301Z" fill="#FFD500" stroke="#FFD500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                        <Text className=' text-[13px]'>{item.rating || ''}({item.quantity || ''})</Text>
                    </Box>
                    <Box>
                        <Text className=' text-[13px]'>{item.weight || ''}</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
function Page() {
     const searchParams = useSearchParams(); 
      const marketId = searchParams.get('marketId');
        const[SingleStoreDetails, setSingleStoreDetails]= useState('')
   useEffect(()=>{
axiosInstance.get(`/api/v1/store-information/${marketId}`).then((resp)=>{
  console.log(resp)
  setSingleStoreDetails(resp?.data?.data)
}).catch((error)=>{
console.log(error)
})

 },[marketId])
    const [selectedProduct, setSelectedProduct] = useState('All Products');

  const handleChange = (event) => {
    setSelectedProduct(event.target.value);
    console.log('Selected value:', event.target.value);
  };
const storeInfo = StoreInfo()
const storeData = storeInfo?.data?.data?.data?.data
console.log(storeData)
  return (
    <div className=' min-h-screen'>
        <Box  className=''>
            {/* <Box className=' z-1'>
                <Image src={overlay} alt='' className=' w-full'/>
            </Box> */}
            <Box  
            //position="relative" 
            className='  lg:pt-[30px] pt-[10px]  z-50'>
            <Box className=' w-11/12 m-auto bg-white rounded-lg lg:mt-[20px] mt-[5px] lg:pt-[20px] pt-[10px] '>
            <Box className=' w-11/12 m-auto pb-[20px]'>
                <Box borderBottom="1px" borderColor="gray.300" className=' lg:flex mt-[20px] lg:justify-between grid gap-y-[10px]  pb-[20px] '>
                    <Box className=' flex items-center gap-x-[10px]'>
                        <Box className=''>
                            {/* <Image alt='' src={marketicon} /> */}
                                   <svg
  width="60"
  height="60"
  viewBox="0 0 48 48"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  
  <circle cx="24" cy="24" r="24" fill="#F3F4F6" /> 

  
  <path
    d="M15 19L17 13H31L33 19"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M20 36V27H28V36"
    stroke="#4B5563"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
                            <Box className=' absolute bottom-0 right-0'>
                            </Box>
                        </Box>
                        <Box>
                            <Text className=' text-[20px]'>{SingleStoreDetails?.storeName || ''} market.</Text>
                            <Text className=' text-[#8A8A8A] text-[14px] mt-[10px]'>Shopping made easy</Text>
                        </Box>
                    </Box>
                    <Box className=' flex items-center lg:gap-x-[20px] gap-x-[10px]'>
                        <IconButton 
                        backgroundColor={'transparent'}
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.2833 10.1571L23.2178 0H21.1006L13.3427 8.81931L7.14656 0H0L9.36984 13.3364L0 23.9877H2.11732L10.3098 14.6742L16.8534 23.9877H24L14.2827 10.1571H14.2833ZM11.3833 13.4538L10.4339 12.1258L2.88022 1.55881H6.1323L12.2282 10.0867L13.1776 11.4147L21.1016 22.4998H17.8495L11.3833 13.4544V13.4538Z" fill="black"/>
</svg>
}
                        />
                         <IconButton 
                         backgroundColor={'transparent'}
                        icon={
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z" fill="black"/>
</svg>
                        }
                        />
                         <IconButton 
                         backgroundColor={'transparent'}
                        icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 5.5H16.51M6 1H16C18.7614 1 21 3.23858 21 6V16C21 18.7614 18.7614 21 16 21H6C3.23858 21 1 18.7614 1 16V6C1 3.23858 3.23858 1 6 1ZM15 10.37C15.1234 11.2022 14.9813 12.0522 14.5938 12.799C14.2063 13.5458 13.5931 14.1514 12.8416 14.5297C12.0901 14.9079 11.2384 15.0396 10.4078 14.9059C9.57713 14.7723 8.80976 14.3801 8.21484 13.7852C7.61992 13.1902 7.22773 12.4229 7.09407 11.5922C6.9604 10.7616 7.09207 9.90989 7.47033 9.15837C7.84859 8.40685 8.45419 7.79374 9.20098 7.40624C9.94778 7.01874 10.7978 6.87659 11.63 7C12.4789 7.12588 13.2649 7.52146 13.8717 8.12831C14.4785 8.73515 14.8741 9.52108 15 10.37Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
}
                        />
                        <Box className=' pl-[20px]'>
                        </Box>
                        <Menu>
  <MenuButton  as={'button'}>
    {/* <Button backgroundColor={'#007460'} color={'white'}> */}
    <Box backgroundColor={'#007460'} color={'white'} cursor={'pointer'} className=' h-[44px] w-[124px] justify-center rounded-lg grid items-center'>
 <Text>Switch store</Text> 
    </Box>
                        {/* </Button> */}
  </MenuButton>
  {storeData?.length > 0 && <MenuList>
   <SwitchStoreDropDown
   stores={storeData}
   />
  </MenuList>}
</Menu>
                    </Box>
                </Box>
                <Box className=' mt-[20px] lg:flex grid items-center lg:justify-between gap-y-[20px]'>
                    <Box className=''>
                        <Box className=' h-[45px] grid w-[150px] justify-center items-center rounded-lg' backgroundColor={'#F1F1F1'}>
                            <Text>{selectedProduct || ''}</Text>
                        </Box>
                    </Box>
                    <Box className=' flex items-center gap-x-[20px]'>
                        <Select placeholder='All time'>
  <option value='option1'>All time</option>
</Select>
<Select placeholder='All Product'
onChange={handleChange}
>
  <option value='option1'>All Product</option>
   <option>Cereals (82)</option> 
                        <option>Beverages (121)</option> 
                        <option>Snacks  (246)</option> 
                        <option>Dairy  (86)</option> 
                        <option>Pantry  (306)</option> 
                        <option>Bakery  (82)</option> 
                        <option>Meat (21)</option> 
                        <option>Frozen foods  (306)</option> 
                        <option>Meat (21)</option> 
</Select>
                    </Box>
                </Box>
                {/* <Box className=' grid lg:grid-cols-5 mt-[20px] gap-x-[20px] gap-y-[30px] pb-[20px]'>
                    {
                        MarketData.map((item)=>{
                            return(
                                <Box key={item.id}>
                                    <MarketCard
                                    item={item}
                                    />
                                </Box>
                            )
                        })
                    }
                </Box> */}
                <Box>
                    <Text className=' text-center mt-[20px] mb-[20px] pt-[20px]'>No Product Available</Text>
                </Box>
            </Box>
            <Box className=' grid justify-center mt-[15px] pb-[20px]'>
                <Box>
                    <Button backgroundColor={'transparent'} className=' h-[44px]'
                    border="1px" borderColor="gray.300" borderRadius="lg"
                    >
                        <Box className=' flex items-center gap-x-[10px]'>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M10.0013 1.6665C10.4615 1.6665 10.8346 2.0396 10.8346 2.49984V4.1665C10.8346 4.62674 10.4615 4.99984 10.0013 4.99984C9.54106 4.99984 9.16797 4.62674 9.16797 4.1665V2.49984C9.16797 2.0396 9.54106 1.6665 10.0013 1.6665Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.0013 15C10.4615 15 10.8346 15.3731 10.8346 15.8333V17.5C10.8346 17.9602 10.4615 18.3333 10.0013 18.3333C9.54106 18.3333 9.16797 17.9602 9.16797 17.5V15.8333C9.16797 15.3731 9.54106 15 10.0013 15Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.10879 4.10752C4.43422 3.78208 4.96186 3.78208 5.2873 4.10752L6.46581 5.28603C6.79125 5.61147 6.79125 6.13911 6.46581 6.46454C6.14037 6.78998 5.61274 6.78998 5.2873 6.46454L4.10879 5.28603C3.78335 4.9606 3.78335 4.43296 4.10879 4.10752Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M13.5346 13.5357C13.86 13.2103 14.3876 13.2103 14.7131 13.5357L15.8916 14.7143C16.217 15.0397 16.217 15.5673 15.8916 15.8928C15.5662 16.2182 15.0385 16.2182 14.7131 15.8928L13.5346 14.7143C13.2091 14.3888 13.2091 13.8612 13.5346 13.5357Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M1.66797 10.0002C1.66797 9.53993 2.04106 9.16683 2.5013 9.16683L4.16797 9.16683C4.62821 9.16683 5.0013 9.53993 5.0013 10.0002C5.0013 10.4604 4.62821 10.8335 4.16797 10.8335L2.5013 10.8335C2.04106 10.8335 1.66797 10.4604 1.66797 10.0002Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M15 10.0002C15 9.53993 15.3731 9.16683 15.8333 9.16683L17.5 9.16683C17.9602 9.16683 18.3333 9.53993 18.3333 10.0002C18.3333 10.4604 17.9602 10.8335 17.5 10.8335L15.8333 10.8335C15.3731 10.8335 15 10.4604 15 10.0002Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.10606 15.8927C3.78062 15.5672 3.78062 15.0396 4.10606 14.7142L5.28457 13.5357C5.61001 13.2102 6.13764 13.2102 6.46308 13.5357C6.78852 13.8611 6.78852 14.3887 6.46308 14.7142L5.28457 15.8927C4.95913 16.2181 4.43149 16.2181 4.10606 15.8927Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M13.5357 6.46446C13.2103 6.13902 13.2103 5.61138 13.5357 5.28594L14.7143 4.10743C15.0397 3.782 15.5673 3.782 15.8928 4.10743C16.2182 4.43287 16.2182 4.96051 15.8928 5.28594L14.7143 6.46446C14.3888 6.78989 13.8612 6.78989 13.5357 6.46446Z" fill="#303030"/>
</svg>

                            <Text className=' text-[15px]'>
                                Load more
                            </Text>
                        </Box>
                    </Button>
                </Box>
            </Box>
            </Box>

            </Box>
        </Box>
        <Box>
        <Box className=' flex items-center justify-between mt-[30px] lg:w-10/12 w-11/12  m-auto pb-[30px]'>
                  <Box>
                    <Text className=' text-[#1A71F6] lg:text-[12px] text-[14px]'><span>1</span> of 13 pages</Text>
                  </Box>
                  <Box className=' flex items-center lg:gap-x-[20px] gap-x-[15px]'>
                    <Text className=' lg:text-[12px] text-[14px]'>The page on</Text>
                    <Box className=' pr-[5px]'>
                    <Select width={35} height={30} placeholder=''>
          <option value='option1'>1</option>
          <option value='option2'>2</option>
          <option value='option3'>3</option>
        </Select>
                    </Box>
                    <IconButton
                    icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 14.6668L1.83333 8.00016L8.5 1.3335" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        }
                    />
                    <IconButton
                    icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        }
                    />
                  </Box>
                </Box>
        </Box>
    </div>
  )
}

export default Page