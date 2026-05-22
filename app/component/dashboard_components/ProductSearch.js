import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";

function ProductSearch({ placing, value, onChange }) {
  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="lg"
      className="lg:w-[400px] w-full grid items-center"
    >
      <Box className="border flex items-center rounded-lg">
        <Input
          border={"none"}
          placeholder={placing}
          value={value}
          onChange={onChange}
          className="flex-1 text-[12px]"
          _focus={{ border: "none", boxShadow: "none" }}
        />
        <Box>
          <IconButton
            backgroundColor={"transparent"}
            aria-label="Search"
            icon={
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3891 10.8891L16 16.5M6.5 12.5C9.53757 12.5 12 10.0376 12 7C12 3.96243 9.53757 1.5 6.5 1.5C3.46243 1.5 1 3.96243 1 7C1 10.0376 3.46243 12.5 6.5 12.5Z"
                  stroke="#454545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductSearch;
