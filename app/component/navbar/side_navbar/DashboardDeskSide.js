'use client'
import React from 'react'
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
function DashboardDeskSide({toogleMobile,mobileTog,toogleSideMenu,toogleFunc}) {
 const router = useRouter()

  const [dropdown, setDropDown] = useState(false)
  const dropdownFunc=()=>{
        setDropDown(!dropdown)
  }
  return (
    <div className={` lg:grid ${(!toogleSideMenu)?'lg:w-[280px] w-full':'w-[110px]'} custom-scrollbar lg:overflow-y-auto h-screen`}>
      <Box className=' w-11/12 lg:flex flex-col  justify-between m-auto lg:pt-[20px] pt-[15px] pb-[32px] '>
      <Box>
      <Box  className=' w-11/12 m-auto'>
      <Box className=' flex items-center justify-between'>
        <Box> 
          <Image alt='' src={bringo} />
        </Box>
         <Box>
            <IconButton
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
            <Box border="1px" borderColor="gray.300" borderRadius="lg"  className=' rounded-lg grid items-center w-full border border-gray-700 h-[70px] mt-[20px] lg:mt-[30px]'>
              <Box className='  flex items-center justify-between w-11/12 m-auto '>
                <Box className='  flex items-center gap-x-[10px]'>
                  <Box>
                    <Image alt='' src={supermarket} />
                  </Box>
                  {(!toogleSideMenu) && <Box className=' text-[14px]'>
                    <Text className=' text-[#B0B0B0]'>Company</Text>
                    <Text className=' font-bold mt-[10px] text-[#535961]'>Nakasero market</Text>
                  </Box>}
                </Box>
               {!toogleSideMenu && <Box>
                  <IconButton
                   backgroundColor={'transparent'}
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
</svg>
} />
                </Box>}
              </Box>
            </Box>
                  <Box className=' pt-[10px]'>
                    <Box className='  w-11/12 m-auto lg:mt-[20px] mt-[10px]'>
                    <Text className='  text-[#535961]'>GENERAL</Text>
                    <Box className=' mt-[10px] grid gap-y-[10px]'>
                      {
                        SideNavData.map((item)=>{
                          return(
                            <Box cursor={'pointer'} onClick={()=>{router.push(item.destination);mobileTog?toogleMobile():toogleFunc()}} key={item.id}>
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
                          )
                        })
                      }
                    </Box>
                    </Box>

                    {/* tools */}
                    <Box className=' mt-[20px]  w-11/12 m-auto'>
                          <Text className='  text-[#535961]'>TOOLS</Text>
                           <Box className=' mt-[10px] grid gap-y-[10px]'>
                      {
                        sideNavTools.map((item)=>{
                          return(
                           <Box  cursor={'pointer'}  key={item.id} className=' text-[15px] hover:bg-[#E6F1EF] hover:font-semibold duration-500 h-[50px] grid items-center rounded-lg'>
                              <Box className=' flex items-center justify-between w-11/12 m-auto'>
                                  <Box className=' flex items-center gap-x-[10px] '>
                           <Box>{item.icon}</Box>
                             {(!toogleSideMenu) && <Box>{item.title}</Box>}
                                 </Box>
                               {item.darkmode && <Box>
                                <Switch id='email-alerts' />
                                </Box>}
                              </Box>
                            </Box>
                          )
                        })
                      }
                    </Box>
                    </Box>
                  </Box>
      </Box>
      <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' border border-red-900 rounded-lg mt-[50px] mb-[20px] h-[50px] grid items-center'>
         <Box className=' flex items-center gap-x-[10px] w-11/12 m-auto  '>
          <Box>
             <Image alt='' src={user} />
          </Box>
          <Box className=' flex justify-between w-full text-[15px]'>
            {(!toogleSideMenu) && <Box>
              <Text className='text-[#454545]'>Kate Holland</Text>
              <Text className=' mt-[10px] text-[#B0B0B0]'>Admin</Text>
            </Box>}
            <Box>
              <IconButton 
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
      </Box>
    </div>
  )
}

export default DashboardDeskSide