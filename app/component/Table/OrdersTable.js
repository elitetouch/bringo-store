'use client'
import React, { useState } from 'react' 
import DataTable from 'react-data-table-component'
import { Box, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import productOne from '../../../public/productOne.svg'
import productTwo from '../../../public/productTwo.svg'
import productThree from '../../../public/productThree.svg'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
// import imp from '../../main_pages/Dashboard/AddProduct'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'


export const TableOptions=({id})=>{
  const router = useRouter()
  const [displayDropDown, setDisplayDropDown]= useState(false)
  const dropDownFunc=()=>{
    setDisplayDropDown(!displayDropDown)
  }
  return (
    <Box className=' flex items-center gap-x-[5px]'>
  <IconButton className=' h-[20px] w-[20px]' onClick={()=>router.push(`/../../main_pages/Dashboard/AddProduct?ProductId=${id}`)} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.3335H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>} />
 <IconButton onClick={dropDownFunc} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4H3.33333H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66797 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.33203 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>} />
    </Box>
  )
}

function OrdersTable({setDisplayBtn}) {
  const router = useRouter()
  const column=[
       {name:'Order ID',selector:row =><Text className='text-[12px]'>{row.orderID}</Text>
      },
    {
        name:'Products',selector:row =>(<Box className=' grid grid-cols-2'>
                    <Box className=' h-[20px] w-[20px]'>
                      <Image src={row.productOne} alt='' />
                    </Box>
                    <Box className=' h-[20px] w-[20px]'>
                      <Image src={row.productTwo} alt='' />
                    </Box>
                    <Box className=' h-[20px] w-[20px]'>
                      <Image src={row.productThree} alt='' />
                    </Box>
                    <Box border="1px" borderColor="gray.300" className=' h-[20px] w-[20px] rounded-full grid items-center justify-center'>
                      <Text>{row.remainingItems}</Text>
                    </Box>
                  </Box> )
      },
        {
        name:'Date',selector:row =><Text className='text-[12px]'>{row.date}</Text>
      },
      {
        name:'Customer',selector:row =><Text className='text-[12px]'>{row.customer}</Text>
      },
      {
        name:'Shopper',selector:row =><Text className='text-[12px]'>{row.shopper}</Text>
      },
      {
        name:'Price',selector:row =><Text className='text-[12px]'>{row.price}</Text>
      },
      {
        name:'Status',wrap:true,selector:row =><Box>
          <Text className={`${row.status==='Pending'&&'text-[#FF392B]'||row.status==='Available'&&'text-[#279F51]'||row.status==='shipping'&&'text-black'||row.status==='Refund'&&'text-[#FFA000]'}`}>{row.status}</Text>
        </Box>
      },
      {
        name:'Actions',selector:row => 
        <Box>
         <TableOptions id={row.id} />
        </Box>,
      },

    
  ]
  const Data=[{
    id:1,
    orderID:'#WM020231',
    price:'UGX20.00',
    orderName:'Watermelon',
    weight:'0.5kg',
    quantity:'56',
    date:'04/17/23 at 8:25 PM',
    status:'Pending',
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
    price:'UGX20.00',
    orderName:'Watermelon',
    weight:'0.5kg',
    quantity:'56',
    date:'04/17/23 at 8:25 PM',
    status:'Pending',
    productOne:productOne,
    customer:'Ronald Jones',
   shopper:'Kene pope',
    productOne:productTwo,
    productTwo:productThree,
    productThree:productOne,
    remainingItems:5,
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
  const customStyles = {
    // headCells: {
    //   style: {
    //     borderRight:'',
    //     backgroundColor:'brown',
    //     color:'white', // Add border to column headers
    //   },
    // },
    // cells: {
    //   style: {
    //     borderRight:``, // Add border between columns in the body
    //   },
    // },
  };
  return (
    <Box className=' lg:grid hidden'>
    <Box border="1px" borderColor="gray.300" borderRadius="lg" className='pt-[5px] pb-[20px] bg-white rounded-lg '>  
     <Box>
  <DataTable
    columns={column}
    data={Data}
    highlightOnHover
    customStyles={customStyles}
  />
</Box>

    </Box>
        
    </Box>
  )
}

export default OrdersTable