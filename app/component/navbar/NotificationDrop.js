import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Kriston from '../../../public/kriston.svg'
import Image from 'next/image'
const Data=[
    {
        id:1,
        name:'Kristin Watson alexander',
        message:'Rate 5 stars for Nakasero market.',
        date:'Jun 23',
        status:'online',
        avatarAttachment:<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.67764 0.9856C5.40597 0.416259 4.59555 0.416258 4.32387 0.9856L3.49015 2.73281L1.57082 2.98581C0.94539 3.06825 0.694956 3.83901 1.15248 4.27332L2.55654 5.60616L2.20405 7.50973C2.08919 8.13003 2.74484 8.60638 3.29928 8.30546L5.00076 7.38199L6.70224 8.30546C7.25668 8.60638 7.91232 8.13003 7.79746 7.50973L7.44498 5.60616L8.84904 4.27333C9.30656 3.83901 9.05613 3.06825 8.4307 2.98581L6.51137 2.73281L5.67764 0.9856Z" fill="white"/>
</svg>,
        avatar:Kriston
    },
       {
        id:2,
        name:'Kristin Watson alexander',
        message:'Rate 5 stars for Nakasero market.',
        date:'Jun 23',
        status:'online',
        avatarAttachment:<svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.67764 0.9856C5.40597 0.416259 4.59555 0.416258 4.32387 0.9856L3.49015 2.73281L1.57082 2.98581C0.94539 3.06825 0.694956 3.83901 1.15248 4.27332L2.55654 5.60616L2.20405 7.50973C2.08919 8.13003 2.74484 8.60638 3.29928 8.30546L5.00076 7.38199L6.70224 8.30546C7.25668 8.60638 7.91232 8.13003 7.79746 7.50973L7.44498 5.60616L8.84904 4.27333C9.30656 3.83901 9.05613 3.06825 8.4307 2.98581L6.51137 2.73281L5.67764 0.9856Z" fill="white"/>
</svg>,
        avatar:Kriston
    },
]

function NotificationDrop() {
  return (
    <div className=' pb-[20px] w-[392px]'>
        <Box className=' flex items-center justify-between w-11/12 m-auto pt-[15pxpx]'>
            <Text className=' text-[18px] font-semibold'>Notification</Text>
                <IconButton
                backgroundColor={'transparent'}
                icon={<svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.20156 2.01191C4.20156 3.00603 3.39567 3.81191 2.40156 3.81191C1.40745 3.81191 0.601562 3.00603 0.601562 2.01191C0.601562 1.0178 1.40745 0.211914 2.40156 0.211914C3.39567 0.211914 4.20156 1.0178 4.20156 2.01191Z" fill="#303030"/>
<path d="M10.8016 2.01191C10.8016 3.00603 9.99568 3.81191 9.00156 3.81191C8.00745 3.81191 7.20156 3.00603 7.20156 2.01191C7.20156 1.0178 8.00745 0.211914 9.00156 0.211914C9.99568 0.211914 10.8016 1.0178 10.8016 2.01191Z" fill="#303030"/>
<path d="M15.6016 3.81191C16.5957 3.81191 17.4016 3.00603 17.4016 2.01191C17.4016 1.0178 16.5957 0.211914 15.6016 0.211914C14.6074 0.211914 13.8016 1.0178 13.8016 2.01191C13.8016 3.00603 14.6074 3.81191 15.6016 3.81191Z" fill="#303030"/>
</svg>
}
                />
        </Box>
        <Box className=' mt-[20px] w-11/12 m-auto grid gap-y-[10px]'>
                {
                    Data.map((item)=>{
                       return( <Box cursor={'pointer'} borderBottom="1px" borderColor="gray.200" key={item.id} className='  h-[74px] grid items-center'>
                            <Box className='flex items-center gap-x-[20px] w-full '>
                            <Box className=' relative w-fit'>
                            <Image alt='' src={item.avatar} />
                            <Box className=' absolute bottom-0 right-0 h-[] w-[] rounded-full bg-[#FFB800]'>{item.avatarAttachment}</Box>
                            </Box>
                            <Box className=' w-full'>
                                <Box className=' flex items-center justify-between w-full '>
                                    <Box>
                                        <Text className=' font-semibold text-[15px]'>{item.name}</Text>
                                        
                                    </Box>
                                    <Box className=' flex items-center gap-x-[10px]'>
                                        <Text className='text-[15px]'>{item.date}</Text>
                                        <Box>
                                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.511719" width="10" height="10" rx="5" fill="#4188FF"/>
</svg>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className=' mt-[10px]'>
                                    <Text className=' text-[15px]'>{item.message}</Text>
                                </Box>
                            </Box>

                            </Box>
                        </Box>)
                    })
                }
        </Box>
        <Box className=' mt-[20px] grid justify-center'>
            <Button backgroundColor={'#007460'} className=' h-[41px] rounded-lg grid items-center justify-center w-full m-auto'>
            <Text className=' text-white'>See all notifications</Text>
            </Button>
        </Box>
    </div>
  )
}

export default NotificationDrop