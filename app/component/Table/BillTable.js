'use client'
import React, { useState } from 'react' 
import DataTable from 'react-data-table-component'
import { Box, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

function BillTable({setDisplayBtn}) {
  const router = useRouter()
  const column=[
    {
        name:'Invoice',selector:row =>(<div className=' '>
          <Text className=' text-[12px]'>{row.invoice}</Text>
          </div> )
      },
      {
        name:'Billed (UGX)',selector:row =><Text className='text-[12px]'>{row.billed}</Text>
      },
      {
        name:'Date',selector:row =><Text className='text-[12px]'>{row.date}</Text>
      },
    
  ]
  const Data=[
//     {
//     id:1,
//     invoice:'Service fee - 01.04.2025 - 31.05.2025',
//     billed:'50,000',
//     date:'01.05.2025'
//   },
// {
//     id:2,
//    invoice:'Service fee - 01.04.2025 - 31.05.2025',
//     billed:'50,000',
//     date:'01.05.2025'
//   },
//   {
//     id:3,
//      invoice:'Service fee - 01.04.2025 - 31.05.2025',
//     billed:'50,000',
//     date:'01.05.2025'
//   }

  ]
  const customStyles = {
    headCells: {
      style: {
        borderRight:'',
        backgroundColor:'#F3F4F6',
        color:'black', // Add border to column headers
        
      },
    },
    // cells: {
    //   style: {
    //     borderRight:``, // Add border between columns in the body
    //   },
    // },
  };
  return (
    <Box className='grid '>
    <Box overflowX="auto" border="1px" borderColor="gray.300" borderRadius="lg" className=' rounded-lg  '>  
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
  <Box overflowX="auto" className="">
  <DataTable
    columns={column}
    data={Data}
    highlightOnHover
    customStyles={customStyles}
    pagination
    responsive 
  />
</Box>

    </Box>
        
    </Box>
  )
}

export default BillTable