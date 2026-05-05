"use client";
import React from "react";
import {
  Box,
  Text,
  IconButton,
  Button,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import ProfilePicture from "../../../../public/profilePicture.svg";
import DashBoardInput from "../component/DashboardInput";
import Image from "next/image";

import { CountryPhoneInput } from "./component/CountryPhoneInput";
import { useRouter } from "next/navigation";
import Subscrption from "../component/Subscrption";
import { ProfileInfo } from "@/app/api/reactQuery";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/api/Api_Instance";
import { useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useStore } from "@/app/component/Store/useStore";
//import imp from '../../../main_pages/ForgetPassword'

function Page() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const profile = ProfileInfo();
  const storeBrand = useStore((state) => state.storeBrand);
  const KycInfo = useStore((state) => state.KycInfo);
  const storeProfile = useStore((state) => state.profile);
  const setStoreBrand = useStore((state) => state.setStoreBrand);
  const setKycInfo = useStore((state) => state.setKycInfo);
  const setProfile = useStore((state) => state.setProfile);
  const storeBrandId = storeBrand?.[0]?.id;
  // Store profile is authoritative; react-query data is a fallback
  const ProfileObject = storeProfile || profile?.data?.data?.user || {};
  const router = useRouter();

  // ── API endpoint constants ──────────────────────────────────────────────────
  // Update these strings when the real endpoints are confirmed
  const PROFILE_UPDATE_ENDPOINT = "/api/v1/edit-profile"; // TODO: confirm endpoint
  const CHANGE_PASSWORD_ENDPOINT = "/api/v1/edit-profile"; // TODO: confirm endpoint
  // ───────────────────────────────────────────────────────────────────────────
  const [subscription, setSuscription] = useState(false);
  const [pages, setPages] = useState(0);

  // Pre-populate profile form from store; password and image always start empty
  const [editProfile, setEditProfile] = useState({
    fullname: storeProfile?.fullname || "",
    phoneNumber: storeProfile?.phone || "",
    email: storeProfile?.email || "",
    date: storeProfile?.date || "",
    location: storeProfile?.country || storeProfile?.location || "",
    password: "",
    user_image: "",
  });
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFileName(file.name);
      setEditProfile((prev) => ({ ...prev, [name]: file }));
    }
  };
  const handleBoxClick = () => {
    inputRef.current.click();
  };
  const editFuncChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.name]: e.target.value });
  };
  // Compare against current store values so only genuinely changed fields are sent
  const getChangedFields = () => {
    const baseline = {
      fullname: storeProfile?.fullname || "",
      phoneNumber: storeProfile?.phone || "",
      email: storeProfile?.email || "",
      date: storeProfile?.date || "",
      location: storeProfile?.country || storeProfile?.location || "",
      password: "",
      user_image: "",
    };
    const changed = {};
    for (const key in editProfile) {
      if (editProfile[key] !== baseline[key]) {
        changed[key] = editProfile[key];
      }
    }
    return changed;
  };
  const [editLoader, setEditLoader] = useState(false);

  // Store information edit state — pre-populated from Zustand store
  const existingStoreLogo = KycInfo?.find((doc) => doc.type === "store_logo");
  const storeInfoDefaults = {
    name: storeBrand?.[0]?.name || "",
    category: storeBrand?.[0]?.category || "",
    description: storeBrand?.[0]?.description || "",
  };
  const [editStoreInfo, setEditStoreInfo] = useState(storeInfoDefaults);
  const [storeLogoPreview, setStoreLogoPreview] = useState(
    existingStoreLogo?.url || existingStoreLogo?.file_url || null,
  );
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const storeLogoInputRef = useRef(null);
  const [storeEditLoader, setStoreEditLoader] = useState(false);

  const handleStoreInfoChange = (e) => {
    setEditStoreInfo({ ...editStoreInfo, [e.target.name]: e.target.value });
  };

  const handleStoreLogoFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setStoreLogoPreview(reader.result);
    reader.readAsDataURL(file);
    setEditStoreInfo((prev) => ({ ...prev, storeLogo: file }));
  };

  const clearStoreLogo = (e) => {
    e.stopPropagation();
    setStoreLogoPreview(null);
    setEditStoreInfo((prev) => ({ ...prev, storeLogo: null }));
    if (storeLogoInputRef.current) storeLogoInputRef.current.value = "";
  };

  const submitStoreInfoEdit = async () => {
    if (!storeBrandId) {
      toast({
        title: "Error",
        description: "Store brand not found. Please reload and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setStoreEditLoader(true);
    try {
      // Update text fields via PATCH
      const payload = {};
      if (editStoreInfo.name) payload.name = editStoreInfo.name;
      if (editStoreInfo.category) payload.category = editStoreInfo.category;
      if (editStoreInfo.description)
        payload.description = editStoreInfo.description;

      if (Object.keys(payload).length > 0) {
        const patchResp = await axiosInstance.patch(
          `/api/v1/merchant/store-brands/${storeBrandId}`,
          payload,
        );
        const updatedBrand = patchResp?.data?.data?.storeBrand ?? {
          ...storeBrand?.[0],
          ...payload,
        };
        setStoreBrand([updatedBrand]);
      }

      // Upload logo via KYC endpoint if a new logo was selected
      if (editStoreInfo.storeLogo) {
        const logoFormData = new FormData();
        logoFormData.append("type", "store_logo");
        logoFormData.append("file", editStoreInfo.storeLogo);
        await axiosInstance.post(
          "/api/v1/merchant/kyc-documents",
          logoFormData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const kycResp = await axiosInstance.get(
          "/api/v1/merchant/kyc-documents",
        );
        setKycInfo(kycResp?.data?.data?.documents ?? []);
      }

      queryClient.invalidateQueries();
      setStoreEditLoader(false);
      toast({
        title: "Store Information",
        description: "Store information updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      setStoreEditLoader(false);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const SubmitEditFuncChange = () => {
    setEditLoader(true);
    const changedFields = getChangedFields();
    const formData = new FormData();

    changedFields?.fullname && formData.append("name", changedFields.fullname);
    changedFields?.password &&
      formData.append("password", changedFields.password);
    changedFields?.password &&
      formData.append("password_confirmation", changedFields.password);
    changedFields?.email && formData.append("email", changedFields.email);
    changedFields?.phoneNumber &&
      formData.append("phone", changedFields.phoneNumber);
    changedFields?.date && formData.append("date", changedFields.date);
    changedFields?.location &&
      formData.append("location", changedFields.location);
    changedFields?.user_image &&
      formData.append("user_image", changedFields.user_image);

    axiosInstance
      .post(PROFILE_UPDATE_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        // Reflect changes back into the Zustand store
        const updatedProfile = {
          ...storeProfile,
          ...(changedFields.fullname && { fullname: changedFields.fullname }),
          ...(changedFields.email && { email: changedFields.email }),
          ...(changedFields.phoneNumber && {
            phone: changedFields.phoneNumber,
          }),
          ...(changedFields.date && { date: changedFields.date }),
          ...(changedFields.location && { country: changedFields.location }),
        };
        setProfile(updatedProfile);
        queryClient.invalidateQueries();
        setEditLoader(false);
        toast({
          title: "Profile",
          description: "Profile updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setFileName("");
      })
      .catch((error) => {
        setEditLoader(false);
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to update profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  const passReff = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [changePassword, setChangePassword] = useState(passReff);
  const passwordChange = (e) => {
    setChangePassword({ ...changePassword, [e.target.name]: e.target.value });
  };
  const Validation = () => {
    const errors = {};
    ["currentPassword", "newPassword", "confirmPassword"].forEach((field) => {
      if (!changePassword[field]) errors[field] = true;
    });
    return Object.keys(errors).length === 0;
  };
  const [changePasswordLoader, setChangePasswordLoader] = useState(false);
  const submitPasswordFunc = () => {
    if (!Validation()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New password and confirm password do not match.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setChangePasswordLoader(true);
    const formData = new FormData();
    formData.append("password", changePassword.newPassword);
    formData.append("password_confirmation", changePassword.confirmPassword);
    axiosInstance
      .post(CHANGE_PASSWORD_ENDPOINT, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        queryClient.invalidateQueries();
        setChangePasswordLoader(false);
        toast({
          title: "Password",
          description: "Password changed successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setChangePassword(passReff);
      })
      .catch((error) => {
        setChangePasswordLoader(false);
        toast({
          title: "Error",
          description:
            error.response?.data?.message || "Failed to change password.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };
  //For billing validation//
  return (
    <div className=" min-h-screen">
      {!subscription ? (
        <Box>
          <Box>
            <Box className=" w-11/12 m-auto lg:pt-[40px] pt-[20px]">
              <Text className=" text-[18px] font-semibold">
                Account & Settings
              </Text>
              <Box className=" flex items-center gap-x-[10px] text-[14px] mt-[10px]">
                <Text className=" text-[#888888]">Dashboard</Text>
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
                <Text className="  text-[#007460]">Profile</Text>
              </Box>
            </Box>
            <Box className=" lg:h-[69px] h-[60px] w-11/12 items-center bg-white rounded-lg lg:w-10/12 m-auto grid mt-[20px]">
              <Box className=" grid lg:grid-cols-2 grid-cols-2 items-center lg:gap-x-[40px] gap-x-[30px] lg:w-11/12 m-auto  ">
                <Button
                  onClick={() => setSuscription(false)}
                  _hover={{ backgroundColor: "#E6F1EF", color: "#007460" }}
                  backgroundColor={(pages === 0 && "#E6F1EF") || "transparent"}
                  color={"#737373"}
                  height={45}
                  width={""}
                >
                  <Text
                    color={(pages === 0 && "#007460") || "#737373"}
                    className=" text-[14px] font-semiBold"
                  >
                    Accounts
                  </Text>
                </Button>
                <Button
                  onClick={() =>
                    router.push("/../../../main_pages/Dashboard/Subscription")
                  }
                  _hover={{ backgroundColor: "#E6F1EF", color: "#007460" }}
                  backgroundColor={(pages === 1 && "#E6F1EF") || "transparent"}
                  color={"#737373"}
                  height={45}
                  width={""}
                >
                  <Text
                    color={(pages === 1 && "#007460") || "#737373"}
                    className=" text-[14px] font-semiBold"
                  >
                    Subscription
                  </Text>
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className=" grid lg:grid-cols-6 lg:pl-[10px] lg:pr-[10px] m-auto">
            <Box className=" lg:col-span-2 mt-[20px]">
              <Box className=" bg-white rounded-lg w-11/12 m-auto mb-[20px]">
                <Box className=" w-11/12 m-auto">
                  <Box className=" flex items-center pt-[20px] justify-between w-full">
                    <Box>
                      <Text className=" text-[18px] font-semibold">
                        Profile
                      </Text>
                    </Box>
                    <Box className=" flex items-center gap-x-[10px]">
                      <IconButton
                        backgroundColor={"transparent"}
                        icon={
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.30402 2.79393H3.95385C2.51233 2.79393 1.34375 3.96251 1.34375 5.40403V14.1044C1.34375 15.546 2.51233 16.7145 3.95385 16.7145H12.6542C14.0957 16.7145 15.2643 15.546 15.2643 14.1044L15.2643 9.75424M5.69392 12.3643L8.85938 11.7265C9.02742 11.6926 9.18172 11.6099 9.3029 11.4886L16.3891 4.39855C16.7288 4.05861 16.7286 3.5076 16.3886 3.16795L14.8875 1.66854C14.5476 1.32903 13.9968 1.32927 13.6572 1.66906L6.5703 8.75987C6.44936 8.88088 6.36678 9.03486 6.33289 9.20256L5.69392 12.3643Z"
                              stroke="#6A717F"
                              strokeWidth="1.45006"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      />
                      <IconButton
                        backgroundColor={"transparent"}
                        icon={
                          <svg
                            width="16"
                            height="18"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 17.3979C12.3056 17.3979 11.7153 17.1548 11.2292 16.6687C10.7431 16.1826 10.5 15.5923 10.5 14.8979C10.5 14.8006 10.5069 14.7 10.5208 14.5958C10.5347 14.4916 10.5556 14.3979 10.5833 14.3145L4.70833 10.8979C4.47222 11.1062 4.20833 11.2694 3.91667 11.3875C3.625 11.5055 3.31944 11.5645 3 11.5645C2.30556 11.5645 1.71528 11.3215 1.22917 10.8354C0.743056 10.3493 0.5 9.75898 0.5 9.06453C0.5 8.37009 0.743056 7.77981 1.22917 7.2937C1.71528 6.80759 2.30556 6.56453 3 6.56453C3.31944 6.56453 3.625 6.62356 3.91667 6.74162C4.20833 6.85967 4.47222 7.02287 4.70833 7.2312L10.5833 3.81453C10.5556 3.7312 10.5347 3.63745 10.5208 3.53328C10.5069 3.42912 10.5 3.32842 10.5 3.2312C10.5 2.53676 10.7431 1.94648 11.2292 1.46037C11.7153 0.974257 12.3056 0.731201 13 0.731201C13.6944 0.731201 14.2847 0.974257 14.7708 1.46037C15.2569 1.94648 15.5 2.53676 15.5 3.2312C15.5 3.92565 15.2569 4.51592 14.7708 5.00203C14.2847 5.48815 13.6944 5.7312 13 5.7312C12.6806 5.7312 12.375 5.67217 12.0833 5.55412C11.7917 5.43606 11.5278 5.27287 11.2917 5.06453L5.41667 8.4812C5.44444 8.56453 5.46528 8.65828 5.47917 8.76245C5.49306 8.86662 5.5 8.96731 5.5 9.06453C5.5 9.16176 5.49306 9.26245 5.47917 9.36662C5.46528 9.47078 5.44444 9.56453 5.41667 9.64787L11.2917 13.0645C11.5278 12.8562 11.7917 12.693 12.0833 12.575C12.375 12.4569 12.6806 12.3979 13 12.3979C13.6944 12.3979 14.2847 12.6409 14.7708 13.127C15.2569 13.6131 15.5 14.2034 15.5 14.8979C15.5 15.5923 15.2569 16.1826 14.7708 16.6687C14.2847 17.1548 13.6944 17.3979 13 17.3979ZM13 4.06453C13.2361 4.06453 13.434 3.98467 13.5938 3.82495C13.7535 3.66523 13.8333 3.46731 13.8333 3.2312C13.8333 2.99509 13.7535 2.79717 13.5938 2.63745C13.434 2.47773 13.2361 2.39787 13 2.39787C12.7639 2.39787 12.566 2.47773 12.4062 2.63745C12.2465 2.79717 12.1667 2.99509 12.1667 3.2312C12.1667 3.46731 12.2465 3.66523 12.4062 3.82495C12.566 3.98467 12.7639 4.06453 13 4.06453ZM3 9.89787C3.23611 9.89787 3.43403 9.81801 3.59375 9.65829C3.75347 9.49856 3.83333 9.30065 3.83333 9.06453C3.83333 8.82842 3.75347 8.63051 3.59375 8.47078C3.43403 8.31106 3.23611 8.2312 3 8.2312C2.76389 8.2312 2.56597 8.31106 2.40625 8.47078C2.24653 8.63051 2.16667 8.82842 2.16667 9.06453C2.16667 9.30065 2.24653 9.49856 2.40625 9.65829C2.56597 9.81801 2.76389 9.89787 3 9.89787ZM13 15.7312C13.2361 15.7312 13.434 15.6513 13.5938 15.4916C13.7535 15.3319 13.8333 15.134 13.8333 14.8979C13.8333 14.6618 13.7535 14.4638 13.5938 14.3041C13.434 14.1444 13.2361 14.0645 13 14.0645C12.7639 14.0645 12.566 14.1444 12.4062 14.3041C12.2465 14.4638 12.1667 14.6618 12.1667 14.8979C12.1667 15.134 12.2465 15.3319 12.4062 15.4916C12.566 15.6513 12.7639 15.7312 13 15.7312Z"
                              fill="#4B5563"
                            />
                          </svg>
                        }
                      />
                    </Box>
                  </Box>
                  <Box>
                    <Box className=" mt-[10px] grid w-full justify-center">
                      {/* <Image alt='' src={ProfilePicture} height={96} width={96} /> */}
                      {ProfileObject?.userImage ? (
                        <Box
                          className=" bg-gray-100 w-[96px] grid items-center justify-center h-[96px] overflow-hidden rounded-full"
                          cursor={"pointer"}
                        >
                          <Image
                            src={ProfileObject?.userImage}
                            alt="Profile"
                            width={500}
                            height={500}
                            unoptimized
                            className=" h-[500px] w-[500px]"
                          />
                        </Box>
                      ) : (
                        <svg
                          width="96"
                          height="96"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                          <path
                            d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
                            fill="#9CA3AF"
                          />
                          <path
                            d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V33H10V32Z"
                            fill="#9CA3AF"
                          />
                        </svg>
                      )}
                    </Box>
                    <Text className=" mt-[10px] font-semibold text-center">
                      {ProfileObject?.fullname || ""}
                    </Text>
                    <Box className=" flex items-center gap-x-[5px] justify-center pb-[20px] ">
                      <Text className=" text-[14px]">
                        {ProfileObject?.email || ""}
                      </Text>
                      <IconButton
                        icon={
                          <svg
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.32812 10.5641H2.66146C2.30784 10.5641 1.9687 10.4237 1.71865 10.1736C1.4686 9.92355 1.32813 9.58442 1.32812 9.23079V3.23079C1.32812 2.87717 1.4686 2.53803 1.71865 2.28799C1.9687 2.03794 2.30784 1.89746 2.66146 1.89746H8.66146C9.01508 1.89746 9.35422 2.03794 9.60427 2.28799C9.85432 2.53803 9.99479 2.87717 9.99479 3.23079V3.89746M7.32812 6.56413H13.3281C14.0645 6.56413 14.6615 7.16108 14.6615 7.89746V13.8975C14.6615 14.6338 14.0645 15.2308 13.3281 15.2308H7.32812C6.59174 15.2308 5.99479 14.6338 5.99479 13.8975V7.89746C5.99479 7.16108 6.59174 6.56413 7.32812 6.56413Z"
                              stroke="#007AFF"
                              stroke-width="1.2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        }
                        backgroundColor={"transparent"}
                      />
                    </Box>
                    {/* <Box className=' mt-[10px]'>
                    <Text className=' text-[15px] text-center text-[#4B5563] font-semibold'>Linked with Social media</Text>
                  </Box> */}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Box className=" w-11/12 m-auto rounded-lg bg-white">
                  <Box className=" w-11/12 m-auto pt-[20px] flex items-center justify-between">
                    <Text className=" text-[18px] font-semibold">
                      Change Password
                    </Text>
                    <Box className=" flex items-center gap-x-[5px]">
                      <Text className=" text-[12px] text-[#007AFF]">
                        Need help
                      </Text>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7 10.3333V10.3286M5.09155 5C5.34641 4.22722 6.10446 3.66667 6.99999 3.66667C8.10456 3.66667 8.99999 4.51946 8.99999 5.57143C8.99999 7.07063 7.38171 6.83596 7.05651 8.33333M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
                          stroke="#007AFF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  </Box>
                  <Box className=" w-11/12 m-auto mt-[20px] grid gap-y-[20px]">
                    <Box>
                      <DashBoardInput
                        placing={"Enter password"}
                        names={"currentPassword"}
                        values={changePassword.currentPassword}
                        handleChange={passwordChange}
                        label={"Current Password"}
                        password
                        types={"password"}
                      />
                      <Box
                        onClick={() =>
                          router.push(`/../../../main_pages/ForgetPassword`)
                        }
                        cursor={"pointer"}
                      >
                        <Text className=" text-[12px] text-[#007AFF] pt-[10px]">
                          Forgot Current Password? Click here
                        </Text>
                      </Box>
                    </Box>
                    <Box>
                      <DashBoardInput
                        placing={"Enter password"}
                        names={"newPassword"}
                        values={changePassword.newPassword}
                        handleChange={passwordChange}
                        label={"New Password"}
                        password
                        types={"password"}
                      />
                    </Box>
                    <Box>
                      <DashBoardInput
                        placing={"Enter password"}
                        names={"confirmPassword"}
                        values={changePassword.confirmPassword}
                        handleChange={passwordChange}
                        label={"Re-enter Password"}
                        password
                        types={"password"}
                      />
                    </Box>
                    <Box className=" mt-[20px] w-7/12 m-auto pb-[20px]">
                      <Button
                        isLoading={changePasswordLoader}
                        onClick={submitPasswordFunc}
                        height={42}
                        backgroundColor={"#007460"}
                        className=" w-full"
                      >
                        <Text color={"white"} className=" text-[14px]">
                          Save Change
                        </Text>
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className=" lg:col-span-4">
              <Box className=" bg-white rounded-lg w-11/12 m-auto shadow-lg pb-[30px] mb-[40px]">
                <Box className=" mt-[20px] w-11/12 m-auto">
                  <Box className=" flex items-center justify-between pt-[20px]">
                    <Box>
                      <Text className=" font-bold text-[18px]">
                        Profile Update
                      </Text>
                    </Box>
                    <Box className=" ">
                      <Button
                        backgroundColor={"transparent"}
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="lg"
                      >
                        <Box className=" flex items-center gap-x-[5px]">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.30402 2.72948H3.95385C2.51233 2.72948 1.34375 3.89806 1.34375 5.33958V14.04C1.34375 15.4815 2.51233 16.6501 3.95385 16.6501H12.6542C14.0957 16.6501 15.2643 15.4815 15.2643 14.04L15.2643 9.68978M5.69392 12.2998L8.85938 11.662C9.02742 11.6282 9.18172 11.5454 9.3029 11.4242L16.3891 4.33409C16.7288 3.99416 16.7286 3.44315 16.3886 3.1035L14.8875 1.60409C14.5476 1.26458 13.9968 1.26481 13.6572 1.60461L6.5703 8.69542C6.44936 8.81643 6.36678 8.97041 6.33289 9.13811L5.69392 12.2998Z"
                              stroke="#6A717F"
                              stroke-width="1.45006"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <Text className=" text-[14px] lg:grid hidden ">
                            Edit
                          </Text>
                        </Box>
                      </Button>
                    </Box>
                  </Box>
                  <Box className=" mt-[10px] flex items-center justify-between ">
                    <Box className=" flex items-center gap-x-[20px]">
                      <Box cursor={"pointer"} onClick={handleBoxClick}>
                        {ProfileObject?.userImage ? (
                          <Box
                            className=" bg-gray-100 w-[50px] grid items-center justify-center h-[50px] overflow-hidden rounded-full"
                            cursor={"pointer"}
                          >
                            <Image
                              src={ProfileObject?.userImage}
                              alt="Profile"
                              width={500}
                              height={500}
                              unoptimized
                              className=" h-[500px] w-[500px]"
                            />
                          </Box>
                        ) : (
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 40 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
                            <path
                              d="M20 20C23.3137 20 26 17.3137 26 14C26 10.6863 23.3137 8 20 8C16.6863 8 14 10.6863 14 14C14 17.3137 16.6863 20 20 20Z"
                              fill="#9CA3AF"
                            />
                            <path
                              d="M10 32C10 27.5817 13.5817 24 18 24H22C26.4183 24 30 27.5817 30 32V33H10V32Z"
                              fill="#9CA3AF"
                            />
                          </svg>
                        )}

                        {/* <Image alt='' src={ProfilePicture} height={64} width={64} /> */}
                      </Box>
                      <Box className=" flex items-center gap-x-[10px]">
                        <Box>
                          {fileName === "" ? (
                            <Button
                              onClick={handleBoxClick}
                              backgroundColor={"transparent"}
                              border="1px"
                              borderColor="gray.300"
                              borderRadius="lg"
                            >
                              <Box className=" flex items-center gap-x-[5px]">
                                <Text
                                  color={"#454545"}
                                  className=" text-[14px] lg:grid hidden"
                                >
                                  Change Pictures
                                </Text>
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
                              </Box>
                            </Button>
                          ) : (
                            <Button
                              isLoading={editLoader}
                              onClick={SubmitEditFuncChange}
                              backgroundColor={"transparent"}
                              border="1px"
                              borderColor="gray.300"
                              borderRadius="lg"
                            >
                              <Box className=" flex items-center gap-x-[5px]">
                                <Text
                                  color={"#454545"}
                                  className=" text-[14px] "
                                >
                                  Submit
                                </Text>
                              </Box>
                            </Button>
                          )}
                          <Box className="flex items-center gap-2 overflow-hidden">
                            <input
                              type="file"
                              className="hidden"
                              ref={inputRef}
                              onChange={handleFileChange}
                              name={"user_image"}
                            />
                            {
                              <Text className="text-[#666]" noOfLines={1}>
                                {fileName || ""}
                              </Text>
                            }
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box></Box>
                  </Box>
                  <Box className=" pt-[20px]">
                    <Box className="">
                      <DashBoardInput
                        placing={ProfileObject?.name || "Full Name"}
                        names={"fullname"}
                        values={editProfile.fullname}
                        handleChange={editFuncChange}
                        label={"Full Name"}
                      />
                    </Box>
                    <Box className=" grid lg:grid-cols-2 gap-x-[20px] gap-y-[20px] mt-[20px]">
                      <Box>
                        <DashBoardInput
                          placing={"2345267"}
                          names={"password"}
                          values={editProfile.password}
                          handleChange={editFuncChange}
                          label={"Password"}
                          types={"password"}
                          password
                        />
                      </Box>
                      <Box>
                        <CountryPhoneInput
                          values={editProfile.phoneNumber}
                          names={"phoneNumber"}
                          label={"Phone Number"}
                          placing={ProfileObject?.phone || "Phone Number"}
                          changes={editFuncChange}
                        />
                      </Box>
                      <Box>
                        <DashBoardInput
                          placing={ProfileObject?.email || "Email address"}
                          names={"email"}
                          values={editProfile.email}
                          handleChange={editFuncChange}
                          label={"Email"}
                        />
                      </Box>
                      <Box>
                        <DashBoardInput
                          placing={""}
                          types={"date"}
                          names={"date"}
                          values={editProfile.date}
                          handleChange={editFuncChange}
                          label={"Date"}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Box className=" mt-[20px]">
                        <DashBoardInput
                          placing={ProfileObject?.country || "Location"}
                          names={"location"}
                          values={editProfile.location}
                          handleChange={editFuncChange}
                          label={"Location"}
                        />
                      </Box>
                      <Box className=" w-11/12 m-auto grid justify-end mt-[20px]">
                        <Button
                          isLoading={editLoader}
                          onClick={SubmitEditFuncChange}
                          height={42}
                          backgroundColor={"#007460"}
                        >
                          <Text color={"white"} className=" text-[14px]">
                            Submit
                          </Text>
                        </Button>
                      </Box>
                    </Box>
                    {/* <Box className=' mt-[30px]'>
                 <CreditCardInfo value={editProfile}  changes={editFuncChange} />
                </Box> */}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box className=" pt-[40px] w-11/12 m-auto">
              <Text className=" text-[18px] font-semibold">
                Store information
              </Text>
              <Box className=" mt-[20px] bg-white rounded-lg">
                <Box className=" w-11/12 m-auto pt-[30px] pb-[30px] grid gap-y-[20px]">
                  {/* Store Logo */}
                  <Box>
                    <Text className="text-[15px] font-semibold pb-[10px]">
                      Store Logo
                    </Text>
                    <input
                      ref={storeLogoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleStoreLogoFile(e.target.files[0])}
                      className="hidden"
                    />
                    <div
                      onClick={() => storeLogoInputRef.current?.click()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDraggingLogo(false);
                        handleStoreLogoFile(e.dataTransfer.files[0]);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingLogo(true);
                      }}
                      onDragLeave={() => setIsDraggingLogo(false)}
                      className={`relative flex flex-col items-center justify-center w-full h-[100px] rounded-xl cursor-pointer border-2 border-dashed transition-all duration-200 ${
                        isDraggingLogo
                          ? "border-[#007460] bg-[#007460]/10"
                          : "border-gray-300 bg-gray-50 hover:border-[#007460]/60 hover:bg-gray-100"
                      }`}
                    >
                      {storeLogoPreview ? (
                        <>
                          <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#007460]">
                            <Image
                              src={storeLogoPreview}
                              alt="Store logo preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <p className="text-gray-400 text-[11px] mt-2">
                            Click to change
                          </p>
                          <button
                            onClick={clearStoreLogo}
                            className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-red-500/80 text-white text-[12px] hover:bg-red-500 transition-colors"
                          >
                            ✕
                          </button>
                        </>
                      ) : (
                        <>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-gray-400 mb-2"
                          >
                            <path
                              d="M12 16V8M12 8L9 11M12 8L15 11"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          <p className="text-gray-500 text-[13px]">
                            Click or drag to upload store logo
                          </p>
                          <p className="text-gray-400 text-[11px] mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </Box>

                  {/* Store Name & Category */}
                  <Box className="grid lg:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[20px]">
                    <DashBoardInput
                      placing={"Store Name"}
                      names={"name"}
                      values={editStoreInfo.name}
                      handleChange={handleStoreInfoChange}
                      label={"Store Name"}
                    />

                    <Box>
                      <Text className="text-[15px] font-semibold">
                        Category
                      </Text>
                      <div className="w-full rounded-l-lg rounded-r-lg h-[48px] grid items-center mt-[10px] bg-[#F6F6F6] text-[15px]">
                        <Box className="w-11/12 m-auto">
                          <Select
                            name="category"
                            value={editStoreInfo.category}
                            onChange={handleStoreInfoChange}
                            placeholder="Select Category"
                            border="none"
                            backgroundColor="#F6F6F6"
                            className="text-[#7C7C7C] text-[14px]"
                          >
                            <option value="supermarket">Supermarket</option>
                            <option value="electronics">Electronics</option>
                            <option value="grocery_store">Grocery store</option>
                            <option value="fashion">Fashion</option>
                            <option value="farmers_market">
                              Farmers' market
                            </option>
                          </Select>
                        </Box>
                      </div>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Box>
                    <Text className="text-[15px] font-semibold pb-[10px]">
                      Description
                    </Text>
                    <Textarea
                      backgroundColor={"#F6F6F6"}
                      name={"description"}
                      value={editStoreInfo.description}
                      onChange={handleStoreInfoChange}
                      placeholder={"Brief Description"}
                      className="min-h-[80px] w-full"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className=" mt-[20px] grid justify-end lg:w-11/12 w-11/12 m-auto pb-[40px]">
              <Button
                isLoading={storeEditLoader}
                onClick={submitStoreInfoEdit}
                height={42}
                backgroundColor={"#007460"}
                className=" w-full"
              >
                <Text color={"white"} className=" text-[14px]">
                  Save Change
                </Text>
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Subscrption />
        </Box>
      )}
    </div>
  );
}

export default Page;
