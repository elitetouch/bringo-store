'use client'
import React from 'react'
import { Box, Text, Button, IconButton } from '@chakra-ui/react'
import DashBoardInput from '../component/DashboardInput'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import Image from 'next/image'
import { useRef } from 'react'
import { Select } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react'
import axiosInstance from '@/app/api/Api_Instance'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ProfileInfo } from '@/app/api/reactQuery'
 //import imp from '../../../main_pages/Dashboard/Product'
export const CompatibilityData=['Fruit','Produce','Bakery','Vegetables','sea food','Meat',
  'laundry','Foods','Dairy','Beverages','Snacks',
  'Baking','Wine','others'
]

export const PriceInput=({names, values, changes, title, placing, currency})=>{
  return (
    <Box>
       <Box className=' flex items-center lg:gap-x-[10px] gap-x-[3px]'>
                        <Text className=' text-[14px] font-semibold'>{title}</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
      <Box className=' w-full pt-[10px]'>

    <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' w-full grid items-center '>
           <Box className=' border flex items-center rounded-lg'>
               <Box className=' h-[44px] w-[63px] grid items-center justify-center bg-gray-200'>
                   <Text className=' text-[#8A8A8A]'>{currency==='Kenya'&&'KSH'||currency==='Nigeria'&&'NG'||currency==='Uganda'&&'UGX'||'UGX'}</Text>
               </Box>
                   <Input 
                    _focus={{ border: 'none', boxShadow: 'none' }}
                   name={names} value={values} onChange={changes} border={'none'} placeholder={placing?placing:'0' }className=' flex-1 text-[15px]' />
           </Box>
       </Box>
      </Box>

    </Box>
  )
}

function Page() {
  const router = useRouter()
  const toast = useToast()
  const profile= ProfileInfo()
  const ProfileObject= profile?.data?.data?.user
   const queryClient = useQueryClient();
   const searchParams = useSearchParams(); 
   const ProductId = searchParams.get('ProductId');
   const [singleProduct, setSingleProductData] = useState({})
   const [singleProductLoader, setSingleProductLoader] = useState(false)
   useEffect(()=>{
    setSingleProductLoader(true)
    console.log(ProductId)
    ProductId && axiosInstance.get(`/api/v1/products/${ProductId}`).then((resp)=>{
      console.log(resp?.data?.product)
      setSingleProductData(resp?.data?.product)
    }).catch((err)=>{
      console.log(err)
    })
   },[])
//code to add and display added iamges //
const [images, setImages] = useState([null, null, null]);
const [previewUrls, setPreviewUrls] = useState([null, null, null]);
const [activeIndex, setActiveIndex] = useState(null);

const fileInputRef = useRef(null);

const handleImageClick = (index) => {
  setActiveIndex(index);           // Store which slot was clicked
  fileInputRef.current.click();   // Programmatically open file input
};

const handleFileChange = (e) => {
  const file = e.target.files[0];           // Get the selected file
  if (!file) return;

  const updatedImages = [...images];        // Copy current images
  updatedImages[activeIndex] = file;        // Replace the clicked slot with new file
  setImages(updatedImages);                 // Save back to state

  const newPreviewUrl = URL.createObjectURL(file);  // Create preview image
  const updatedPreviews = [...previewUrls];
  updatedPreviews[activeIndex] = newPreviewUrl;     // Replace preview
  setPreviewUrls(updatedPreviews);
};
const initialPaymentData = {
        productTitle:'',
        featureOne:'',
        featureTwo:'',
        featureThree:'',
        featureFour:'',
        description:'',
        brandName:'',
         Isle:'',
         Row:'',
         ItemCode:'',
         StockQuantity:'',
         amount:'',
         min_amount:'',
         sug_amount:'',
         tag:'General',
        stock_quantity:'',
        sale_price:'',
        item_code:''
    }
    const [addProduct, setAddProduct] = useState(initialPaymentData)
    const addProductChange=(e)=>{
        setAddProduct({...addProduct,[e.target.name]: e.target.value})
        console.log(images)
    }
     const [category_value, setCategoryValue] = useState('')
    const [addProductLoader, setAddProductLoader]= useState(false)
    const [err, setErr]= useState({})
        const Validation = () =>{  
          const errors={}    
          // State parameters to be made compulsory in the form for submission to go through //
        const objectKeys=[ 'productTitle','description','StockQuantity','amount','brandName','featureOne','featureTwo','featureThree','featureFour',
          'Isle','Row','min_amount','sug_amount'
         ]
          objectKeys.forEach((field)=>{
           if(!addProduct[field]){
             errors[field]= `Input ${field.replace(/_/g, " ")}`
         }
           errors[field]
           console.log(errors[field])
    
          })
          //note:This function returns boolean which can be either true or false //
          Object.keys(errors).length && setErr(errors)
          return Object.keys(errors).length === 0
         }
    const addProductFunction=()=>{
       
        console.log(images)
        if(Validation() && images?.length > 0 ){
 setAddProductLoader(true)
        const formData= new FormData()     
//formData.append("category_id", parseInt(category_value + 1));
formData.append("category_id", 1);
formData.append("category_name", category_value)
formData.append("product_title", addProduct.productTitle);
formData.append("brand_name", addProduct.brandName);
formData.append("description", addProduct.description);
formData.append("compatibility", addProduct.tag);
formData.append("quantity", addProduct.StockQuantity);
formData.append("sales_price", addProduct.amount);
formData.append("stock_status", 'instock');
//formData.append("featured", 'true');
formData.append("save_status", 'draft');
// productData.key_feature.forEach((feature, index) => {
//   formData.append(`key_feature[${index}]`, feature);
// });
formData.append('key_feature[]', addProduct.featureOne);
formData.append('key_feature[]', addProduct.featureTwo);
formData.append('key_feature[]', addProduct.featureThree);
formData.append('key_feature[]', addProduct.featureFour);
// Append nested object (location)
formData.append("location[row]", addProduct.Row);
formData.append("location[isle]", addProduct.Isle);

// Append nested object (price)
formData.append("price[amount]", addProduct.amount);//
formData.append("price[minimum_amount]", addProduct.min_amount);//
formData.append("price[suggested_amount]", addProduct.sug_amount);//


// Append images (File objects)
images.forEach((file, index) => {
  if (file) {
    formData.append(`images[${index}]`, file);
  }
});
axiosInstance.post(`/api/v1/products`, formData).then((resp)=>{
   queryClient.invalidateQueries()
     toast({
      title: "Product",
      description:'Product Added Successfully',
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
   setAddProductLoader(false)
   setAddProduct(initialPaymentData)
  console.log(resp)
  router.push(`/../../../main_pages/Dashboard/Product`)
}).catch((error)=>{
  console.log(error)
  const errors = error.response?.data?.errors;

    let description = "Something went wrong. Please try again.";

    if (errors && typeof errors === "object") {
      // Flatten all field error arrays into a single array of messages
      description = Object.values(errors)
        .flat()
        .join("\n");
    }

    toast({
      title: "Error",
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  setAddProductLoader(false)
})
        console.log(addProduct)
        }
        else{
           toast({
      title: "Error",
      description:'Please input all necessary field and upload images',
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
        }
    }
// For product updates or Edits
 const getChangedFields = () => {
  const changed = {};

  for (const key in addProduct) {
    if (addProduct[key] !== initialPaymentData[key]) {
      changed[key] = addProduct[key];
    }
  }

  return changed;
};
const [editLoader, setEditLoader]= useState(false)
 const EditFunc=(id)=>{
      setEditLoader(true)
         const changedFields = getChangedFields();
 console.log(changedFields)
 const formData = new FormData()
 //   formData.append("category_id", 1);
// formData.append("category_name", category_value)
changedFields.productTitle && formData.append("product_title", changedFields.productTitle);
changedFields.brandName && formData.append("brand_name", changedFields.brandName);
changedFields.description && formData.append("description", changedFields.description);
changedFields.tag && formData.append("compatibility", changedFields.tag);
changedFields.StockQuantity && formData.append("quantity", changedFields.StockQuantity);
changedFields.amount && formData.append("sales_price", changedFields.amount);
changedFields.featureOne && formData.append('key_feature[]', changedFields.featureOne);
changedFields.featureTwo && formData.append('key_feature[]', changedFields.featureTwo);
changedFields.featureThree && formData.append('key_feature[]', changedFields.featureThree);
changedFields.featureFour && formData.append('key_feature[]', changedFields.featureFour);
// Append nested object (location)
changedFields.Row && formData.append("location[row]", changedFields.Row);
changedFields.Isle && formData.append("location[isle]", changedFields.Isle);

// Append nested object (price)
changedFields.amount && formData.append("price[amount]", changedFields.amount);//
changedFields.min_amount && formData.append("price[minimum_amount]", changedFields.min_amount);//
changedFields.sug_amount && formData.append("price[suggested_amount]", changedFields.sug_amount);//
      axiosInstance.post(`/api/v1/edit-store-product/${id}`, formData).then((resp)=>{
  console.log(resp)
   queryClient.invalidateQueries()
    toast({
      title: "Product Edit",
      description:'Product Edited Successfully',
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  //  router.push(`/../../../main_pages/Dashboard/Product`)
setEditLoader(false)
}).catch((error)=>{
   const errors = error.response?.data?.errors;

    let description = "Something went wrong. Please try again.";

    if (errors && typeof errors === "object") {
      // Flatten all field error arrays into a single array of messages
      description = Object.values(errors)
        .flat()
        .join("\n");
    }

    toast({
      title: "Error",
      description,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  console.log(error)
  setEditLoader(false)
})
 }

  return (
    <div className=' min-h-screen   pb-[50px]'>
        <Box className=' w-11/12 m-auto pt-[20px]'>
                                <Text className=' text-[20px] font-semibold'>Add Product</Text>
             <Box className=' flex items-center gap-x-[10px] text-[14px] mt-[10px]'>
                                       <Box cursor={'pointer'}><Text className=' text-[#888888]'>Home</Text></Box>  
                                            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                       <Box cursor={'pointer'} onClick={()=>router.push('')}><Text className=' text-[#888888]'>All Products</Text></Box>   
                                          <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                           <Box cursor={'pointer'}><Text className=' text-[#007460] font-semibold'>Add new product</Text></Box>
                                    </Box>
        </Box>
        <Box className='pt-[20px]'>
        <Box className=' bg-white pt-[20px] w-11/12 m-auto rounded-lg pb-[30px]'>
        <Box className=' grid lg:grid-cols-5 gap-y-[20px] w-11/12 m-auto gap-x-[20px]'>
            <Box className=' lg:col-span-3'>
                <Box className=' lg:w-10/12 m-auto'>
                <Box>
                      <Text className=' text-[18px] font-semibold'>Name & description</Text>
                      <Box className=' mt-[20px]'>
                        <Box className=' flex items-center gap-x-[10px]'>
                        <Text className=' text-[14px] font-semibold'>Product title</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                        <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'productTitle'}
                                   value={addProduct.productTitle}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.product_title:'Input your text'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                           {err?.productTitle && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please fill in product name</p>
)}
                        </Box>
                      </Box>
                      <Box className=' mt-[20px]'>
                         <Box className=' flex items-center gap-x-[10px]'>
                        <Text className=' text-[14px] font-semibold'>Description</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                        <Box className=' w-full pt-[10px]'>
                        <Textarea 
                          name={'description'}
                                   value={addProduct.description}
                                   onChange={addProductChange}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.description:''}
                        className=' min-h-[112px] w-full pt-[10px] bg-[#8A8A8A]'
                        />
                         {err?.description && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please fill in product description</p>
)}
                        </Box>
                      </Box>
                      <Box className=' mt-[20px]'>
                        <Box className=' flex items-center gap-x-[10px]'>
                        <Text className=' text-[14px] font-semibold'>Key features</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                        <Box className=' w-full pt-[10px] grid grid-cols-2 gap-x-[20px] gap-y-[20px]'>
                          <Box>
                         <Input
                                   name={'featureOne'}
                                   value={addProduct.featureOne}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.key_feature[0]:'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                             {err?.featureOne && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input key features</p>
)}
                          </Box>
                          <Box>
                            <Input
                               name={'featureTwo'}
                                   value={addProduct.featureTwo}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.key_feature[1]:'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                             {err?.featureTwo && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input key features</p>
)}
                          </Box>
                          <Box>
                            <Input
                               name={'featureThree'}
                                   value={addProduct.featureThree}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.key_feature[2]:'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                               {err?.featureThree && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input key features</p>
)}
                          </Box>
                          <Box>
                            <Input
                               name={'featureFour'}
                                   value={addProduct.featureFour}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.key_feature[3]:'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                             {err?.featureFour && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input key features</p>
)}
                          </Box>

                        </Box>
                      </Box>
                </Box>
                <Box className=' mt-[48px]'>
                  <Text className=' text-[18px] font-semibold'>Product details</Text>
                  <Box className=' mt-[20px]'>
                     <Text className=' text-[14px] font-semibold'>Brand Name</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'brandName'}
                                   value={addProduct.brandName}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.brand_name:'Input your text'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                             {err?.brandName && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please fill in brand name</p>
)}
                        </Box>
                  </Box>
                  <Box className=' grid grid-cols-2 gap-y-[20px] gap-x-[20px] mt-[20px]'>
                    <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Isle</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'Isle'}
                                   value={addProduct.Isle}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.location?.isle:''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                             {err?.Isle && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please fill in isle</p>
)}
                        </Box>
                  </Box>
                    <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Row</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'Row'}
                                   value={addProduct.Row}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.location?.row:''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                         {err?.Row && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include Row</p>
)}
                        </Box>
                  </Box>
                    {/* <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Item code</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'ItemCode'}
                                   value={addProduct.ItemCode}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                               {err?.ItemCode && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input Item Code</p>
)}
                        </Box>
                  </Box> */}
                    <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Stock quantity</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'StockQuantity'}
                                   value={addProduct.StockQuantity}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={Object.keys(singleProduct).length > 0?singleProduct?.quantity:''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                           {err?.StockQuantity && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input Stock Quantity</p>
)}
                        </Box>
                  </Box>
                  </Box>
                </Box>
                <Box className=' mt-[48px]'>
                  <Text className=' text-[18px] font-semibold'>Price</Text>
                  <Box>
                     <Box className=' mt-[20px]'>   
                        <Box className=' '>
                          <Box>
                         <PriceInput
                          currency={ProfileObject?.country || ''}
                         names={'amount'} changes={addProductChange} values={addProduct.amount} title={'Amount'} placing={Object.keys(singleProduct).length > 0?singleProduct?.price?.amount:'0'} />
                          {err?.amount && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please input Amount</p>
)}
                          </Box>
                        <Box className=' grid grid-cols-2 gap-y-[20px] gap-x-[20px] mt-[20px]'>
                          <Box>
                         <PriceInput 
                          currency={ProfileObject?.country || ''}
                         names={'min_amount'} changes={addProductChange} values={addProduct.min_amount} title={'Minimum amount'} placing={Object.keys(singleProduct).length > 0?singleProduct?.price?.minimum_amount:''} />
                          {err?.min_amount && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include minimum amount</p>
)}
                          </Box>
                          <Box>
                          <PriceInput
                           currency={ProfileObject?.country || ''}
                          title={'Suggested amount'} names={'sug_amount'} changes={addProductChange} values={addProduct.sug_amount} placing={Object.keys(singleProduct).length > 0?singleProduct?.price?.suggested_amount:''}  />
                           {err?.sug_amount && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include suggested amount</p>
)}
                          </Box>
                        </Box>
                        </Box>
                      </Box>
                  </Box>
                </Box>
                   <Box className=' mt-[48px]'><Text className=' text-[18px] font-semibold'>Category & attibutes</Text>
                   <Box>
                     <Box className=' flex items-center lg:gap-x-[10px] gap-x-[3px] mt-[20px]'>
                        <Text className=' text-[14px] font-semibold'>Category</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                        <Box>
                        <Box border="1px" borderColor="gray.300" borderRadius="lg" className='w-full h-[40px] grid items-center mt-[10px]'>
                          <Box className=' flex justify-between w-11/12 m-auto'>
                            <Box className=' flex items-center gap-x-[5px] w-full'>
                              <Box>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.25 0.0644531C0.835786 0.0644531 0.5 0.40024 0.5 0.814453C0.5 1.22867 0.835786 1.56445 1.25 1.56445H2.86199C2.98863 1.56445 3.09526 1.65915 3.11023 1.7849L4.15028 10.5213C4.25508 11.4016 5.00154 12.0645 5.88801 12.0645H12.25C12.6642 12.0645 13 11.7287 13 11.3145C13 10.9002 12.6642 10.5645 12.25 10.5645H5.88801C5.76137 10.5645 5.65474 10.4698 5.63977 10.344L5.54696 9.56445H11.8979C13.3349 9.56445 14.5296 8.45811 14.6398 7.02537L14.9978 2.37198C15.0138 2.16368 14.9422 1.95815 14.8003 1.80487C14.6583 1.65159 14.4589 1.56445 14.25 1.56445H10V5.50379L11.2197 4.28412C11.5126 3.99123 11.9874 3.99123 12.2803 4.28412C12.5732 4.57702 12.5732 5.05189 12.2803 5.34478L9.78033 7.84478C9.48744 8.13768 9.01256 8.13768 8.71967 7.84478L6.21967 5.34478C5.92678 5.05189 5.92678 4.57702 6.21967 4.28412C6.51256 3.99123 6.98744 3.99123 7.28033 4.28412L8.5 5.50379V1.56445H4.59405C4.4704 0.705756 3.73393 0.0644531 2.86199 0.0644531H1.25Z" fill="#303030"/>
<path d="M8 14.0645C8 14.6167 7.55228 15.0645 7 15.0645C6.44772 15.0645 6 14.6167 6 14.0645C6 13.5122 6.44772 13.0645 7 13.0645C7.55228 13.0645 8 13.5122 8 14.0645Z" fill="#303030"/>
<path d="M13 14.0645C13 14.6167 12.5523 15.0645 12 15.0645C11.4477 15.0645 11 14.6167 11 14.0645C11 13.5122 11.4477 13.0645 12 13.0645C12.5523 13.0645 13 13.5122 13 14.0645Z" fill="#303030"/>
</svg>

                              </Box>
                              <Box className=' w-full flex-1 '>
                                <Select 
                                 _focus={{ border: 'none', boxShadow: 'none' }}
                                border={'none'} placeholder='Purchase now' className='w-full'>
  <option value='Purchase now'>Purchase now</option>
</Select>
 
                              </Box>
                            </Box>
                           
                          </Box>
                        </Box>

                        </Box>
                        {err?.bussiness_id && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please select Category name</p>
)}
                   </Box>
                   <Box>
                     <Box >
                      <Box>
                                                   <Box className=' flex items-center lg:gap-x-[10px] gap-x-[3px] mt-[20px]'>
                        <Text className=' text-[14px] font-semibold'>Compatibility</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                         {err?.bussiness_id && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please select compatibility</p>
)}
                      </Box>
                        <Box className=' mt-[10px]'>
                          <RadioGroup onChange={setCategoryValue} value={category_value} className=' grid grid-cols-3  gap-y-[10px] gap-x-[10px]'>
                            {
                              CompatibilityData.map((items, index)=>{
                                return(
                                  <Box key={index}>
                                        <Radio value={items}>{items}</Radio>
                                  </Box>
                                )

                              })
                            }
                          </RadioGroup>

                        </Box>
                            </Box>
                   </Box>
                   {/* <Box>
                    <Box className=' flex items-center lg:gap-x-[10px] gap-x-[3px] mt-[20px]'>
                        <Text className=' text-[14px] font-semibold'>Tags</Text>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.49998 11C7.08577 11 6.74999 10.6642 6.75 10.25L6.75006 6.74999C6.75007 6.33577 7.08586 5.99999 7.50007 6C7.91428 6.00001 8.25006 6.3358 8.25006 6.75001L8.25 10.25C8.24999 10.6642 7.9142 11 7.49998 11Z" fill="#303030"/>
<path d="M6.5 4C6.5 3.44772 6.94772 3 7.5 3C8.05228 3 8.5 3.44772 8.5 4C8.5 4.55228 8.05228 5 7.5 5C6.94772 5 6.5 4.55228 6.5 4Z" fill="#303030"/>
<path fillRule="evenodd" clipRule="evenodd" d="M14.5 7C14.5 10.866 11.366 14 7.5 14C3.63401 14 0.5 10.866 0.5 7C0.5 3.13401 3.63401 0 7.5 0C11.366 0 14.5 3.13401 14.5 7ZM13 7C13 10.0376 10.5376 12.5 7.5 12.5C4.46243 12.5 2 10.0376 2 7C2 3.96243 4.46243 1.5 7.5 1.5C10.5376 1.5 13 3.96243 13 7Z" fill="#303030"/>
</svg>

                        </Box>
                        <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' w-full h-[44px] mt-[10px] grid items-center'>
                          <Box className=' flex items-center w-full'>
                          <Box className=' bg-[#007460] h-[36px] w-[80px] grid items-center justify-center rounded-lg ml-[10px]'>
                          <Box className=' flex items-center gap-x-[10px]'>
                            <Text className=' text-white text-[14px]'>Fruit</Text>
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75 1.56445C4.75 1.15024 4.41421 0.814453 4 0.814453C3.58579 0.814453 3.25 1.15024 3.25 1.56445V1.97111C3.00413 2.02866 2.77128 2.10918 2.54754 2.22318C1.84193 2.5827 1.26825 3.15638 0.908726 3.86199C0.682385 4.30621 0.588026 4.78635 0.543364 5.33299C0.499987 5.86389 0.499993 6.5195 0.5 7.33234V8.79656C0.499993 9.60939 0.499987 10.265 0.543364 10.7959C0.588026 11.3426 0.682385 11.8227 0.908726 12.2669C1.26825 12.9725 1.84193 13.5462 2.54754 13.9057C2.99175 14.1321 3.4719 14.2264 4.01853 14.2711C4.54944 14.3145 5.20505 14.3145 6.01788 14.3145L9.40133 14.3145C9.72358 14.3145 9.94299 14.3145 10.1364 14.2945C11.9018 14.1116 13.2972 12.7162 13.48 10.9509C13.5001 10.7575 13.5 10.538 13.5 10.2158L13.5 7.33233C13.5 6.5195 13.5 5.86389 13.4566 5.33299C13.412 4.78635 13.3176 4.30621 13.0913 3.86199C12.7317 3.15638 12.1581 2.5827 11.4525 2.22318C11.2287 2.10918 10.9959 2.02866 10.75 1.97111V1.56445C10.75 1.15024 10.4142 0.814453 10 0.814453C9.58579 0.814453 9.25 1.15024 9.25 1.56445V1.82304C8.87652 1.81445 8.45604 1.81445 7.98211 1.81445H6.0179C5.54396 1.81445 5.12348 1.81445 4.75 1.82304V1.56445ZM3.22852 3.55969C3.42604 3.45905 3.68681 3.38992 4.14068 3.35284C4.60331 3.31504 5.19755 3.31445 6.05 3.31445H7.95C8.80245 3.31445 9.39669 3.31504 9.85932 3.35284C10.3132 3.38992 10.574 3.45905 10.7715 3.55969C11.1948 3.7754 11.5391 4.11961 11.7548 4.54297C11.8554 4.74049 11.9245 5.00126 11.9616 5.45513C11.9764 5.63569 11.9855 5.83628 11.991 6.06445H2.00895C2.01455 5.83628 2.02363 5.63569 2.03838 5.45513C2.07547 5.00126 2.1446 4.74049 2.24524 4.54297C2.46095 4.11961 2.80516 3.7754 3.22852 3.55969ZM2 7.56445V8.76445C2 9.61691 2.00058 10.2111 2.03838 10.6738C2.07547 11.1276 2.1446 11.3884 2.24524 11.5859C2.46095 12.0093 2.80516 12.3535 3.22852 12.5692C3.42604 12.6699 3.68681 12.739 4.14068 12.7761C4.60331 12.8139 5.19755 12.8145 6.05 12.8145H9.35571C9.74066 12.8145 9.87595 12.8134 9.98184 12.8025C11.0411 12.6927 11.8783 11.8555 11.988 10.7963C11.999 10.6904 12 10.5551 12 10.1702V7.56445H2Z" fill="white"/>
</svg>

                          </Box>
                          </Box>
                          <Box className=' w-full'>
                            <Input
                            name='tag'
                            value={addProduct.tag}
                            onChange={addProductChange}
                            border={'none'}
                            className=' flex-1'
                             _focus={{ border: 'none', boxShadow: 'none' }}
                             _hover={{border:'none'}}
                            
                            />
                          </Box>

                          </Box>
                        </Box>
                         {err?.tag && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include tags</p>
)}
                   </Box> */}
                   </Box>
                <Box className=' pb-[30px]'>
                  <Box className=' mt-[20px]'>   
                        <Box className=' '>
                        <Box className=' grid grid-cols-1 gap-y-[20px] gap-x-[20px]  mb-[20px]'>
                          <Box>
                             {/* <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Stock quantity</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'Stock quantity'}
                                   value={addProduct.stock_quantity}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                          {err?.stock_quantity && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include stock quantity</p>
)}
                        </Box>
                  </Box> */}
                         {/* <Input names={'stock_quantity'} changes={addProductChange}
                          values={addProduct.stock_quantity} 
                          title={'Stock quantity'} />
                          {err?.stock_quantity && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include stock quantity</p>
)} */}
                          </Box>
                          <Box>
                             <Box className=''>
                     {/* <Text className=' text-[14px] font-semibold'>Sale Price</Text> */}
                      <Box className=' w-full pt-[10px]'>
                         <PriceInput
                         currency={ProfileObject?.country || ''}
                         title={'Sale Price'}
                                  name={'sale_price'}
                                   value={addProduct.sale_price}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                placing={Object.keys(singleProduct).length > 0?singleProduct?.sales_price:'0'}
                                   //placeholder={Object.keys(singleProduct).length > 0?singleProduct?.sales_price:''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                        {err?.sale_price && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include sales price</p>
)}
                        </Box>
                  </Box>
                          {/* <PriceInput title={'Sale Price'} names={'sale_price'} changes={addProductChange} values={addProduct.sale_price} />
                           {err?.sale_price && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include sales price</p>
)} */}
                          </Box>
                        </Box>
                        <Box>
                            {/* <Box className=''>
                     <Text className=' text-[14px] font-semibold'>Item code</Text>
                      <Box className=' w-full pt-[10px]'>
                         <Input
                                  name={'item_code'}
                                   value={addProduct.item_code}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                        {err?.sale_price && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include sales price</p>
)}
                        </Box>
                  </Box> */}
                         {/* <PriceInput names={'item_code'} changes={addProductChange} values={addProduct.item_code} title={'Item code'} />
                          {err?.item_code && (
  <p className="text-red-600 text-[12px] pt-[5px]">Please include item code</p>
)} */}
                        </Box>
                        </Box>
                      </Box>
                </Box>
                
                </Box>
            </Box>
            <Box className=' lg:col-span-2 '>
              <Box className=' lg:w-8/12 w-11/12 m-auto pt-[20px]'>
              {activeIndex !== null && previewUrls[activeIndex]? (
  <Image src={previewUrls[activeIndex]} alt='' unoptimized
  width={250}
  height={250}
  style={{ height: 'auto', width: '250px', borderRadius: '8px' }} />
):<Box className=' bg-gray-400 h-[250px] w-full m-auto rounded-lg'></Box>}
              </Box>
              <Box border="1px" borderColor="gray.300" borderRadius="lg" className=' lg:w-10/12 w-11/12 m-auto mt-[20px]'>
                <Box className=' w-11/12 m-auto pt-[10px] pb-[10px]'>
                  <Text className=' font-semibold text-[20px]'>Image Product</Text>
                  <Text className=' text-[#454545] text-[14px] pt-[10px]'><span className=' font-semibold'>Note :</span> Format photos  SVG, PNG, or JPG (Max size 4mb)</Text>
                </Box>
             <Box className='grid grid-cols-3 gap-x-[20px] pt-[20px] pb-[20px]'>
  {[0, 1, 2].map((i) => (
    <Box
      key={i}
      cursor="pointer"
      onClick={() => handleImageClick(i)}
      className="bg-[#F6F6F9] rounded-lg h-[100px] w-10/12 m-auto grid justify-center items-center overflow-hidden"
    >
      {/* If preview exists, show image */}
      {previewUrls[i] ? (
        <img
          src={previewUrls[i]}
          alt={`Preview ${i}`}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        // Otherwise show the default upload icon and label
        <Box className="grid w-full h-full items-center justify-center">
          <Box className="grid justify-center">
            <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.957031 18.6666L6.21329 13.9359C7.00395 13.2244 8.21327 13.2562 8.96544 14.0083L10.957 15.9999L16.2095 10.7475C16.9905 9.96642 18.2569 9.96642 19.0379 10.7475L22.2904 13.9999M10.2904 7.99992C10.2904 8.7363 9.69341 9.33325 8.95703 9.33325C8.22065 9.33325 7.6237 8.7363 7.6237 7.99992C7.6237 7.26354 8.22065 6.66658 8.95703 6.66658C9.69341 6.66658 10.2904 7.26354 10.2904 7.99992ZM2.95703 22.6666H20.2904C21.3949 22.6666 22.2904 21.7712 22.2904 20.6666V3.33325C22.2904 2.22868 21.3949 1.33325 20.2904 1.33325H2.95703C1.85246 1.33325 0.957031 2.22868 0.957031 3.33325V20.6666C0.957031 21.7712 1.85246 22.6666 2.95703 22.6666Z" stroke="#343538" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Box>
          <Box>
            <Text className="text-[#737373] text-[14px] text-center mt-[5px]">Photo {i + 1}</Text>
          </Box>
        </Box>
      )}
    </Box>
  ))}

  {/* Hidden input for file selection */}
  <input
    type="file"
    accept="image/*"
    ref={fileInputRef}
    onChange={handleFileChange}
    style={{ display: 'none' }}
  />
</Box>


              </Box>

            </Box>
        </Box>
        <Box className=' lg:flex grid items-center lg:justify-between gap-y-[20px] mt-[40px] pb-[20px] w-11/12 m-auto'>
          <Box className=' flex items-center gap-x-[10px]'>
            <Box>
              {/* <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.9356 1.16363C14.2871 1.5151 14.2871 2.08495 13.9356 2.43642L6.13562 10.2364C5.78414 10.5879 5.21429 10.5879 4.86282 10.2364L0.962823 6.33642C0.611351 5.98495 0.611351 5.4151 0.962823 5.06363C1.31429 4.71216 1.88414 4.71216 2.23561 5.06363L5.49922 8.32723L12.6628 1.16363C13.0143 0.812156 13.5841 0.812156 13.9356 1.16363Z" fill="#303030"/>
</svg> */}
            </Box>
            {/* <Box>
              <Text className=' text-[14px]'><span className=' text-[#8A8A8A]'>Last saved</span> Oct 4, 2021 - 23:32</Text>
            </Box> */}
          </Box>
          <Box className=' flex items-center gap-x-[20px]'>
             {/* <Button border="1px" borderColor="gray.300" borderRadius="lg"  backgroundColor={'transparent'}>
              <Text className=' text-[14px]'>Save Draft</Text>
            </Button> */}
            {!ProductId?<Button onClick={addProductFunction}
            isLoading={addProductLoader}
            backgroundColor={'#007460'} color={'#FFFF'}>
              <Text className=' text-[14px]'>Save Product</Text>
            </Button>:<Button onClick={()=>{EditFunc(ProductId)}}
            isLoading={editLoader}
            backgroundColor={'#007460'} color={'#FFFF'}>
              <Text className=' text-[14px]'>Edit Product</Text>
            </Button>}
            {/* <IconButton
            
            icon={<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29922 1.20005C5.29922 0.702993 4.89628 0.300049 4.39922 0.300049C3.90216 0.300049 3.49922 0.702993 3.49922 1.20005V1.68803C3.20417 1.7571 2.92475 1.85372 2.65626 1.99052C1.80953 2.42195 1.12112 3.11036 0.68969 3.95709C0.418081 4.49015 0.30485 5.06632 0.251256 5.72229C0.199203 6.35938 0.19921 7.14611 0.199219 8.12151V9.87858C0.19921 10.854 0.199203 11.6407 0.251256 12.2778C0.30485 12.9338 0.418081 13.5099 0.68969 14.043C1.12112 14.8897 1.80953 15.5781 2.65626 16.0096C3.18932 16.2812 3.76549 16.3944 4.42146 16.448C5.05854 16.5001 5.84527 16.5001 6.82067 16.5L10.8808 16.5001C11.2675 16.5001 11.5308 16.5001 11.7629 16.4761C13.8813 16.2566 15.5558 14.5822 15.7753 12.4637C15.7993 12.2317 15.7993 11.9684 15.7992 11.5817L15.7992 8.1215C15.7992 7.14611 15.7992 6.35937 15.7472 5.72229C15.6936 5.06632 15.5804 4.49015 15.3087 3.95709C14.8773 3.11036 14.1889 2.42195 13.3422 1.99052C13.0737 1.85372 12.7943 1.7571 12.4992 1.68803V1.20005C12.4992 0.702993 12.0963 0.300049 11.5992 0.300049C11.1022 0.300049 10.6992 0.702993 10.6992 1.20005V1.51035C10.251 1.50004 9.74646 1.50004 9.17774 1.50005H6.82069C6.25197 1.50004 5.74739 1.50004 5.29922 1.51035V1.20005ZM3.47344 3.59433C3.71046 3.47356 4.02338 3.39061 4.56804 3.34611C5.12319 3.30075 5.83627 3.30005 6.85922 3.30005H9.13922C10.1622 3.30005 10.8752 3.30075 11.4304 3.34611C11.9751 3.39061 12.288 3.47356 12.525 3.59433C13.033 3.85319 13.4461 4.26624 13.7049 4.77428C13.8257 5.0113 13.9087 5.32421 13.9532 5.86887C13.9709 6.08553 13.9818 6.32625 13.9885 6.60005H2.00996C2.01668 6.32625 2.02758 6.08553 2.04528 5.86887C2.08978 5.32421 2.17273 5.0113 2.2935 4.77428C2.55236 4.26624 2.96541 3.85319 3.47344 3.59433ZM1.99922 8.40005V9.84005C1.99922 10.863 1.99992 11.5761 2.04528 12.1312C2.08978 12.6759 2.17273 12.9888 2.2935 13.2258C2.55236 13.7339 2.96541 14.1469 3.47344 14.4058C3.71046 14.5265 4.02338 14.6095 4.56803 14.654C5.12319 14.6993 5.83627 14.7 6.85922 14.7H10.8261C11.288 14.7 11.4504 14.6988 11.5774 14.6857C12.8485 14.554 13.8532 13.5493 13.9848 12.2783C13.998 12.1512 13.9992 11.9888 13.9992 11.5269V8.40005H1.99922Z" fill="#303030"/>
</svg>
} /> */}
          </Box>
        </Box>
        </Box>

        </Box>
    </div>
  )
}

export default Page