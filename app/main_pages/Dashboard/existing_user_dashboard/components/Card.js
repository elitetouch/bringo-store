import React from 'react'
import { Box } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
function Card({card_title,percentageIncrease,cardSum,statuz}) {
  //  id:1,
  //       card_title:'Total Revenue',
  //       cardSum:'UGX810.00',
  //       percentageIncrease:'10.6%',
  //       statuz:'increase'
  return (
    <div className={` h-[151px] shadow-lg w-full grid items-center rounded-lg ${card_title==='Total Revenue'?'bg-[#007460]':'bg-[#FFFFFF]'} `}>
      <Box className=' p-[10px]'>
        <Box>
          <Box className=' flex items-center justify-between'>
            <Box>
              <Text className={`${card_title==='Total Revenue'?'text-[#FFFFFF]':' text-[#007460] '} text-[15px] font-semibold`}>{card_title}</Text>
            </Box>
            <Box className=' text-[12px]'>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 17L17 7" stroke={card_title !='Total Revenue'?'#007460':'#FFFFFF'} strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7 7H17V17" stroke={card_title != 'Total Revenue'?'#007460':'#FFFFFF'} strokeLinecap="round" strokeLinejoin="round"/>
</svg>

            </Box>
          </Box>
          <Box className=' flex items-center justify-between mt-[30px] gap-x-[10px]'>
            <Box>
              <Text className={`${card_title==='Total Revenue'?'text-[#FFFFFF]':' text-[#007460] '} text-[18px] lg:text-[28px]`}>{cardSum}</Text>
            </Box>
            <Box>
              <Box className=' flex items-center gap-x-[2px]'>
                {
                    statuz==='increase'?<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.55291 15.4186L6.38134 10.5196L11.2803 13.348L15.523 5.99958" stroke="#09DE13" strokeWidth="1.4" strokeMiterlimit="5.759" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.625 6.77637L15.5228 5.99991L16.2992 8.89769" stroke="#09DE13" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>:<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.41797 1.42578L4.42493 6.21725L9.2164 3.2103L13.7268 10.3975" stroke="#FF0000" strokeWidth="1.4" strokeMiterlimit="5.759" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.8035 9.72812L13.7279 10.3973L14.3971 7.4729" stroke="#FF0000" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                }
           <Text className={`${statuz==='increase'?'text-[#09DE13]':'text-[#FF0000]'} text-[10px]`}>{percentageIncrease}</Text>
              </Box>
              <Text className={`${card_title==='Total Revenue'?'text-[#FFFFFF]':' text-[#007460] '} text-[12px]`}></Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Card