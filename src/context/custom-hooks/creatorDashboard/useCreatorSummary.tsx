import { createContext, useState } from "react"

import { getCreatorSummaryStats } from "src/services/apiService/users/getCreatorSummaryStats"


import { GetCreatorSummaryStats as CreatorSummaryStatsType} from "src/interfaces/response/userResponse" 

export interface CreatorSummaryType {
    data : CreatorSummaryStatsType
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
    data : { } as CreatorSummaryStatsType, 
    isLoading : false,
    error : false,
    status : 0
}
// Creating context 
const creatCreatorSummaryContext = createContext<CreatorSummaryContextType | undefined>(undefined)


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
            setCreatorSummary({
                ...creatorSummary,
                data : response,
                isLoading : false,
                error : false,
                status : 200
            })
        }catch(err){
            console.log(err)
            setCreatorSummary({
                ...creatorSummary,
                isLoading : false, 
                error : true,
                status : 500
            })
        }
    }
    
    return (
        <creatCreatorSummaryContext.Provider value={{ creatorSummary , onGettingSummary }}>
            {children}
        </creatCreatorSummaryContext.Provider>
    );
}







