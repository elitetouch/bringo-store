import { Box, Text } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import Number_country from "@/app/component/DropDown/Number_country";
export const CountryPhoneInput = ({
  label,
  placing,
  names,
  values,
  changes,
}) => {
  return (
    <Box>
      <Box>
        <Text className=" text-[15px] font-semibold">{label}</Text>
      </Box>
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        className=" h-[50px] mt-[10px]"
      >
        <Box className=" flex items-center gap-x-[5px]">
          <Input
            className=" flex-1"
            border={"none"}
            placeholder={placing}
            name={names}
            value={values}
            onChange={changes}
          />
          <Box className="">
            <Number_country />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
