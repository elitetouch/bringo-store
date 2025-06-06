'use client'
import { Text, Box } from "@chakra-ui/react";
import Learn_More from "@/app/component/Buttons/Learn_More";
import Image from "next/image";
import bringologo from '../../../public/bringologo.svg'
import Unboarding_input from "@/app/component/Inputs/Unboarding_input";
import Unboarding_submit from "@/app/component/Buttons/Unboarding_submit";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import Country_Email from "./Sign_up_component/Country_Email";
import Phone_Password from "./Sign_up_component/Phone_Password";
import OTP from "./Sign_up_component/OTP";
import Shop_Setup from "./Sign_up_component/Shop_Setup";
import Pagination_component from "./Sign_up_component/Pagination_component";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
// import o from './main_pages/sign_up'
export const Login_mobile=({setSignUpPage,signUpLoader,submit_func, signUpPage, mobile_display })=>{
  const router = useRouter()
  return(
    <div className=" w-full bg-[#0E4940] rounded-lg ">
      <Box className=" w-11/12 m-auto pt-[5px]">
            {mobile_display}

      </Box>
               {signUpPage != 2 &&  <Box className=" mt-[20px] w-10/12 m-auto pb-[20px] ">
                <Unboarding_submit button_text={signUpPage===1?'Submit':'Next'} submit_loader={signUpLoader} submit_func={submit_func} />
               </Box>}
               <Box className=" grid justify-center mt-[10px] pb-[20px] ">
                   <Pagination_component setSignUpPage={setSignUpPage} pagination_determinant={signUpPage} />
               </Box>
    </div>
  )
}

export default function Home() {
   const searchParams = useSearchParams(); 
   const reroute = searchParams.get('reroute');
   console.log({'reroute': reroute})
  const [signUpPage, setSignUpPage]= useState(0)
  const pagination_function =()=>{
    setSignUpPage(signUpPage + 1)
    console.log(signUpPage)
  }
  const router = useRouter()
  const toast = useToast()
  const formdata={
    fullname:'',
    country:'',
    phone:"",
    email:'',
    password:'',
    confirmPassword:'',
  //  storeName:'',
  //  Location:'', 
  }
 
  const [signUpDetails, setSignUpDetails] = useState(formdata)
  const handleSignUpChange= (e)=>{
    // console.log(signUpDetails)
    setSignUpDetails({...signUpDetails,[e.target.name]:e.target.value})
  }
  const [signUpLoader, setSignUpLoader] = useState(false)
  const [profile, setProfile] = useState('')
   const Validation = () =>{  
      const errors={}    
      // State parameters to be made compulsory in the form for submission to go through //
      const objectKeys=[ 'fullname','country','phone','email','password','confirmPassword'
         ]
      objectKeys.forEach((field)=>{
       if(!signUpDetails[field]){
         errors[field]= `Input ${field.replace(/_/g, " ")}`
     }
       errors[field]
       console.log(errors[field])
      })
      //note:This function returns boolean which can be either true or false //
      return Object.keys(errors).length === 0
     }
 const handleFormSubmission = () => {
  if(Validation()){
setSignUpLoader(true);
  const formData = new FormData();

  // Destructure details
  const { fullname, country, phone, email, password } = signUpDetails;

  // Normalize phone number:
  let formattedPhone = phone;
  if (formattedPhone.startsWith('0')) {
    formattedPhone = formattedPhone.slice(1);
  }

  // Country code map (you can expand this as needed)
  const countryCodes = {
   Uganda: '+256',
  Nigeria: '+234',
  Kenya: '+254',
  };

  const countryCode = countryCodes[country] || '';
  const finalPhoneNumber = `${countryCode}${formattedPhone}`;
  console.log(finalPhoneNumber)
  // Append fields
  formData.append('fullname', fullname);
  formData.append('country', country);
  formData.append('phone', finalPhoneNumber);
  formData.append('email', email);
  formData.append('password', password);

  axios.post('https://www.store.api.bringofresh.net/api/v1/store-user', formData)
    .then((resp) => {
      setSignUpLoader(false);
      console.log(resp);
      pagination_function();
      localStorage.setItem('accessToken', resp?.data?.token);
      setProfile(resp?.data?.data?.email);
    })
    .catch((error) => {
      setSignUpLoader(false);
      toast({
        title: "Error",
        description:
          error.response?.data?.errors || "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    });
  }
  else{
 toast({
        title: "Error",
        description:"Please input all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
  }
  
};
// brings up a popup on mounting
useEffect(()=>{
 reroute && setSignUpPage(2)
},[reroute])
  return (
    <div>
      <Box>
        <Box className=" grid lg:grid-cols-10">
          <Box className=" background lg:col-span-6 min-h-screen  lg:grid lg:items-center">

          <Box className="   ">
            <Box className=" w-11/12 lg:w-10/12 m-auto text-white">
              <Box className=" flex items-center gap-x-[10px] lg:hidden mt-[25px] lg:mb-[40px] mb-[30px]">
                <Box>
                 <Image alt="" src={bringologo} />
                </Box>
                <Box>
                  <Text className=" text-[#85CB14] text-[18px] font-bold">Bringo</Text>
                </Box>
              </Box>
            <Box className=" lg:w-7/12 w-8/12">
              <Text className=" text-[28px]">Welcome,let's get started!</Text>
            </Box>
             <Box className=" lg:w-8/12 lg:mt-[15px] mt-[20px]">
              <Text className=" text-[15px] leading-7">Hello, Bringo Partner!
You’re now in the driver’s seat of your store’s operations. This app is built to help you run things smoothly, so you can focus on what matters: delivering fresh, fast, and reliable service to your customers</Text>            
            <Box className=" lg:mt-[20px] mt-[24px]">
              <Learn_More />
            </Box>
             </Box>
            </Box>
          </Box>
          <Box className=" lg:hidden">
            <Box className="  w-11/12 m-auto mt-[50px] pb-[40px] ">
             <Login_mobile setSignUpPage={setSignUpPage} mobile_display={<Box>{signUpPage===0 && <Country_Email signUpDetails={signUpDetails} signInLoader={signUpLoader} handleSignUpChange={handleSignUpChange}   />}
                 {signUpPage===1 && <Phone_Password signUpDetails={signUpDetails} handleSignUpChange={handleSignUpChange}/>}
                  {signUpPage===2 && <OTP profile={reroute?reroute:profile||''} setSignUpPage={setSignUpPage}  />}
                   {/* {signUpPage===3 && <Shop_Setup signUpDetails={signUpDetails}  handleSignUpChange={handleSignUpChange} />} */}
                   </Box>} 
             signUpPage={signUpPage} 
             signUpDetails={signUpDetails} 
             signUpLoader={signUpLoader}
              handleSignUpChange={handleSignUpChange}
               submit_func={signUpPage === 1?handleFormSubmission:pagination_function}   />
            </Box>

          </Box>
          </Box>
            <Box className="  col-span-4 min-h-screen hidden  lg:grid items-center bg-[#0E4940]">
              <Box>
              <Box className=" w-9/12 m-auto ">
              <Box className=" flex items-center gap-x-[10px]">
                <Box>
                 <Image alt="" src={bringologo} />
                </Box>
                <Box>
                  <Text className=" text-[#85CB14] text-[18px] font-bold">Bringo</Text>
                </Box>
              </Box>
             <div>
                {signUpPage===0 && <Country_Email  signUpDetails={signUpDetails} signInLoader={signUpLoader} handleSignUpChange={handleSignUpChange}   />}
                 {signUpPage===1 && <Phone_Password signUpDetails={signUpDetails} handleSignUpChange={handleSignUpChange} />}
                  {signUpPage===2 && <OTP profile={profile||''} setSignUpPage={setSignUpPage} />}
                   {/* {signUpPage===3 && <Shop_Setup signUpDetails={signUpDetails} handleSignUpChange={handleSignUpChange} />} */}
             </div>
              {signUpPage!= 2 && <Box className=" mt-[15px]">
                <Unboarding_submit button_text={signUpPage===1?'Submit':'Next'} submit_loader={signUpLoader} submit_func={signUpPage === 1?handleFormSubmission:pagination_function} />
               </Box>}
              </Box>
            <Box className=" mt-[70px]">
            <Box className=" grid justify-center w-full">
          <Pagination_component setSignUpPage={setSignUpPage} pagination_determinant={signUpPage} />

            </Box>

            </Box>
              </Box>
            </Box>
           </Box>
           <Box>
        </Box>
      </Box>
    </div>
  );
}
