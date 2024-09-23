import { createContext, useState } from "react"

import { getCreatorSummaryStats } from "src/services/apiService/users/getCreatorSummaryStats"


import { GetCreatorSummaryStats as CreatorSummaryStatsType} from "src/interfaces/response/userResponse" 
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
        <creatCreatorSummaryContext.Provider value={{ creatorSummary , onGettingSummary }}>
            {children}
        </creatCreatorSummaryContext.Provider>
    );
}




