"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Box, Text } from "@chakra-ui/react";
import Unboarding_input from "@/app/component/Inputs/Unboarding_input";
import { Checkbox } from "@chakra-ui/react";
import ShopCategoryDropdown from "@/app/component/DropDown/ShopCategoryDropdown";
import { Textarea } from "@chakra-ui/react";
import Image from "next/image";

function Shop_Setup({ signUpDetails, handleSignUpChange, onLogoSelect }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
    // Pass file up to parent
    onLogoSelect(file);
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const clearLogo = (e) => {
    e.stopPropagation();
    setPreview(null);
    onLogoSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <Box className="text-white lg:mt-[20px] mt-[20px] lg:w-10/12">
        <Text className="text-[20px] font-bold">Set Up your store</Text>
        <Text className="text-[15px] pt-[20px]">
          Setup your shop by completing the following details
        </Text>
      </Box>

      <Box>
        <Box className="grid gap-y-[16px] mt-[10px]">
          {/* ── Store Logo Upload ── */}
          <Box className=" mb-[12px]">
            <Text className="text-white text-[13px] pb-[12px] font-medium">
              Store Logo
            </Text>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drop zone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`
                relative flex flex-col items-center justify-center
                w-full h-[100px] rounded-xl cursor-pointer
                border-2 border-dashed transition-all duration-200
                ${
                  isDragging
                    ? "border-[#85CB14] bg-[#85CB14]/10"
                    : "border-white/30 bg-white/5 hover:border-[#85CB14]/60 hover:bg-white/10"
                }
              `}
            >
              {preview ? (
                <>
                  {/* Logo preview */}
                  <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[#85CB14]">
                    <Image
                      src={preview}
                      alt="Store logo preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-white/60 text-[11px] mt-2">
                    Click to change
                  </p>
                  {/* Clear button */}
                  <button
                    onClick={clearLogo}
                    className="
                      absolute top-2 right-2
                      flex items-center justify-center
                      w-6 h-6 rounded-full bg-red-500/80
                      text-white text-[12px]
                      hover:bg-red-500 transition-colors
                    "
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  {/* Upload icon */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white/40 mb-2"
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
                  <p className="text-white/60 text-[13px]">
                    Click or drag to upload store logo
                  </p>
                  <p className="text-white/30 text-[11px] mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </>
              )}
            </div>
          </Box>

          {/* name */}
          <Unboarding_input
            values={signUpDetails.name}
            handleChange={handleSignUpChange}
            types={"text"}
            names={"name"}
            placing={"Store Name"}
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0003 1.99805L5.75346 2.38848C4.26573 2.48146 2.95312 3.39398 2.34772 4.75613L1.80181 5.98443C1.21298 7.30931 1.38715 8.84911 2.25706 10.009L2.51535 10.3534L2.87118 18.1816C2.96829 20.3179 4.72854 22 6.86706 22H17.1336C19.2721 22 21.0324 20.3179 21.1295 18.1816L21.4788 10.4965C22.4301 9.60721 22.7807 8.21988 22.324 6.96402L21.6115 5.00463C21.0678 3.50945 19.6897 2.47863 18.1019 2.37939L12.0003 1.99805ZM4.86912 18.0908L4.5663 11.4287C5.42289 11.5296 6.30703 11.3307 7.05502 10.832L7.15889 10.7628C7.72364 10.3863 8.44682 10.3413 9.05391 10.6448L10.2115 11.2236C11.3376 11.7867 12.6631 11.7867 13.7892 11.2236L14.9467 10.6448C15.5538 10.3413 16.277 10.3863 16.8418 10.7628L16.9456 10.832C17.6936 11.3307 18.5778 11.5296 19.4343 11.4287L19.1315 18.0908C19.083 19.159 18.2028 20 17.1336 20H15.0871L15.2893 17.5744C15.4496 15.6503 13.9311 14 12.0003 14C10.0695 14 8.55104 15.6503 8.71139 17.5744L8.91352 20H6.86706C5.7978 20 4.91767 19.159 4.86912 18.0908ZM18.055 9.16795C18.6275 9.54957 19.3732 9.54957 19.9456 9.16795C20.4425 8.8367 20.6485 8.20871 20.4444 7.6475L19.7319 5.68812C19.4601 4.94053 18.771 4.42512 17.9771 4.3755L12.0003 4.00195L5.87821 4.38458C5.13435 4.43107 4.47805 4.88733 4.17535 5.56841L3.62944 6.7967C3.33502 7.45915 3.42211 8.22904 3.85706 8.80898L4.18534 9.24669C4.73731 9.54746 5.41572 9.52121 5.94562 9.16795L6.04949 9.09871C7.21141 8.32409 8.69931 8.23146 9.94834 8.85597L11.1059 9.43475C11.669 9.71628 12.3317 9.71628 12.8947 9.43475L14.0523 8.85597C15.3013 8.23146 16.7892 8.32409 17.9512 9.09871L18.055 9.16795ZM13.2962 17.4083L13.0802 20H10.9205L10.7045 17.4083C10.6413 16.6502 11.2396 16 12.0003 16C12.7611 16 13.3593 16.6502 13.2962 17.4083Z"
                  fill="#A5A6AB"
                  fillOpacity="0.88"
                />
              </svg>
            }
          />

          {/* category */}
          <ShopCategoryDropdown
            value={signUpDetails.category}
            handleChange={handleSignUpChange}
          />

          {/* description */}
          <Textarea
            backgroundColor={"white"}
            name={"description"}
            value={signUpDetails.description}
            onChange={handleSignUpChange}
            placeholder={"Brief Description"}
            className="min-h-[80px] w-full pt-[10px] bg-[white]"
          />
        </Box>

        <Box className="flex items-center gap-x-[10px] mt-[20px] text-white">
          <Box>
            <Checkbox borderColor={"white"} />
          </Box>
          <Box className="text-[12px]">
            <Text>
              I hereby agreed that i have read and agree to the BringoDirect
              sellers contract{" "}
              <Link
                href="/TermsAndConditions"
                onClick={() => sessionStorage.setItem("signupReturnStep", "3")}
                style={{ color: "#A8E545" }}
                className="underline underline-offset-2 hover:opacity-80"
              >
                Terms & Conditions
              </Link>
              , and{" "}
              <Link
                href="/PrivacyPolicy"
                onClick={() => sessionStorage.setItem("signupReturnStep", "3")}
                style={{ color: "#A8E545" }}
                className="underline underline-offset-2 hover:opacity-80"
              >
                Privacy Policy
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Shop_Setup;
