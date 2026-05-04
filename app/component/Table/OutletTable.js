"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const TableOptions = ({ id }) => {
  const router = useRouter();
  const [displayDropDown, setDisplayDropDown] = useState(false);
  const dropDownFunc = () => {
    setDisplayDropDown(!displayDropDown);
  };

  return (
    <Box className=" flex items-center gap-x-[5px]">
      <IconButton
        onClick={dropDownFunc}
        icon={
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H15C16.1046 18 17 17.1046 17 16V10M6 13V10.5L14.75 1.75C15.4404 1.05964 16.5596 1.05964 17.25 1.75V1.75C17.9404 2.44036 17.9404 3.55964 17.25 4.25L12.5 9L8.5 13H6Z"
              stroke="#454545"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        }
      />
    </Box>
  );
};

function OrderTable({ setDisplayBtn }) {
  const router = useRouter();
  const column = [
    {
      name: "Order ID",
      selector: (row) => <Text className="text-[12px]">{row.orderID}</Text>,
    },
    {
      name: "Date",
      selector: (row) => <Text className="text-[12px]">{row.date}</Text>,
    },
    {
      name: "Customer",
      selector: (row) => <Text className="text-[12px]">{row.customer}</Text>,
    },
    {
      name: "Shopper",
      selector: (row) => <Text className="text-[12px]">{row.shopper}</Text>,
    },
    {
      name: "Price",
      selector: (row) => <Text className="text-[12px]">{row.price}</Text>,
    },
    {
      name: "Status",
      wrap: true,
      selector: (row) => (
        <Box>
          <Text
            className={`${(row.status === "Pending" && "text-[#FF392B]") || (row.status === "Available" && "text-[#279F51]") || (row.status === "shipping" && "text-black") || (row.status === "Refund" && "text-[#FFA000]")}`}
          >
            {row.status}
          </Text>
        </Box>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box>
          <TableOptions id={row.id} />
        </Box>
      ),
    },
  ];

  return (
    <Box className=" lg:grid hidden">
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        className="pt-[5px] pb-[20px] bg-white rounded-lg "
      >
        <Box>
          <DataTable
            columns={column}
            data={[]}
            highlightOnHover
            // customStyles={customStyles}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default OrderTable;
