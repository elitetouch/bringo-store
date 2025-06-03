'use client'
import React, { useState } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import DashboardDeskSide from './DashboardDeskSide';

function DashboardMobileSide({ onClose, isOpen }) {
  // const [mobileTog, setMobileRTog] = useState(false)
 const mobileTogFunc=()=>{
  onClose()
 }
  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent w="fit-content" maxW="80vw" p={0}>
        <DrawerBody p={0}>
          <DashboardDeskSide mobileTog toogleMobile={()=>mobileTogFunc()} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default DashboardMobileSide;
