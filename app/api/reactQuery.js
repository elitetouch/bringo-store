'use client'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from './Api_Instance'

export const BusinessInfo =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['BusinessInfo'],
        queryFn: () =>
            axiosInstance.get('/api/v1/business-information')})
        return {isPending, error, data }
} 
export const StoreInfo =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['StoreInfo'],
        queryFn: () =>
            axiosInstance.get('/api/v1/store-information')})
        return {isPending, error, data }
} 