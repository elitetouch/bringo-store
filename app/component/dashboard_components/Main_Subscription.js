'use client'
import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
//import imp from '../Subscription/SubscriptionPages/ChoosePlan'
function Main_Subscription() {
    const router = useRouter()
  return (
    <div className=' pb-[30px]'>
        <Box className=' bg-white rounded-lg lg:mt-[20px] mt-[10px] lg:w-11/12 m-auto '>
        <Box className=' w-11/12 m-auto pb-[20px]'>
            <Box>
                <Text className=' text-[20px] font-semibold pt-[20px]'>Subscription</Text>
            </Box>
            <Box className=' mt-[20px]'>
                <Text className=' font-semibold text-[15px]'>Bringo Service Fee Structure for Supermarkets</Text>
                <Text className=' mt-[10px] text-[15px]'>At Bringo, we’re committed to helping supermarkets grow with ease and efficiency. To get started and manage your store on our platform, a service fee applies giving you access to powerful tools including inventory management, real-time order tracking, marketing support, and seamless customer engagement.</Text>
            </Box>
            <Box className=' mt-[20px]'>
                <Text>We offer two flexible billing options:</Text>
                <Box className=' flex  gap-x-[5px] mt-[10px]'>
                    <Text className=' font-semibold lg:w-fit w-[280px]'>Monthly Plan –</Text>
                    <Text>Pay-as-you-go, ideal for flexibility and short-term planning.</Text>
                </Box>
                <Box className=' flex gap-x-[5px] mt-[10px]'>
                    <Text className=' font-semibold lg:w-fit w-[280px]'>Annual Plan –</Text>
                    <Text>Pay upfront for the year and enjoy a 10% discount on your service fee.</Text>
                </Box>
               
            </Box>
            <Box className=' mt-[20px]'>
                <Text className=' font-semibold text-[15px]'>Multi-Store Advantage  </Text>
                <Text>Managing more than one location? Supermarkets with more than 3 stores on Bringo enjoy an additional 10% discount on top of any plan savings.
Get started today and grow your grocery business with Bringo, where convenience meets control.</Text>
            </Box>
            <Box className=' mt-[20px]'>
                <Button onClick={()=>router.push('/Subscription/SubscriptionPages/ChoosePlan')} border={'1px'} rounded={'lg'} borderColor={'#007460'} color={'#007460'} backgroundColor={'transparent'}>
                    <Text>Get started</Text>
                </Button>
            </Box>
        </Box>
        </Box>
    </div>
  )
}

export default Main_Subscription







