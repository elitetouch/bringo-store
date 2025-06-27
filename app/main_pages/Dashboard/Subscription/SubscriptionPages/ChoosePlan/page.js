'use client'
import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
//import imp from '../ProService'
export const SubCard=({plan, price, planFunc})=>{
    return(
        <Box
        onClick={planFunc}
        cursor={'pointer'} className=' shadow-lg pb-[50px] rounded-lg'>
        <Box className=' w-11/12 m-auto'>
            <Box className=' mt-[10px]'>
                <Box className= {`rounded-l-full rounded-r-full h-[26px] w-[71px] grid items-center justify-center rounded-l-full rounded-r-full ${plan==='Lite'&&'text-[#CC9600]'||plan==='Pro'&&'text-[#3BC251]'} ${plan==='Lite'&&'bg-[#FFF8E6]'||plan==='Pro'&&'bg-[#EDFEF0]'}`}>
                     <Box className=' flex items-center justify-center gap-x-[5px]'>
                        <Box>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.11381 4.89963C3.95345 4.41855 3.57595 4.04105 3.09487 3.88069C2.60526 3.71748 2.60526 3.02494 3.09487 2.86174C3.57595 2.70138 3.95345 2.32388 4.11381 1.84279C4.27702 1.35318 4.96956 1.35318 5.13276 1.84279C5.29312 2.32388 5.67063 2.70138 6.15171 2.86174C6.64132 3.02494 6.64132 3.71748 6.15171 3.88069C5.67063 4.04105 5.29312 4.41855 5.13276 4.89963C4.96956 5.38925 4.27702 5.38925 4.11381 4.89963Z" stroke={plan==='Lite'&&'#CC9600'||plan==='Pro'&&'green'} stroke-linecap="round"/>
<path d="M4.22543 14.5494C3.90471 13.5872 3.1497 12.8322 2.18754 12.5115C1.20832 12.1851 1.20832 10.8 2.18754 10.4736C3.1497 10.1529 3.90471 9.39786 4.22544 8.43569C4.55184 7.45647 5.93692 7.45647 6.26333 8.43569C6.58405 9.39786 7.33906 10.1529 8.30122 10.4736C9.28044 10.8 9.28044 12.1851 8.30122 12.5115C7.33906 12.8322 6.58405 13.5872 6.26333 14.5494C5.93692 15.5286 4.55184 15.5286 4.22543 14.5494Z" stroke={plan==='Lite'&&'#CC9600'||plan==='Pro'&&'green'} stroke-linecap="round"/>
<path d="M10.1412 7.44609C10.8628 7.68663 11.4291 8.25288 11.6696 8.97451C11.9144 9.70892 12.9532 9.70892 13.198 8.97451C13.4386 8.25288 14.0048 7.68663 14.7265 7.44609C15.4609 7.20128 15.4609 6.16247 14.7265 5.91766C14.0048 5.67712 13.4386 5.11087 13.198 4.38924C12.9532 3.65483 11.9144 3.65483 11.6696 4.38924C11.4291 5.11087 10.8628 5.67712 10.1412 5.91766C9.40679 6.16247 9.40679 7.20128 10.1412 7.44609Z" stroke={plan==='Lite'&&'#CC9600'||plan==='Pro'&&'green'} stroke-linecap="round"/>
</svg>
                        </Box>
                        <Box>
                            <Text className=' text-[12px]'>{plan}</Text>
                        </Box>
                     </Box>
                </Box>
            </Box>
            <Box className=' mt-[20px]'>
                <Text className=' text-black font-semibold text-[20px]'>{price}</Text>
            </Box>
            <Box className='  flex items-center justify-between mt-[10px]'>
                <Box className=' text-[14px]'>
                     <Box>
                        <Text>per store</Text>
                     </Box>
                      <Box>
                        <Text>per month</Text>
                      </Box>
                </Box>
                 <Box className=' h-[24px] grid items-center rounded-l-full rounded-r-full bg-[#DEE2E6]'>
                    <Text className=' pl-[5px] pr-[5px] text-[#2C2E33] text-[12px]'>10% off Annual billing</Text>
                 </Box>
            </Box>
           {plan ==='Lite' && <Box className=' grid gap-y-[20px] mt-[20px]'>
                <Box className=' flex items-center gap-x-[5px]'>
                    <Box><svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4356 1.16351C13.7871 1.51498 13.7871 2.08483 13.4356 2.4363L5.63562 10.2363C5.28414 10.5878 4.71429 10.5878 4.36282 10.2363L0.462823 6.3363C0.111351 5.98483 0.111351 5.41498 0.462823 5.06351C0.814295 4.71203 1.38414 4.71203 1.73561 5.06351L4.99922 8.32711L12.1628 1.16351C12.5143 0.812034 13.0841 0.812034 13.4356 1.16351Z" fill="#32A06E"/>
</svg>
</Box>
                    <Box>
                        <Text className=' text-[12px]'>Add up to 3 stores</Text>
                    </Box>
                </Box>
                  <Box className=' flex items-center gap-x-[5px]'>
                    <Box><svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4356 1.16351C13.7871 1.51498 13.7871 2.08483 13.4356 2.4363L5.63562 10.2363C5.28414 10.5878 4.71429 10.5878 4.36282 10.2363L0.462823 6.3363C0.111351 5.98483 0.111351 5.41498 0.462823 5.06351C0.814295 4.71203 1.38414 4.71203 1.73561 5.06351L4.99922 8.32711L12.1628 1.16351C12.5143 0.812034 13.0841 0.812034 13.4356 1.16351Z" fill="#32A06E"/>
</svg>
</Box>
                    <Box>
                        <Text className=' text-[12px]'>Maximum of 500 product uploads per store</Text>
                    </Box>
                </Box>
            </Box>}
            {plan ==='Pro' && <Box className=' grid gap-y-[20px] mt-[20px]'>
                <Box className=' flex items-center gap-x-[5px]'>
                    <Box><svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4356 1.16351C13.7871 1.51498 13.7871 2.08483 13.4356 2.4363L5.63562 10.2363C5.28414 10.5878 4.71429 10.5878 4.36282 10.2363L0.462823 6.3363C0.111351 5.98483 0.111351 5.41498 0.462823 5.06351C0.814295 4.71203 1.38414 4.71203 1.73561 5.06351L4.99922 8.32711L12.1628 1.16351C12.5143 0.812034 13.0841 0.812034 13.4356 1.16351Z" fill="#32A06E"/>
</svg>
</Box>
                    <Box>
                        <Text className=' text-[12px]'>Unlimited stores</Text>
                    </Box>
                </Box>
                  <Box className=' flex items-center gap-x-[5px]'>
                    <Box><svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4356 1.16351C13.7871 1.51498 13.7871 2.08483 13.4356 2.4363L5.63562 10.2363C5.28414 10.5878 4.71429 10.5878 4.36282 10.2363L0.462823 6.3363C0.111351 5.98483 0.111351 5.41498 0.462823 5.06351C0.814295 4.71203 1.38414 4.71203 1.73561 5.06351L4.99922 8.32711L12.1628 1.16351C12.5143 0.812034 13.0841 0.812034 13.4356 1.16351Z" fill="#32A06E"/>
</svg>
</Box>
                    <Box>
                        <Text className=' text-[12px]'>Unlimited product uploads</Text>
                    </Box>
                </Box>
                 <Box className=' flex items-center gap-x-[5px]'>
                    <Box><svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4356 1.16351C13.7871 1.51498 13.7871 2.08483 13.4356 2.4363L5.63562 10.2363C5.28414 10.5878 4.71429 10.5878 4.36282 10.2363L0.462823 6.3363C0.111351 5.98483 0.111351 5.41498 0.462823 5.06351C0.814295 4.71203 1.38414 4.71203 1.73561 5.06351L4.99922 8.32711L12.1628 1.16351C12.5143 0.812034 13.0841 0.812034 13.4356 1.16351Z" fill="#32A06E"/>
</svg>
</Box>
                    <Box>
                        <Text className=' text-[12px]'>10% discount per store</Text>
                    </Box>
                </Box>
            </Box>}
            <Box className=' mt-[20px] w-11/12 m-auto'>
                <Button backgroundColor={'#007460'} color={'white'} width={'full'}>
                    <Box className=' flex items-center gap-x-[10px]'>
                        <Text>Subscription</Text>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.172 6.99992L6.808 1.63592L8.222 0.221924L16 7.99992L8.222 15.7779L6.808 14.3639L12.172 8.99992H0V6.99992H12.172Z" fill="#F5ECBE"/>
</svg>
                    </Box>
                </Button>
            </Box>
        </Box>
        </Box>
    )
}

function Page() {
    const router = useRouter()
    const ProFunc=(plan)=>{
     router.push(`./Service?plan=${plan}`)
    }
    const LiteFunc=()=>{}
  return (
    <div className=' min-h-screen'>
        <Box className=' mt-[20px] b-[20px]'>
        <Box className=' lg:w-11/12 m-auto rounded-lg bg-[#F9FAFB] pb-[20px] '>
                <Box className=' w-11/12 m-auto lg:pt-[20px] pt-[10px]'>
                    <Text className=' lg:text-[20px] text-[15px] font-bold'>Subscription</Text>
                </Box>
            <Box className=' mt-[20px] bg-white rounded-lg  w-11/12 m-auto pb-[20px] mb-[20px] '>

                <Box className=' lg:w-10/12 w-11/12  m-auto lg:pt-[40px] pt-[20px] text-center'>
                    <Text className=' font-bold lg:text-[30px] text-[25px]'>Choose a thing, please.</Text>
                    <Text className=' pt-[10px] text-[15px] font-semibold'>Bringo Service Fee Structure for Supermarkets</Text>
                    <Text className=' text-[15px] pt-[10px]'>
At Bringo, we’re committed to helping supermarkets grow with ease and efficiency. To get started and manage your store on our platform, a service fee applies giving you access to powerful tools including inventory management, real-time order tracking, marketing support, and seamless customer engagement.</Text>

                </Box>
        <Box className=' grid lg:grid-cols-2 mt-[40px] w-11/12 m-auto gap-x-[40px] gap-y-[40px] mb-[40px]'>
            <SubCard planFunc={()=>{ProFunc('Lite')}} plan={'Lite'} price={'UGX20,000'} />
             <SubCard planFunc={()=>{ProFunc('Pro')}} plan={'Pro'} price={'UGX50,000'} />
        </Box>
        </Box>
            </Box>
        </Box>
    </div>
  )
}

export default Page