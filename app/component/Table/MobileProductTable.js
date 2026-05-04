'use client'
import React, { useState } from 'react'
import { Box, Text, IconButton, useToast } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/app/api/Api_Instance'
import { useQueryClient } from '@tanstack/react-query'

const TableCard = ({ item, outletId }) => {
  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)

  const deleteFunc = () => {
    setDeleteLoader(true)
    axiosInstance
      .delete(`/api/v1/merchant/outlets/${outletId}/inventory/${item.id}`)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['Products'] })
        queryClient.invalidateQueries({ queryKey: ['Outlets'] })
        if (outletId) {
          queryClient.invalidateQueries({ queryKey: ['outletInventory', outletId] })
        }
        toast({
          title: 'Delete',
          description: 'Product deleted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setDeleteLoader(false)
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right',
        })
        setDeleteLoader(false)
      })
  }

  const isActive = item?.product?.is_active === true
  const createdAt = item?.product?.created_at
    ? new Date(item.product.created_at).toLocaleDateString()
    : '—'
  const resolvedOutletId = outletId ?? item?.store_outlet_id

  return (
    <Box className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      {/* Collapsed header */}
      <Box className="flex items-center justify-between px-[16px] h-[62px]">
        <Box className="flex items-center gap-x-[10px]">
          <Checkbox />
          <Box className="bg-gray-100 w-[42px] h-[42px] overflow-hidden rounded-full shrink-0 flex items-center justify-center">
            {item?.product?.images?.length > 0 && (
              <Image
                src={item.product.images[0]}
                alt="Product"
                width={42}
                height={42}
                unoptimized
                className="w-full h-full object-cover"
              />
            )}
          </Box>
          <Box>
            <Text className="text-[11px] text-[#007460] leading-tight">
              {String(item?.product?.id ?? '').slice(0, 5)}
            </Text>
            <Text className="text-[12px] font-semibold text-[#111827] leading-tight">
              {item?.product?.title}
            </Text>
          </Box>
        </Box>

        <IconButton
          size="sm"
          backgroundColor="transparent"
          aria-label="toggle details"
          onClick={() => setOpen((prev) => !prev)}
          icon={
            open ? (
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M14.6654 8.3335L7.9987 1.66683L1.33203 8.3335"
                  stroke="#454545"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M1.33464 1.6665L8.0013 8.33317L14.668 1.6665"
                  stroke="#454545"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          }
        />
      </Box>

      {/* Expanded details */}
      {open && (
        <Box className="grid gap-y-[14px] px-[16px] pb-[16px] pt-[4px] border-t border-gray-100">
          {[
            { label: 'Price', value: item?.price ?? '—' },
            { label: 'Brand', value: item?.product?.product_brand_name ?? '—' },
            { label: 'QTY', value: item?.stock_qty ?? '—' },
            { label: 'Date', value: createdAt },
          ].map(({ label, value }) => (
            <Box key={label} className="grid grid-cols-5 gap-x-[12px]">
              <Box className="col-span-2">
                <Text className="text-right text-[13px] text-[#737373]">{label}</Text>
              </Box>
              <Box className="col-span-3">
                <Text className="text-[13px] font-semibold text-[#111827]">{value}</Text>
              </Box>
            </Box>
          ))}

          {/* Status */}
          <Box className="grid grid-cols-5 gap-x-[12px]">
            <Box className="col-span-2">
              <Text className="text-right text-[13px] text-[#737373]">Status</Text>
            </Box>
            <Box className="col-span-3">
              <Box
                className={`w-fit px-[10px] py-[3px] rounded-full ${
                  isActive ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <Text
                  className={`text-[12px] font-semibold ${
                    isActive ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {isActive ? 'Active' : 'Inactive'}
                </Text>
              </Box>
            </Box>
          </Box>

          {/* Actions */}
          <Box className="grid grid-cols-5 gap-x-[12px]">
            <Box className="col-span-2">
              <Text className="text-right text-[13px] text-[#737373]">Action</Text>
            </Box>
            <Box className="col-span-3 flex items-center gap-x-[5px]">
              <IconButton
                backgroundColor="transparent"
                aria-label="Edit product"
                onClick={() =>
                  router.push(
                    `/../../main_pages/Dashboard/AssignProduct?outletId=${resolvedOutletId}&productId=${item?.product?.id}`,
                  )
                }
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                backgroundColor="transparent"
                aria-label="Delete product"
                isLoading={deleteLoader}
                onClick={deleteFunc}
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
          </Box>
        </Box>
      )}
    </Box>
  )
}

function MobileProductTable({ data, outletId }) {
  return (
    <div className="lg:hidden grid gap-y-[12px] pt-[12px] pb-[12px] px-[2px]">
      {!data?.length ? (
        <div className="py-10 text-center">
          <Text className="text-[#B0B0B0] text-[14px]">No products found.</Text>
        </div>
      ) : (
        data.map((item) => (
          <TableCard
            key={item.id}
            item={item}
            outletId={outletId ?? item?.store_outlet_id}
          />
        ))
      )}
    </div>
  )
}

export default MobileProductTable