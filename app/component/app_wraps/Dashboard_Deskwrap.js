"use client";
import React from "react";
import DashboardDeskSide from "../navbar/side_navbar/DashboardDeskSide";
import DashboardMobileSide from "../navbar/side_navbar/DashboardMobileSide";
import DashboardNav from "../navbar/top_navbar/DashboardNav";
import DashboardMobileNav from "../navbar/top_navbar/DashboardMobileNav";
import { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function Dashboard_Deskwrap({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toogleSideMenu, setToogleSideMenu] = useState(false);
  const toogleFunc = () => {
    setToogleSideMenu(!toogleSideMenu);
    //  toogleMobile()
  };
  return (
    <Box>
      <Box className="lg:flex">
        <Box>
          <Box className=" lg:grid hidden lg:fixed">
            <DashboardDeskSide
              toogleMobile={() => {}}
              toogleFunc={toogleFunc}
              toogleSideMenu={toogleSideMenu}
            />
          </Box>
          <DashboardMobileSide onClose={onClose} isOpen={isOpen} />
        </Box>
        <Box
          className={`lg:flex-1 ${!toogleSideMenu ? "lg:pl-[250px]" : "lg:pl-[110px]"}  `}
        >
          <Box className=" w-full">
            <DashboardMobileNav toogleSideNav={!isOpen ? onOpen : onClose} />
            <DashboardNav />
          </Box>
          <Box className=" bg-gray-100">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard_Deskwrap;
