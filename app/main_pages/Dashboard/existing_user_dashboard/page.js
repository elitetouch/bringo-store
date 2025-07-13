'use client'
import React from 'react'
import NewDashTable from '@/app/component/Table/NewDashTable'
import LineCharts from '@/app/component/Charts/LineCharts'
import { Box, IconButton } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Card_data } from './components/Card_data'
import Card from './components/Card'
import { SellingProduct } from './components/SellingProductData'
import Image from 'next/image'
import MobileTable from '@/app/component/Table/MobileTable'
import { useRouter } from 'next/navigation'
import { ProfileInfo } from '@/app/api/reactQuery'
//import imp from '../../../main_pages/Dashboard/new_user_dashboard'
function Page() {
  const router = useRouter()
  const profile= ProfileInfo()
  const ProfileObject= profile?.data?.data?.user
  console.log(ProfileObject)
  return (
    <div>
       
       <Box className=' w-11/12 m-auto lg:flex grid gap-y-[20px] justify-between items-center pt-[20px] lg:pt-[30px]'>
            <Box>
              <Text className=' text-[20px] font-bold'>Welcome, {ProfileObject?.fullname || ''}.</Text>
              <Text className=' text-[15px] mt-[10px]'>Please, complete your store set up to go live!</Text>
            </Box>
            <Box className=' lg:grid'>
              <Button onClick={()=>
                // router.push('/../../../main_pages/Dashboard/new_user_dashboard?newSupermarket=true')
                router.push('/../../../main_pages/Dashboard/AddProduct')} backgroundColor={'#0E4940'}>
                <Box className=' flex items-center lg:gap-x-[10px] gap-x-[5px] p-[5px]'>
                  <Box>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.8794 10.8275H0.113281V8.23877H7.8794V0.472656H10.4681V8.23877H18.2342V10.8275H10.4681V18.5936H7.8794V10.8275Z" fill="#F5ECBE"/>
      </svg>
      
                  </Box>
                  <Box cursor={'pointer'} >
                    <Text className=' text-[15px] text-white font-semibold'>Add Product</Text>
                  </Box>
                </Box>
              </Button>
            </Box>
            </Box>
             {/* <Box className=' lg:hidden grid justify-end pt-[20px]'>
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
            </Box> */}
            <Box className=' w-11/12 m-auto lg:mt-[40px] mt-[20px]'>
              <Box className=' grid lg:grid-cols-4 grid-cols-2 gap-y-[20px] gap-x-[20px]'>
                {
                  Card_data.map((item)=>{
                    return (
                      <Box key={item.id} className=' grid '>
                        <Card cardSum={item.cardSum} card_title={item.card_title} percentageIncrease={item.percentageIncrease} statuz={item.status} />
                      </Box>
                    )
                  })
                }
              </Box>
                <Box className='  lg:mt-[40px] mt-[20px] grid lg:grid-cols-5 gap-x-[20px] gap-y-[20px]'>
                <Box className=' lg:col-span-3'>
                  <LineCharts />
                </Box>
                <Box className=' lg:col-span-2'>
                  <Box className=' bg-white rounded-lg pt-[20px] w-full h-full pb-[20px]'>
                          <Box className=''>
                          <Box>
                              <Box borderBottom="1px" borderColor="gray.600" className=' flex items-center justify-between pb-[10px] w-11/12 m-auto'>
                                  <Box>
                                      <Text className=' lg:text-[18px] font-semibold text-[12px]'>Top Selling products</Text>
                                  </Box>
                                  <Box className=''>
                                    <IconButton
                                    backgroundColor={'transparent'}
                                    icon={ <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14C3.5 14.2967 3.41203 14.5867 3.24721 14.8334C3.08238 15.08 2.84812 15.2723 2.57403 15.3858C2.29994 15.4994 1.99834 15.5291 1.70737 15.4712C1.41639 15.4133 1.14912 15.2704 0.939341 15.0607C0.729562 14.8509 0.586701 14.5836 0.528823 14.2926C0.470945 14.0017 0.50065 13.7001 0.614181 13.426C0.727713 13.1519 0.919972 12.9176 1.16665 12.7528C1.41332 12.588 1.70333 12.5 2 12.5C2.39783 12.5 2.77936 12.658 3.06066 12.9393C3.34197 13.2206 3.5 13.6022 3.5 14ZM2 3.5C2.29667 3.5 2.58668 3.41203 2.83336 3.24721C3.08003 3.08238 3.27229 2.84811 3.38582 2.57403C3.49935 2.29994 3.52906 1.99834 3.47118 1.70737C3.4133 1.41639 3.27044 1.14912 3.06066 0.939341C2.85088 0.729562 2.58361 0.586701 2.29264 0.528823C2.00166 0.470945 1.70007 0.50065 1.42598 0.614181C1.15189 0.727713 0.917619 0.919972 0.752797 1.16665C0.587974 1.41332 0.500001 1.70333 0.500001 2C0.500001 2.39783 0.658036 2.77936 0.939341 3.06066C1.22065 3.34197 1.60218 3.5 2 3.5ZM2 6.5C1.70333 6.5 1.41332 6.58797 1.16665 6.7528C0.919972 6.91762 0.727713 7.15189 0.614181 7.42598C0.50065 7.70007 0.470945 8.00166 0.528823 8.29264C0.586701 8.58361 0.729562 8.85088 0.939341 9.06066C1.14912 9.27044 1.41639 9.4133 1.70737 9.47118C1.99834 9.52906 2.29994 9.49935 2.57403 9.38582C2.84812 9.27229 3.08238 9.08003 3.24721 8.83336C3.41203 8.58668 3.5 8.29667 3.5 8C3.5 7.60218 3.34197 7.22065 3.06066 6.93934C2.77936 6.65804 2.39783 6.5 2 6.5Z" fill="black"/>
</svg>}
                                    />
                                  </Box>
                              </Box>
                          </Box>
                          <Box className=' grid gap-y-[20px] w-11/12 m-auto pt-[20px]'>
                          {SellingProduct.length>0?SellingProduct.map((item)=>{
                            return(
                                <Box key={item.id} className=' flex items-center gap-x-[20px] w-full'>
                        <Box>
                         <Image src={item.images} alt='' /> 
                        </Box>
                        <Box className=' w-full'>
                          <Box className=' flex items-center justify-between'>
                            <Box>
                              <Text className=' text-[15px] font-semiBold'>{item.name}</Text>
                            </Box>
                            <Box>
                               <Text className=' text-[15px] font-bold'>{item.price}</Text>
                            </Box>
                          </Box>
                          <Box className=' flex items-center justify-between mt-[10px]'>
                            <Box>
                               <Text className=' text-[15px]'>{item.quantity} units</Text>
                            </Box>
                            <Box>
                               <Text className=' text-[15px]'>{item.sold} sold</Text>
                            </Box>
                          </Box>
                        </Box>
                     </Box>
                            )
                          }):<Box>
                            <Box className=' mt-[20px] text-center'>
                              <Text>No Available Product</Text>
                            </Box>
                            </Box>}

                          </Box>
                    
                  
                          </Box>
                      </Box>
                </Box>
                </Box>
                <Box className=' pt-[20px]'>
                  <NewDashTable />
                  <MobileTable />
                </Box>
            </Box>
    </div>
  )
}

export default Page