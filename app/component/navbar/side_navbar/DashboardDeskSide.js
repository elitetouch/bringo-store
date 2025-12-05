'use client'
import React, { useEffect } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'
import { IconButton } from '@chakra-ui/react'
import supermarket from '../../../../public/supermarket.svg'
import { SideNavData } from '../../Data/SideNav'
import { sideNavTools } from '../../Data/SideNav'
import { Switch } from '@chakra-ui/react'
import user from '../../../../public/user.svg'
import bringo from '../../../../public/bringologo.svg'
import { useRouter } from 'next/navigation'
import { useColorMode } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList
} from '@chakra-ui/react'
import { SwitchStoreDropDown } from '@/app/main_pages/Dashboard/Market/page'
import { StoreInfo } from '@/app/api/reactQuery'
import { useToast } from '@chakra-ui/react'
// import imp from '../../../main_pages/Dashboard/Market'
import MarketListPopUp from '../../PopUp/MarketList'
import { SingletoreInfo } from '@/app/api/reactQuery'
import { ProfileInfo } from '@/app/api/reactQuery'
import axiosInstance from '@/app/api/Api_Instance'
import { QueryClient } from '@tanstack/react-query'
import { BusinessInfo } from '@/app/api/reactQuery'
import { LogOutFunction } from '@/app/api/reactQuery'
import { useTheme } from 'next-themes'
//import imp from '../../../main_pages/Dashboard/new_user_dashboard'
export const ProfileComponent =({toogleSideMenu, profileData})=>{
  const router = useRouter()
  
  return (
     <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' border border-red-900 rounded-lg mt-[20px] mb-[20px] min-h-[50px] grid items-center'>
         <Box className=' flex items-center gap-x-[10px] w-11/12 m-auto  '>
          <Box >
            { profileData?.userImage?<Box className=" bg-gray-100 w-[40px] grid items-center justify-center h-[40px] overflow-hidden rounded-full" cursor={'pointer'}>
                                       <Image
                      src={profileData?.userImage}
                      alt="Profile"
                      width={500}
                      height={500}
                      unoptimized
                      className=' h-[500px] w-[500px]'
                    />
                    
                                         
                                      </Box>:
             <svg
  width="40"
  height="40"
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
</svg>}

          </Box>
          <Box
          cursor={'pointer'}
          onClick={()=>router.push(`/../../../main_pages/Dashboard/AccountSettings`)}
          className=' flex justify-between w-full text-[15px]'>
            {(!toogleSideMenu) && <Box>
              <Text className='text-[#454545]'>{profileData?.fullname}</Text>
              <Text className=' mt-[10px] text-[#B0B0B0]'>Admin</Text>
            </Box>}
            <Box>
              <IconButton 
              position={'unset'}
               backgroundColor={'transparent'}
              icon={<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1L9 9L17 1" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
}
              />
            </Box>
          </Box>
         </Box>
      </Box>
  )
}



function DashboardDeskSide({toogleMobile,mobileTog,toogleSideMenu,toogleFunc}) {
  // const { theme, setTheme } = useTheme();
  // const [mounted, setMounted] = useState(false);
  // if (!mounted) return null;
  // // Prevent hydration mismatch
  // useEffect(() => setMounted(true), []);



 const profile= ProfileInfo()
   const ProfileObject= profile?.data?.data?.user || ''
   console.log(ProfileObject)
  //  const singleStore =  SingletoreInfo(ProfileObject?.defaultStoreId)
  //  const SingleStoreDetails= singleStore?.data?.data?.data?.data
  //  console.log(SingleStoreDetails)
  const[SingleStoreDetails, setSingleStoreDetails]= useState('')
   useEffect(()=>{
ProfileObject?.defaultStoreId && axiosInstance.get(`/api/v1/store-information/${ProfileObject?.defaultStoreId}`).then((resp)=>{
  console.log(resp?.data?.data)
  setSingleStoreDetails(resp?.data?.data)
}).catch((error)=>{
console.log(error)
})

 },[ProfileObject?.defaultStoreId])
  const router = useRouter()
 const toast = useToast()
//const { colorMode, toggleColorMode } = useColorMode();
//console.log(colorMode)
  const [dropdown, setDropDown] = useState(false)
  const dropdownFunc=()=>{
        setDropDown(!dropdown)
  }
  //  const phoneNumber = '2348012345678'; // Nigeria number (e.g., +2348012345678)
  // const message = encodeURIComponent('Hello! I’d like to chat with you via WhatsApp.');

  // const url = `https://wa.me/${phoneNumber}?text=${message}`;
  const data= BusinessInfo()
  const businessData = data?.data?.data?.data
  console.log(businessData)
  const storeInfo = StoreInfo()
  const storeData = storeInfo?.data?.data?.data
  console.log(storeData)
  const ErrorPops =()=>{
      toast({
      title: "Error",
      description:Object.keys(businessData).length < 1&&'Please Complete your Business information and Subscribe'||ProfileObject?.subStatus&&'Please Set Up Your store and payment information',
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    // alert('""')
  }
  const [showModal, setShowModal]= useState(false)
  const [logOutLoader, setLogOutLoader]= useState(false)
  const LogOutFunc=()=>{
    setLogOutLoader(true)
   axiosInstance.get('/api/v1/logout').then((resp)=>{
    console.log(resp)
    setLogOutLoader(false)
      toast({
      title: "Success",
      description:'Logged Out Successfully',
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    router.push('/')
   }).catch((error)=>{
    setLogOutLoader(false)
      toast({
      title: "Error",
      description:'Error in Loging Out',
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
   })

  }
  const SetUpStoreQuery=()=>{
     toast({
      title: "Error",
      description:'Please Fill in store information before you proceed',
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  }
  return (
    <div className={`  ${(!toogleSideMenu)?'lg:w-[280px] w-full':'w-[110px]'} custom-scrollbar lg:overflow-y-auto h-screen`}>
      <Box className=' w-11/12 lg:flex flex-col  justify-between m-auto lg:pt-[20px] pt-[15px] pb-[32px] '>
      <Box>
      <Box  className=' w-11/12 m-auto'>
      <Box className=' flex items-center justify-between'>
        <Box
        //onClick={()=>setShowModal(true)}
        > 
          <Image alt='' src={bringo} />
        </Box>
         <Box>
            <IconButton
            position={'unset'}
            backgroundColor={'transparent'}
            onClick={mobileTog?toogleMobile:toogleFunc}
            icon={<svg
  width="18"
  height="12"
  viewBox="0 0 18 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M1 12C0.71667 12 0.479337 11.904 0.288004 11.712C0.0966702 11.52 0.000670115 11.2827 0 11
       C-0.000663218 10.7173 0.0953369 10.48 0.288004 10.288C0.48067 10.096 0.718003 10 1 10H12
       C12.2833 10 12.521 10.096 12.713 10.288C12.905 10.48 13.0007 10.7173 13 11
       C12.9993 11.2827 12.9033 11.5203 12.712 11.713C12.5207 11.9057 12.2833 12.0013 12 12H1ZM15.9 10.3
       L12.3 6.7C12.1 6.5 12 6.26667 12 6C12 5.73333 12.1 5.5 12.3 5.3L15.9 1.7
       C16.0833 1.51667 16.3167 1.425 16.6 1.425C16.8833 1.425 17.1167 1.51667 17.3 1.7
       C17.4833 1.88333 17.575 2.11667 17.575 2.4C17.575 2.68333 17.4833 2.91667 17.3 3.1
       L14.4 6L17.3 8.9C17.4833 9.08333 17.575 9.31667 17.575 9.6
       C17.575 9.88333 17.4833 10.1167 17.3 10.3
       C17.1167 10.4833 16.8833 10.575 16.6 10.575C16.3167 10.575 16.0833 10.4833 15.9 10.3ZM1 7
       C0.71667 7 0.479337 6.904 0.288004 6.712C0.0966702 6.52 0.000670115 6.28267 0 6
       C-0.000663218 5.71733 0.0953369 5.48 0.288004 5.288C0.48067 5.096 0.718003 5 1 5H9
       C9.28334 5 9.521 5.096 9.713 5.288C9.905 5.48 10.0007 5.71733 10 6
       C9.99934 6.28267 9.90334 6.52033 9.712 6.713C9.52067 6.90567 9.28334 7.00133 9 7H1ZM1 2
       C0.71667 2 0.479337 1.904 0.288004 1.712C0.0966702 1.52 0.000670115 1.28267 0 1
       C-0.000663218 0.717333 0.0953369 0.48 0.288004 0.288C0.48067 0.096 0.718003 0 1 0H12
       C12.2833 0 12.521 0.096 12.713 0.288C12.905 0.48 13.0007 0.717333 13 1
       C12.9993 1.28267 12.9033 1.52033 12.712 1.713C12.5207 1.90567 12.2833 2.00133 12 2H1Z"
    fill="black"
  />
</svg>
}
            />
         </Box>
      </Box>
      </Box>
           { ProfileObject?
           <Box  cursor={'pointer'} 
         
            border="1px" borderColor="gray.300" borderRadius="lg"  className=' rounded-lg grid items-center w-full border border-gray-700 h-[70px] mt-[20px] lg:mt-[30px] lg:mb-[20px] mb-[10px]'>
              <Box className='  flex items-center justify-between w-11/12 m-auto '>
                <Box 
                cursor={'pointer'}
                   onClick={()=>{ProfileObject?.defaultStoreId? router.push(`/../../../main_pages/Dashboard/Market?marketId=${ProfileObject?.defaultStoreId}`):SetUpStoreQuery()}} 
                className='  flex items-center gap-x-[10px]'>
                  <Box>
                    
                    {/* <Image alt='' src={SingleStoreDetails?.storeLogo} width={50} height={60} /> */}
                { ProfileObject?.defaultStoreId? 
                <Box className=" bg-gray-300 w-[50px] grid items-center justify-center h-[50px] overflow-hidden rounded-full" cursor={'pointer'}>
                                       <Image
                      src={SingleStoreDetails?.storeLogo}
                      alt="Profile"
                      width={500}
                      height={500}
                      unoptimized
                      className=' h-[500px] w-[500px]'
                    />
                    
                                         
                                      </Box>
//                 <svg
//   width="48"
//   height="48"
//   viewBox="0 0 48 48"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
// >
  
//   <circle cx="24" cy="24" r="24" fill="#F3F4F6" /> 

  
//   <path
//     d="M15 19L17 13H31L33 19"
//     stroke="#4B5563"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
//   <path
//     d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
//     stroke="#4B5563"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
//   <path
//     d="M20 36V27H28V36"
//     stroke="#4B5563"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   />
// </svg>

//<Image alt='' src={SingleStoreDetails?.storeLogo} width={50} height={60} />
:<Image alt='' src={supermarket} width={50} height={60} />}


                  </Box>
                  {(!toogleSideMenu) && <Box className=' text-[14px]'>
                    <Text className=' text-[#B0B0B0]'>Company</Text>
                    {SingleStoreDetails?.storeName?<Text className=' font-bold mt-[10px] text-[#535961]'>
                      {SingleStoreDetails?.storeName} market</Text>:<Box cursor={'pointer'} onClick={()=>router.push(`/../../../main_pages/Dashboard/new_user_dashboard`)}><Text className=' font-semibold'>Add Market</Text></Box>}
                  </Box>}
                </Box>
               {!toogleSideMenu && <Box zIndex={0}  className=' z-90 bg-white'>
                <IconButton backgroundColor={'transparent'}
                icon={<svg
  width="20"
  height="10"
  viewBox="0 0 20 10"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0.814637 1.7282L8.62927 9.08316C9.39937 9.80796 10.6006 9.80796 11.3707 9.08316L19.1854 1.7282
       C19.5875 1.34969 19.6067 0.716814 19.2282 0.31464C18.8497 -0.0875344 18.2168 -0.106712 17.8146 0.271804
       L10 7.62676L2.18537 0.271803C1.78319 -0.106713 1.15032 -0.0875359 0.771804 0.314638
       C0.393286 0.716812 0.412465 1.34969 0.814637 1.7282Z"
    fill="#535961"
  />
</svg>}
                   onClick={()=>{ProfileObject?.defaultStoreId? router.push(`/../../../main_pages/Dashboard/Market?marketId=${ProfileObject?.defaultStoreId}`):SetUpStoreQuery()}} 
                />
               
                </Box>}
              </Box>
            </Box>:''}
            {/* <Box className=' lg:mb-[20px] mb-[10px]' >
              <ProfileComponent
              toogleSideMenu={toogleSideMenu}
              />
            </Box> */}
                  <Box className=' pt-[10px]'>
                    <Box className='  w-11/12 m-auto '>
                    <Text className='  text-[#535961]'>GENERAL</Text>
                    <Box className=' mt-[10px] grid gap-y-[10px]'>
                      {
                        SideNavData.map((item)=>{
                          return(
                            <Box 
                           // onClick={()=>ProfileObject?.defaultStoreId===null && ErrorPops()}
                            key={item.id} >
                            <Box cursor={'pointer'} onClick={()=>{
                            ProfileObject?.defaultStoreId === null? ErrorPops():( mobileTog?(toogleMobile(),router.push(item.destination)):(router.push(item.destination)))
                            }} 
                            key={item.id}>
                            <Box  cursor={'pointer'}   className=' text-[15px] hover:bg-[#E6F1EF] hover:font-semibold duration-500 h-[50px] grid items-center rounded-lg'>
                              <Box className=' flex items-center justify-between w-11/12 m-auto '>
                                 <Box className=' flex items-center gap-x-[10px] '>
                           <Box>{item.icon}</Box>
                            {(!toogleSideMenu) && <Box>{item.title}</Box>}
                                 </Box>
                               {item.showdropdown && (!toogleSideMenu) && <Box>
                                <IconButton
                                onClick={dropdownFunc}
                                 backgroundColor={'transparent'}
                                  icon={<svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.814637 1.7282L8.62927 9.08316C9.39937 9.80796 10.6006 9.80796 11.3707 9.08316L19.1854 1.7282C19.5875 1.34969 19.6067 0.716814 19.2282 0.31464C18.8497 -0.0875344 18.2168 -0.106712 17.8146 0.271804L10 7.62676L2.18537 0.271803C1.78319 -0.106713 1.15032 -0.0875359 0.771804 0.314638C0.393286 0.716812 0.412465 1.34969 0.814637 1.7282Z" fill="#535961"/>
</svg>
}
                                  />
                                </Box>}
                              </Box>
                            </Box>
                            {dropdown && item.showdropdown && (
  <Box borderLeft="3px" borderColor="gray.300" pl={4} className=' border-l'>
    {/* Nested level */}
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Box bg="gray.700" h="5px" w="15px" mr={2} />
        <Text fontSize="15px">Produce</Text>
      </Box>
      <Box display="flex" alignItems="center"  mb={2}>
        <Box bg="gray.700" h="5px" w="15px" mr={2} />
        <Text fontSize="15px">Bakery</Text>
      </Box>
        <Box display="flex" alignItems="center"  mb={2}>
        <Box bg="gray.700" h="5px" w="15px" mr={2} />
        <Text fontSize="15px">Beverage</Text>
      </Box>
        <Box display="flex" alignItems="center"  mb={2}>
        <Box bg="gray.700" h="5px" w="15px" mr={2} />
        <Text fontSize="15px">Meat & sea food</Text>
      </Box>
    </Box>
  </Box>
)}

                            </Box>
                            </Box>
                          )
                        })
                      }
                       <Box 
                             // onClick={()=>ProfileObject?.defaultStoreId === null && ErrorPops()}
                            >
                           <Box  cursor={'pointer'}
                          onClick={()=>{
                         router.push(`/../../../main_pages/Dashboard/new_user_dashboard`)
                          }}
                            className=' text-[15px] hover:bg-[#E6F1EF] hover:font-semibold duration-500 h-[50px] grid items-center rounded-lg'>
                              <Box className=' flex items-center justify-between w-11/12 m-auto'>
                                  <Box className=' flex items-center gap-x-[10px] '>
                           <Box><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 7L5.5 4H18.5L20 7" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="3" y="7" width="18" height="4" rx="1" stroke="#C8CAD8" stroke-width="2"/>
  <path d="M5 11V19H10V14H14V19H19V11" stroke="#C8CAD8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <g transform="translate(15, 15)">
    <circle cx="3" cy="3" r="2.5" stroke="#C8CAD8" stroke-width="1.5"/>
    <path d="M3 0V1" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M3 5V6" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M0 3H1" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M5 3H6" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M1.2 1.2L1.9 1.9" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M4.1 4.1L4.8 4.8" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M1.2 4.8L1.9 4.1" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M4.1 1.9L4.8 1.2" stroke="#C8CAD8" stroke-width="1.5" stroke-linecap="round"/>
  </g>
</svg>


</Box>
                             {(!toogleSideMenu) && <Box>Store Setup</Box>}
                                 </Box>
                              </Box>
                            </Box>
                            </Box>
                    </Box>
                    </Box>

                    {/* tools */}
                    <Box className=' mt-[20px]  w-11/12 m-auto'>
                          <Text className='  text-[#535961]'>TOOLS</Text>
                           <Box className=' mt-[10px] grid gap-y-[10px]'>
                      {
                        sideNavTools.map((item)=>{
                          return(
                            <Box 
                             // onClick={()=>ProfileObject?.defaultStoreId === null && ErrorPops()}
                            key={item.id}>
                           <Box  cursor={'pointer'}
                          onClick={()=>{
                          ProfileObject?.defaultStoreId === null?ErrorPops(): ( mobileTog && !item.darkmode?(toogleMobile(),router.push(item.destination)):(router.push(item.destination)))
                          }}
                            key={item.id} className=' text-[15px] hover:bg-[#E6F1EF] hover:font-semibold duration-500 h-[50px] grid items-center rounded-lg'>
                              <Box className=' flex items-center justify-between w-11/12 m-auto'>
                                  <Box className=' flex items-center gap-x-[10px] '>
                           <Box>{item.icon}</Box>
                             {(!toogleSideMenu) && <Box>{item.title}</Box>}
                                 </Box>
                               {item.darkmode && <Box 
                               onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                               >
                                <Switch
                               
                                id='email-alerts' />
                                </Box>}
                              </Box>
                            </Box>
                            </Box>
                          )
                        })
                      }
                         <Box  cursor={'pointer'}
                          onClick={()=>{
                         LogOutFunc()
                          }}
                            className=' text-[15px] hover:bg-[#E6F1EF] hover:font-semibold duration-500 h-[50px] grid items-center rounded-lg'>
                              <Box className=' flex items-center justify-between w-11/12 m-auto'>
                                  <Box className=' flex items-center gap-x-[10px] '>
                           <Box><svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M3.22476 0C1.44378 0 0 1.44377 0 3.22476V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V7.55556C20 5.34684 18.2105 3.55556 16.001 3.55556H12.8897C12.8498 3.49686 12.8038 3.42219 12.7518 3.32912C12.6109 3.07715 12.4738 2.78111 12.3166 2.44151C12.2793 2.36093 12.2409 2.27786 12.201 2.19239C12.0098 1.7827 11.7781 1.30151 11.5099 0.919752C11.2873 0.602865 10.8009 0 10.0138 0H3.22476ZM10.4876 3.25176C10.5332 3.35036 10.5804 3.45243 10.6288 3.55556H2V3.22476C2 2.54834 2.54834 2 3.22476 2H9.82195C9.83679 2.01884 9.85396 2.04178 9.87344 2.0695C10.026 2.28671 10.1903 2.61316 10.3886 3.0382C10.4206 3.10678 10.4537 3.17835 10.4876 3.25176ZM4 16C2.89543 16 2 15.1046 2 14V5.55556H12.4782C12.4808 5.55561 12.4834 5.55566 12.4861 5.55569C12.4975 5.55584 12.5089 5.5558 12.5203 5.55556H16.001C17.1051 5.55556 18 6.45056 18 7.55556V8H16C14.3431 8 13 9.34315 13 11C13 12.6569 14.3431 14 16 14H18C18 15.1046 17.1046 16 16 16H4ZM15 11C15 10.4477 15.4477 10 16 10H18V12H16C15.4477 12 15 11.5523 15 11ZM9.75138 1.92323C9.7514 1.92272 9.75553 1.92566 9.76374 1.93356C9.75548 1.92769 9.75137 1.92374 9.75138 1.92323Z" fill="#535961"/>
</svg>
</Box>
                              {(!toogleSideMenu) &&<Box>Log Out</Box>}
                                 </Box>
                              </Box>
                            </Box>
                    </Box>
                    </Box>
                  </Box>
      </Box>
     { ProfileObject && <Box className=' pt-[30px]'>
      <ProfileComponent
      profileData={ProfileObject}
      toogleSideMenu={toogleSideMenu}
      />
     </Box>}
     <Box zIndex={1} className=''>
      {
        showModal && <MarketListPopUp openSuccessfull={showModal} setOpenSuccessfull={()=>setShowModal(!showModal)} />
      }
     </Box>
      </Box>
    </div>
  )
}

export default DashboardDeskSide