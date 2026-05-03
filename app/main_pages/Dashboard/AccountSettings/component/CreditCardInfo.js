import {
  Box,
  Text,
  Input,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
export const CreditCardInfo = ({ value, changes }) => {
  const [selectedPaymentMethod, setPaymentMethod] = useState("ug"); // default selection

  const handleSelect = (value) => {
    setPaymentMethod(value);
    console.log("Selected:", value);
  };
  return (
    <Box>
      <Text className=" text-[18px] font-semibold">
        Credit card information
      </Text>
      <Box className=" grid lg:grid-cols-2 gap-y-[20px] gap-x-[20px] mt-[20px]">
        <Box className=" ">
          <Box>
            <Text className=" text-[12px]">Full name</Text>
          </Box>
          <Box borderBottom="1px" borderColor="gray.300" className="mt-[10px]">
            <Input
              className=" flex-1"
              border={"none"}
              placeholder={"Uzumaki Naruto"}
              name={"creditFullName"}
              value={value.creditFullName}
              onChange={changes}
            />
          </Box>
        </Box>
        <Box>
          <Box className="">
            <Box>
              <Text className=" text-[12px]">Credit Card Number</Text>
            </Box>
            <Box
              borderBottom="1px"
              borderColor="gray.300"
              className="mt-[10px]"
            >
              <Box className=" flex items-center gap-x-[5px]">
                <Menu>
                  <MenuButton>
                    <Box className="flex items-center gap-x-[5px]">
                      <svg
                        width="38"
                        height="25"
                        viewBox="0 0 38 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="26" cy="12.5" r="12" fill="#F9E813" />
                        <circle
                          cx="12"
                          cy="12.5"
                          r="12"
                          fill="#F5172E"
                          fill-opacity="0.8"
                        />
                      </svg>
                      <svg
                        width="10"
                        height="5"
                        viewBox="0 0 10 5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.835938 0.833008L5.0026 4.99967L9.16927 0.833008H0.835938Z"
                          fill="#6A717F"
                        />
                      </svg>
                    </Box>
                  </MenuButton>
                  <MenuList width={10}>
                    <MenuItem
                      onClick={() => {
                        handleSelect("");
                      }}
                    >
                      <svg
                        width="38"
                        height="25"
                        viewBox="0 0 38 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="26" cy="12.5" r="12" fill="#F9E813" />
                        <circle
                          cx="12"
                          cy="12.5"
                          r="12"
                          fill="#F5172E"
                          fill-opacity="0.8"
                        />
                      </svg>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Input
                  className=" flex-1"
                  border={"none"}
                  placeholder={"XXXX XXXX XXXX XXXX"}
                  name={"creditNumber"}
                  value={value.creditNumber}
                  onChange={changes}
                />
              </Box>
              <Box></Box>
              {/* <Input className=' flex-1' border={'none'} placeholder={'Uzumaki Naruto'} name={'creditFullName'} value={value.creditFullName} onChange={changes} /> */}
            </Box>
          </Box>
        </Box>
        <Box className="">
          <Box>
            <Text className=" text-[12px]">Expiry date</Text>
          </Box>
          <Box borderBottom="1px" borderColor="gray.300" className="mt-[10px]">
            <Input
              className=" flex-1 text-[15px]"
              border={"none"}
              placeholder={"MM/YY"}
              name={"expiryDate"}
              value={value.expiryDate}
              onChange={changes}
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <Text className=" text-[12px]">CVV</Text>
          </Box>
          <Box borderBottom="1px" borderColor="gray.300" className="mt-[10px]">
            <Input
              type="password"
              className=" flex-1"
              border={"none"}
              placeholder={"***"}
              name={"cvv"}
              value={value.cvv}
              onChange={changes}
            />
          </Box>
        </Box>
      </Box>
      <Box className=" w-11/12 m-auto grid justify-end mt-[20px]">
        <Button height={42} backgroundColor={"#007460"}>
          <Text color={"white"} className=" text-[14px]">
            Link Card
          </Text>
        </Button>
      </Box>
    </Box>
  );
};
