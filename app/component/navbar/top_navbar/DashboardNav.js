'use client'
import React from 'react'
import SearchInput from '../../Inputs/SearchInput'
import { Box } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import user from '../../../../public/user.svg'
import Image from 'next/image'
import NotificationDrop from '../NotificationDrop'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
function DashboardNav() {
  const router = useRouter()
  return (
    <Box  className=' lg:grid hidden bg-white h-[80px] grid items-center bg-white'>
      <Box className=' flex w-11/12 m-auto items-center justify-between'>
        <Box>
          <SearchInput />
        </Box>
        <Box className=' flex items-center gap-x-[20px]'>
          <Box>
            <Menu>
   <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={
         <Box className=' relative '>
              <svg
    width="16"
    height="21"
    viewBox="0 0 16 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 4C10.7614 4 13 6.23858 13 9V11.2396C13 11.7294 13.1798 12.2022 13.5052 12.5683L14.7808 14.0035C15.6407 14.9708 14.954 16.5 13.6597 16.5H2.34025C1.04598 16.5 0.35927 14.9708 1.21913 14.0035L2.4948 12.5683C2.82022 12.2022 2.99998 11.7294 2.99998 11.2396L3 9C3 6.23858 5.23858 4 8 4ZM8 4V1.5M6.99994 19.5H8.99994"
      stroke="#535961"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
                <Box className=' absolute top-0 right-0 grid h-[10px] w-[10px] justify-center items-center bg-[#EA3030] text-[8px] text-white rounded-full '>
                  <Text>0</Text>
                </Box>
            </Box>
        }
        variant="ghost"
        className="w-[49px]"
      />
  <MenuList>
   <NotificationDrop />
  </MenuList>
</Menu>
          </Box>
           <Box>
            <IconButton
            className=' w-[49px]'
            icon={<Box className=' flex items-center gap-x-[5px] '>
              <Box>
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0003 0.498047L4.75346 0.888476C3.26573 0.981459 1.95312 1.89398 1.34772 3.25613L0.801814 4.48443C0.212977 5.80931 0.387154 7.34911 1.25706 8.50898L1.51535 8.85337L1.87118 16.6816C1.96829 18.8179 3.72854 20.5 5.86706 20.5H16.1336C18.2721 20.5 20.0324 18.8179 20.1295 16.6816L20.4788 8.99655C21.4301 8.10721 21.7807 6.71988 21.324 5.46402L20.6115 3.50463C20.0678 2.00945 18.6897 0.978635 17.1019 0.879393L11.0003 0.498047ZM3.86912 16.5908L3.5663 9.92869C4.42289 10.0296 5.30703 9.83071 6.05502 9.33205L6.15889 9.2628C6.72363 8.88631 7.44682 8.84128 8.05391 9.14483L9.21147 9.7236C10.3376 10.2867 11.6631 10.2867 12.7892 9.7236L13.9467 9.14483C14.5538 8.84128 15.277 8.88631 15.8418 9.2628L15.9456 9.33205C16.6936 9.83071 17.5778 10.0296 18.4343 9.92869L18.1315 16.5908C18.083 17.659 17.2028 18.5 16.1336 18.5H14.0871L14.2893 16.0744C14.4496 14.1502 12.9311 12.5 11.0003 12.5C9.06949 12.5 7.55104 14.1502 7.71139 16.0744L7.91352 18.5H5.86706C4.7978 18.5 3.91767 17.659 3.86912 16.5908ZM17.055 7.66795C17.6274 8.04957 18.3732 8.04957 18.9456 7.66795C19.4425 7.3367 19.6485 6.70871 19.4444 6.1475L18.7319 4.18812C18.4601 3.44053 17.771 2.92512 16.9771 2.8755L11.0003 2.50195L4.87821 2.88458C4.13435 2.93107 3.47805 3.38733 3.17535 4.06841L2.62944 5.2967C2.33502 5.95915 2.42211 6.72904 2.85706 7.30898L3.18534 7.74669C3.73731 8.04746 4.41572 8.02121 4.94562 7.66795L5.04949 7.5987C6.21141 6.82409 7.69931 6.73146 8.94834 7.35597L10.1059 7.93475C10.6689 8.21628 11.3317 8.21628 11.8947 7.93475L13.0523 7.35597C14.3013 6.73146 15.7892 6.82409 16.9512 7.5987L17.055 7.66795ZM12.2962 15.9083L12.0802 18.5H9.92045L9.70448 15.9083C9.6413 15.1502 10.2396 14.5 11.0003 14.5C11.7611 14.5 12.3593 15.1502 12.2962 15.9083Z" fill="#535961"/>
</svg>
              </Box>
                <Box className=' '>
                  <svg
    width="7"
    height="4"
    viewBox="0 0 7 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.65702 3.16483L0.882812 0.390625H6.43122L3.65702 3.16483Z" fill="#535961" />
  </svg>
                </Box>
            </Box>}
            />
          </Box>
          <Box 
          cursor={'pointer'}
          onClick={()=>router.push(`/../../../main_pages/Dashboard/AccountSettings`)}
          borderLeft="1px" borderColor="gray.300" >
              <Box className=' flex items-center gap-x-[10px] m-auto w-[200px] pl-[10px] '>
                      <Box className=' relative'>
                         <Image alt='' src={user} />
                          <Box className=' h-[12px] w-[12px] rounded-full bg-[#23A149] absolute bottom-0 right-0'></Box>
                      </Box>
                      <Box className=' flex justify-between w-full text-[15px]'>
                       <Box>
                          <Text className='text-[#454545]'>Kate Holland</Text>
                          <Text className=' mt-[10px] text-[#B0B0B0]'>Admin</Text>
                        </Box>
                        <Box className=''>
                          <IconButton 
                           backgroundColor={'transparent'}
                          icon={<Box><svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L9 9L17 1" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
           
            </Box>
            }
                          />
                        </Box>
                      </Box>
                     </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardNav