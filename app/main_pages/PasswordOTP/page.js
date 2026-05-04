"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Text, useToast } from "@chakra-ui/react";
import axiosInstance from "@/app/api/Api_Instance";
import DashBoardInput from "../Dashboard/component/DashboardInput";

function Page() {
  const router = useRouter();
  const toast = useToast();
  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("email") || "";

  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.otp || !form.password || !form.confirm_password) {
      toast({
        title: "All fields required",
        description: "Please fill in the OTP and both password fields.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (form.password !== form.confirm_password) {
      toast({
        title: "Passwords do not match",
        description: "New password and confirm password must be the same.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (form.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", emailFromParams);
    formData.append("otp", form.otp);
    formData.append("password", form.password);
    axiosInstance
      .post("/api/v1/reset-password", formData)
      .then((resp) => {
        setLoading(false);
        toast({
          title: "Password updated",
          description:
            resp?.data?.message || "Your password has been reset successfully.",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/main_pages/sign_in");
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] grid items-center">
      <div className="w-11/12 max-w-[460px] m-auto py-[40px]">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-md lg:px-[36px] px-[25px] py-[30px] lg:py-[44px]">
          {/* Icon */}
          <div className="flex justify-center mb-[20px]">
            <div className="w-[60px] h-[60px] rounded-full bg-[#E6F1EF] flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z"
                  stroke="#007460"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <Text className="text-[22px] font-bold text-center text-[#111827]">
            Reset Password
          </Text>
          <Text className="text-[13px] text-[#6B7280] text-center mt-[8px] mb-[32px] leading-6">
            Enter the OTP sent to your email along with your new password.
          </Text>

          <div
            className="grid gap-y-[20px] mt-[20px]"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          >
            <DashBoardInput
              label="OTP Code"
              placing="Enter OTP"
              names="otp"
              values={form.otp}
              handleChange={handleChange}
            />
            <DashBoardInput
              label="New Password"
              placing="Enter new password"
              names="password"
              values={form.password}
              handleChange={handleChange}
              password
              types="password"
            />
            <DashBoardInput
              label="Confirm Password"
              placing="Confirm new password"
              names="confirm_password"
              values={form.confirm_password}
              handleChange={handleChange}
              password
              types="password"
            />
          </div>

          <Button
            isLoading={loading}
            onClick={handleSubmit}
            height={16}
            backgroundColor="#007460"
            _hover={{ backgroundColor: "#005a4a" }}
            borderRadius="lg"
            width="100%"
            mt={8}
          >
            <Text color="white" className="text-[15px] font-semibold">
              Reset Password
            </Text>
          </Button>

          {/* Back */}
          <div
            className="flex items-center justify-center gap-x-[6px] mt-[24px] cursor-pointer"
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
        </div>
      </div>
    </div>
  );
}

export default Page;
