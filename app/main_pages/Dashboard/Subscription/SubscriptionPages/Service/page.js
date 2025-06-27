'use client'
import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
function Page() {
      const [value, setValue] = React.useState('yearly')
      const searchParams = useSearchParams(); 
        const plan = searchParams.get('plan');
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
                         <RadioGroup onChange={setValue} value={value}>
      <Stack direction='column'>
        <Radio value='yearly'>
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
        <Radio value='monthly'>
             <Box className=' flex items-center gap-x-[10px]'>
                <Box>
                    <Text className=' text-black text-[15px]'>Monthly</Text>
                    <Text className=' text-[#909296] text-[12px] mt-[5px]'>Description.</Text>
                </Box>
                <Box>
                    <Text className=' text-[#909296] text-[14px] italic'>(UGX5,000 per store monthly)</Text>
                </Box>
            </Box>
        </Radio>
      </Stack>
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
                                <Text className=''>{plan ==='Lite'&&'UGX 20,000'||plan ==='Pro'&&'UGX 50,000'}</Text>
                            </Box>
                            <Box
                             borderBottom={'1px'}
                             borderBottomColor={'#DEE2E6'}
                            className=' mt-[5px] pb-[10px]'>
                                <Text className=' lg:text-[15px] text-[14px] text-[#2C2E33]'>UGX 45000 / store / month – billed yearly</Text>
                            </Box>
                            <Box className=' flex mt-[20px] text-[15px] justify-between'>
                                <Text>Total</Text>
                                <Text className=' font-semibold'>UGX 45,000</Text>
                            </Box>
                            <Box className=' mt-[20px] w-10/12 m-auto'>
                             <Button backgroundColor={'#007460'} color={'white'} width={'full'}>
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