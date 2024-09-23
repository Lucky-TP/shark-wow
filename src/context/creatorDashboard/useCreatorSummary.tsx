
import { createContext, useState } from "react"

import { getCreatorSummaryStats } from "src/services/apiService/users/getCreatorSummaryStats"

import { CreatorSummaryStats } from "src/interfaces/datas/user"

export interface CreatorSummaryType {
    data : CreatorSummaryStats
    isLoading : boolean
    error : boolean
    status : number
}

export interface CreatorSummaryContextType {
    onGettingSummary : ()=> Promise<void>
    creatorSummary : CreatorSummaryType
}

//creating initialize data 
const initializeCreatorSummary : CreatorSummaryType ={ 
    data : { } as CreatorSummaryStats, 
    isLoading : false,
    error : false,
    status : 0
}
// Creating context 
const CreatorSummaryContext = createContext<CreatorSummaryContextType | undefined>(undefined)


export function CreatorSummaryProvider ({
    children 
} : {
    children : React.ReactNode
}){
    const [creatorSummary , setCreatorSummary] = useState<CreatorSummaryType>(initializeCreatorSummary)  

    const onGettingSummary = async ()=>{
        try { 
            setCreatorSummary({
                ...creatorSummary,
                isLoading : true 
            })
            // API CALL
            const response = await getCreatorSummaryStats()
            if (response.status !== 200){
                setCreatorSummary({
                    ...creatorSummary,
                    data : response.data,
                    isLoading : false,
                    error : false,
                    status : response.status
                })                
            }
        }catch(err){
            console.log(err)
            setCreatorSummary({
                ...creatorSummary,
                isLoading : false, 
                error : true ,
            })
        }
    }
    
    return (
        <CreatorSummaryContext.Provider value={{ creatorSummary , onGettingSummary }}>
            {children}
        </CreatorSummaryContext.Provider>
    );
}

export const useCreatorSummary = ()=>{
    const context = createContext(CreatorSummaryContext)
    if (context === undefined){
        throw new Error("useCreatorSummary must be used within a CreatorSummaryProvider")
    }
    return context
}

