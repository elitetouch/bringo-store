import React from 'react'
import { Select, Box } from '@chakra-ui/react'

function DropDown({ onChangeFunc, currentValue }) {
  const changeFunc = (e) => {
    const { name, value } = e.target
    onChangeFunc(e)
  }

  return (
    <div className="w-full rounded-l-lg rounded-r-lg h-[48px] bg-white grid items-center">
      <Box className="flex items-center gap-x-[10px] w-11/12 m-auto">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.0013 0.666992C2.16035 0.666992 0.667969 2.15938 0.667969 4.00033V14.0003C0.667969 15.8413 2.16035 17.3337 4.0013 17.3337H14.0013C15.8423 17.3337 17.3346 15.8413 17.3346 14.0003V4.00033C17.3346 2.15938 15.8423 0.666992 14.0013 0.666992H4.0013ZM2.33464 4.00033C2.33464 3.07985 3.08083 2.33366 4.0013 2.33366H14.0013C14.9218 2.33366 15.668 3.07985 15.668 4.00033V4.37894L6.97251 9.9744L2.33464 4.12665V4.00033ZM8.01323 11.2866L15.668 6.36086V14.0003C15.668 14.9208 14.9218 15.667 14.0013 15.667H11.4873L8.01323 11.2866ZM9.36011 15.667H4.0013C3.08083 15.667 2.33464 14.9208 2.33464 14.0003V6.80879L9.36011 15.667Z"
            fill="#A5A6AB"
            fillOpacity="0.88"
          />
        </svg>

        <div className="flex-1">
          <Select
            name="country"
            value={currentValue.country}
            onChange={changeFunc}
            color="#A5A6AB"
            border="none"
            placeholder="Select country"
            className="text-[#A5A6AB]"
          >
            <option value="Uganda">Uganda</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Kenya">Kenya</option>
          </Select>
        </div>
      </Box>
    </div>
  )
}

export default DropDown
