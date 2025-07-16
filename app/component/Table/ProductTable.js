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
import axiosInstance from '@/app/api/Api_Instance'
import { useToast } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
// import imp from '../../main_pages/Dashboard/AddProduct'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button
} from '@chakra-ui/react'

export const TableOptions=({id})=>{
  const toast = useToast()
   const queryClient = useQueryClient();
  const [deleteLoader, setDeleteLoader] = useState(false)
  const deleteFunc=(id)=>{
     setDeleteLoader(true)
     axiosInstance.delete(`/api/v1/products/${id}`).then((resp)=>{
       queryClient.invalidateQueries()
        toast({
      title: "Delete",
      description: 'Order Deleted successfully',
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    setDeleteLoader(false)
     }).catch((resp)=>{
      let description = "Something went wrong. Please try again.";
        toast({
      title: "Error",
       description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
       setDeleteLoader(false)
     })
  }
  const router = useRouter()
  const [displayDropDown, setDisplayDropDown]= useState(false)
  const dropDownFunc=()=>{
    setDisplayDropDown(!displayDropDown)
  }
  return (
    <Box className=' flex items-center gap-x-[5px]'>
  <IconButton onClick={()=>router.push(`/../../main_pages/Dashboard/AddProduct?ProductId=${id}`)} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.3335H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>} />
 <IconButton
 isLoading={deleteLoader}
 onClick={()=>deleteFunc(id)} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4H3.33333H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66797 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.33203 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>} />
    {/* {displayDropDown &&
   <Box className=' absolute top-0 z-10 bg-black'>
    <IconButton backgroundColor={'transparent'} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 13.3335H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>}>Edit</IconButton>
    <IconButton backgroundColor={'transparent'} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 4H3.33333H14" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.66797 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.33203 7.3335V11.3335" stroke="#C8CAD8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>}/>       
   </Box>
    } */}
    </Box>
  )
}

function ProductTable({setDisplayBtn, data}) {
  const router = useRouter()
  const column=[
    {
        name:'Products',selector:row =>(<div className=' flex items-center gap-x-[5px] gap-y-[5px] pt-[5px] pb-[5px]'>
          {/* <Box borderRadius={5} className='grid h-[42px] w-[42px] justify-center items-center bg-[#F6F6F6]'>           
              <Image src={`https://store.bringofresh.net/${row.images[0]}`} width={42} height={42} alt='' className='h-[42px] w-[42px]' />          
          </Box> */}<Box className=" bg-gray-100 w-[42px] grid items-center justify-center h-[42px] overflow-hidden rounded-full" cursor={'pointer'}>
                             <Image
            src={row.images[0]}
            alt="Profile"
            width={500}
            height={500}
            unoptimized
            className=' h-[500px] w-[500px]'
            style={{objectFit:'cover'}}
          />                      
                            </Box>

          <Box>
            <Text className=' text-[#007460]'>{row.orderID}</Text>
            <Text className='text-[12px]'>{row.productTitle}</Text>
          </Box>
          </div> )
      },
      {
        name:'Price',selector:row =><Text className='text-[12px]'>{row.salesPrice}</Text>
      },
      {
        name:'Brand',selector:row =><Text className='text-[12px]'>{row.brandName}</Text>
      },
      {
        name:'QTY',selector:row =><Text className='text-[12px]'>{row.quantity}</Text>
      },
      {
        name:'Date',selector:row =><Text className='text-[12px]'>{row.updatedAt}</Text>
      },
      {
        name:'Status',wrap:true,selector:row =><Box>
          <Text className={`${row.stockStatus==='Out of Stock'&&'text-[#FF392B]'||row.stockStatus==='instock'&&'text-[#279F51]'||row.status==='shipping'&&'text-black'||row.status==='Refund'&&'text-[#FFA000]'}`}>{row.stockStatus}</Text>
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
    {/* <Box className=' w-11/12 m-auto flex items-center justify-between  mb-[20px]'>
      <Text className=' text-[15px] font-semibold'>Latest Orders</Text>
      <IconButton
     icon={<Box className=' flex items-center gap-x-[5px] p-[10px]'>
      <Text className=' text-[15px]'>More</Text>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.33203 5.99967H10.6654M10.6654 5.99967L5.9987 1.33301M10.6654 5.99967L5.9987 10.6663" stroke="#8E95A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

     </Box>} 
      />
    </Box> */}
     <Box>
  <DataTable
    columns={column}
    data={data}
    highlightOnHover
  
  
    customStyles={customStyles}
    selectableRows
  />
</Box>

    </Box>
        
    </Box>
  )
}

export default ProductTable