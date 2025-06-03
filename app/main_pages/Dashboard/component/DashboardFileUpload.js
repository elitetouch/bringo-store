import React, { useRef, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

function DashboardFileUpload({ label, attachFile, names }) {
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  const name = e.target.name;
  if (file) {
    setFileName(file.name);
    if (attachFile && typeof attachFile === 'function') {
      attachFile((prev) => ({
        ...prev,
        [name]: file
      }));
    }
  }
};
  const handleBoxClick = () => {
    inputRef.current.click();
  };

  return (
    <Box>
      <Text className="text-[15px] font-semibold">
        {label}
      </Text>

      <div
        className="w-full rounded-l-lg rounded-r-lg h-[48px] grid items-center mt-[10px] bg-[#F6F6F6] text-[15px] cursor-pointer"
        onClick={handleBoxClick}
      >
        <Box className="flex items-center justify-between gap-x-[10px] w-11/12 m-auto">
          <Box className="flex items-center gap-2 overflow-hidden">
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
              name={names}
            />
            <Text className="text-[#666]" noOfLines={1}>
              {fileName || 'Upload file jpg, png max 500kb'}
            </Text>
          </Box>

          {/* Icon */}
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 20C3.96667 20 2.66667 19.4667 1.6 18.4C0.533333 17.3333 0 16.0333 0 14.5V4C0 2.9 0.391667 1.95833 1.175 1.175C1.95833 0.391667 2.9 0 4 0C5.1 0 6.04167 0.391667 6.825 1.175C7.60833 1.95833 8 2.9 8 4V13.5C8 14.2 7.75833 14.7917 7.275 15.275C6.79167 15.7583 6.2 16 5.5 16C4.8 16 4.20833 15.7583 3.725 15.275C3.24167 14.7917 3 14.2 3 13.5V4H4.5V13.5C4.5 13.7833 4.59583 14.0208 4.7875 14.2125C4.97917 14.4042 5.21667 14.5 5.5 14.5C5.78333 14.5 6.02083 14.4042 6.2125 14.2125C6.40417 14.0208 6.5 13.7833 6.5 13.5V4C6.5 3.3 6.25833 2.70833 5.775 2.225C5.29167 1.74167 4.7 1.5 4 1.5C3.3 1.5 2.70833 1.74167 2.225 2.225C1.74167 2.70833 1.5 3.3 1.5 4V14.5C1.5 15.6 1.89167 16.5417 2.675 17.325C3.45833 18.1083 4.4 18.5 5.5 18.5C6.6 18.5 7.54167 18.1083 8.325 17.325C9.10833 16.5417 9.5 15.6 9.5 14.5V4H11V14.5C11 16.0333 10.4667 17.3333 9.4 18.4C8.33333 19.4667 7.03333 20 5.5 20Z" fill="#A5A6AB" fillOpacity="0.88"/>
          </svg>
        </Box>
      </div>
    </Box>
  );
}

export default DashboardFileUpload;
