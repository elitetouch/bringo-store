"use client";
import React, { useState, useEffect } from "react";
import { Box, Text, Input, Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { Products } from "@/app/api/reactQuery";
import axiosInstance from "@/app/api/Api_Instance";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/app/component/Store/useStore";

const CURRENCIES = [
  { code: "UGX", label: "UGX" },
  { code: "NGN", label: "NGN" },
  { code: "KES", label: "KES" },
];

// ── CurrencyInput ──
function UGXInput({
  value,
  onChange,
  placeholder = "0",
  label,
  error,
  name,
  onBlur,
  currency,
  onCurrencyChange,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <Box>
      {label && (
        <Text className="text-[14px] font-semibold text-[#303030] mb-[8px]">
          {label}
        </Text>
      )}
      <Box
        className="flex items-center w-full h-[44px] transition-all duration-200 mt-[5px]"
        style={{
          border: `1px solid ${error ? "#E53E3E" : focused ? "#A0A0A0" : "#D4D4D4"}`,
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <Box
          className="flex items-center justify-center h-full flex-shrink-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.08)",
            borderRight: "1px solid #D4D4D4",
          }}
        >
          <select
            value={currency}
            onChange={(e) => onCurrencyChange?.(e.target.value)}
            style={{
              height: "100%",
              padding: "0 6px 0 10px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "13px",
              color: "#8A8A8A",
              fontWeight: 500,
              cursor: "pointer",
              appearance: "auto",
            }}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </Box>
        <Input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          type="number"
          border="none"
          _focus={{ border: "none", boxShadow: "none" }}
          _hover={{ border: "none" }}
          height="100%"
          borderRadius="0"
          className="flex-1 text-[14px]"
        />
      </Box>
      {error && (
        <Text className="text-red-500 text-[12px] mt-[4px]">{error}</Text>
      )}
    </Box>
  );
}

// ── Validation schema ──
const AssignProductSchema = Yup.object().shape({
  product_id: Yup.string().required("Please select a product"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Price cannot be negative")
    .required("Price is required"),
  stock_qty: Yup.number()
    .typeError("Stock quantity must be a number")
    .min(0, "Stock quantity cannot be negative")
    .integer("Stock quantity must be a whole number")
    .required("Stock quantity is required"),
  aisle: Yup.string().required("Aisle is required"),
  row: Yup.string().required("Row is required"),
});

function Page() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const outletId = searchParams.get("outletId");
  const productId = searchParams.get("productId");
  const { selectedOutletIds, setSelectedOutletIds } = useStore();
  // Use store outlets when coming from AddProduct; fall back to URL outletId for edit flow
  const allOutletIds =
    selectedOutletIds.length > 0
      ? selectedOutletIds
      : outletId
        ? [outletId]
        : [];
  const { isPending: isProductsLoading, products } = Products();

  const productArray = Array.isArray(products?.data?.products)
    ? products.data.products
    : Array.isArray(products?.products)
      ? products.products
      : Array.isArray(products)
        ? products
        : [];

  // ── Pre-fill state from outlet inventory when editing ─────────────────────
  const [prefillValues, setPrefillValues] = useState({
    product_id: productId ?? "",
    price: "",
    stock_qty: "",
    aisle: "",
    row: "",
  });
  const [prefillProduct, setPrefillProduct] = useState(null);
  const [isFetchingInventory, setIsFetchingInventory] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("UGX");

  useEffect(() => {
    if (!outletId || !productId) return;
    setIsFetchingInventory(true);
    axiosInstance
      .get(`/api/v1/merchant/outlets/${outletId}/inventory`)
      .then((resp) => {
        const inventory = resp?.data?.data?.inventory ?? [];
        const item = inventory.find(
          (i) => String(i?.product?.id) === String(productId),
        );
        if (item) {
          setPrefillProduct(item.product);
          setPrefillValues({
            product_id: productId,
            price: item.price ?? "",
            stock_qty: item.stock_qty ?? "",
            aisle: item.aisle ?? "",
            row: item.row ?? "",
          });
        }
      })
      .catch((err) => console.error("Failed to fetch inventory:", err))
      .finally(() => setIsFetchingInventory(false));
  }, [outletId, productId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    if (allOutletIds.length === 0) {
      toast({
        title: "Error",
        description: "No outlet selected. Please go back and select an outlet.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setSubmitting(false);
      return;
    }

    const payload = {
      product_id: values.product_id,
      price: Number(values.price),
      stock_qty: Number(values.stock_qty),
      aisle: values.aisle,
      row: values.row,
      is_active: true,
    };

    try {
      await Promise.all(
        allOutletIds.map((id) =>
          axiosInstance.post(`/api/v1/merchant/outlets/${id}/inventory`, payload),
        ),
      );
      allOutletIds.forEach((id) =>
        queryClient.invalidateQueries({ queryKey: ["outletInventory", id] }),
      );
      setSelectedOutletIds([]);
      toast({
        title: "Success",
        description:
          allOutletIds.length > 1
            ? `Product assigned to ${allOutletIds.length} outlets successfully.`
            : "Product assigned to outlet successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      router.back();
    } catch (error) {
      const errors = error?.response?.data?.errors;
      let description = "Something went wrong. Please try again.";
      if (errors && typeof errors === "object") {
        description = Object.values(errors).flat().join("\n");
      }
      toast({
        title: "Error",
        description,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[95vh]">
      {/* Mobile back button */}
      <div
        className="lg:hidden flex items-center gap-x-[6px] pt-[20px] px-[4%] cursor-pointer"
        onClick={() => router.back()}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke="#6B7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Text className="text-[13px] text-[#6B7280]">Back</Text>
      </div>

      {/* ── Breadcrumb ── */}
      <Box className="w-11/12 m-auto pt-[20px] lg:pt-[30px]">
        <Text className="text-[20px] font-semibold">
          Assign Product to Outlet
        </Text>
        <Box className="flex items-center gap-x-[10px] text-[14px] mt-[10px]">
          <Box
            cursor="pointer"
            onClick={() => router.push("/existing_user_dashboard")}
          >
            <Text className="text-[#888888]">Home</Text>
          </Box>
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none">
            <path
              d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
              fill="#737373"
            />
          </svg>
          <Box cursor="pointer" onClick={() => router.back()}>
            <Text className="text-[#888888]">Outlets</Text>
          </Box>
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none">
            <path
              d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
              fill="#737373"
            />
          </svg>
          <Text className="text-[#007460] font-semibold">Assign Product</Text>
        </Box>
      </Box>

      {/* ── Form ── */}
      <Formik
        initialValues={prefillValues}
        enableReinitialize
        validationSchema={AssignProductSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box className="bg-white w-11/12 m-auto mt-[20px] rounded-lg py-[20px] px-[20px]">
              <Text className="text-[18px] font-semibold mb-[4px]">
                Product details
              </Text>
              {isFetchingInventory ? (
                <Box className="h-[20px] w-[200px] bg-gray-100 rounded animate-pulse mb-[20px]" />
              ) : prefillProduct ? (
                <Text className="text-[13px] text-[#007460] mb-[20px]">
                  {prefillProduct.title ?? prefillProduct.name ?? ""}
                </Text>
              ) : (
                <Box className="mb-[20px]" />
              )}

              {/* ── Product select ── */}
              {/* <Box className="mb-[20px] pt-[20px]">
                <Text className="text-[14px] font-semibold text-[#303030] mb-[8px]">
                  Select Product
                </Text>
                <Box
                  border="1px"
                  borderColor={
                    touched.product_id && errors.product_id
                      ? "red.500"
                      : "gray.300"
                  }
                  borderRadius="lg"
                  className="w-6/12 h-[44px] grid items-center mt-[5px]"
                >
                  {isProductsLoading ? (
                    <Text className="text-[13px] text-[#B0B0B0] px-4">
                      Loading products...
                    </Text>
                  ) : productArray.length === 0 ? (
                    <Text className="text-[13px] text-[#B0B0B0] px-4">
                      No products found. Add products first.
                    </Text>
                  ) : (
                    <Select
                      placeholder="Select a product"
                      name="product_id"
                      value={values.product_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      border="none"
                      _focus={{ border: "none", boxShadow: "none" }}
                    >
                      {productArray.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.product_title ?? item.name ?? item.title}
                        </option>
                      ))}
                    </Select>
                  )}
                </Box>
                {touched.product_id && errors.product_id && (
                  <Text className="text-red-500 text-[12px] mt-[4px]">
                    {errors.product_id}
                  </Text>
                )}
              </Box> */}

              {/* ── Grid fields ── */}
              <Box className="grid grid-cols-2 gap-x-[20px] gap-y-[20px] mb-[20px] pt-[20px]">
                {/* Price */}
                <UGXInput
                  label="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="0"
                  error={touched.price && errors.price}
                  currency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />

                {/* Stock quantity */}
                <Box>
                  <Text className="text-[14px] font-semibold text-[#303030] pb-[8px]">
                    Stock quantity
                  </Text>
                  <Input
                    name="stock_qty"
                    value={values.stock_qty}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="0"
                    type="number"
                    border="1px solid"
                    borderColor={
                      touched.stock_qty && errors.stock_qty
                        ? "#E53E3E"
                        : "#D4D4D4"
                    }
                    _focus={{ borderColor: "#A0A0A0", boxShadow: "none" }}
                    className="flex-1 text-[14px] h-[44px] mt-[5px]"
                  />
                  {touched.stock_qty && errors.stock_qty && (
                    <Text className="text-red-500 text-[12px] mt-[4px]">
                      {errors.stock_qty}
                    </Text>
                  )}
                </Box>

                {/* Aisle */}
                <Box>
                  <Text className="text-[14px] font-semibold text-[#303030] mb-[8px]">
                    Aisle
                  </Text>
                  <Input
                    name="aisle"
                    value={values.aisle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. A"
                    border="1px solid"
                    borderColor={
                      touched.aisle && errors.aisle ? "#E53E3E" : "#D4D4D4"
                    }
                    _focus={{ borderColor: "#A0A0A0", boxShadow: "none" }}
                    className="flex-1 text-[14px] h-[44px]"
                  />
                  {touched.aisle && errors.aisle && (
                    <Text className="text-red-500 text-[12px] mt-[4px]">
                      {errors.aisle}
                    </Text>
                  )}
                </Box>

                {/* Row */}
                <Box>
                  <Text className="text-[14px] font-semibold text-[#303030] mb-[8px]">
                    Row
                  </Text>
                  <Input
                    name="row"
                    value={values.row}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. 3"
                    border="1px solid"
                    borderColor={
                      touched.row && errors.row ? "#E53E3E" : "#D4D4D4"
                    }
                    _focus={{ borderColor: "#A0A0A0", boxShadow: "none" }}
                    className="flex-1 text-[14px] h-[44px]"
                  />
                  {touched.row && errors.row && (
                    <Text className="text-red-500 text-[12px] mt-[4px]">
                      {errors.row}
                    </Text>
                  )}
                </Box>
              </Box>

              {/* ── Submit ── */}
              <Box className="flex items-center justify-center mt-[40px]">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={!isValid || isSubmitting}
                  backgroundColor="#007460"
                  color="#FFFF"
                  _hover={{ backgroundColor: "#005a49" }}
                  px={8}
                >
                  <Text className="text-[14px]">Assign Product</Text>
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Page;
