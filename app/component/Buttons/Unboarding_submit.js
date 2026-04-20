"use client";
import React from "react";
import { Button, Text, Box } from "@chakra-ui/react";

function Unboarding_submit({
  submit_func,
  submit_loader,
  button_text,
  invalid, // true => form invalid
}) {
  const bg = invalid ? "#A3C66B" : "#85CB14"; // lighter when disabled
  const textColor = invalid ? "#6A7F3D" : "#0E4940";

  return (
    <div>
      <Button
        position={"unset"}
        isLoading={submit_loader}
        isDisabled={invalid || submit_loader}
        minWidth={121}
        className=" w-full lg:w-fit"
        onClick={submit_func}
        backgroundColor={bg}
        border={"1px"}
        borderColor={"white"}
        _hover={{ backgroundColor: invalid ? bg : "#74b010" }}
        _active={{ backgroundColor: invalid ? bg : "#5f960b" }}
      >
        <Box className=" flex items-center gap-x-[10px]">
          <svg
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.30078 14.3996L7.70078 8.99961L2.30078 3.59961"
              stroke={textColor}
              strokeWidth="1.5"
              strokeMiterlimit="3.3333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Box className=" text-[14px]" style={{ color: textColor }}>
            <Text>{button_text}</Text>
          </Box>
        </Box>
      </Button>
    </div>
  );
}

export default Unboarding_submit;
