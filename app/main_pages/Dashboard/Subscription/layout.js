'use client'
import React from 'react'
import { Button, Text, Box } from '@chakra-ui/react'
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import Main_Subscription from '../component/Main_Subscription'
// import Billing_History from '../component/Billing_History'
import { useRouter } from 'next/navigation'
//import imp from '../../../main_pages/Dashboard/Subscription/SubscriptionPages/Billhistory'
const Subscription_Navbar=()=>{
    const router = useRouter()
    return(
        <Box className=' h-[56px] grid items-center bg-white rounded-lg '>
            <Box className=' flex items-center gap-x-[20px] w-11/12 m-auto'>
                <Box>
                    <Button onClick={()=>router.push('/../../../main_pages/Dashboard/Subscription')} className=''>
                        <Text>Subscription</Text>
                    </Button>
                </Box>
                <Box>
                     <Button onClick={()=>router.push(`/../../../main_pages/Dashboard/Subscription/SubscriptionPages/Billhistory`)}>
                        <Text>Billing History</Text>
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
export default function RootLayout({children}) {
  return (
    <div className=' min-h-screen'>
        <Box className=' lg:pl-[10px] pl-[10px] pr-[10px] lg:pr-[10px] pt-[10px]'>
           
<Subscription_Navbar />
 <Box>
    {children}
 </Box>
        </Box>
    </div>
  )
}

