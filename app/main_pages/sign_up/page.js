"use client";
import { Text, Box, useToast } from "@chakra-ui/react";
import Learn_More from "@/app/component/Buttons/Learn_More";
import Image from "next/image";
import bringologo from "../../../public/bringologo.svg";
import Unboarding_submit from "@/app/component/Buttons/Unboarding_submit";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Country_Email from "./Sign_up_component/Country_Email";
import Phone_Password from "./Sign_up_component/Phone_Password";
import OTP from "./Sign_up_component/OTP";
import Shop_Setup from "./Sign_up_component/Shop_Setup";
import Pagination_component from "./Sign_up_component/Pagination_component";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/app/api/Api_Instance";
import { useStore } from "@/app/component/Store/useStore";

export const Login_mobile = ({
  setSignUpPage,
  signUpLoader,
  submit_func,
  signUpPage,
  mobile_display,
}) => {
  const router = useRouter();
  return (
    <div className=" w-full bg-[#0E4940] rounded-lg ">
      <Box className=" w-11/12 m-auto pt-[5px]">{mobile_display}</Box>
      {signUpPage != 2 && (
        <Box className=" mt-[20px] w-10/12 m-auto pb-[20px] ">
          <Unboarding_submit
            button_text={
              signUpPage === 1 ? "Submit" : signUpPage === 3 ? "Submit" : "Next"
            }
            submit_loader={signUpLoader}
            submit_func={submit_func}
          />
        </Box>
      )}
      <Box className=" grid justify-center mt-[10px] pb-[20px] ">
        <Pagination_component
          setSignUpPage={setSignUpPage}
          pagination_determinant={signUpPage}
        />
      </Box>
    </div>
  );
};

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  country: Yup.string().required("Country is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function Home() {
  const searchParam = useSearchParams();

  const addNewStore = searchParam.get("add_new_store");
  /* ── Helpers ───────────────────────────────────────────────────────────────
     FIX 1: Removed absolute URLs — axiosInstance already has a baseURL set.
     Combining it with a full URL creates a double-URL and the request fails.
     Use relative paths only.
  ────────────────────────────────────────────────────────────────────────── */
  const fetchCountry = async () => {
    const res = await axiosInstance.get("/api/v1/countries");
    return res.data;
  };

  const fetchKycDocuments = async () => {
    const res = await axiosInstance.get("/api/v1/merchant/kyc-documents");
    return res.data;
  };
  const fetchProfile = async () => {
    const res = await axiosInstance.get("/api/v1/profile");
    return res.data;
  };
  const searchParams = useSearchParams();
  const reroute = searchParams.get("reroute");
  const [signUpPage, setSignUpPage] = useState(0);
  const [signUpLoader, setSignUpLoader] = useState(false);
  const [profile, setProfile] = useState("");
  const [shopDetails, setShopDetails] = useState({
    name: "",
    category: "",
    description: "",
  });
  const [submitStoreLoader, setSubmitStoreLoader] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const pagination_function = () => setSignUpPage((prev) => prev + 1);
  const reduce_pagination_function = () => setSignUpPage((prev) => prev - 1);
  useEffect(() => {
    addNewStore === "true" && setSignUpPage(3);
  }, [addNewStore]);

  useEffect(() => {
    const savedStep = sessionStorage.getItem("signupReturnStep");
    if (savedStep) {
      setSignUpPage(parseInt(savedStep, 10));
      sessionStorage.removeItem("signupReturnStep");
    }
  }, []);

  useEffect(() => {
    reroute && setSignUpPage(2);
  }, [reroute]);

  const initialValues = {
    fullname: "",
    country: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values) => {
    setSignUpLoader(true);
    try {
      const formData = new FormData();
      const { fullname, country, phone, email, password } = values;

      let formattedPhone = String(phone || "");
      if (formattedPhone.startsWith("0"))
        formattedPhone = formattedPhone.slice(1);

      const countryCodes = { Uganda: "+256", Nigeria: "+234", Kenya: "+254" };
      const countryCode = countryCodes[country] || "";
      const finalPhoneNumber = `${countryCode}${formattedPhone}`;

      formData.append("role", "merchant");
      formData.append("name", fullname);
      formData.append("email", email);
      formData.append("phone", finalPhoneNumber);
      formData.append("password", password);

      const resp = await axios.post(
        "https://api.bringodirect.com/api/v1/register",
        formData,
      );
      setSignUpLoader(false);
      pagination_function();
      localStorage.setItem("accessToken", resp?.data?.data?.token);
      console.log(resp);
      setProfile(email);
    } catch (error) {
      setSignUpLoader(false);
      const errors = error.response?.data?.errors;
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
    }
  };

  const handleShopSetUpChange = (e) => {
    const { name, value } = e.target;
    setShopDetails((prev) => ({ ...prev, [name]: value }));
  };

  const [storeLogo, setStoreLogo] = useState(null);

  const submitStore = async () => {
    setSubmitStoreLoader(true);
    try {
      // 1️⃣ Create the store
      const payload = {
        name: shopDetails.name,
        category: shopDetails.category || "supermarket",
        description: shopDetails.description || "",
        is_active: true,
      };

      const resp = await axiosInstance.post(
        "/api/v1/merchant/store-brands",
        payload,
      );
      const newStoreBrand = resp?.data?.data?.storeBrand;
      console.log("newStore", newStoreBrand);
      if (newStoreBrand) {
        useStore.getState().setStoreBrand([newStoreBrand]);
        console.log("newStoreBrand", newStoreBrand);
      }

      // 2️⃣ Upload store logo if selected
      if (storeLogo) {
        try {
          const logoFormData = new FormData();
          logoFormData.append("type", "store_logo");
          logoFormData.append("file", storeLogo);
          await axiosInstance.post(
            "/api/v1/merchant/kyc-documents",
            logoFormData,
            { headers: { "Content-Type": "multipart/form-data" } },
          );
        } catch (logoError) {
          console.warn("Logo upload failed:", logoError);
          toast({
            title: "Warning",
            description:
              "Store created but logo upload failed. You can re-upload it later.",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
      }

      // 3️⃣ Always fetch supporting data so Zustand store is populated
      try {
        const [countries, kycRes, Profile] = await Promise.all([
          fetchCountry(),
          fetchKycDocuments(),
          fetchProfile(),
        ]);
        useStore.getState().setCountry(countries?.data?.countries);
        useStore.getState().setKycInfo(kycRes?.data?.documents ?? []);
        useStore.getState().setProfile(Profile?.data?.user ?? []);
      } catch (fetchError) {
        console.warn("Post-store fetch failed:", fetchError);
      }

      /* FIX 7: toast must fire BEFORE router.push() — navigating away
         unmounts the component so the toast never renders if it comes after. */
      toast({
        title: "Success",
        description: "Store successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      router.push("/../main_pages/Dashboard/KycVerification");
      setSubmitStoreLoader(false);
    } catch (error) {
      setSubmitStoreLoader(false);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        validateForm,
        setTouched,
      }) => {
        const advancePage0 = async () => {
          const errs = await validateForm();
          const page0Errors = ["fullname", "country", "email"].some(
            (f) => errs[f],
          );
          if (page0Errors) {
            setTouched({ fullname: true, country: true, email: true });
            return;
          }
          pagination_function();
        };
        return (
        <Form>
          <div>
            <Box>
              <Box className=" grid lg:grid-cols-10">
                <Box className=" background lg:col-span-6 min-h-screen  lg:grid lg:items-center">
                  <Box>
                    <Box className=" w-11/12 lg:w-10/12 m-auto text-white">
                      <Box className=" flex items-center gap-x-[10px] lg:hidden mt-[25px] lg:mb-[40px] mb-[30px]">
                        <Box>
                          <Image alt="" src={bringologo} />
                        </Box>
                        <Box>
                          <Text className=" text-[#85CB14] text-[18px] font-bold">
                            Bringo
                          </Text>
                        </Box>
                      </Box>
                      <Box className=" lg:w-7/12 w-8/12">
                        <Text className=" text-[28px]">
                          Welcome,let&apos;s get started!
                        </Text>
                      </Box>
                      <Box className=" lg:w-8/12 lg:mt-[15px] mt-[20px]">
                        <Text className=" text-[15px] leading-7">
                          Hello, Bringo Partner! You're now in the driver's seat
                          of your store's operations. This app is built to help
                          you run things smoothly, so you can focus on what
                          matters: delivering fresh, fast, and reliable service
                          to your customers
                        </Text>
                        <Box className=" lg:mt-[20px] mt-[24px]">
                          <Learn_More />
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* MOBILE */}
                  <Box className=" lg:hidden">
                    <Box className="  w-11/12 m-auto mt-[50px] pb-[40px] ">
                      <Login_mobile
                        setSignUpPage={setSignUpPage}
                        mobile_display={
                          <Box>
                            {signUpPage === 0 && (
                              <Country_Email
                                signUpDetails={values}
                                signInLoader={signUpLoader}
                                handleSignUpChange={handleChange}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                              />
                            )}
                            {signUpPage === 1 && (
                              <Phone_Password
                                signUpDetails={values}
                                handleSignUpChange={handleChange}
                                errors={errors}
                                touched={touched}
                                handleBlur={handleBlur}
                              />
                            )}
                            {signUpPage === 2 && (
                              <OTP
                                profile={reroute ? reroute : profile || ""}
                                setSignUpPage={setSignUpPage}
                                inCreasePage={pagination_function}
                              />
                            )}
                            {signUpPage === 3 && (
                              <Shop_Setup
                                signUpDetails={shopDetails}
                                handleSignUpChange={handleShopSetUpChange}
                                onLogoSelect={setStoreLogo}
                              />
                            )}
                          </Box>
                        }
                        signUpPage={signUpPage}
                        /* FIX 5: was always signUpLoader — on page 3 the store
                           submission runs submitStore, not onSubmit, so the
                           spinner should reflect submitStoreLoader.           */
                        signUpLoader={
                          signUpPage === 3 ? submitStoreLoader : signUpLoader
                        }
                        /* FIX 4: was signUpPage === 1 ? handleSubmit : pagination_function
                           — on page 3 this fell through to pagination_function,
                           which just incremented to a non-existent page 4
                           instead of calling submitStore.                     */
                        submit_func={
                          signUpPage === 3
                            ? submitStore
                            : signUpPage === 1
                              ? handleSubmit
                              : advancePage0
                        }
                      />
                    </Box>
                  </Box>
                </Box>

                {/* DESKTOP — unchanged */}
                <Box className="  col-span-4 min-h-screen hidden  lg:grid items-center bg-[#0E4940]">
                  <Box>
                    <Box className=" w-10/12 m-auto ">
                      <Box className=" flex items-center gap-x-[10px]">
                        <Box>
                          <Image alt="" src={bringologo} />
                        </Box>
                        <Box>
                          <Text className=" text-[#85CB14] text-[18px] font-bold">
                            Bringo
                          </Text>
                        </Box>
                      </Box>
                      <div>
                        {signUpPage === 0 && (
                          <Country_Email
                            signUpDetails={values}
                            signInLoader={signUpLoader}
                            handleSignUpChange={handleChange}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                          />
                        )}
                        {signUpPage === 1 && (
                          <Phone_Password
                            signUpDetails={values}
                            handleSignUpChange={handleChange}
                            errors={errors}
                            touched={touched}
                            handleBlur={handleBlur}
                          />
                        )}
                        {signUpPage === 2 && (
                          <OTP
                            profile={profile || ""}
                            setSignUpPage={setSignUpPage}
                            inCreasePage={pagination_function}
                          />
                        )}
                        {signUpPage === 3 && (
                          <Shop_Setup
                            signUpDetails={shopDetails}
                            handleSignUpChange={handleShopSetUpChange}
                            onLogoSelect={setStoreLogo}
                          />
                        )}
                      </div>
                      <Box className=" mt-[15px] flex item-center gap-x-[10px]">
                        {signUpPage != 0 &&
                          signUpPage != 2 &&
                          signUpPage != 3 && (
                            <Unboarding_submit
                              button_text={"Prev"}
                              submit_func={reduce_pagination_function}
                            />
                          )}
                        {signUpPage != 2 && signUpPage != 3 && (
                          <Unboarding_submit
                            button_text={
                              signUpPage === 1 && signUpPage != 3
                                ? "Submit"
                                : "Next"
                            }
                            submit_loader={signUpLoader}
                            submit_func={
                              signUpPage === 1
                                ? handleSubmit
                                : advancePage0
                            }
                            invalid={
                              signUpPage === 1
                                ? values.phone === "" &&
                                  values.password === "" &&
                                  values.confirmPassword === ""
                                : values.phone === "" &&
                                  values.password === "" &&
                                  values.confirmPassword === "" &&
                                  values.fullname === "" &&
                                  values.country === "" &&
                                  values.email === ""
                            }
                          />
                        )}
                        {signUpPage === 3 && (
                          <Unboarding_submit
                            button_text={"Submit"}
                            submit_loader={submitStoreLoader}
                            submit_func={submitStore}
                          />
                        )}
                      </Box>
                    </Box>
                    <Box className=" mt-[70px]">
                      <Box className=" grid justify-center w-full">
                        <Pagination_component
                          setSignUpPage={setSignUpPage}
                          pagination_determinant={signUpPage}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box></Box>
            </Box>
          </div>
        </Form>
        );
      }}
    </Formik>
  );
}
