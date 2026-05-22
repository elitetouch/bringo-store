"use client";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Box, Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/app/api/Api_Instance";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import MobileProductTable from "./MobileProductTable";

export const TableOptions = ({ productId, outletId, inventoryId }) => {
  console.log("productId", productId);
  console.log("outletId", outletId);
  const toast = useToast();
  const queryClient = useQueryClient();
  const [deleteLoader, setDeleteLoader] = useState(false);
  const deleteFunc = (id) => {
    setDeleteLoader(true);
    axiosInstance
      .delete(`/api/v1/merchant/outlets/${outletId}/inventory/${inventoryId}`)
      .then((resp) => {
        queryClient.invalidateQueries({ queryKey: ["Products"] });
        queryClient.invalidateQueries({ queryKey: ["Outlets"] });

        if (outletId) {
          queryClient.invalidateQueries({
            queryKey: ["outletInventory", outletId],
          });
        }
        toast({
          title: "Delete",
          description: "Product deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
          containerStyle: { zIndex: 99999 },
        });
        setDeleteLoader(false);
      })
      .catch((resp) => {
        let description = "Something went wrong. Please try again.";
        toast({
          title: "Error",
          description,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
          containerStyle: { zIndex: 99999 },
        });
        setDeleteLoader(false);
      });
  };
  const router = useRouter();
  return (
    <Box className=" flex items-center gap-x-[5px]">
      <IconButton
        onClick={() =>
          router.push(
            `/AssignProduct?outletId=${outletId}&productId=${productId}`,
          )
        }
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 13.3335H14"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11 2.33316C11.2652 2.06794 11.6249 1.91895 12 1.91895C12.1857 1.91895 12.3696 1.95553 12.5412 2.0266C12.7128 2.09767 12.8687 2.20184 13 2.33316C13.1313 2.46448 13.2355 2.62038 13.3066 2.79196C13.3776 2.96354 13.4142 3.14744 13.4142 3.33316C13.4142 3.51888 13.3776 3.70277 13.3066 3.87435C13.2355 4.04593 13.1313 4.20184 13 4.33316L4.66667 12.6665L2 13.3332L2.66667 10.6665L11 2.33316Z"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
      <IconButton
        isLoading={deleteLoader}
        onClick={() => deleteFunc(productId)}
        icon={
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H3.33333H14"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.33203 4.00016V2.66683C5.33203 2.31321 5.47251 1.97407 5.72256 1.72402C5.9726 1.47397 6.31174 1.3335 6.66536 1.3335H9.33203C9.68565 1.3335 10.0248 1.47397 10.2748 1.72402C10.5249 1.97407 10.6654 2.31321 10.6654 2.66683V4.00016M12.6654 4.00016V13.3335C12.6654 13.6871 12.5249 14.0263 12.2748 14.2763C12.0248 14.5264 11.6857 14.6668 11.332 14.6668H4.66536C4.31174 14.6668 3.9726 14.5264 3.72256 14.2763C3.47251 14.0263 3.33203 13.6871 3.33203 13.3335V4.00016H12.6654Z"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.66797 7.3335V11.3335"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.33203 7.3335V11.3335"
              stroke="#C8CAD8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />
    </Box>
  );
};

function ProductTable({ setDisplayBtn, data, outletId }) {
  const router = useRouter();
  const column = [
    {
      name: "Products",
      selector: (row) => (
        <div className=" flex items-center gap-x-[5px] gap-y-[5px] pt-[5px] pb-[5px]">
          {/* <Box borderRadius={5} className='grid h-[42px] w-[42px] justify-center items-center bg-[#F6F6F6]'>           
              <Image src={`https://store.bringofresh.net/${row.images[0]}`} width={42} height={42} alt='' className='h-[42px] w-[42px]' />          
          </Box> */}
          <Box
            className=" bg-gray-100 w-[42px] grid items-center justify-center h-[42px] overflow-hidden rounded-full"
            cursor={"pointer"}
          >
            {row?.product?.images && row?.product?.images?.length > 0 && (
              <Image
                src={row.product.images[0]}
                alt="Profile"
                width={500}
                height={500}
                unoptimized
                className=" h-[500px] w-[500px]"
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>

          <Box>
            <Text className=" text-[#007460]">
              {String(row?.product?.id ?? "").slice(0, 5)}
            </Text>
            <Text className="text-[12px]">{row?.product?.title}</Text>
          </Box>
        </div>
      ),
    },
    {
      name: "Price",
      selector: (row) => <Text className="text-[12px]">{row?.price}</Text>,
    },
    {
      name: "Brand",
      selector: (row) => (
        <Text className="text-[12px]">{row?.product?.product_brand_name}</Text>
      ),
    },
    {
      name: "QTY",
      selector: (row) => <Text className="text-[12px]">{row?.stock_qty}</Text>,
    },
    {
      name: "Date",
      selector: (row) => (
        <Text className="text-[12px]">
          {row?.product?.created_at
            ? new Date(row?.product?.created_at).toLocaleDateString()
            : ""}
        </Text>
      ),
    },
    {
      name: "Status",
      wrap: true,
      selector: (row) => (
        <Box>
          <Text
            className={`${row?.product?.is_active === true ? "text-[#279F51]" : "text-[#FF392B]"}`}
          >
            {row?.product?.is_active === true ? "Active" : "InActive"}
          </Text>
        </Box>
      ),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Box>
          <TableOptions
            productId={row?.product?.id}
            outletId={row?.store_outlet_id}
            inventoryId={row?.id}
          />
        </Box>
      ),
    },
  ];

  return (
    <>
      {/* Desktop */}
      <Box className="lg:grid hidden">
        <Box
          border="1px"
          borderColor="gray.300"
          borderRadius="lg"
          className="pt-[5px] pb-[20px] bg-white rounded-lg"
        >
          <DataTable
            columns={column}
            data={data}
            highlightOnHover
            selectableRows
          />
        </Box>
      </Box>

      {/* Mobile */}
      <MobileProductTable data={data} outletId={outletId} />
    </>
  );
}

export default ProductTable;
