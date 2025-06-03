'use client'
import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import DashboardCard from '@/app/component/Cards/DashboardCard'
import { useState } from 'react'
import StoreInformation from '../component/StoreInformation'
import BusinessInformation from '../component/BusinessInformation'
import PaymentInformation from '../component/PaymentInformation'
import SubmitButton from '../component/SubmitButton'
import { useToast } from '@chakra-ui/react'
function Page() {
  const toast = useToast()
  const [formPage, setFormPage] = useState(1)
   const[storeTracker, setStoreTracker]= useState(0)
      const[businessTracker, setbusinessTracker]= useState(0)
      const[paymentTracker, setPaymentTracker]= useState(0)
  return (
    <div className=' min-h-screen lg:pb-[40px] pb-[20px]'>
      <Box className=' w-11/12 m-auto flex justify-between items-center pt-[20px] lg:pt-[30px]'>
      <Box>
        <Text className=' text-[20px] font-bold'>Welcome, Uzumaki.</Text>
        <Text className=' text-[15px] mt-[10px]'>Please, complete your store set up to go live!</Text>
      </Box>
      <Box className=' lg:grid hidden'>
        <Button backgroundColor={'#0E4940'}>
          <Box className=' flex items-center gap-x-[10px] p-[5px]'>
            <Box>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.8794 10.8275H0.113281V8.23877H7.8794V0.472656H10.4681V8.23877H18.2342V10.8275H10.4681V18.5936H7.8794V10.8275Z" fill="#F5ECBE"/>
</svg>

            </Box>
            <Box>
              <Text className=' text-[15px] text-white font-semibold'>Add product</Text>
            </Box>
          </Box>
        </Button>
      </Box>
      </Box>
      <Box>
      <Box className=' lg:mt-[40px] mt-[20px] grid lg:grid-cols-3 justify-center grid-cols-2 gap-y-[15px] gap-x-[10px] lg:gap-x-[20px] w-11/12 m-auto'>
          <Box className=' grid w-full'>
            <DashboardCard storeTracker={businessTracker} routeFunc={()=>setFormPage(1)} formPage={formPage} title={'Business Information'} />
          </Box>
          <Box className=' grid  w-full'>
            <DashboardCard storeTracker={storeTracker} routeFunc={()=>setFormPage(0)} formPage={formPage} title={'Store Information'} />
          </Box>
          <Box className=' grid w-full'>
            <DashboardCard storeTracker={paymentTracker} routeFunc={()=>setFormPage(2)} formPage={formPage} title={'Payment Information'} />
          </Box>
      </Box>
      <Box >
        {
         formPage ===1 && <BusinessInformation setbusinessTracker={setbusinessTracker}/>
       }
        {
          formPage ===0 && <StoreInformation  setPaymentTracker={setStoreTracker}/>
        }
         {
          formPage ===2 && <PaymentInformation setPaymentTracker={setPaymentTracker}/>
        }
      </Box>
          
      </Box>
    </div>
  )
}

export default Page