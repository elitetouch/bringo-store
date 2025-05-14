import React from 'react'
import { Input } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
function Unboarding_input({placing, icon, names, values, handleChange}) {
  return (
    <div className=' w-full rounded-l-lg rounded-r-lg h-[48px] bg-white grid items-center'>
        <Box className=' flex items-center gap-x-[10px] w-11/12 m-auto'>
            {icon}
        <Input name={names} value={values} onChange={handleChange} border={'none'} className=' text-[#7C7C7C] text-[14px] mr-[10px]' placeholder={placing} />

        </Box>
    </div>
  )
}

export default Unboarding_input