"use client";
import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import DashBoardInput from "./DashboardInput";
// import imp from '../../main_pages/Dashboard/AddProduct'
function AddProduct({ buttonText = "Add product", buttonFunc }) {
  const router = useRouter();
  return (
    <Button
      onClick={
        buttonFunc
          ? buttonFunc
          : () => router.push("/../../main_pages/Dashboard/AddProduct")
      }
      backgroundColor={"#0E4940"}
      className=" h-[40px] w-[120px] lg:w-[137px]"
    >
      <Box className=" flex items-center gap-x-[10px]">
        <Box>
          <svg
            width="12"
            height="12"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.8794 10.8275H0.113281V8.23877H7.8794V0.472656H10.4681V8.23877H18.2342V10.8275H10.4681V18.5936H7.8794V10.8275Z"
              fill="#F5ECBE"
            />
          </svg>
        </Box>
        <Box>
          <Text className=" text-[12px] text-white font-semibold">
            {buttonText}
          </Text>
        </Box>
      </Box>
    </Button>
  );
}

export default AddProduct;
