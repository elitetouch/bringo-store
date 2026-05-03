"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./Api_Instance";

export const BusinessInfo = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["BusinessInfo"],
    queryFn: () => axiosInstance.get("/api/v1/business-information"),
  });
  return { isPending, error, data };
};
export const StoreInfo = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["StoreInfo"],
    queryFn: () => axiosInstance.get("/api/v1/store-information"),
  });
  return { isPending, error, data };
};
export const SingletoreInfo = (id) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["StoreInfo"],
    queryFn: () => axiosInstance.get(`/api/v1/store-information/${id}`),
  });
  return { isPending, error, data };
};
export const ProfileInfo = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["ProfileInfo"],
    queryFn: () => axiosInstance.get("/api/v1/profile"),
  });
  return { isPending, error, data };
};
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/v1/product-categories");
      return res.data;
    },
  });
};
export const useSubcategory = (categoryId) => {
  return useQuery({
    queryKey: ["sub-categories", categoryId], // ← dynamic key so it refetches on change
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/product-categories/${categoryId}/subcategories`,
      );
      return res.data;
    },
    enabled: !!categoryId, // ← only runs when categoryId is truthy
  });
};
export const SubscriptionPlan = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["SubscriptionPlan"],
    queryFn: () => axiosInstance.get(`/api/v1/supermarket-fee`),
  });
  return { isPending, error, data };
};
//Get products
export const Products = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["Products"],
    queryFn: () => axiosInstance.get("/api/v1/merchant/products"),
  });
  const products = data?.data;
  return { isPending, error, products };
};
//Get outlets
export const Outlets = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["Outlets"],
    queryFn: () => axiosInstance.get("/api/v1/merchant/store-outlets"),
  });
  const Outlets = data?.data?.data?.storeOutlets;
  return { isPending, error, Outlets };
};
export const Orders = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["Orders"],
    queryFn: () => axiosInstance.get(""),
  });
  return { isPending, error, data };
};
export const GetKycStatus = (options = {}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["KycStatus"],
    queryFn: () => axiosInstance.get("/api/v1/merchant/kyc-documents"),
    ...options,
  });
  return { isPending, error, data };
};
export const LogOutFunction = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["LogOut"],
    queryFn: () => axiosInstance.get("/api/v1/logout"),
  });
  return { isPending, error, data };
};
export const useOutletInventory = (outletId) => {
  return useQuery({
    queryKey: ["outletInventory", outletId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/merchant/outlets/${outletId}/inventory`,
      );
      const raw = res.data.data?.inventory ?? res?.data ?? [];
      return Array.isArray(raw) ? raw : [];
    },
    enabled: !!outletId,
  });
};
