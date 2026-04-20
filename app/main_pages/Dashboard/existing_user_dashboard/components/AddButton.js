"use client";
import { Button, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const AddButton = ({
  text = "Add Product",
  onClick,
  href = "/main_pages/Dashboard/AddProduct",
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <Button
      onClick={handleClick}
      backgroundColor="#007460"
      _hover={{ bg: "#0c3a34" }}
      _active={{ bg: "#0a2c26" }}
      height={14}
    >
      <Box className="flex items-center lg:gap-x-[10px] gap-x-[5px] p-[5px]">
        <Box>
          <svg
            width="19"
            height="19"
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
        <Box cursor="pointer">
          <Text className="text-[15px] text-white font-semibold">{text}</Text>
        </Box>
      </Box>
    </Button>
  );
};

export default AddButton;
