'use client'
import React from 'react'
import { Box, Text, Button, IconButton } from '@chakra-ui/react'
import DashBoardInput from '../component/DashboardInput'
import { useState } from 'react'
import { Input } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import Image from 'next/image'
import { useRef } from 'react'
// import imp from '../../../../public/grape.svg'
export const PriceInput=({names, values, changes, title})=>{
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
                   <Text className=' text-[#8A8A8A]'>UGX</Text>
               </Box>
                   <Input name={names} value={values} onChange={changes} border={'none'} placeholder='0' className=' flex-1 text-[15px]' />
           </Box>
       </Box>
      </Box>

    </Box>
  )
}

function Page() {
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
    const [addProduct, setAddProduct] = useState({
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
         StockQuantity:''
    })
    const addProductChange=(e)=>{
        setAddProduct({...addProduct,[e.target.name]: e.target.value})
        console.log(images)
    }
    const [addProductLoader, setAddProductLoader]= useState(false)
    const addProductFunction=()=>{
        setAddProductLoader(true)
        console.log(addProduct)
    }
  return (
    <div className=' min-h-screen  '>
        <Box className=' w-11/12 m-auto pt-[20px]'>
                                <Text className=' text-[20px] font-semibold'>Add Product</Text>
             <Box className=' flex items-center gap-x-[10px] text-[14px] mt-[10px]'>
                                       <Box cursor={'pointer'}><Text className=' text-[#888888]'>Home</Text></Box>  
                                            <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                       <Box cursor={'pointer'} onClick={()=>Router.push('')}><Text className=' text-[#888888]'>All Products</Text></Box>   
                                          <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33464 5.56453L0.667969 0.231201V10.8979L7.33464 5.56453Z" fill="#737373"/>
            </svg>
                                           <Box cursor={'pointer'}><Text className=' text-[#007460] font-semibold'>Add new product</Text></Box>
                                    </Box>
        </Box>
        <Box className='pt-[20px]'>
        <Box className=' bg-white pt-[20px] w-11/12 m-auto rounded-lg'>
        <Box className=' grid lg:grid-cols-5 gap-y-[20px] w-11/12 m-auto gap-x-[20px]'>
            <Box className=' lg:col-span-3'>
                <Box className=' lg:w-11/12 m-auto'>
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
                                   placeholder={'Input your text'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

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
                        className=' min-h-[112px] w-full pt-[10px] bg-[#8A8A8A]'
                        />

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
                         <Input
                                   name={'featureOne'}
                                   value={addProduct.featureOne}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                            <Input
                               name={'featureTwo'}
                                   value={addProduct.featureTwo}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                            <Input
                               name={'featureThree'}
                                   value={addProduct.featureThree}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />
                            <Input
                               name={'featureFour'}
                                   value={addProduct.featureFour}
                                   onChange={addProductChange}
                                //   type={password && (showPassword ? 'text' : 'password') ||  types && types|| 'text'}
                                //   border='none'
                                //   className={` text-[14px] ${icon&&'mr-[10px]'} `}
                                   placeholder={'Value'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

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
                                   placeholder={'Input your text'}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

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
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

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
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

                        </Box>
                  </Box>
                    <Box className=''>
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

                        </Box>
                  </Box>
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
                                   placeholder={''}
                                  className=' flex-1 text-[#7C7C7C] text-[14px] h-[44px]'
                                />

                        </Box>
                  </Box>
                  </Box>
                </Box>
                <Box className=' mt-[48px]'>
                  <Text className=' text-[18px] font-semibold'>Amount</Text>
                  <Box>
                     <Box className=' mt-[20px]'>
                       
                        <Box className=' '>
                         <PriceInput title={'Amount'} />
                        <Box className=' grid grid-cols-2 gap-y-[20px] gap-x-[20px] mt-[20px]'>
                         <PriceInput title={'Minimum amount'} />
                          <PriceInput title={'Suggested amount'} />
                        </Box>
                        </Box>
                      </Box>
                  </Box>
                   <Box></Box>
                </Box>
                <Box></Box>
                </Box>
            </Box>
            <Box className=' lg:col-span-2 '>
              <Box className=' w-6/12 m-auto pt-[20px]'>
              {activeIndex !== null && previewUrls[activeIndex]? (
  <Image src={previewUrls[activeIndex]} width={250} height={250} alt="preview" className=' rounded-lg' />
):<Box className=' bg-gray-400 h-[200px] w-full m-auto rounded-lg'></Box>}
              </Box>
              <Box className=' flex items-center gap-x-[20px] pt-[40px] justify-center'>
              { [0, 1, 2].map((i) => ( 
  //               <Image
  //   key={i}
  //   src={previewUrls[i] || imp}
  //   onClick={() => handleImageClick(i)}
  //   width={100}
  //   height={100}
  // />
  <Box cursor={'pointer'}  key={i} onClick={() => handleImageClick(i)}>
    
    Upload images</Box>
))}
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

        </Box>
    </div>
  )
}

export default Page