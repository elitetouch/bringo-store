import React from 'react'
import { Button, Text, Box } from '@chakra-ui/react'
function SubmitButton({loading, submitFunc,next, Edit}) {
  return (
    <Button onClick={submitFunc} isLoading={loading} backgroundColor={'#0E4940'}>
        <Box className=' p-[2px] flex items-center gap-x-[5px]'>
            <Box>
                {!Edit?<Text className=' text-[12px] text-white'>{next?'next':`Submit`}</Text>:<Text className=' text-[12px] text-white'>{Edit}</Text>}
            </Box>
        </Box>
    </Button>
  )
}

export default SubmitButton