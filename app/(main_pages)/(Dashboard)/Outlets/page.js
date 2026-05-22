"use client";
import React, { useState, useMemo } from "react";
import OutletsTable from "@/app/component/Table/OrdersTable"; // 🔁 swap to your OutletsTable import
import { Box, Text, Button } from "@chakra-ui/react";
import ProductSearch from "@/app/component/dashboard_components/ProductSearch";
import { useRouter } from "next/navigation";
import AddProduct from "@/app/component/dashboard_components/AddProduct";
import { IconButton } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import MobileOrderTable from "@/app/component/Table/MobileOrderTable";
import { Outlets } from "@/app/api/reactQuery";
import { useSearchParams } from "next/navigation";
const ITEMS_PER_PAGE = 10;

function Page() {
  const searchParams = useSearchParams();

  const action = searchParams.get("action");
  const productId = searchParams.get("ProductId");
  const { Outlets: outlets, isPending, error } = Outlets();
  const outletArray = outlets ?? outlets ?? []; // 🔁 adjust to match your actual response shape
  console.log("array", outlets?.outlets);
  const router = useRouter();

  // ── Search ──
  const [searchQuery, setSearchQuery] = useState("");

  // ── Pagination ──
  const [currentPage, setCurrentPage] = useState(1);

  // ── Filtered list — recomputed whenever search or data changes ──
  const filteredOutlets = useMemo(() => {
    if (!searchQuery.trim()) return outletArray;
    const q = searchQuery.toLowerCase();
    return outletArray.filter((outlet) => {
      return (
        outlet?.name?.toLowerCase().includes(q) ||
        outlet?.city?.toLowerCase().includes(q) ||
        outlet?.state?.toLowerCase().includes(q) ||
        outlet?.status?.toLowerCase().includes(q) ||
        outlet?.store_brand?.name?.toLowerCase().includes(q) ||
        outlet?.country?.name?.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, outletArray]);

  // ── Pagination logic ──
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOutlets.length / ITEMS_PER_PAGE),
  );

  // Reset to page 1 whenever search changes
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

  return (
    <div className="min-h-screen">
      <div className="pt-[30px]">
        <Box className="bg-white w-11/12 m-auto rounded-lg pt-[30px]">
          <Box className="w-11/12 m-auto pt-[20px]">
            <Text className="font-semibold text-[20px]">Outlets</Text>
            <Box className="flex items-center gap-x-[10px] text-[14px] mt-[10px]">
              <Text className="text-[#888888]">Dashboard</Text>
              <svg
                width="8"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
                  fill="#737373"
                />
              </svg>
              <Text className="text-[#888888]">Outlets</Text>
            </Box>

            <Box className="lg:flex grid gap-y-[20px] items-center lg:justify-between mt-[32px]">
              <Box className="lg:w-[300px] w-full">
                {/* ── Search input — pass value + onChange so it's controlled ── */}
                <ProductSearch
                  placing={"Search by name, city, state, status..."}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </Box>
              <Box className="flex items-center gap-x-[10px]">
                <AddProduct
                  buttonText="Add outlet"
                  buttonFunc={() =>
                    router.push(
                      "/existing_user_dashboard",
                    )
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box className="w-11/12 m-auto mt-[20px] pb-[40px]">
            {isPending ? (
              // Loading skeleton rows
              <Box className="grid gap-y-[10px] pt-[10px]">
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    className="h-[40px] bg-gray-100 rounded-md animate-pulse"
                  />
                ))}
              </Box>
            ) : error ? (
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
                <OutletsTable data={paginatedOutlets} productId={productId} />
                <MobileOrderTable
                  data={paginatedOutlets}
                  productId={productId}
                />
              </>
            )}
          </Box>

          {/* ── Navigation buttons ── */}
          <Box className="flex items-center gap-x-[10px] w-11/12 m-auto pb-[30px]">
            <Button size="sm" variant="outline" onClick={() => router.back()}>
              <Text className="text-[13px]">Back</Text>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push("/Product")}
            >
              <Text className="text-[13px]">Back to Products</Text>
            </Button>
          </Box>
        </Box>

        {/* ── Pagination ── */}
        {!isPending && filteredOutlets.length > 0 && (
          <Box className="flex items-center justify-between mt-[30px] w-10/12 m-auto pb-[30px]">
            <Box>
              <Text className="text-[#1A71F6] text-[12px]">
                <span>{currentPage}</span> of {totalPages} page
                {totalPages !== 1 ? "s" : ""}{" "}
                <span className="text-[#888888]">
                  ({filteredOutlets.length} result
                  {filteredOutlets.length !== 1 ? "s" : ""})
                </span>
              </Text>
            </Box>

            <Box className="flex items-center gap-x-[20px]">
              <Text className="text-[12px]">Go to page</Text>
              <Box>
                <Select
                  width="60px"
                  height="30px"
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

              {/* Prev */}
              <IconButton
                aria-label="Previous page"
                isDisabled={currentPage === 1}
                onClick={goToPrev}
                icon={
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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

              {/* Next */}
              <IconButton
                aria-label="Next page"
                isDisabled={currentPage === totalPages}
                onClick={goToNext}
                icon={
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335"
                      stroke={
                        currentPage === totalPages ? "#D1D1D1" : "#454545"
                      }
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
    </div>
  );
}

export default Page;
