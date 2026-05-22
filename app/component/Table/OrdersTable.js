"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { Box, Text, Tooltip, Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileProductTable from "./MobileProductTable";
export const TableOptions = ({ id, onEdit }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("ProductId");

  return (
    <Box className="flex items-center gap-x-[8px]">
      {/* Edit icon — shown only when not in product assignment flow */}
      {!productId && (
        <Tooltip label="Edit outlet" fontSize="xs">
          <IconButton
            aria-label="Edit outlet"
            size="sm"
            backgroundColor="transparent"
            onClick={() =>
              onEdit
                ? onEdit(id)
                : router.push(
                    `/existing_user_dashboard?outletId=${id}`,
                  )
            }
            icon={
              <svg
                width="17"
                height="17"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2H3C1.89543 2 1 2.89543 1 4V16C1 17.1046 1.89543 18 3 18H15C16.1046 18 17 17.1046 17 16V10M6 13V10.5L14.75 1.75C15.4404 1.05964 16.5596 1.05964 17.25 1.75V1.75C17.9404 2.44036 17.9404 3.55964 17.25 4.25L12.5 9L8.5 13H6Z"
                  stroke="#454545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </Tooltip>
      )}

      {/* Assign button — shown only when ProductId is in params */}
      {productId && (
        <Button
          size="sm"
          backgroundColor="#007460"
          color="white"
          _hover={{ backgroundColor: "#005a4a" }}
          onClick={() =>
            router.push(
              `/AssignProduct?outletId=${id}&productId=${productId}`,
            )
          }
        >
          <Text className="text-[12px] font-semibold">Assign</Text>
        </Button>
      )}
    </Box>
  );
};

function OutletsTable({ data, onEdit, onRowClick }) {
  const column = [
    {
      name: "Name",
      selector: (row) => (
        <Text className="text-[12px] font-semibold">{row.name}</Text>
      ),
    },
    {
      name: "Store Brand",
      selector: (row) => (
        <Text className="text-[12px]">{row.store_brand?.name ?? "—"}</Text>
      ),
    },
    {
      name: "City",
      selector: (row) => <Text className="text-[12px]">{row.city}</Text>,
    },
    {
      name: "State",
      selector: (row) => <Text className="text-[12px]">{row.state}</Text>,
    },
    {
      name: "Country",
      selector: (row) => (
        <Text className="text-[12px]">{row.country?.name ?? "—"}</Text>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <Box
          className={`px-2 py-1 rounded-full ${
            row.status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-500"
          }`}
        >
          <Text className="text-[12px] font-semibold capitalize">
            {row.status}
          </Text>
        </Box>
      ),
    },
    {
      name: "Actions",
      cell: (row) => <TableOptions id={row.id} onEdit={onEdit} />,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        color: "#535961",
      },
    },
  };

  const rows = data ?? [];

  return (
    <Box className="grid">
      {/* Desktop table */}
      <Box
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        className="hidden lg:block pt-[5px] pb-[20px] bg-white rounded-lg"
      >
        <DataTable
          columns={column}
          data={rows}
          highlightOnHover
          onRowClicked={onRowClick}
          pointerOnHover={!!onRowClick}
          customStyles={customStyles}
          noDataComponent={
            <Box className="py-10 text-center">
              <Text className="text-[#B0B0B0] text-[14px]">
                No outlets found.
              </Text>
            </Box>
          }
        />
      </Box>

      {/* Mobile card list */}
      <div className="flex flex-col gap-y-[12px] lg:hidden">
        {rows.length === 0 ? (
          <div className="py-10 text-center">
            <Text className="text-[#B0B0B0] text-[14px]">
              No outlets found.
            </Text>
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="bg-white border border-gray-200 rounded-xl px-[16px] py-[14px] shadow-sm"
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? "pointer" : "default" }}
            >
              {/* Header row: name + status */}
              <div className="flex items-center justify-between mb-[10px]">
                <Text className="text-[14px] font-semibold text-[#111827]">
                  {row.name}
                </Text>
                <Box
                  className={`px-2 py-[2px] rounded-full ${
                    row.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  <Text className="text-[11px] font-semibold capitalize">
                    {row.status}
                  </Text>
                </Box>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-x-[12px] gap-y-[6px] mb-[12px]">
                <div>
                  <Text className="text-[10px] text-[#9CA3AF] uppercase font-semibold">
                    Store Brand
                  </Text>
                  <Text className="text-[12px] text-[#374151]">
                    {row.store_brand?.name ?? "—"}
                  </Text>
                </div>
                <div>
                  <Text className="text-[10px] text-[#9CA3AF] uppercase font-semibold">
                    City
                  </Text>
                  <Text className="text-[12px] text-[#374151]">
                    {row.city || "—"}
                  </Text>
                </div>
                <div>
                  <Text className="text-[10px] text-[#9CA3AF] uppercase font-semibold">
                    State
                  </Text>
                  <Text className="text-[12px] text-[#374151]">
                    {row.state || "—"}
                  </Text>
                </div>
                <div>
                  <Text className="text-[10px] text-[#9CA3AF] uppercase font-semibold">
                    Country
                  </Text>
                  <Text className="text-[12px] text-[#374151]">
                    {row.country?.name ?? "—"}
                  </Text>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 pt-[10px]">
                <TableOptions id={row.id} onEdit={onEdit} />
              </div>
            </div>
          ))
        )}
      </div>
    </Box>
  );
}

export default OutletsTable;
