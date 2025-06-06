'use client'
import React, { useState } from 'react'
import { Box, Text, IconButton, Button } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import productOne from '../../../public/productOne.svg'
import productTwo from '../../../public/productTwo.svg'
import productThree from '../../../public/productThree.svg'
import Image from 'next/image'
  const Data=[{
    id:1,
    orderID:'#WM020231',
    price:'UGX20.00',
    orderName:'Watermelon',
    weight:'0.5kg',
    quantity:'56',
    date:'04/17/23 at 8:25 PM',
    status:'Available',
    productOne:productOne,
    customer:'Ronald Jones',
    shopper:'Muyango',
    // actions:'KES 450,000',
    // balance:'KES 0.00'
    productTwo:productTwo,
    productThree:productThree,
    remainingItems:8,
  },
{
    id:2,
    orderID:'#53200003',
    date:'Sep 4, 2020',
    customer:'Jacob Mckinney',
    shopper:'Kene pope',
    price:'UGX675.51',
    status:'Completed',
    // actions:'KES 450,000',
    // balance:'KES 0.00'
    productOne:productTwo,
    productTwo:productThree,
    productThree:productOne,
    remainingItems:5
  },
  {
    id:3,
    orderID:'#53200003',
    date:'Sep 4, 2020',
    customer:'Jacob Mckinney',
    shopper:'Kene pope',
    price:'UGX675.51',
    status:'Completed',
    // actions:'KES 450,000',
    // balance:'KES 0.00'
    productOne:productTwo,
    productTwo:productThree,
    productThree:productOne,
    remainingItems:2
  }

  ]

export const TableCard=({item})=>{
      const [handleDropDown, setHandleDropDown]= useState(false)
    const handleDropDownFunc=()=>{
        setHandleDropDown(!handleDropDown)
    }
return (
    <Box key={item.id} className=''>
            <Box key={item.id} className=' grid h-[62px] items-center bg-white rounded-lg '>
            <Box className=' w-11/12 m-auto' >
                    <Box className=' flex items-center justify-between gap-x-[10px]'>
            <Box className=' flex items-center gap-x-[10px]'>
                <Box className=' flex items-center gap-x-[10px]'>
                <Box>
                    <Checkbox /> 
                </Box>
                <Box className=' flex items-center gap-x-[5px]'>
                     <Box className=' flex items-center gap-x-[5px]'>
                                <Box>
                                  <Image src={item.productOne} alt='' />
                                </Box>
                                {/* <Box>
                                  <Image src={item.productTwo} alt='' />
                                </Box>
                                <Box>
                                  <Image src={item.productThree} alt='' />
                                </Box> */}
                                <Box className=' grid items-center justify-center'>
                                  <Text className=' text-[12px]'>{item.orderID}</Text>
                                </Box>
                                <Box className=' text-[12px]'>{item. orderName}</Box>
                              </Box>

                </Box>

                </Box>
            </Box>
            <Box>
                <IconButton
                icon={handleDropDown?<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6654 8.3335L7.9987 1.66683L1.33203 8.3335" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>:<svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33464 1.6665L8.0013 8.33317L14.668 1.6665" stroke="#454545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

}
onClick={handleDropDownFunc}
                />
            </Box>
        </Box>
            </Box>
            </Box>
        <Box>
            {handleDropDown && <Box className=' grid gap-y-[20px] pb-[20px] pt-[20px]'>
                <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Price</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        {item.price}
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>QTY</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        {item.remainingItems} items
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Customer</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        {item.customer}
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Shopper</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        {item.shopper}
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Date</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        {item.date}
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Status</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                        <Box className=' grid h-[29px] w-fit rounded-l-full rounded-r-full items-center justify-center bg-[#FFDCDC]'>
                        <Text className=' text-[#FF0000] text-[12px] pl-[10px] pr-[10px]'>{item.status}</Text>

                        </Box>
                    </Box>
                </Box>
                  <Box className='grid grid-cols-5 gap-x-[20px]'>
                    <Box className=' col-span-2'>
                        <Text className=' text-right text-[14px] text-[#737373]'>Action</Text>
                    </Box>
                    <Box className=' col-span-3 text-[14px] font-semibold'>
                         <Box className=' flex items-center gap-x-[5px]'>
                                  <IconButton
                                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 13.3335H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        }
                                  backgroundColor={'transparent'}
                                  />
                                   <IconButton
                                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4H3.33333H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.66797 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.33203 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        }
                                  backgroundColor={'transparent'}
                                  />
                                   <IconButton
                                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.9987 8.66683C8.36689 8.66683 8.66536 8.36835 8.66536 8.00016C8.66536 7.63197 8.36689 7.3335 7.9987 7.3335C7.63051 7.3335 7.33203 7.63197 7.33203 8.00016C7.33203 8.36835 7.63051 8.66683 7.9987 8.66683Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.6667 8.66683C13.0349 8.66683 13.3333 8.36835 13.3333 8.00016C13.3333 7.63197 13.0349 7.3335 12.6667 7.3335C12.2985 7.3335 12 7.63197 12 8.00016C12 8.36835 12.2985 8.66683 12.6667 8.66683Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.33464 8.66683C3.70283 8.66683 4.0013 8.36835 4.0013 8.00016C4.0013 7.63197 3.70283 7.3335 3.33464 7.3335C2.96645 7.3335 2.66797 7.63197 2.66797 8.00016C2.66797 8.36835 2.96645 8.66683 3.33464 8.66683Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        }
                                  backgroundColor={'transparent'}
                                  />
                                </Box>
                    </Box>
                </Box>
                
                </Box>}
        </Box>
            </Box>
)
}


function MobileProductTable() {
  
  return (
    <div className=' lg:hidden grid gap-y-[15px] bg-white pt-[20px] pb-[20px]'>
      {Data.map((item)=>{
        return(
            <TableCard key={item.id} item={item} />
        )
      })  }
    </div>
  )
}

export default MobileProductTable