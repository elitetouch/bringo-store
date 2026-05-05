"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Button,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import axiosInstance from "@/app/api/Api_Instance";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import {
  ProfileInfo,
  useCategories,
  useSubcategory,
  Outlets,
} from "@/app/api/reactQuery";
import { useStore } from "@/app/component/Store/useStore";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Checkbox } from "@chakra-ui/react";

/* ─── Validation schema ─────────────────────────────────────── */
// ── Separate schemas so edit doesn't require images or store_brand_id ─────────
const AddProductSchema = Yup.object().shape({
  title: Yup.string().required("Please fill in product title"),
  description: Yup.string().required("Please fill in product description"),
  brand_name: Yup.string().required("Please fill in brand name"),
  category_id: Yup.string().required("Please select a category"),
  publish_state: Yup.string()
    .oneOf(["draft", "published", "scheduled"], "Invalid publish state")
    .required("Please select a publish state"),
  featureOne: Yup.string().required("Please input key feature 1"),
  featureTwo: Yup.string().required("Please input key feature 2"),
  featureThree: Yup.string().required("Please input key feature 3"),
  featureFour: Yup.string().required("Please input key feature 4"),
});

const EditProductSchema = Yup.object().shape({
  title: Yup.string().required("Please fill in product title"),
  description: Yup.string().required("Please fill in product description"),
  // brand_name: Yup.string().required("Please fill in brand name"),
  publish_state: Yup.string()
    .oneOf(["draft", "published", "scheduled"], "Invalid publish state")
    .required("Please select a publish state"),
  featureOne: Yup.string().required("Please input key feature 1"),
  featureTwo: Yup.string().required("Please input key feature 2"),
  featureThree: Yup.string().required("Please input key feature 3"),
  featureFour: Yup.string().required("Please input key feature 4"),
});

/* ─── Page ───────────────────────────────────────────────────── */
function Page() {
  const { storeBrand, selectedOutletIds, setSelectedOutletIds } = useStore();
  const { Outlets: outletsData } = Outlets();
  const outletArray = outletsData ?? [];
  const selectAll =
    outletArray.length > 0 && selectedOutletIds.length === outletArray.length;

  const handleToggleAll = () => {
    if (selectAll) setSelectedOutletIds([]);
    else setSelectedOutletIds(outletArray.map((o) => o.id));
  };

  const handleToggleOutlet = (id) => {
    const next = selectedOutletIds.includes(id)
      ? selectedOutletIds.filter((i) => i !== id)
      : [...selectedOutletIds, id];
    setSelectedOutletIds(next);
  };

  const categories = useCategories();
  const categoryArray = categories?.data?.data?.categories;

  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  // ── ProductId drives whether we're in create or edit mode ─────────────────
  const ProductId = searchParams.get("ProductId");
  const isEditMode = Boolean(ProductId);

  const [singleProduct, setSingleProduct] = useState(null);
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState([]);

  const { data: subcategoryData } = useSubcategory(selectedSection);
  const subcategoryArray = subcategoryData?.data?.subcategories || [];

  const [images, setImages] = useState([null, null, null]);
  const [previewUrls, setPreviewUrls] = useState([null, null, null]);
  const [activeIndex, setActiveIndex] = useState(null);
  const fileInputRef = useRef(null);

  // ── Fetch single product when editing ─────────────────────────────────────
  useEffect(() => {
    if (!ProductId) return;

    setIsFetchingProduct(true);
    axiosInstance
      .get(`/api/v1/merchant/products/${ProductId}`)
      .then((resp) => {
        const product = resp?.data?.data?.product;
        console.log("single product", product);
        setSingleProduct(product);

        // ── Pre-populate category slug so subcategories load correctly ────
        if (product?.category?.slug) {
          setSelectedSection(product.category.slug);
        }

        // ── Pre-populate subcategory selections ───────────────────────────
        if (Array.isArray(product?.subcategory_ids) && product.subcategory_ids.length > 0) {
          setSelectedSubcategoryIds(product.subcategory_ids);
        } else if (Array.isArray(product?.subcategories) && product.subcategories.length > 0) {
          setSelectedSubcategoryIds(product.subcategories.map((s) => s.id));
        }

        // ── Pre-populate existing images as previews ──────────────────────
        if (Array.isArray(product?.images) && product.images.length > 0) {
          const existingPreviews = [null, null, null];
          product.images.slice(0, 3).forEach((img, idx) => {
            // img can be a URL string or an object with a url property
            existingPreviews[idx] = typeof img === "string" ? img : img?.url;
          });
          setPreviewUrls(existingPreviews);
          // ── Set activeIndex to show the first existing image in preview ─
          setActiveIndex(0);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch product:", err);
        toast({
          title: "Error",
          description: "Failed to load product data",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => setIsFetchingProduct(false));
  }, [ProductId]);

  // ── Image handlers ────────────────────────────────────────────────────────
  const handleImageClick = (index) => {
    setActiveIndex(index);
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedImages = [...images];
    updatedImages[activeIndex] = file;
    setImages(updatedImages);
    const updatedPreviews = [...previewUrls];
    updatedPreviews[activeIndex] = URL.createObjectURL(file);
    setPreviewUrls(updatedPreviews);
  };

  // ── Build initial values — reacts to singleProduct once fetched ───────────
  const initialValues = {
    store_brand_id: singleProduct?.store_brand_id ?? storeBrand?.[0]?.id ?? "",
    title: singleProduct?.title ?? "",
    description: singleProduct?.description ?? "",
    brand_name: singleProduct?.product_brand_name ?? "",
    category_id: singleProduct?.category_id ?? "",
    publish_state: singleProduct?.publish_state ?? "draft",
    featureOne: singleProduct?.key_features?.[0] ?? "",
    featureTwo: singleProduct?.key_features?.[1] ?? "",
    featureThree: singleProduct?.key_features?.[2] ?? "",
    featureFour: singleProduct?.key_features?.[3] ?? "",
  };

  // ── Shared toast helper ───────────────────────────────────────────────────
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  // ── Shared error description extractor ───────────────────────────────────
  const extractErrorMessage = (error) => {
    const errors = error?.response?.data?.errors;
    return errors && typeof errors === "object"
      ? Object.values(errors).flat().join("\n")
      : error?.response?.data?.message ||
          "Something went wrong. Please try again.";
  };

  /* ── Create submit ─────────────────────────────────────────── */
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (!images.some(Boolean)) {
      showToast("Error", "Please upload at least one product image", "error");
      setSubmitting(false);
      return;
    }

    if (selectedOutletIds.length === 0) {
      showToast("Error", "Please select at least one outlet", "error");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("store_brand_id", values.store_brand_id);
    formData.append("category_id", values.category_id);
    formData.append("title", values.title);
    formData.append("publish_state", values.publish_state);
    formData.append("description", values.description);
    formData.append("product_brand_name", values.brand_name);
    formData.append("key_features[]", values.featureOne);
    formData.append("key_features[]", values.featureTwo);
    formData.append("key_features[]", values.featureThree);
    formData.append("key_features[]", values.featureFour);

    const selectedCatName = categoryArray?.find(
      (item) => String(item.id) === String(values.category_id),
    )?.name;
    if (selectedCatName) formData.append("category_name", selectedCatName);

    selectedSubcategoryIds.forEach((id) =>
      formData.append("subcategory_ids[]", id),
    );

    images.forEach((file) => {
      if (file) formData.append("images[]", file);
    });
    console.log("formData", formData);
    console.log("values", values);
    console.log("images", images);
    try {
      const resp = await axiosInstance.post(
        "/api/v1/merchant/products",
        formData,
      );
      console.log("resp", resp);
      const newProductId =
        resp?.data?.data?.product?.id || resp?.data?.data?.product?.id;
      console.log("newProductId", newProductId);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["outletInventory"] });
      showToast("Product", "Product added successfully", "success");
      resetForm();
      setImages([null, null, null]);
      setPreviewUrls([null, null, null]);
      setSelectedSubcategoryIds([]);
      router.push(
        `/main_pages/Dashboard/AssignProduct?productId=${newProductId}`,
      );
    } catch (error) {
      showToast(
        "Error",
        error?.response?.data?.message || error?.message || "Something went wrong. Please try again.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Edit submit ─────────────────────────────────────────────── */
  const handleEdit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    // ── Only append changed/filled fields ────────────────────────────────
    if (values.title) formData.append("product_title", values.title);
    if (values.brand_name) formData.append("brand_name", values.brand_name);
    if (values.description) formData.append("description", values.description);
    if (values.publish_state)
      formData.append("publish_state", values.publish_state);

    if (values.featureOne) formData.append("key_features[]", values.featureOne);
    if (values.featureTwo) formData.append("key_features[]", values.featureTwo);
    if (values.featureThree)
      formData.append("key_features[]", values.featureThree);
    if (values.featureFour)
      formData.append("key_features[]", values.featureFour);

    // ── Category — use newly selected or fall back to existing ────────────
    const categoryToSend = values.category_id || singleProduct?.categoryId;
    if (categoryToSend) {
      formData.append("category_id", categoryToSend);
      const catName = categoryArray?.find(
        (item) => String(item.id) === String(categoryToSend),
      )?.name;
      if (catName) formData.append("category_name", catName);
    }

    if (selectedSubcategoryIds.length > 0) {
      selectedSubcategoryIds.forEach((id) =>
        formData.append("subcategory_ids[]", id),
      );
    }

    // ── Only send images if the user actually picked new ones ─────────────
    const hasNewImages = images.some(Boolean);
    if (hasNewImages) {
      images.forEach((file) => {
        if (file) formData.append("images[]", file);
      });
    }

    try {
      await axiosInstance.patch(
        `/api/v1/merchant/products/${ProductId}`,
        formData,
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("Product Edit", "Product edited successfully", "success");

      // ── Navigate back with context so other pages know what just happened
      // action=edited  → other pages can show a success banner
      // ProductId      → other pages can refetch/highlight this product
      // from=edit      → breadcrumb or tab restoration
      router.push(
        `/main_pages/Dashboard/Outlets?action=edited&ProductId=${ProductId}&from=edit`,
      );
    } catch (error) {
      showToast("Error", extractErrorMessage(error), "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Show a loader while fetching product in edit mode ─────────────────────
  if (isEditMode && isFetchingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text className="text-[16px] text-[#888888]">Loading product...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-[50px]">
      <Box className="w-11/12 m-auto pt-[20px]">
        <Text className="text-[20px] font-semibold">
          {isEditMode ? "Edit Product" : "Add Product"}
        </Text>
        <Box className="flex items-center gap-x-[10px] text-[14px] mt-[10px]">
          <Box cursor="pointer">
            <Text className="text-[#888888]">Home</Text>
          </Box>
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none">
            <path
              d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
              fill="#737373"
            />
          </svg>
          <Box cursor="pointer" onClick={() => router.push("")}>
            <Text className="text-[#888888]">All Products</Text>
          </Box>
          <svg width="8" height="11" viewBox="0 0 8 11" fill="none">
            <path
              d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z"
              fill="#737373"
            />
          </svg>
          <Box cursor="pointer">
            <Text className="text-[#007460] font-semibold">
              {isEditMode ? "Edit product" : "Add new product"}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box className="pt-[20px]">
        <Box className="bg-white pt-[20px] w-11/12 m-auto rounded-lg pb-[30px]">
          <Formik
            initialValues={initialValues}
            validationSchema={isEditMode ? EditProductSchema : AddProductSchema}
            onSubmit={isEditMode ? handleEdit : handleSubmit}
            enableReinitialize // ← critical: re-populates form once singleProduct loads
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              isValid,
            }) => (
              <Form>
                <Box className="grid lg:grid-cols-5 gap-y-[20px] w-11/12 m-auto gap-x-[20px]">
                  <Box className="lg:col-span-3">
                    {/* ── Outlet selection — hidden in edit mode ──── */}
                    {!isEditMode && (
                      <Box className="mb-[20px]">
                        <Text className="text-[18px] font-semibold mb-[10px]">
                          Outlets
                        </Text>
                        <Box
                          border="1px"
                          borderColor={
                            selectedOutletIds.length === 0
                              ? "red.300"
                              : "gray.300"
                          }
                          borderRadius="lg"
                          className="p-[14px] max-h-[220px] overflow-y-auto"
                        >
                          <Checkbox
                            isChecked={selectAll}
                            onChange={handleToggleAll}
                            fontWeight="600"
                            mb="10px"
                          >
                            Select all outlets
                          </Checkbox>
                          <Box className="grid gap-y-[8px]">
                            {outletArray.length === 0 ? (
                              <Text className="text-[13px] text-[#B0B0B0]">
                                No outlets found.
                              </Text>
                            ) : (
                              outletArray.map((outlet) => (
                                <Checkbox
                                  key={outlet.id}
                                  isChecked={selectedOutletIds.includes(
                                    outlet.id,
                                  )}
                                  onChange={() => handleToggleOutlet(outlet.id)}
                                >
                                  <Text className="text-[14px]">
                                    {outlet.name}
                                    {outlet.city ? ` — ${outlet.city}` : ""}
                                  </Text>
                                </Checkbox>
                              ))
                            )}
                          </Box>
                        </Box>
                        {selectedOutletIds.length === 0 && (
                          <p className="text-red-600 text-[12px] pt-[5px]">
                            Please select at least one outlet
                          </p>
                        )}
                      </Box>
                    )}

                    {/* ── Publish state ────────────────────────────── */}
                    <Box className="mb-[20px]">
                      <Text className="text-[18px] font-semibold mb-[10px]">
                        Publish State
                      </Text>
                      <Select
                        name="publish_state"
                        value={values.publish_state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        _focus={{
                          border: "1px solid #007460",
                          boxShadow: "none",
                        }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                      </Select>
                      {touched.publish_state && errors.publish_state && (
                        <p className="text-red-600 text-[12px] pt-[5px]">
                          {errors.publish_state}
                        </p>
                      )}
                    </Box>

                    {/* ── Name & description ───────────────────────── */}
                    <Box>
                      <Text className="text-[18px] font-semibold">
                        Name & description
                      </Text>

                      <Box className="mt-[20px]">
                        <Text className="text-[14px] font-semibold">
                          Product title
                        </Text>
                        <Box className="w-full pt-[10px]">
                          <Input
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Input product title"
                            className="flex-1 text-[#7C7C7C] text-[14px] h-[44px]"
                          />
                          {touched.title && errors.title && (
                            <p className="text-red-600 text-[12px] pt-[5px]">
                              {errors.title}
                            </p>
                          )}
                        </Box>
                      </Box>

                      <Box className="mt-[20px]">
                        <Text className="text-[14px] font-semibold">
                          Description
                        </Text>
                        <Box className="w-full pt-[10px]">
                          <Textarea
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Input description"
                            className="min-h-[112px] w-full pt-[10px]"
                          />
                          {touched.description && errors.description && (
                            <p className="text-red-600 text-[12px] pt-[5px]">
                              {errors.description}
                            </p>
                          )}
                        </Box>
                      </Box>

                      <Box className="mt-[20px]">
                        <Text className="text-[14px] font-semibold">
                          Key features
                        </Text>
                        <Box className="w-full pt-[10px] grid grid-cols-2 gap-x-[20px] gap-y-[20px]">
                          {[
                            "featureOne",
                            "featureTwo",
                            "featureThree",
                            "featureFour",
                          ].map((feat, i) => (
                            <Box key={feat}>
                              <Input
                                name={feat}
                                value={values[feat]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={`Key feature ${i + 1}`}
                                className="flex-1 text-[#7C7C7C] text-[14px] h-[44px]"
                              />
                              {touched[feat] && errors[feat] && (
                                <p className="text-red-600 text-[12px] pt-[5px]">
                                  {errors[feat]}
                                </p>
                              )}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>

                    {/* ── Product details ──────────────────────────── */}
                    <Box className="mt-[48px]">
                      <Text className="text-[18px] font-semibold">
                        Product details
                      </Text>
                      <Box className="mt-[20px]">
                        <Text className="text-[14px] font-semibold">
                          Brand Name
                        </Text>
                        <Box className="w-full pt-[10px]">
                          <Input
                            name="brand_name"
                            value={values.brand_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Input brand name"
                            className="flex-1 text-[#7C7C7C] text-[14px] h-[44px]"
                          />
                          {touched.brand_name && errors.brand_name && (
                            <p className="text-red-600 text-[12px] pt-[5px]">
                              {errors.brand_name}
                            </p>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    {/* ── Section & Category ───────────────────────── */}
                    <Box className="mt-[48px]">
                      <Text className="text-[18px] font-semibold">
                        Section & Category
                      </Text>
                      <Box
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="lg"
                        className="w-full h-[40px] grid items-center mt-[10px]"
                      >
                        <Box className="flex justify-between w-11/12 m-auto">
                          <Box className="flex items-center gap-x-[5px] w-full">
                            <Box className="w-full flex-1">
                              <Select
                                placeholder="Select Category"
                                name="category_id"
                                value={values.category_id}
                                onChange={(e) => {
                                  handleChange(e);
                                  const slug = categoryArray?.find(
                                    (item) =>
                                      String(item.id) ===
                                      String(e.target.value),
                                  )?.slug;
                                  setSelectedSection(slug || "");
                                  setSelectedSubcategoryIds([]);
                                }}
                                onBlur={handleBlur}
                                _focus={{ border: "none", boxShadow: "none" }}
                                border="none"
                              >
                                {categoryArray?.map((item) => (
                                  <option key={item.slug} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </Select>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {touched.category_id && errors.category_id && (
                        <p className="text-red-600 text-[12px] pt-[5px]">
                          {errors.category_id}
                        </p>
                      )}

                      {selectedSection && (
                        <Box className="mt-[20px]">
                          <Text className="text-[14px] font-semibold">
                            Subcategory
                          </Text>
                          {subcategoryArray.length > 0 ? (
                            <Box className="mt-[10px]">
                              <div className="grid grid-cols-3 gap-y-[10px] gap-x-[10px]">
                                {subcategoryArray.map((item, index) => (
                                  <Checkbox
                                    key={index}
                                    isChecked={selectedSubcategoryIds.includes(item.id)}
                                    onChange={(e) => {
                                      setSelectedSubcategoryIds((prev) =>
                                        e.target.checked
                                          ? [...prev, item.id]
                                          : prev.filter((id) => id !== item.id),
                                      );
                                    }}
                                  >
                                    <Text>{item.name}</Text>
                                  </Checkbox>
                                ))}
                              </div>
                            </Box>
                          ) : (
                            <Text className="text-[#8A8A8A] text-[13px] mt-[10px]">
                              No subcategories for this category.
                            </Text>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* ── Image upload panel ───────────────────────── */}
                  <Box className="lg:col-span-2">
                    <Box className="lg:w-8/12 w-11/12 m-auto pt-[20px]">
                      {activeIndex !== null && previewUrls[activeIndex] ? (
                        <Box className="grid justify-center items-center overflow-hidden">
                          <Image
                            src={previewUrls[activeIndex]}
                            alt="Product preview"
                            unoptimized
                            width={250}
                            height={250}
                            style={{
                              height: "auto",
                              width: "250px",
                              borderRadius: "8px",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box className="bg-gray-400 h-[250px] w-full m-auto rounded-lg" />
                      )}
                    </Box>

                    <Box
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="lg"
                      className="lg:w-10/12 w-11/12 m-auto mt-[20px]"
                    >
                      <Box className="w-11/12 m-auto pt-[10px] pb-[10px]">
                        <Text className="font-semibold text-[20px]">
                          Image Product
                        </Text>
                        <Text className="text-[#454545] text-[14px] pt-[10px]">
                          <span className="font-semibold">Note:</span> Format
                          SVG, PNG, or JPG (Max 4mb).{" "}
                          {isEditMode && (
                            <span className="text-[#007460]">
                              Click a slot to replace an existing image.
                            </span>
                          )}
                        </Text>
                      </Box>
                      <Box className="grid grid-cols-3 gap-x-[20px] pt-[20px] pb-[20px]">
                        {[0, 1, 2].map((i) => (
                          <Box
                            key={i}
                            cursor="pointer"
                            onClick={() => handleImageClick(i)}
                            className="bg-[#F6F6F9] rounded-lg h-[100px] w-10/12 m-auto grid justify-center items-center overflow-hidden"
                          >
                            {previewUrls[i] ? (
                              <img
                                src={previewUrls[i]}
                                alt={`Preview ${i + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Box className="grid w-full h-full items-center justify-center">
                                <Box className="grid justify-center">
                                  <svg
                                    width="23"
                                    height="24"
                                    viewBox="0 0 23 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M0.957031 18.6666L6.21329 13.9359C7.00395 13.2244 8.21327 13.2562 8.96544 14.0083L10.957 15.9999L16.2095 10.7475C16.9905 9.96642 18.2569 9.96642 19.0379 10.7475L22.2904 13.9999M10.2904 7.99992C10.2904 8.7363 9.69341 9.33325 8.95703 9.33325C8.22065 9.33325 7.6237 8.7363 7.6237 7.99992C7.6237 7.26354 8.22065 6.66658 8.95703 6.66658C9.69341 6.66658 10.2904 7.26354 10.2904 7.99992ZM2.95703 22.6666H20.2904C21.3949 22.6666 22.2904 21.7712 22.2904 20.6666V3.33325C22.2904 2.22868 21.3949 1.33325 20.2904 1.33325H2.95703C1.85246 1.33325 0.957031 2.22868 0.957031 3.33325V20.6666C0.957031 21.7712 1.85246 22.6666 2.95703 22.6666Z"
                                      stroke="#343538"
                                      strokeWidth="1.4"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </Box>
                                <Text className="text-[#737373] text-[14px] text-center mt-[5px]">
                                  Photo {i + 1}
                                </Text>
                              </Box>
                            )}
                          </Box>
                        ))}
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* ── Submit ──────────────────────────────────────── */}
                <Box className="lg:flex grid items-center lg:justify-between gap-y-[20px] mt-[40px] pb-[20px] w-11/12 m-auto">
                  <Box />
                  <Box className="flex items-center gap-x-[20px]">
                    {/* Cancel — goes back without saving */}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                    >
                      <Text className="text-[14px]">Cancel</Text>
                    </Button>

                    {/* Skip — edit mode only: jump to Outlets without saving */}
                    {isEditMode && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          router.push(
                            `/main_pages/Dashboard/Outlets?action=edited&ProductId=${ProductId}&from=edit`,
                          )
                        }
                      >
                        <Text className="text-[14px]">Skip</Text>
                      </Button>
                    )}

                    <Button
                      type="submit"
                      isLoading={isSubmitting}
                      // ── In edit mode images are optional (user may keep existing ones)
                      isDisabled={
                        isEditMode
                          ? !isValid
                          : !isValid || !images.some(Boolean)
                      }
                      backgroundColor="#007460"
                      color="#FFFF"
                    >
                      <Text className="text-[14px]">
                        {isEditMode ? "Save Changes" : "Save Product"}
                      </Text>
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
}

export default Page;
