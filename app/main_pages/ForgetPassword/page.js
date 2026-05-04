"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import Image from "next/image";
import bringologo from "../../../public/bringologo.svg";
import axiosInstance from "@/app/api/Api_Instance";
import DashBoardInput from "../Dashboard/component/DashboardInput";

function Page() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    if (!isValidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    axiosInstance
      .post("/api/v1/forgot-password", formData)
      .then((resp) => {
        setLoading(false);
        toast({
          title: "OTP sent",
          description:
            resp?.data?.message || "An OTP code has been sent to your email.",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
        router.push(`/main_pages/PasswordOTP?email=${encodeURIComponent(email)}`);
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
        <div className="bg-white rounded-2xl shadow-md px-[36px] py-[44px]">
          {/* Icon */}
          <div className="flex justify-center mb-[20px]">
            <div className="w-[60px] h-[60px] rounded-full bg-[#E6F1EF] flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  stroke="#007460"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <Text className="text-[22px] font-bold text-center text-[#111827]">
            Forgot Password?
          </Text>
          <Text className="text-[13px] text-[#6B7280] text-center mt-[8px] mb-[32px] leading-6">
            Enter your registered email and we&apos;ll send you a one-time code
            to reset your password.
          </Text>

          <div
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="mt-[25px]"
          >
            <DashBoardInput
              label="Email Address"
              placing="Enter your email"
              names="email"
              values={email}
              handleChange={(e) => setEmail(e.target.value)}
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
            mt={6}
          >
            <Text color="white" className="text-[15px] font-semibold">
              Enter
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
