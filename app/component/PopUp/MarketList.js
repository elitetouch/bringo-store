'use client';
import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
function MarketListPopUp({openSuccessfull,setOpenSuccessfull }) {
  
    return (
    <>
    <Box zIndex={100} onClick={setOpenSuccessfull} className={`fixed inset-0 z-10  flex lg:justify-center lg:flex-row flex-col justify-end h-screen items-center  transition-colors  ${openSuccessfull?"visible bg-[#8C8E98] bg-opacity-50":"invisible"}`}>
            <div onClick={(e)=>e.stopPropagation()} className={`bg-white rounded-lg grid lg:max-h-none max-h-[80vh] items-center lg:mt-auto  overscroll-y-auto custom-scrollbar flex-col 
                flex-none lg:w-6/12 w-11/12  m-auto  shadow lg:h-fit  overflow-y-scroll  p-6 transition-all  `}>
                 <Box>

                 </Box>
                </div>
    </Box>
    </>
  );
}
export default MarketListPopUp