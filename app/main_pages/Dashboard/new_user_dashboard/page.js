"use client";
import React, { useEffect } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import DashboardCard from "@/app/component/Cards/DashboardCard";
import { useState } from "react";
import StoreInformation from "../component/StoreInformation";
import BusinessInformation from "../component/BusinessInformation";
import PaymentInformation from "../component/PaymentInformation";
import SubmitButton from "../component/SubmitButton";
import { useToast } from "@chakra-ui/react";
import { BusinessInfo } from "@/app/api/reactQuery";
import { ProfileInfo } from "@/app/api/reactQuery";
import { StoreInfo } from "@/app/api/reactQuery";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LoadScript } from "@react-google-maps/api";
//import imp from '../../../main_pages/Dashboard/Subscription'
const libraries = ["places"];
function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const newSupermarket = searchParams.get("newSupermarket");
  const reference = searchParams.get("reference");
  reference && queryClient.invalidateQueries();
  //To get profile information
  const profile = ProfileInfo();
  const ProfileObject = profile?.data?.data?.user;
  console.log(ProfileObject);

  //Api on Top level to be passed down
  const data = BusinessInfo();
  console.log(data);
  const businessData = data?.data?.data?.data;
  console.log(businessData);
  const storeInfo = StoreInfo();
  const storeData = storeInfo?.data?.data?.data?.data;
  console.log(storeInfo?.data?.data?.data?.data);
  const toast = useToast();
  const [formPage, setFormPage] = useState(1);
  useEffect(() => {
    newSupermarket && setFormPage(0);
  }, [newSupermarket]);
  //  const[storeTracker, setStoreTracker]= useState(0)
  //     const[businessTracker, setbusinessTracker]= useState(0)
  const [paymentTracker, setPaymentTracker] = useState(0);
  return (
    <LoadScript
      googleMapsApiKey={"AIzaSyA24WJD5u8d-iF4FKwsZB8oOxKundbE2eY"}
      libraries={libraries}
    >
      <div className=" min-h-screen lg:pb-[40px] pb-[20px]">
        <Box className=" w-11/12 m-auto lg:flex justify-between items-center pt-[20px] lg:pt-[30px]">
          <Box>
            <Text className=" text-[20px] font-bold">
              Welcome, {ProfileObject?.fullname || ""}.
            </Text>
            <Text className=" text-[15px] mt-[10px]">
              Subscribe and complete your store set up to go live!
            </Text>
          </Box>
          <Box className=" lg:grid lg:pt-[1px] pt-[10px]">
            <Button
              onClick={() =>
                router.push(`/../../../main_pages/Dashboard/Subscription`)
              }
              backgroundColor={"#0E4940"}
            >
              <Box className=" flex items-center gap-x-[10px] p-[5px]">
                {/* <Box>
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.8794 10.8275H0.113281V8.23877H7.8794V0.472656H10.4681V8.23877H18.2342V10.8275H10.4681V18.5936H7.8794V10.8275Z" fill="#F5ECBE"/>
</svg>

            </Box> */}
                <Box>
                  <Text className=" text-[15px] text-white font-semibold">
                    Subscribe
                  </Text>
                </Box>
              </Box>
            </Button>
          </Box>
        </Box>
        <Box>
          <Box className=" lg:mt-[40px] mt-[20px] grid lg:grid-cols-3 justify-center grid-cols-2 gap-y-[15px] gap-x-[10px] lg:gap-x-[20px] w-11/12 m-auto">
            {businessData && (
              <Box className=" grid w-full">
                <DashboardCard
                  storeTracker={
                    Object?.keys(businessData).length > 0 &&
                    newSupermarket === null
                      ? 100
                      : 0
                  }
                  routeFunc={() => setFormPage(1)}
                  formPage={formPage}
                  title={"Bussiness Information"}
                />
              </Box>
            )}
            {businessData && (
              <Box
                cursor={"pointer"}
                onClick={() => queryClient.invalidateQueries()}
                className=" grid  w-full"
              >
                <DashboardCard
                  storeTracker={
                    storeData?.length > 0 && newSupermarket === null ? 100 : 0
                  }
                  routeFunc={() => {
                    Object?.keys(businessData).length > 0
                      ? setFormPage(0)
                      : alert(
                          "Please Fill in Business Information and Subscribe",
                        );
                  }}
                  formPage={formPage}
                  title={"Store Information"}
                />
              </Box>
            )}
            <Box className=" grid w-full">
              <DashboardCard
                storeTracker={paymentTracker}
                routeFunc={() => {
                  storeData?.length > 0
                    ? setFormPage(2)
                    : alert("Please Fill in Store information");
                }}
                formPage={formPage}
                title={"Payment Information"}
              />
            </Box>
          </Box>
          {/* onboarding process containing three steps */}
          <Box>
            {formPage === 1 && (
              <BusinessInformation
                suscribeStatus={ProfileObject?.subStatus}
                Data={businessData}
                setFormPage={setFormPage}
                // setbusinessTracker={setbusinessTracker}
              />
            )}
            {formPage === 0 && (
              <StoreInformation
                Data={businessData || []}
                setFormPage={setFormPage}
                // setPaymentTracker={setStoreTracker}
              />
            )}
            {formPage === 2 && (
              <PaymentInformation
                dropData={storeData}
                setFormPage={setFormPage}
                //  setPaymentTracker={setPaymentTracker}
              />
            )}
          </Box>
        </Box>
      </div>
    </LoadScript>
  );
}

export default Page;
