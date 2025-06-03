import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'

function DashboardCard({title, routeFunc,formPage,storeTracker}) {
  return (
    <Box cursor={'pointer'} onClick={routeFunc && routeFunc}
     border={formPage  ===0&&title==='Store Information'&&"1px"||formPage===1&&title==='Business Information'&&"1px"||formPage===2&&title==='Payment Information'&&"1px"}
     borderColor={formPage  ===0&&title==='Store Information'&&"#92DF16"||formPage===1&&title==='Business Information'&&"#92DF16"||formPage===2&&title==='Payment Information'&&"#92DF16"} 
     borderRadius="lg" 
     className='  lg:max-w-[351px] w-full h-[150px] rounded-lg grid items-center bg-white'>
        <Box className=' w-11/12 m-auto pt-[5px]'>
            <Box className=' flex items-center justify-between gap-x-[10px]'>
                <Box className=' flex items-center lg:gap-x-[10px] gap-x-[5px]'>
                    <Box className=' rounded-lg bg-[#0E4940] grid justify-center items-center h-[30px] w-[30px] lg:h-[40px] lg:w-[40px]'>
                       <svg className='' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
 
                    </Box>
                    <Box>
                        <Text className=' lg:text-[12px] text-[10px]'>{title}</Text>
                    </Box>
                </Box>
                <Box>
                    <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 14C3.5 14.2967 3.41203 14.5867 3.24721 14.8334C3.08238 15.08 2.84812 15.2723 2.57403 15.3858C2.29994 15.4994 1.99834 15.5291 1.70737 15.4712C1.41639 15.4133 1.14912 15.2704 0.939341 15.0607C0.729562 14.8509 0.586701 14.5836 0.528823 14.2926C0.470945 14.0017 0.50065 13.7001 0.614181 13.426C0.727713 13.1519 0.919972 12.9176 1.16665 12.7528C1.41332 12.588 1.70333 12.5 2 12.5C2.39783 12.5 2.77936 12.658 3.06066 12.9393C3.34197 13.2206 3.5 13.6022 3.5 14ZM2 3.5C2.29667 3.5 2.58668 3.41203 2.83336 3.24721C3.08003 3.08238 3.27229 2.84811 3.38582 2.57403C3.49935 2.29994 3.52906 1.99834 3.47118 1.70737C3.4133 1.41639 3.27044 1.14912 3.06066 0.939341C2.85088 0.729562 2.58361 0.586701 2.29264 0.528823C2.00166 0.470945 1.70007 0.50065 1.42598 0.614181C1.15189 0.727713 0.917619 0.919972 0.752797 1.16665C0.587974 1.41332 0.500001 1.70333 0.500001 2C0.500001 2.39783 0.658036 2.77936 0.939341 3.06066C1.22065 3.34197 1.60218 3.5 2 3.5ZM2 6.5C1.70333 6.5 1.41332 6.58797 1.16665 6.7528C0.919972 6.91762 0.727713 7.15189 0.614181 7.42598C0.50065 7.70007 0.470945 8.00166 0.528823 8.29264C0.586701 8.58361 0.729562 8.85088 0.939341 9.06066C1.14912 9.27044 1.41639 9.4133 1.70737 9.47118C1.99834 9.52906 2.29994 9.49935 2.57403 9.38582C2.84812 9.27229 3.08238 9.08003 3.24721 8.83336C3.41203 8.58668 3.5 8.29667 3.5 8C3.5 7.60218 3.34197 7.22065 3.06066 6.93934C2.77936 6.65804 2.39783 6.5 2 6.5Z" fill="black"/>
</svg>

                </Box>
            </Box>
            <Box className=' mt-[15px]'>
             <Progress colorScheme='green' size='sm' value={storeTracker*10} />
            </Box>
            <Box className=' flex items-center justify-between lg:text-[15px] text-[12px] mt-[15px]'>
                <Text>
                    {storeTracker*10}%
                </Text>
                <Text className=' font-semibold'>
                    Completed
                </Text>
            </Box>
        </Box>
    </Box>
  )
}

export default DashboardCard