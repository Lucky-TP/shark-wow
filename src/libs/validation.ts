import { getProject } from "./databases/firestore/projects";
import { getDocRef } from "./databases/firestore/commons";
import { CollectionPath } from "src/constants/firestore";
import { UserModel } from "src/interfaces/models/user";
import { Address } from "src/interfaces/models/common";
import { ProjectModel, Stage } from "src/interfaces/models/project";

export async function userValidation(uid : string) {
    const data = getDocRef(CollectionPath.USER,uid);
    const userSnapshot = await data.get();
    const userData = userSnapshot.data() as UserModel;
    const checkUser : (keyof UserModel)[] = ["username","firstName","lastName","aboutMe","email","birthDate","cvUrl"];
    const userAddress = userData.address[0];
    const checkAddr : (keyof Address)[] = ["country","city","province","postalCode"];

    //username firstName lastName aboutMe email birthDate cvUrl
    for(const key of checkUser){
        if(!userData[key]){
            return false;
        }
    }
    //address
    for(const key of checkAddr){
        if(!userAddress[key]){
            return false;
        }
    }
    return true;

}

export async function projectValidation(projectId: string) {

    const projectData = await getProject(projectId);
    const checkProject : (keyof ProjectModel)[] = ["name","carouselImageUrls","description"
        ,"totalQuantity","costPerQuantity","category","story"]; 
    const projectAddress = projectData.address;
    const checkAddr : (keyof Address)[] = ["country","city","province","postalCode"];
    const stageData = projectData.stages;
    const checkStage : (keyof Stage)[] = ["name","startDate","expireDate","detail","fundingCost","goalFunding"];

    for(const key of checkProject){
        if(!projectData[key]){
            return false;
        }
    };
    for(const key of checkAddr){
        if(!projectAddress[key]){
            return false;
        }
    }
    stageData.forEach(stage => {
        for(const key of checkStage){
            if(!stage[key]){
                return false;
            }
        }
    });
        
    return true;
}