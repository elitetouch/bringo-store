"use client";
import React, { useState, useMemo, useCallback } from "react";
import AddProduct from "../component/AddProduct";
import ProductSearch from "../component/ProductSearch";
import { Box, Text, Select, IconButton } from "@chakra-ui/react";
import ProductTable from "@/app/component/Table/ProductTable";
import OutletsTable from "@/app/component/Table/OrdersTable";
import Modal from "@/app/component/Modal/ModalComponent";
import { Outlets, useOutletInventory } from "@/app/api/reactQuery";
import { NewOutlet } from "../existing_user_dashboard/components/NewOutletModal";
import { useStore } from "@/app/component/Store/useStore";

// ─── Icons ────────────────────────────────────────────────────────────────────
const BreadcrumbArrow = () => (
  <svg width="8" height="11" viewBox="0 0 8 11" fill="none">
    <path
      d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
      fill="#737373"
    />
  </svg>
);

const ChevronLeft = ({ disabled }) => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path
      d="M8.5 14.6668L1.83333 8.00016L8.5 1.3335"
      stroke={disabled ? "#D1D1D1" : "#454545"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = ({ disabled }) => (
  <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
    <path
      d="M1.5 14.6668L8.16667 8.00016L1.5 1.3335"
      stroke={disabled ? "#D1D1D1" : "#454545"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PAGE_SIZE = 10;

function ProductPage() {
  const { storeBrand, country } = useStore();

  // ── Outlets ──────────────────────────────────────────────────────────────────
  const {
    Outlets: outletsData,
    isPending: isOutletsPending,
    error: outletsError,
  } = Outlets();
  const outletArray = outletsData ?? [];

  const [outletSearch, setOutletSearch] = useState("");
  const [outletPage, setOutletPage] = useState(1);

  const filteredOutlets = useMemo(() => {
    if (!outletSearch.trim()) return outletArray;
    const q = outletSearch.toLowerCase();
    return outletArray.filter(
      (o) =>
        o?.name?.toLowerCase().includes(q) ||
        o?.city?.toLowerCase().includes(q) ||
        o?.state?.toLowerCase().includes(q) ||
        o?.status?.toLowerCase().includes(q) ||
        o?.store_brand?.name?.toLowerCase().includes(q) ||
        o?.country?.name?.toLowerCase().includes(q),
    );
  }, [outletSearch, outletArray]);

  const outletTotalPages = Math.max(
    1,
    Math.ceil(filteredOutlets.length / PAGE_SIZE),
  );

  const paginatedOutlets = useMemo(() => {
    const start = (outletPage - 1) * PAGE_SIZE;
    return filteredOutlets.slice(start, start + PAGE_SIZE);
  }, [filteredOutlets, outletPage]);

  // ── Edit outlet modal ─────────────────────────────────────────────────────────
  const [editOutletId, setEditOutletId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEditOutlet = useCallback((id) => {
    setEditOutletId(id);
    setEditModalOpen(true);
  }, []);

  // ── Products modal ────────────────────────────────────────────────────────────
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productPage, setProductPage] = useState(1);

  const {
    data: outletProducts = [],
    isPending: isLoadingProducts,
    isError: isProductError,
  } = useOutletInventory(selectedOutlet?.id);
  console.log("outlet_product", outletProducts);
  const handleOutletClick = useCallback((outlet) => {
    setSelectedOutlet(outlet);
    setModalOpen(true);
    setProductSearch("");
    setProductPage(1);
  }, []);

  const filteredProducts = useMemo(() => {
    if (!productSearch.trim()) return outletProducts;
    const q = productSearch.toLowerCase();
    return outletProducts.filter(
      (p) =>
        String(p.id ?? "")
          .toLowerCase()
          .includes(q) || (p?.product?.title ?? "").toLowerCase().includes(q),
    );
  }, [productSearch, outletProducts]);

  const productTotalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PAGE_SIZE),
  );

  const paginatedProducts = useMemo(() => {
    const start = (productPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, productPage]);

  return (
    <div className="lg:pt-[48px] pt-[30px] min-h-screen">
      {/* ── Edit outlet modal ── */}
      {storeBrand?.length >= 1 && (
        <NewOutlet
          open={editModalOpen}
          setOpen={(val) => {
            setEditModalOpen(val);
            if (!val) setEditOutletId(null);
          }}
          storeId={storeBrand}
          countries={country}
          outletId={editOutletId}
          onSuccess={() => setEditModalOpen(false)}
        />
      )}

      {/* ── Products modal ── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title=""
        size="2xl"
      >
        <Box className="pb-[24px]">
          {/* Modal heading */}
          <Box className="w-11/12 m-auto pt-[4px] pb-[16px]">
            <Text className="text-[18px] font-semibold text-[#343538]">
              {selectedOutlet?.name || "Outlet"} — Products
            </Text>
          </Box>

          {/* Search + Add button */}
          <Box className="w-11/12 m-auto flex items-center justify-between flex-wrap gap-y-[12px] mb-[16px]">
            <Box className="lg:w-[340px] w-full">
              <ProductSearch
                placing="Search for id, name product"
                value={productSearch}
                onChange={(e) => {
                  setProductSearch(e.target.value);
                  setProductPage(1);
                }}
              />
            </Box>
            <AddProduct />
          </Box>

          {/* Products table */}
          {isLoadingProducts ? (
            <Box className="w-11/12 m-auto grid gap-y-[10px] pt-[10px]">
              {[...Array(5)].map((_, i) => (
                <Box
                  key={i}
                  className="h-[40px] bg-gray-100 rounded-md animate-pulse"
                />
              ))}
            </Box>
          ) : isProductError ? (
            <Box className="py-10 text-center">
              <Text className="text-red-500 text-[14px]">
                Failed to load products for this outlet.
              </Text>
            </Box>
          ) : filteredProducts.length === 0 ? (
            <Box className="py-10 text-center">
              <Text className="text-[#B0B0B0] text-[14px]">
                {productSearch
                  ? `No products match "${productSearch}".`
                  : "No products found for this outlet."}
              </Text>
            </Box>
          ) : (
            <Box className="w-11/12 m-auto">
              <ProductTable
                data={paginatedProducts}
                outletId={selectedOutlet?.id}
              />
            </Box>
          )}

          {/* Products pagination */}
          {!isLoadingProducts && filteredProducts.length > 0 && (
            <Box className="flex items-center justify-between mt-[20px] w-11/12 m-auto">
              <Text className="text-[#1A71F6] text-[12px]">
                <span>{productPage}</span> of {productTotalPages} page
                {productTotalPages !== 1 ? "s" : ""}{" "}
                <span className="text-[#888888]">
                  ({filteredProducts.length} result
                  {filteredProducts.length !== 1 ? "s" : ""})
                </span>
              </Text>
              <Box className="flex items-center gap-x-[15px]">
                <Text className="text-[12px]">The page on</Text>
                <Box className="pr-[5px]">
                  <Select
                    width={55}
                    height={30}
                    value={productPage}
                    onChange={(e) => setProductPage(Number(e.target.value))}
                  >
                    {[...Array(productTotalPages)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </Box>
                <IconButton
                  aria-label="Previous page"
                  size="sm"
                  variant="ghost"
                  isDisabled={productPage === 1}
                  onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                  icon={<ChevronLeft disabled={productPage === 1} />}
                />
                <IconButton
                  aria-label="Next page"
                  size="sm"
                  variant="ghost"
                  isDisabled={productPage === productTotalPages}
                  onClick={() =>
                    setProductPage((p) => Math.min(productTotalPages, p + 1))
                  }
                  icon={
                    <ChevronRight
                      disabled={productPage === productTotalPages}
                    />
                  }
                />
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* ── Main card ── */}
      <Box className="bg-white rounded-lg w-11/12 m-auto">
        <Box className="pt-[20px] pb-[20px]">
          {/* Breadcrumb header */}
          <Box className="w-11/12 m-auto flex items-start justify-between flex-wrap gap-y-[12px]">
            <Box>
              <Text className="text-[20px] font-semibold">Products</Text>
              <Box className="flex items-center gap-x-[10px] text-[14px] mt-[10px]">
                <Text className="text-[#888888]">Dashboard</Text>
                <BreadcrumbArrow />
                <Text className="text-[#888888]">Products</Text>
              </Box>
            </Box>
            <AddProduct />
          </Box>

          {/* Outlets header + search */}
          <Box className="w-11/12 m-auto mt-[24px] flex items-center justify-between flex-wrap gap-y-[12px]">
            <Text className="text-[18px] font-semibold text-[#343538]">
              Outlets
            </Text>
            <Box className="lg:w-[400px] w-full">
              <ProductSearch
                placing="Search by name, city, state, status..."
                value={outletSearch}
                onChange={(e) => {
                  setOutletSearch(e.target.value);
                  setOutletPage(1);
                }}
              />
            </Box>
          </Box>

          {/* Outlets table */}
          <Box className="w-11/12 m-auto mt-[16px] pb-[20px]">
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
                  {outletSearch
                    ? `No outlets match "${outletSearch}".`
                    : "No outlets found."}
                </Text>
              </Box>
            ) : (
              <OutletsTable
                data={paginatedOutlets}
                onRowClick={handleOutletClick}
                onEdit={handleEditOutlet}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* ── Outlets pagination ── */}
      {!isOutletsPending && filteredOutlets.length > 0 && (
        <Box className="flex items-center justify-between mt-[30px] lg:w-10/12 w-11/12 m-auto pb-[30px]">
          <Text className="text-[#1A71F6] lg:text-[12px] text-[14px]">
            <span>{outletPage}</span> of {outletTotalPages} page
            {outletTotalPages !== 1 ? "s" : ""}{" "}
            <span className="text-[#888888]">
              ({filteredOutlets.length} result
              {filteredOutlets.length !== 1 ? "s" : ""})
            </span>
          </Text>
          <Box className="flex items-center lg:gap-x-[20px] gap-x-[15px]">
            <Text className="lg:text-[12px] text-[14px]">The page on</Text>
            <Box className="pr-[5px]">
              <Select
                width={55}
                height={30}
                value={outletPage}
                onChange={(e) => setOutletPage(Number(e.target.value))}
              >
                {[...Array(outletTotalPages)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </Box>
            <IconButton
              aria-label="Previous page"
              isDisabled={outletPage === 1}
              onClick={() => setOutletPage((p) => Math.max(1, p - 1))}
              icon={<ChevronLeft disabled={outletPage === 1} />}
            />
            <IconButton
              aria-label="Next page"
              isDisabled={outletPage === outletTotalPages}
              onClick={() =>
                setOutletPage((p) => Math.min(outletTotalPages, p + 1))
              }
              icon={<ChevronRight disabled={outletPage === outletTotalPages} />}
            />
          </Box>
        </Box>
      )}
    </div>
  );
}

export default ProductPage;
