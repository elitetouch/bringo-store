"use client";
import React, { useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@chakra-ui/react";
import supermarket from "../../../../public/supermarket.svg";
import { SideNavData } from "../../Data/SideNav";
import { sideNavTools } from "../../Data/SideNav";
import { Switch } from "@chakra-ui/react";
import bringo from "../../../../public/bringologo.svg";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import MarketListPopUp from "../../PopUp/MarketList";

import axiosInstance from "@/app/api/Api_Instance";

import { useStore } from "../../Store/useStore";

export const ProfileComponent = ({ toogleSideMenu, profileData }) => {
  const router = useRouter();

  return (
    <Box
      border="1px"
      borderColor="gray.300"
      borderRadius="lg"
      className="border border-red-900 rounded-lg mt-[20px] mb-[20px] min-h-[50px] grid items-center"
    >
      <Box className="flex items-center gap-x-[10px] w-11/12 m-auto">
        <Box>
          {profileData?.userImage ? (
            <Box
              className="bg-gray-100 w-[40px] grid items-center justify-center h-[40px] overflow-hidden rounded-full"
              cursor={"pointer"}
            >
              <Image
                src={profileData?.userImage}
                alt="Profile"
                width={500}
                height={500}
                unoptimized
                className="h-[500px] w-[500px]"
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
        </Box>
        <Box
          cursor={"pointer"}
          onClick={() =>
            router.push(`/AccountSettings`)
          }
          className="flex justify-between w-full text-[15px]"
        >
          {!toogleSideMenu && (
            <Box>
              <Text className="text-[#454545]">{profileData?.name}</Text>
              <Text className="mt-[10px] text-[#B0B0B0]">Admin</Text>
            </Box>
          )}
          <Box>
            <IconButton
              position={"unset"}
              backgroundColor={"transparent"}
              icon={
                <svg
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9L17 1"
                    stroke="#454545"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function DashboardDeskSide({
  toogleMobile,
  mobileTog,
  toogleSideMenu,
  toogleFunc,
}) {
  const { profile, storeBrand, KycInfo } = useStore();
  console.log("branding", storeBrand);
  const storeLogoUrl = KycInfo?.find((item) => item.type === "store_logo");

  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const isActive = (destination) => {
    if (!destination || !pathname) return false;
    const norm = (s) => s.toLowerCase().replace(/^(\/\.\.)+\//, "/");
    const current = norm(pathname);
    const target = norm(destination);
    return current === target || current.startsWith(target + "/");
  };

  const ACTIVE_BG = "#E6F1EF";
  const ACTIVE_TEXT = "#0E4940";
  const ACTIVE_WEIGHT = "700";
  const ACTIVE_BORDER = "3px solid #0E4940";

  const navItemStyle = (destination) =>
    isActive(destination)
      ? {
          backgroundColor: ACTIVE_BG,
          borderLeft: ACTIVE_BORDER,
          borderRadius: "8px",
          fontWeight: ACTIVE_WEIGHT,
        }
      : {};

  const navTextColor = (destination) =>
    isActive(destination) ? ACTIVE_TEXT : "#535961";

  const router = useRouter();
  const toast = useToast();
  const [dropdown, setDropDown] = useState(false);

  const dropdownFunc = () => setDropDown(!dropdown);

  const ErrorPops = () => {
    toast({
      title: "Error",
      description: storeBrand?.length < 1 && "Please Create store",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const [logOutLoader, setLogOutLoader] = useState(false);

  const LogOutFunc = () => {
    setLogOutLoader(true);
    axiosInstance
      .post("/api/v1/logout")
      .then((resp) => {
        setLogOutLoader(false);
        toast({
          title: "Success",
          description: "Logged Out Successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/");
      })
      .catch((error) => {
        setLogOutLoader(false);
        toast({
          title: "Error",
          description: "Error in Loging Out",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const SetUpStoreQuery = () => {
    toast({
      title: "Error",
      description: "Please Fill in store information before you proceed",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  const STORE_SETUP_DEST = "/new_user_dashboard";

  return (
    <div
      className={`${!toogleSideMenu ? "lg:w-[250px] w-full" : "w-[110px]"} custom-scrollbar lg:overflow-y-auto h-screen`}
    >
      <Box className="w-11/12 lg:flex flex-col justify-between m-auto lg:pt-[20px] pt-[15px] pb-[32px]">
        <Box>
          <Box className="w-11/12 m-auto">
            <Box className="flex items-center justify-between">
              <Box>
                <Image alt="" src={bringo} />
              </Box>
              <Box>
                <IconButton
                  position={"unset"}
                  backgroundColor={"transparent"}
                  onClick={mobileTog ? toogleMobile : toogleFunc}
                  icon={
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C0.71667 12 0.479337 11.904 0.288004 11.712C0.0966702 11.52 0.000670115 11.2827 0 11C-0.000663218 10.7173 0.0953369 10.48 0.288004 10.288C0.48067 10.096 0.718003 10 1 10H12C12.2833 10 12.521 10.096 12.713 10.288C12.905 10.48 13.0007 10.7173 13 11C12.9993 11.2827 12.9033 11.5203 12.712 11.713C12.5207 11.9057 12.2833 12.0013 12 12H1ZM15.9 10.3L12.3 6.7C12.1 6.5 12 6.26667 12 6C12 5.73333 12.1 5.5 12.3 5.3L15.9 1.7C16.0833 1.51667 16.3167 1.425 16.6 1.425C16.8833 1.425 17.1167 1.51667 17.3 1.7C17.4833 1.88333 17.575 2.11667 17.575 2.4C17.575 2.68333 17.4833 2.91667 17.3 3.1L14.4 6L17.3 8.9C17.4833 9.08333 17.575 9.31667 17.575 9.6C17.575 9.88333 17.4833 10.1167 17.3 10.3C17.1167 10.4833 16.8833 10.575 16.6 10.575C16.3167 10.575 16.0833 10.4833 15.9 10.3ZM1 7C0.71667 7 0.479337 6.904 0.288004 6.712C0.0966702 6.52 0.000670115 6.28267 0 6C-0.000663218 5.71733 0.0953369 5.48 0.288004 5.288C0.48067 5.096 0.718003 5 1 5H9C9.28334 5 9.521 5.096 9.713 5.288C9.905 5.48 10.0007 5.71733 10 6C9.99934 6.28267 9.90334 6.52033 9.712 6.713C9.52067 6.90567 9.28334 7.00133 9 7H1ZM1 2C0.71667 2 0.479337 1.904 0.288004 1.712C0.0966702 1.52 0.000670115 1.28267 0 1C-0.000663218 0.717333 0.0953369 0.48 0.288004 0.288C0.48067 0.096 0.718003 0 1 0H12C12.2833 0 12.521 0.096 12.713 0.288C12.905 0.48 13.0007 0.717333 13 1C12.9993 1.28267 12.9033 1.52033 12.712 1.713C12.5207 1.90567 12.2833 2.00133 12 2H1Z"
                        fill="black"
                      />
                    </svg>
                  }
                />
              </Box>
            </Box>
          </Box>

          {profile ? (
            <Box
              cursor={"pointer"}
              border="1px"
              borderColor="gray.300"
              borderRadius="lg"
              className="rounded-lg grid items-center w-full border border-gray-700 h-[70px] mt-[20px] lg:mt-[30px] lg:mb-[20px] mb-[10px]"
            >
              <Box className="flex items-center justify-between w-11/12 m-auto">
                {/* ── Store brand trigger + popup ── */}
                <Box className="relative">
                  <Box
                    cursor={"pointer"}
                    onClick={() => {
                      if (!storeBrand?.length >= 1) {
                        SetUpStoreQuery();
                      } else {
                        // setShowStorePopup((prev) => !prev);
                        router.push(`/Market`);
                        toogleMobile();
                      }
                    }}
                    className="flex items-center gap-x-[10px]"
                  >
                    <Box>
                      {storeLogoUrl?.url ? (
                        <Box
                          className="bg-gray-300 w-[50px] grid items-center justify-center h-[50px] overflow-hidden rounded-full"
                          cursor={"pointer"}
                        >
                          <Image
                            src={storeLogoUrl?.url}
                            alt="Profile"
                            width={500}
                            height={500}
                            unoptimized
                            className="h-[500px] w-[500px]"
                          />
                        </Box>
                      ) : (
                        <Image
                          alt=""
                          src={supermarket}
                          width={50}
                          height={60}
                        />
                      )}
                    </Box>
                    {!toogleSideMenu && (
                      <Box className="text-[14px]">
                        <Text className="text-[#B0B0B0]">Company</Text>
                        {storeBrand[0]?.name ? (
                          <Text className="font-bold mt-[10px] text-[#535961]">
                            {storeBrand[0]?.name} market
                          </Text>
                        ) : (
                          <Box
                            cursor={"pointer"}
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(
                                `/new_user_dashboard`,
                              );
                            }}
                          >
                            <Text className="font-semibold">Add Market</Text>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>

                  {/* ── Popup ── */}
                </Box>
                {/* ── End store brand popup ── */}

                {!toogleSideMenu && (
                  <Box zIndex={0} className="z-90 bg-white">
                    <IconButton
                      backgroundColor={"transparent"}
                      icon={
                        <svg
                          width="20"
                          height="10"
                          viewBox="0 0 20 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.814637 1.7282L8.62927 9.08316C9.39937 9.80796 10.6006 9.80796 11.3707 9.08316L19.1854 1.7282C19.5875 1.34969 19.6067 0.716814 19.2282 0.31464C18.8497 -0.0875344 18.2168 -0.106712 17.8146 0.271804L10 7.62676L2.18537 0.271803C1.78319 -0.106713 1.15032 -0.0875359 0.771804 0.314638C0.393286 0.716812 0.412465 1.34969 0.814637 1.7282Z"
                            fill="#535961"
                          />
                        </svg>
                      }
                      onClick={() => {
                        storeBrand?.length >= 1
                          ? router.push(`/Market`)
                          : SetUpStoreQuery();
                        toogleMobile();
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
          ) : (
            ""
          )}

          <Box className="pt-[10px]">
            <Box className="w-11/12 m-auto">
              <Text className="text-[#535961]">GENERAL</Text>
              <Box className="mt-[10px] grid gap-y-[10px]">
                {SideNavData.map((item) => {
                  const active = isActive(item.destination);
                  return (
                    <Box key={item.id}>
                      <Box
                        cursor={"pointer"}
                        onClick={() => {
                          profile === null
                            ? ErrorPops()
                            : mobileTog
                              ? (toogleMobile(), router.push(item.destination))
                              : router.push(item.destination);
                        }}
                        key={item.id}
                      >
                        <Box
                          cursor={"pointer"}
                          className="text-[15px] duration-500 h-[50px] grid items-center rounded-lg"
                          style={navItemStyle(item.destination)}
                          _hover={
                            !active
                              ? { bg: "#E6F1EF", fontWeight: "semibold" }
                              : {}
                          }
                        >
                          <Box className="flex items-center justify-between w-11/12 m-auto">
                            <Box className="flex items-center gap-x-[10px]">
                              <Box
                                style={{
                                  color: navTextColor(item.destination),
                                }}
                              >
                                {item.icon}
                              </Box>
                              {!toogleSideMenu && (
                                <Box
                                  style={{
                                    color: navTextColor(item.destination),
                                    fontWeight: active ? ACTIVE_WEIGHT : "400",
                                  }}
                                >
                                  {item.title}
                                </Box>
                              )}
                            </Box>
                            {item.showdropdown && !toogleSideMenu && (
                              <Box>
                                <IconButton
                                  onClick={dropdownFunc}
                                  backgroundColor={"transparent"}
                                  icon={
                                    <svg
                                      width="20"
                                      height="10"
                                      viewBox="0 0 20 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M0.814637 1.7282L8.62927 9.08316C9.39937 9.80796 10.6006 9.80796 11.3707 9.08316L19.1854 1.7282C19.5875 1.34969 19.6067 0.716814 19.2282 0.31464C18.8497 -0.0875344 18.2168 -0.106712 17.8146 0.271804L10 7.62676L2.18537 0.271803C1.78319 -0.106713 1.15032 -0.0875359 0.771804 0.314638C0.393286 0.716812 0.412465 1.34969 0.814637 1.7282Z"
                                        fill="#535961"
                                      />
                                    </svg>
                                  }
                                />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>

            {/* ── TOOLS ── */}
            <Box className="mt-[20px] w-11/12 m-auto">
              <Text className="text-[#535961]">TOOLS</Text>
              <Box className="mt-[10px] grid gap-y-[10px]">
                {sideNavTools.map((item) => {
                  const active = isActive(item.destination);
                  return (
                    <Box key={item.id}>
                      <Box
                        cursor={"pointer"}
                        onClick={() => {
                          profile?.defaultStoreId === null
                            ? ErrorPops()
                            : mobileTog && !item.darkmode
                              ? (toogleMobile(), router.push(item.destination))
                              : router.push(item.destination);
                        }}
                        key={item.id}
                        className="text-[15px] duration-500 h-[50px] grid items-center rounded-lg"
                        style={navItemStyle(item.destination)}
                        _hover={
                          !active
                            ? { bg: "#E6F1EF", fontWeight: "semibold" }
                            : {}
                        }
                      >
                        <Box className="flex items-center justify-between w-11/12 m-auto">
                          <Box className="flex items-center gap-x-[10px]">
                            <Box
                              style={{ color: navTextColor(item.destination) }}
                            >
                              {item.icon}
                            </Box>
                            {!toogleSideMenu && (
                              <Box
                                style={{
                                  color: navTextColor(item.destination),
                                  fontWeight: active ? ACTIVE_WEIGHT : "400",
                                }}
                              >
                                {item.title}
                              </Box>
                            )}
                          </Box>
                          {item.darkmode && (
                            <Box
                              onClick={() =>
                                setTheme(theme === "light" ? "dark" : "light")
                              }
                            >
                              <Switch id="email-alerts" />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}

                {/* ── Log Out ── */}
                <Button
                  onClick={LogOutFunc}
                  variant="ghost"
                  isLoading={logOutLoader}
                  w="full"
                  h="50px"
                  borderRadius="lg"
                  px={0}
                  _hover={{ bg: "#E6F1EF", fontWeight: "semibold" }}
                  transition="all 0.5s"
                  justifyContent="flex-start"
                >
                  <Box className="flex items-center justify-between w-11/12 m-auto">
                    <Box className="flex items-center gap-x-[10px]">
                      <Box>
                        <svg
                          width="20"
                          height="18"
                          viewBox="0 0 20 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.22476 0C1.44378 0 0 1.44377 0 3.22476V14C0 16.2091 1.79086 18 4 18H16C18.2091 18 20 16.2091 20 14V7.55556C20 5.34684 18.2105 3.55556 16.001 3.55556H12.8897C12.8498 3.49686 12.8038 3.42219 12.7518 3.32912C12.6109 3.07715 12.4738 2.78111 12.3166 2.44151C12.2793 2.36093 12.2409 2.27786 12.201 2.19239C12.0098 1.7827 11.7781 1.30151 11.5099 0.919752C11.2873 0.602865 10.8009 0 10.0138 0H3.22476ZM10.4876 3.25176C10.5332 3.35036 10.5804 3.45243 10.6288 3.55556H2V3.22476C2 2.54834 2.54834 2 3.22476 2H9.82195C9.83679 2.01884 9.85396 2.04178 9.87344 2.0695C10.026 2.28671 10.1903 2.61316 10.3886 3.0382C10.4206 3.10678 10.4537 3.17835 10.4876 3.25176ZM4 16C2.89543 16 2 15.1046 2 14V5.55556H12.4782C12.4808 5.55561 12.4834 5.55566 12.4861 5.55569C12.4975 5.55584 12.5089 5.5558 12.5203 5.55556H16.001C17.1051 5.55556 18 6.45056 18 7.55556V8H16C14.3431 8 13 9.34315 13 11C13 12.6569 14.3431 14 16 14H18C18 15.1046 17.1046 16 16 16H4ZM15 11C15 10.4477 15.4477 10 16 10H18V12H16C15.4477 12 15 11.5523 15 11ZM9.75138 1.92323C9.7514 1.92272 9.75553 1.92566 9.76374 1.93356C9.75548 1.92769 9.75137 1.92374 9.75138 1.92323Z"
                            fill="#535961"
                          />
                        </svg>
                      </Box>
                      {!toogleSideMenu && (
                        <Box>
                          <Text fontWeight={500}>Log Out</Text>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {profile && (
          <Box className="pt-[30px]">
            <ProfileComponent
              profileData={profile}
              toogleSideMenu={toogleSideMenu}
            />
          </Box>
        )}
        <Box zIndex={1} className="">
          {showModal && (
            <MarketListPopUp
              openSuccessfull={showModal}
              setOpenSuccessfull={() => setShowModal(!showModal)}
            />
          )}
        </Box>
      </Box>
    </div>
  );
}

export default DashboardDeskSide;
