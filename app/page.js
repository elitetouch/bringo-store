'use client'
import { Text, Box } from "@chakra-ui/react";
import Learn_More from "./component/Buttons/Learn_More";
import Image from "next/image";
import bringologo from '../public/bringologo.svg'
import Unboarding_input from "./component/Inputs/Unboarding_input";
import Unboarding_submit from "./component/Buttons/Unboarding_submit";
import { useState } from "react";
import axios from "axios";
export default function Home() {
  const formdata={
    email:'',
    password:''
  }
  const [signInDetails, setSignInDetails] = useState(formdata)
  const handleSignInChange= (e)=>{
    setSignInDetails({...signInDetails,[e.target.name]:e.target.value})
  }
  const handleFormSubmission=()=>{
    const formData = new FormData()
    console.log(signInDetails)
    formData.append('email',signInDetails.email)
     formData.append('password',signInDetails.password)
    console.log(formData)
    axios.post('',formData).then((resp)=>{
console.log(resp)
    }).catch((error)=>{
console.log(error)
    })
  }
  return (
    <div>
      <Box>
        <Box className=" grid grid-cols-10">
          <Box className=" bg-gray-700 col-span-6 min-h-screen  grid items-center">

          <Box className="   ">
            <Box className=" w-10/12 m-auto text-white">
            <Box className=" w-7/12">
              <Text className=" text-[28px]">Welcome,let's get started!</Text>
            </Box>
             <Box className=" w-8/12 mt-[15px]">
              <Text className=" text-[15px] leading-7">Hello, Bringo Partner!
You’re now in the driver’s seat of your store’s operations. This app is built to help you run things smoothly, so you can focus on what matters: delivering fresh, fast, and reliable service to your customers</Text>            
            <Box className=" mt-[20px]">
              <Learn_More />
            </Box>
             </Box>
            </Box>
          </Box>
          </Box>
            <Box className=" col-span-4 min-h-screen  grid items-center bg-[#0E4940]">
              <Box className=" w-9/12 m-auto">
              <Box className=" flex items-center gap-x-[10px]">
                <Box>
                 <Image src={bringologo} />
                </Box>
                <Box>
                  <Text className=" text-[#85CB14] text-[18px] font-bold">Bringo</Text>
                </Box>
              </Box>
              <Box className=" text-white mt-[40px]">
                <Text className=" text-[20px]">Welcome</Text>
                <Text className=" text-[20px] mt-[10px]">let's get started!</Text>
                <Box className=" mt-[20px]">
                  <Text className=" text-[15px] ">
                    Please use your credentials to login. If you are not a member, please register here.
                  </Text>
                </Box>
              </Box>
              <Box className=" grid gap-y-[15px] mt-[40px] w-11/12">
                 <Unboarding_input values={signInDetails.email} handleChange={handleSignInChange} names={'email'} placing={'Email'} icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.8323 17.5C17.6732 17.5 19.1656 16.0076 19.1656 14.1667V6.68557C19.1659 6.67283 19.1659 6.66005 19.1656 6.64725V5.83333C19.1656 3.99238 17.6732 2.5 15.8323 2.5H4.16559C2.32464 2.5 0.832253 3.99238 0.832253 5.83333V6.64726C0.831957 6.66005 0.831958 6.67282 0.832253 6.68557V14.1667C0.832253 16.0076 2.32464 17.5 4.16559 17.5H15.8323ZM2.49892 14.1667C2.49892 15.0871 3.24511 15.8333 4.16559 15.8333H15.8323C16.7527 15.8333 17.4989 15.0871 17.4989 14.1667V7.89753L11.2369 10.4023C10.4422 10.7202 9.55565 10.7202 8.76095 10.4023L2.49892 7.89753V14.1667ZM10.6179 8.85488L17.4989 6.10247V5.83333C17.4989 4.91286 16.7527 4.16667 15.8323 4.16667H4.16559C3.24511 4.16667 2.49892 4.91286 2.49892 5.83333V6.10247L9.37993 8.85488C9.77729 9.01382 10.2206 9.01382 10.6179 8.85488Z" fill="#A5A6AB"/>
</svg>
} />
 <Unboarding_input values={signInDetails.password} handleChange={handleSignInChange} names={'password'} placing={'Password'} icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.8346 12.4997C10.8346 12.0394 10.4615 11.6663 10.0013 11.6663C9.54106 11.6663 9.16797 12.0394 9.16797 12.4997V14.1663C9.16797 14.6266 9.54106 14.9997 10.0013 14.9997C10.4615 14.9997 10.8346 14.6266 10.8346 14.1663V12.4997Z" fill="#A5A6AB" fill-opacity="0.88"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.0013 5.83301C15.0013 3.07158 12.7627 0.833008 10.0013 0.833008C7.23988 0.833008 5.0013 3.07158 5.0013 5.83301V7.49967C3.16035 7.49967 1.66797 8.99206 1.66797 10.833V15.833C1.66797 17.674 3.16035 19.1663 5.0013 19.1663H15.0013C16.8423 19.1663 18.3346 17.674 18.3346 15.833V10.833C18.3346 8.99206 16.8423 7.49967 15.0013 7.49967V5.83301ZM6.66797 5.83301C6.66797 3.99206 8.16035 2.49967 10.0013 2.49967C11.8423 2.49967 13.3346 3.99206 13.3346 5.83301V7.49967H6.66797V5.83301ZM3.33464 10.833C3.33464 9.91253 4.08083 9.16634 5.0013 9.16634H15.0013C15.9218 9.16634 16.668 9.91253 16.668 10.833V15.833C16.668 16.7535 15.9218 17.4997 15.0013 17.4997H5.0013C4.08083 17.4997 3.33464 16.7535 3.33464 15.833V10.833Z" fill="#A5A6AB" fill-opacity="0.88"/>
</svg>
} />
              </Box>
               <Box className=" mt-[15px]">
                <Unboarding_submit submit_func={handleFormSubmission} />
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
