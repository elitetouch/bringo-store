import React from 'react'
import ExportButton from '../component/ExportButton'
import Filter from '../component/Filter'
import AddProduct from '../component/AddProduct'
import ProductSearch from '../component/ProductSearch'
import { Box , Text, Button, IconButton} from '@chakra-ui/react'
import ProductTable from '@/app/component/Table/ProductTable'
import { Select } from '@chakra-ui/react'
import MobileProductTable from '@/app/component/Table/MobileProductTable'
function page() {
  return (
    <div className='lg:pt-[78px] pt-[30px] min-h-screen'>
            <Box className=' bg-white rounded-lg w-11/12 m-auto '>
                <Box className=' pt-[20px] pb-[20px]'>
                    <Box className=' w-11/12 m-auto'>
                        <Text className=' text-[20px] font-semibold'>Product</Text>
                        <Box className=' flex items-center gap-x-[10px] text-[14px] mt-[10px]'>
                             <Text className=' text-[#888888]'>Dashboard</Text>
                                <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
</svg>
                              <Text className=' text-[#888888]'>Product</Text>
                              <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
</svg>
                               <Text className=' text-[#007460] font-semibold'>Fruits</Text>
                        </Box>
                    </Box>
                    <Box className=' lg:flex grid gap-y-[20px] items-center lg:justify-between w-11/12 m-auto mt-[32px]'>
                      <Box>
                        <ProductSearch placing={'Search for id, name product'} />
                      </Box>
                      <Box className=' flex  items-center gap-x-[10px]'>
                      {/* <Filter />
                      <ExportButton /> */}
                      <AddProduct />
                      </Box>
                    </Box>
                    <Box></Box>
                    <Box className=' mt-[20px] w-11/12 m-auto'>
                      <ProductTable />
                      <MobileProductTable />
                    </Box>
                </Box>
            </Box>
            <Box className=' flex items-center justify-between mt-[30px] lg:w-10/12 w-11/12  m-auto pb-[30px]'>
                             <Box>
                               <Text className=' text-[#1A71F6] lg:text-[12px] text-[14px]'><span>1</span> of 13 pages</Text>
                             </Box>
                             <Box className=' flex items-center lg:gap-x-[20px] gap-x-[15px]'>
                               <Text className=' lg:text-[12px] text-[14px]'>The page on</Text>
                               <Box className=' pr-[5px]'>
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

export default page