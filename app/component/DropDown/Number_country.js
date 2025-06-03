import React, { useEffect, useState } from 'react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import uganda from '../../../public/Uganda.svg';
import kenya from '../../../public/ke.svg';
import nigeria from '../../../public/ng.svg';

const countries = [
  { name: 'Uganda', code: '+256', flag: uganda },
  { name: 'Kenya', code: '+254', flag: kenya },
  { name: 'Nigeria', code: '+234', flag: nigeria },
];

function Number_country({ dashboard, onChange, countryDetails }) {
  const [selected, setSelected] = useState(countries[0]);

  // Set default country from props
  useEffect(() => {
    if (countryDetails?.country) {
      const found = countries.find((c) => c.name === countryDetails.country);
      if (found) {
        setSelected(found);
      }
    }
  }, [countryDetails]);

  const handleSelect = (country) => {
    setSelected(country);
    if (onChange) {
      onChange(country.code);
    }
  };

  const isReadOnly = !!countryDetails?.country;

  return (
    <Box>
      {isReadOnly ? (
        // Read-only display
        <Box
          className={`w-[108px] rounded-l-lg rounded-r-lg h-[48px] ${
            dashboard ? 'bg-[#F6F6F6]' : 'bg-white'
          } grid items-center`}
        >
          <Box className="flex gap-x-[10px] items-center w-11/12 m-auto">
            <Image src={selected.flag} alt={selected.name} width={20} height={20} />
            <Text fontSize="sm">{selected.code}</Text>
          </Box>
        </Box>
      ) : (
        // Editable dropdown
        <Menu>
          <MenuButton
            as={Box}
            className={`w-[108px] rounded-l-lg rounded-r-lg h-[48px] ${
              dashboard ? 'bg-[#F6F6F6]' : 'bg-white'
            } grid items-center cursor-pointer`}
          >
            <Box className="flex gap-x-[10px] items-center w-11/12 m-auto">
              <Image src={selected.flag} alt={selected.name} width={20} height={20} />
              <svg
                width="11"
                height="5"
                viewBox="0 0 11 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.5 5L0.5 0H10.5L5.5 5Z" fill="#1D1B20" />
              </svg>
              <Text fontSize="sm">{selected.code}</Text>
            </Box>
          </MenuButton>

          <MenuList>
            {countries.map((country) => (
              <MenuItem key={country.code} onClick={() => handleSelect(country)}>
                <Box className="flex items-center gap-2">
                  <Image src={country.flag} alt={country.name} width={20} height={20} />
                  <Text fontSize="sm">
                    {country.name} ({country.code})
                  </Text>
                </Box>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Box>
  );
}

export default Number_country;
