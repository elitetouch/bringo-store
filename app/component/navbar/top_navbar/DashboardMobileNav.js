"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import user from "../../../../public/user.svg";
import { Text } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ProfileInfo } from "@/app/api/reactQuery";
import { useStore } from "../../Store/useStore";
function DashboardMobileNav({ toogleSideNav }) {
  const router = useRouter();
  const { profile } = useStore();
  return (
    <div className="lg:hidden h-[68px] grid items-center">
      <Box className=" flex justify-between w-11/12 m-auto items-center">
        <Box
          cursor={"pointer"}
          onClick={() =>
            router.push(`/AccountSettings`)
          }
          className=" flex items-center gap-x-[20px] pl-[10px] "
        >
          <Box className=" relative">
            {profile?.userImage ? (
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
                width="40"
                height="40"
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
            {/* {  ProfileObject?.userImage && <svg
  width="40"
  height="40"
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
</svg>} */}

            <Box className=" h-[12px] w-[12px] rounded-full bg-[#23A149] absolute bottom-0 right-0"></Box>
          </Box>
          <Box className=" flex justify-between w-full text-[15px]">
            <Box>
              <Text className="text-[#454545]">{profile?.name || ""}</Text>
              <Text className=" mt-[10px] text-[#B0B0B0]">Admin</Text>
            </Box>
          </Box>
        </Box>
        <Box className=" flex items-center gap-x-[20px]">
          <IconButton
            backgroundColor={"transparent"}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6219 12.6209L19.168 19.167M8.08464 14.5003C11.6285 14.5003 14.5013 11.6275 14.5013 8.08366C14.5013 4.53983 11.6285 1.66699 8.08464 1.66699C4.54081 1.66699 1.66797 4.53983 1.66797 8.08366C1.66797 11.6275 4.54081 14.5003 8.08464 14.5003Z"
                  stroke="#454545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
          <IconButton
            onClick={toogleSideNav}
            backgroundColor={"transparent"}
            // onClick={toogleFunc}
            icon={
              <svg
                width="22"
                height="14"
                viewBox="0 0 22 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.66797 1.16699H20.3346M1.66797 7.00033H20.3346M1.66797 12.8337H20.3346"
                  stroke="#454545"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </Box>
      </Box>
    </div>
  );
}

export default DashboardMobileNav;
