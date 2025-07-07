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
export const SingletoreInfo =(id)=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['StoreInfo'],
        queryFn: () =>
         axiosInstance.get(`/api/v1/store-information/${id}`)})
        return {isPending, error, data }
} 
export const ProfileInfo =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['ProfileInfo'],
        queryFn: () =>
            axiosInstance.get('/api/v1/profile')})
        return {isPending, error, data }
}
export const SubscriptionPlan =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['SubscriptionPlan'],
        queryFn: () =>
            axiosInstance.get(`/api/v1/supermarket-fee`)})
        return {isPending, error, data }
}
export const Products =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['Products'],
        queryFn: () =>
            axiosInstance.get('/api/v1/products')})
        return {isPending, error, data }
}
export const Orders =()=>{
    const { isPending, error, data } = useQuery({
        queryKey: ['Orders'],
        queryFn: () =>
            axiosInstance.get('')})
        return {isPending, error, data }
}
