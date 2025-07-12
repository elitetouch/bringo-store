'use client'
import React from 'react'
import OrdersTable from '@/app/component/Table/OrdersTable'
import { Box, Text, Button } from '@chakra-ui/react'
import ProductSearch from '../component/ProductSearch'
import Filter from '../component/Filter'
import ExportButton from '../component/ExportButton'
import AddProduct from '../component/AddProduct'
import { IconButton } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import MobileOrderTable from '@/app/component/Table/MobileOrderTable'
export const OrderBreakDown=({title,sum, price,last_title })=>{
    return(
        <Box borderLeft={title != 'Total Returned' &&"1px"} borderColor="gray.300" className=' w-full'>
           <Box className=' lg:w-10/12 m-auto w-11/12'>
            <Box className=' justify-between items-center flex'>
            <Text className= {`text-[#1570EF] ${title==='Total Received'&&'text-[#E19133]'||title==='Total Returned'&&'#845EBC'||title==='On the way'&&'#F36960'}`}>{title}</Text>
            </Box>
            <Box className=' justify-between items-center flex'>
            <Text className=' text-[14px]  mt-[15px]'>{sum}</Text>
            <Text className=' text-[14px]  mt-[15px]'>{price}</Text>

            </Box>
            <Box className=' justify-between items-center flex'>
            <Text className=' text-[#858D9D] text-[14px] mt-[15px]'>Last 7 days</Text>
            <Text className=' text-[#858D9D] text-[14px] mt-[15px]'>{last_title}</Text>

            </Box>
           </Box>
        </Box>
    )
}

function Page() {
  return (
    <div className=' min-h-screen
    '>
      <Box className=' pt-[20px] '>
        <Box className='grid bg-white w-11/12 m-auto rounded-lg  '>
          <Box className=' w-11/12 m-auto pt-[15px]'>
            <Text className=' font-semibold lg:text-[20px] text-[18px] '>Overall Orders</Text>

          </Box>
           <Box className='flex  items-center gap-x-[20px] bg-white w-11/12 m-auto mt-[15px] pb-[15px] '>
           <Box className=' w-[108px] lg:grid hidden'>
            <Text className=' text-[#1570EF]'>Total Orders</Text>
            <Text className=' text-[14px]  mt-[15px]'>0</Text>
            <Text className=' text-[#858D9D] mt-[15px]'>Last 7 days</Text>
           </Box>
           <Box className=' grid lg:grid-cols-3 w-full grid-cols-2 gap-y-[20px] gap-x-[10px]'>
            <Box className=' w-11/12 m-auto lg:hidden grid'>
            <Text className=' text-[#1570EF]'>Total Orders</Text>
            <Text className=' text-[14px]  mt-[15px]'>0</Text>
            <Text className=' text-[#858D9D] text-[14px] mt-[15px]'>Last 7 days</Text>
           </Box>
        <OrderBreakDown title={'Total Received'} last_title={'Revenue'} sum={'0'} price={'0'} />
        <OrderBreakDown title={'Total Returned'} last_title={'Cost'} sum={'0'} price={'0'}/>
        <OrderBreakDown title={'On the way'} last_title={'Cost'} sum={'0'} price={'0'}/>
           </Box>
           </Box>

        </Box>

      </Box>
        <Box className=' bg-white w-11/12 m-auto rounded-lg mt-[20px]'>
          <Box className=' w-11/12 m-auto pt-[20px]'>
            <Text className=' font-semibold text-[20px] '>Orders</Text>
            <Box className=' flex items-center gap-x-[10px] text-[14px] mt-[10px]'>
                                         <Text className=' text-[#888888]'>Dashboard</Text>
                                            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                          <Text className=' text-[#888888]'>Orders</Text>
                                          <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                           <Text className=' text-[#007460] font-semibold'>All Orders</Text>
                                    </Box>
                                     <Box className=' lg:flex grid gap-y-[20px] items-center lg:justify-between  mt-[32px]'>
                      <Box>
                        <ProductSearch placing={'Search for id, name product'} />
                      </Box>
                      <Box className=' flex  items-center gap-x-[10px]'>
                      {/* <Filter />
                      <ExportButton /> */}
                      <AddProduct />
                      </Box>
                    </Box>
          </Box>
          <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' lg:h-[45px] grid items-center w-11/12 m-auto mt-[20px]'>
        
          <Box className=' grid lg:grid-cols-4 grid-cols-2 items-center lg:gap-x-[20px] lg:w-10/12 m-auto '>
            
              <Button _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={'transparent'} color={'#737373'} height={30} width={''}>
                <Text className=' text-[14px] font-semiBold'>All Orders (0)</Text>
              </Button>
              <Button _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={'transparent'} color={'#737373'} height={30} width={''}>
                <Text className=' text-[14px] font-semiBold'>Shipping (0)</Text>
              </Button>
              <Button _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={'transparent'} color={'#737373'} height={30} width={''}>
                <Text className=' text-[14px] font-semiBold'>Completed (0)</Text>
              </Button>
              <Button _hover={{backgroundColor:'#E6F1EF', color:'#007460'}} backgroundColor={'transparent'} color={'#737373'} height={30} width={''}>
                <Text className=' text-[14px] font-semiBold'>Cancel (0)</Text>
              </Button>
            
          </Box>

          </Box>
          <Box className=' w-11/12 m-auto mt-[20px] pb-[40px]'>
        <OrdersTable />
        <MobileOrderTable />
          </Box>
        </Box>
         <Box className=' flex items-center justify-between mt-[30px] w-10/12 m-auto pb-[30px]'>
                  <Box>
                    <Text className=' text-[#1A71F6] text-[12px]'><span>1</span> of 13 pages</Text>
                  </Box>
                  <Box className=' flex items-center gap-x-[20px]'>
                    <Text className=' text-[12px]'>The page on</Text>
                    <Box>
                    <Select width={35} height={30} placeholder=''>
          <option value='option1'>1</option>
          <option value='option2'>2</option>
          <option value='option3'>3</option>
        </Select>
                    </Box>
                    <IconButton
                    icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 14.6668L1.83333 8.00016L8.5 1.3335" stroke="#D1D1D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        }
                    />
                    <IconButton
                    icon={<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        }
                    />
                  </Box>
                </Box>
    </div>
  )
}

export default Page