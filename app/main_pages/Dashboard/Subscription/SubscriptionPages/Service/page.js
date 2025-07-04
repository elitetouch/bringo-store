'use client'
import React, { useState } from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
import { SubscriptionPlan } from '@/app/api/reactQuery'
function Page() {
    const toast = useToast()
      const [value, setValue] = React.useState('yearly')
       const [paymentPlan, setPaymentPlan] = React.useState('')
      const searchParams = useSearchParams(); 
        const plan = searchParams.get('plan');

 const subscriptionPlan = SubscriptionPlan()
    console.log(subscriptionPlan?.data?.data)
    const planz= subscriptionPlan?.data?.data?.package


        const [paymentLoader, setPaymentLoader] = useState('')
        const InitiatePayment=()=>{
            if(paymentPlan != ''){
                  setPaymentLoader(true)
               const formData = new FormData()
               value ==='yearly' && plan==='pro' && formData.append('package', `pro_year`)
            value ==='monthly' && plan==='pro' && formData.append('package', `pro_month`)
             value ==='monthly' && plan==='lite' && formData.append('package', `lite_month`)
                value ==='yearly' && plan==='lite' && formData.append('package', `lite_year`)
                   axiosInstance.post('/api/v1/payment/initiate',formData).then((resp)=>{
                       console.log(resp)
                        setPaymentLoader(false)
                        if (resp?.data?.payment_url) {
               // Redirect to the authorization URL
               window.location.href = resp?.data?.payment_url;
             }
           //   console.log(resp.data.url[0].data)
           //   console.log(resp.data.url[0].message)
           //   setVerifyPayment({'reference':resp.data.url[0].data.reference})
           //   if (resp.data.url) {
           //     // Redirect to the authorization URL
           //     window.location.href = resp.data.url[0].data.authorization_url;
           //   }
                   }).catch((error)=>{
                       setPaymentLoader(false)
                           console.log(error)
                   })
            }else{
                toast({
        title: "Error",
        description:"Please choose a Payment Method",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
            } 
        }
  return (
    <div className=' pb-[40px] lg:pb-[10px]'>
        <Box className=' bg-white rounded-lg pl-[10px] pr-[10px] mt-[20px] m-auto pb-[30px] '>
            <Box className=' grid w-11/12 m-auto lg:grid-cols-6 w-11/12 m-auto pt-[20px] gap-x-[20px]'>
                <Box className=' lg:col-span-4'>
                    <Box>
                        <Text className=' font-semibold text-[18px]'>Subscribe to {plan} Service fee </Text>
                        <Text className=' text-gray-700 text-[15px] pt-[10px]'>
                            At Bringo, we’re committed to helping supermarkets grow with ease and efficiency. To get started and manage your store on our platform, a service fee applies giving you access to powerful tools including inventory management, real-time order tracking, marketing support, and seamless customer engagement.
                        </Text>
                        <Box cursor={'pointer'} className='mt-[10px]'>
                        <Text className=' text-[#007460] text-[15px] '>Vew Terms & Agreement</Text>

                        </Box>
                    </Box>
                    <Box className=' mt-[15px]'>
                     <Text className=' text-[15px] font-semibold'>Billing Interval </Text> 
                     <Box className=' mt-[15px] pb-[40px]'>
                         <RadioGroup position={'unset'} onChange={setValue} value={value}>
      <Stack direction='column'>
        <Radio position={'unset'}  value='yearly'>
            <Box className=' flex items-center gap-x-[10px]'>
                <Box>
                    <Text className=' text-black text-[15px]'>Yearly – Save 10%</Text>
                    <Text className=' text-[#909296] text-[12px] mt-[5px]'>Description.</Text>
                </Box>
                <Box>
                    <Text className=' text-[#909296] text-[14px] italic'>(UGX5,000 per store monthly)</Text>
                </Box>
            </Box>

        </Radio>
        <Radio   position={'unset'} value='monthly'>
             <Box className=' flex items-center gap-x-[10px]'>
                <Box>
                    <Text className=' text-black text-[15px]'>Monthly</Text>
                    <Text className=' text-[#909296] text-[12px] mt-[5px]'>Description.</Text>
                </Box>
                {/* <Box>
                    <Text className=' text-[#909296] text-[14px] italic'>(UGX5,000 per store monthly)</Text>
                </Box> */}
            </Box>
        </Radio>
      </Stack>
      
    </RadioGroup>
                     <RadioGroup position={'unset'} onChange={setPaymentPlan} value={paymentPlan}>
                        <Box>
        <Box className=' mt-[20px]'>
            <Text className=' font-semibold text-[15px]'>Select Payment Method</Text>
        </Box>
         <Stack direction='row' marginTop={2}>
            <Box 
            border="1px" borderColor="gray.300" borderRadius="lg" shadow={'lg'}
            className=' flex items-center h-[40px] lg:w-[150px] w-fit grid items-center justify-center'>
                <Box>
            <Box className=' flex items-center lg:gap-x-[20px ] gap-x-[10px] pr-[5px] pl-[5px]'>

             <Box paddingRight={10}> <Text className=' text-[12px]'>Paystack</Text></Box>  
        <Radio position={'unset'} value='Paystack' />
        
            </Box>

                </Box>

            </Box>
              <Box 
              marginLeft={5}
            border="1px" borderColor="gray.300" borderRadius="lg" shadow={'lg'}
            className=' flex items-center h-[40px] lg:w-[150px] w-fit grid items-center justify-center'>
                <Box>
            <Box className=' flex items-center lg:gap-x-[20px ] gap-x-[10px] pr-[5px] pl-[5px]'>

             <Box paddingRight={10}> <Text className=' text-[12px]'>Pesapal</Text></Box>  
        <Radio position={'unset'} value='Pesapal'/>
       
            </Box>

                </Box>

            </Box>
        {/* <Radio value='Pesapal'>
             <Box></Box>
        </Radio> */}
      </Stack>
      </Box>
                     </RadioGroup>
                     </Box>
                    </Box>

                </Box>
                <Box className=' lg:col-span-2'>
                    <Box>
                        <Box border="1px" borderColor="gray.300" borderRadius="lg" shadow={'lg'}>
                            <Box className=' w-11/12 m-auto pt-[20px] pb-[20px]'>
                            <Text className=' text-[15px]'>Order Summary</Text>
                            <Box
                            className=' flex items-center justify-between text-[14px] font-semibold mt-[10px]'>
                                <Text>{plan} service fee</Text>
                                <Text className=''>{plan ==='lite'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_month}`)||plan ==='lite'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_year}`) ||plan ==='pro'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_month}`)|| plan ==='pro'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_year}`) }</Text>
                            </Box>
                            <Box
                             borderBottom={'1px'}
                             borderBottomColor={'#DEE2E6'}
                            className=' mt-[5px] pb-[10px]'>
                                <Text className=' lg:text-[15px] text-[14px] text-[#2C2E33]'>{plan ==='lite'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_month}`)||plan ==='lite'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_year}`) ||plan ==='pro'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_month}`)|| plan ==='pro'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_year}`) } / store / month – billed yearly</Text>
                            </Box>
                            <Box className=' flex mt-[20px] text-[15px] justify-between'>
                                <Text>Total</Text>
                                <Text className=' font-semibold'>{plan ==='lite'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_month}`)||plan ==='lite'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.lite_year}`) ||plan ==='pro'&& value==='monthly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_month}`)|| plan ==='pro'&& value==='yearly'&&(`${subscriptionPlan?.data?.data?.currency} ${planz?.pro_year}`) }</Text>
                            </Box>
                            <Box className=' mt-[20px] w-10/12 m-auto'>
                             <Button
                              isLoading={paymentLoader}
                             onClick={()=>InitiatePayment()}
                             backgroundColor={'#007460'} color={'white'} width={'full'}>
                                                <Box className=' flex items-center'>
                                                    <Text>Subscription</Text>
                                                </Box>
                                            </Button>
                            </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </div>
  )
}

export default Page