"use client";
import React, { useMemo } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import axiosInstance from "@/app/api/Api_Instance";
//import imp from '../../../main_pages/Dashboard/new_user_dashboard'
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/app/component/Store/useStore";
import { Outlets } from "@/app/api/reactQuery";
import { NewOutlet } from "@/app/main_pages/Dashboard/existing_user_dashboard/components/NewOutletModal";
import OutletsTable from "@/app/component/Table/OrdersTable";
import MobileOrderTable from "@/app/component/Table/MobileOrderTable";
import ProductSearch from "../component/ProductSearch";

//import imp from '../../../main_pages/Dashboard/AddProduct'
// export const SwitchStoreDropDown = ({ stores }) => {
//   const searchParams = useSearchParams();
//   const marketId = searchParams.get("marketId");

//   const queryClient = useQueryClient();
//   const toast = useToast();
//   const [switchLoader, setSwitchLoader] = useState(false);
//   const router = useRouter();
//   const SwitchStoreFunc = (id) => {
//     setSwitchLoader(true);
//     const formData = new FormData();
//     formData.append("store_id", id);
//     console.log(formData);
//     axiosInstance
//       .post("/api/v1/switch-store", formData)
//       .then((resp) => {
//         queryClient.invalidateQueries();
//         setSwitchLoader(false);
//         console.log(resp);
//         router.push(
//           `../../../main_pages/Dashboard/existing_user_dashboard?newMarketName=${id}`,
//         );
//         toast({
//           title: "Switch Store",
//           description: "Store switched successfully",
//           status: "success",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       })
//       .catch((error) => {
//         setSwitchLoader(false);
//         toast({
//           title: "Error",
//           description:
//             error.response?.data?.message ||
//             "Something went wrong. Please try again.",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "top-right",
//         });
//       });
//   };
//   const { KycInfo } = useStore();
//   const storeLogoUrl = KycInfo?.find((item) => item.type === "store_logo");
//   return (
//     <Box
//       zIndex={10}
//       cursor={"pointer"}
//       className="  w-[350px] bg-white rounded-lg "
//     >
//       <Box className=" flex justify-between items-center pt-[10px] w-11/12 m-auto">
//         <Text className=" font-semibold text-[20px]">Stores</Text>
//         <IconButton
//           onClick={() =>
//             router.push(`../../../main_pages/sign_up?add_new_store=true`)
//           }
//           backgroundColor={"transparent"}
//           icon={
//             <Box className=" h-[36px] w-[36px] grid items-center justify-center bg-[#007460] rounded-full">
//               <svg
//                 width="18"
//                 height="19"
//                 viewBox="0 0 18 19"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M9 3.76172V14.2617"
//                   stroke="white"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//                 <path
//                   d="M3.75 9.01172H14.25"
//                   stroke="white"
//                   stroke-width="2"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 />
//               </svg>
//             </Box>
//           }
//         />
//       </Box>
//       {switchLoader ? (
//         <Box>
//           <Text className=" text-center pt-[20px]">Loading .... </Text>
//         </Box>
//       ) : (
//         <Box className=" w-11/12 m-auto mt-[20px] grid gap-y-[20px]">
//           {stores?.map((item, index) => {
//             return (
//               <Box
//                 cursor={"pointer"}
//                 onClick={() => {
//                   SwitchStoreFunc(item?.id);
//                 }}
//                 borderBottom="1px"
//                 borderColor="gray.300"
//                 key={index}
//                 className=" flex items-center gap-x-[10px] pb-[10px]"
//               >
//                 <Box zIndex={0}>
//                   {/* <Image   src={marketicon} alt='' height={44} width={44} /> */}
//                   {storeLogoUrl?.url && storeLogoUrl?.url !== "" ? (
//                     <Box
//                       className=" bg-gray-100 w-[44px] grid items-center justify-center h-[44px] overflow-hidden rounded-full"
//                       cursor={"pointer"}
//                     >
//                       <Image
//                         alt="market"
//                         width={500}
//                         height={500}
//                         unoptimized
//                         className=" h-[500px] w-[500px]"
//                         src={storeLogoUrl?.url}
//                       />
//                     </Box>
//                   ) : (
//                     <svg
//                       width="44"
//                       height="44"
//                       viewBox="0 0 48 48"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <circle cx="24" cy="24" r="24" fill="#F3F4F6" />

//                       <path
//                         d="M15 19L17 13H31L33 19"
//                         stroke="#4B5563"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
//                         stroke="#4B5563"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M20 36V27H28V36"
//                         stroke="#4B5563"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   )}
//                 </Box>
//                 <Box>
//                   <Text className=" font-semibold">{item?.name}</Text>
//                   <Box className=" flex items-center gap-x-[10px] mt-[5px]">
//                     <Box>
//                       <svg
//                         width="12"
//                         height="17"
//                         viewBox="0 0 12 17"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M5.83333 16.8449C5.63889 16.8449 5.47222 16.7893 5.33333 16.6782C5.19445 16.5671 5.09028 16.4213 5.02083 16.2407C4.75695 15.4629 4.42361 14.7338 4.02083 14.0532C3.63195 13.3727 3.08333 12.5741 2.375 11.6574C1.66667 10.7407 1.09028 9.86572 0.645833 9.03239C0.215278 8.19906 0 7.19211 0 6.01156C0 4.38656 0.5625 3.01156 1.6875 1.88656C2.82639 0.747667 4.20833 0.178223 5.83333 0.178223C7.45833 0.178223 8.83333 0.747667 9.95833 1.88656C11.0972 3.01156 11.6667 4.38656 11.6667 6.01156C11.6667 7.27544 11.4236 8.331 10.9375 9.17822C10.4653 10.0116 9.91667 10.8379 9.29167 11.6574C8.54167 12.6574 7.97222 13.4907 7.58333 14.1574C7.20833 14.8102 6.89583 15.5046 6.64583 16.2407C6.57639 16.4352 6.46528 16.5879 6.3125 16.6991C6.17361 16.7963 6.01389 16.8449 5.83333 16.8449ZM5.83333 13.8657C6.06945 13.3935 6.33333 12.9282 6.625 12.4699C6.93056 12.0116 7.375 11.4004 7.95833 10.6366C8.55556 9.85878 9.04167 9.1435 9.41667 8.49072C9.80556 7.82405 10 6.99767 10 6.01156C10 4.85878 9.59028 3.87961 8.77083 3.07406C7.96528 2.25461 6.98611 1.84489 5.83333 1.84489C4.68056 1.84489 3.69445 2.25461 2.875 3.07406C2.06945 3.87961 1.66667 4.85878 1.66667 6.01156C1.66667 6.99767 1.85417 7.82405 2.22917 8.49072C2.61806 9.1435 3.11111 9.85878 3.70833 10.6366C4.29167 11.4004 4.72917 12.0116 5.02083 12.4699C5.32639 12.9282 5.59722 13.3935 5.83333 13.8657ZM5.83333 8.09489C6.41667 8.09489 6.90972 7.8935 7.3125 7.49072C7.71528 7.08795 7.91667 6.59489 7.91667 6.01156C7.91667 5.42822 7.71528 4.93517 7.3125 4.53239C6.90972 4.12961 6.41667 3.92822 5.83333 3.92822C5.25 3.92822 4.75694 4.12961 4.35417 4.53239C3.95139 4.93517 3.75 5.42822 3.75 6.01156C3.75 6.59489 3.95139 7.08795 4.35417 7.49072C4.75694 7.8935 5.25 8.09489 5.83333 8.09489Z"
//                           fill="#A5A6AB"
//                         />
//                       </svg>
//                     </Box>
//                     <Text className=" text-[14px]">
//                       {"Category: "} {item?.category}
//                     </Text>
//                   </Box>
//                 </Box>
//               </Box>
//             );
//           })}
//         </Box>
//       )}
//     </Box>
//   );
// };

export const MarketCard = ({ item, currency }) => {
  return (
    <Box>
      <Box className=" grid items-center justify-center w-full h-[170px] rounded-lg bg-[#F6F6F6] overflow-hidden">
        {item.images.length > 0 ? (
          <Box
            className=" bg-gray-100 w-[154px] grid items-center justify-center h-[120px]  rounded-lg"
            cursor={"pointer"}
          >
            <Image
              src={item.images[0]}
              alt="Profile"
              width={500}
              height={500}
              unoptimized
              className=" h-[500px] w-[500px] rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </Box>
        ) : (
          <svg
            width="60"
            height="60"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="#F3F4F6" />

            <path
              d="M12 16L24 8L36 16V32L24 40L12 32V16Z"
              stroke="#4B5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16L24 24L36 16"
              stroke="#4B5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M24 24V40"
              stroke="#4B5563"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Box>
      <Box className=" pt-[10px] w-11/12 m-auto">
        <Box className=" flex items-center justify-between mt-[10px]">
          <Text className=" text-[13px] font-semibold">
            {item?.productTitle || ""}
          </Text>
          <Text className=" text-[13px]">
            {currency}
            {item?.price?.amount || ""}
          </Text>
        </Box>
        <Box className=" flex items-center justify-between mt-[10px]">
          <Box className=" flex items-center items-center gap-x-[5px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.90104 1.83301L9.96104 6.00634L14.5677 6.67968L11.2344 9.92634L12.021 14.513L7.90104 12.3463L3.78104 14.513L4.56771 9.92634L1.23438 6.67968L5.84104 6.00634L7.90104 1.83301Z"
                fill="#FFD500"
                stroke="#FFD500"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Text className=" text-[13px]">
              {item?.rating || ""}({item?.quantity || ""})
            </Text>
          </Box>
          <Box>
            <Text className=" text-[13px]">{item?.stockStatus || ""}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
function Page() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const marketId = searchParams.get("marketId");

  const [SingleStoreDetails, setSingleStoreDetails] = useState("");
  useEffect(() => {
    axiosInstance
      .get(`/api/v1/store-information/${marketId}`)
      .then((resp) => {
        console.log(resp);
        setSingleStoreDetails(resp?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [marketId]);
  const [deleteStoreLoader, setDeleteStoreLoader] = useState(false);
  const deleteStoreFunc = (id) => {
    router.push(`../../../main_pages/Dashboard/AccountSettings`);
  };
  const { storeBrand: storeData, country } = useStore();
  const [addOutletOpen, setAddOutletOpen] = useState(false);
  const [editOutletId, setEditOutletId] = useState(null);
  const {
    Outlets: outletsData,
    isPending: isOutletsPending,
    error: outletsError,
  } = Outlets();
  const outletArray = outletsData ?? [];

  const ITEMS_PER_PAGE = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOutlets = useMemo(() => {
    if (!searchQuery.trim()) return outletArray;
    const q = searchQuery.toLowerCase();
    return outletArray.filter(
      (outlet) =>
        outlet?.name?.toLowerCase().includes(q) ||
        outlet?.city?.toLowerCase().includes(q) ||
        outlet?.state?.toLowerCase().includes(q) ||
        outlet?.status?.toLowerCase().includes(q) ||
        outlet?.store_brand?.name?.toLowerCase().includes(q) ||
        outlet?.country?.name?.toLowerCase().includes(q),
    );
  }, [searchQuery, outletArray]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOutlets.length / ITEMS_PER_PAGE),
  );

  const handleSearch = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const paginatedOutlets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOutlets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOutlets, currentPage]);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const { KycInfo } = useStore();
  const storeLogoUrl = KycInfo?.find((item) => item.type === "store_logo");
  return (
    <div className=" min-h-screen">
      {storeData?.length >= 1 && (
        <NewOutlet
          open={addOutletOpen}
          setOpen={setAddOutletOpen}
          storeId={storeData}
          countries={country}
        />
      )}
      {storeData?.length >= 1 && !!editOutletId && (
        <NewOutlet
          open={!!editOutletId}
          setOpen={(val) => {
            if (!val) setEditOutletId(null);
          }}
          storeId={storeData}
          countries={country}
          outletId={editOutletId}
        />
      )}
      <Box className="">
        {/* <Box className=' z-1'>
                <Image src={overlay} alt='' className=' w-full'/>
            </Box> */}
        <Box
          //position="relative"
          className="  lg:pt-[30px] pt-[10px]  z-50"
        >
          <Box className=" w-11/12 m-auto bg-white rounded-lg lg:mt-[20px] mt-[5px] lg:pt-[20px] pt-[10px] ">
            <Box className=" w-11/12 m-auto pb-[20px]">
              <Box
                borderBottom="1px"
                borderColor="gray.300"
                className=" lg:flex mt-[20px] lg:justify-between grid gap-y-[10px]  pb-[20px] "
              >
                <Box className=" flex items-center gap-x-[10px]">
                  <Box className="">
                    {storeLogoUrl?.url && storeLogoUrl?.url !== "" ? (
                      <Box
                        className=" bg-gray-300 w-[60px] grid items-center justify-center h-[60px] overflow-hidden rounded-full"
                        cursor={"pointer"}
                      >
                        <Image
                          alt="market"
                          width={500}
                          height={500}
                          unoptimized
                          className=" h-[500px] w-[500px]"
                          src={storeLogoUrl?.url}
                        />
                      </Box>
                    ) : (
                      <svg
                        width="60"
                        height="60"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="24" cy="24" r="24" fill="#F3F4F6" />

                        <path
                          d="M15 19L17 13H31L33 19"
                          stroke="#4B5563"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 19H33V35C33 35.5523 32.5523 36 32 36H16C15.4477 36 15 35.5523 15 35V19Z"
                          stroke="#4B5563"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 36V27H28V36"
                          stroke="#4B5563"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <Box className=" absolute bottom-0 right-0"></Box>
                  </Box>
                  <Box>
                    <Text className=" text-[20px]">
                      {storeData[0]?.name || ""} market.
                    </Text>
                    <Text className=" text-[#8A8A8A] text-[14px] mt-[10px]">
                      Shopping made easy
                    </Text>
                  </Box>
                </Box>
                <Box className=" flex items-center lg:gap-x-[10px] gap-x-[10px]">
                  <Button
                    isLoading={deleteStoreLoader}
                    onClick={() => {
                      deleteStoreFunc(SingleStoreDetails?.id);
                    }}
                    fontWeight={500}
                    backgroundColor={"#007460"}
                    color={"white"}
                    cursor={"pointer"}
                    className=" h-[44px] w-[124px] justify-center rounded-lg grid items-center"
                  >
                    <Text>Edit store</Text>
                  </Button>

                  <Button
                    fontWeight={500}
                    backgroundColor={"#007460"}
                    color={"white"}
                    cursor={"pointer"}
                    onClick={() => setAddOutletOpen(true)}
                    className=" h-[44px] w-[140px] justify-center rounded-lg grid items-center"
                  >
                    <Text>Add outlet</Text>
                  </Button>

                  <Box className=" pl-[20px]"></Box>
                </Box>
              </Box>
              {/* ── Outlets header + search bar ── */}
              <Box className="mt-[24px] flex items-center justify-between flex-wrap gap-y-[12px]">
                <Text className="text-[18px] font-semibold text-[#343538]">Outlets</Text>
                <Box className="lg:w-[400px] w-full">
                  <ProductSearch
                    placing="Search by name, city, state, status..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </Box>
              </Box>

              {/* ── Outlets table ── */}
              <Box className="mt-[20px] pb-[20px]">
                {isOutletsPending ? (
                  <Box className="grid gap-y-[10px] pt-[10px]">
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        className="h-[40px] bg-gray-100 rounded-md animate-pulse"
                      />
                    ))}
                  </Box>
                ) : outletsError ? (
                  <Box className="py-10 text-center">
                    <Text className="text-red-500 text-[14px]">
                      Failed to load outlets. Please try again.
                    </Text>
                  </Box>
                ) : filteredOutlets.length === 0 ? (
                  <Box className="py-10 text-center">
                    <Text className="text-[#B0B0B0] text-[14px]">
                      {searchQuery
                        ? `No outlets match "${searchQuery}".`
                        : "No outlets found."}
                    </Text>
                  </Box>
                ) : (
                  <>
                    <OutletsTable
                      data={paginatedOutlets}
                      onEdit={(id) => setEditOutletId(id)}
                    />
                    <MobileOrderTable data={paginatedOutlets} />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Pagination ── */}
      {!isOutletsPending && filteredOutlets.length > 0 && (
        <Box className="flex items-center justify-between mt-[30px] lg:w-10/12 w-11/12 m-auto pb-[30px]">
          <Box>
            <Text className="text-[#1A71F6] lg:text-[12px] text-[14px]">
              <span>{currentPage}</span> of {totalPages} page
              {totalPages !== 1 ? "s" : ""}{" "}
              <span className="text-[#888888]">
                ({filteredOutlets.length} result
                {filteredOutlets.length !== 1 ? "s" : ""})
              </span>
            </Text>
          </Box>
          <Box className="flex items-center lg:gap-x-[20px] gap-x-[15px]">
            <Text className="lg:text-[12px] text-[14px]">The page on</Text>
            <Box className="pr-[5px]">
              <Select
                width={55}
                height={30}
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
              >
                {[...Array(totalPages)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </Box>
            <IconButton
              aria-label="Previous page"
              isDisabled={currentPage === 1}
              onClick={goToPrev}
              icon={
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path
                    d="M8.5 14.6668L1.83333 8.00016L8.5 1.3335"
                    stroke={currentPage === 1 ? "#D1D1D1" : "#454545"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
            <IconButton
              aria-label="Next page"
              isDisabled={currentPage === totalPages}
              onClick={goToNext}
              icon={
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                  <path
                    d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335"
                    stroke={currentPage === totalPages ? "#D1D1D1" : "#454545"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default Page;
