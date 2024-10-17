import { useEffect, useState, useContext, createContext } from "react";

import { getProjectById } from "src/services/apiService/projects/getProjectById";
import { getUserById } from "src/services/apiService/users/getUserById";

import { ProjectData } from "src/interfaces/datas/project";
import { UserModel } from "src/interfaces/models/user";

import { message } from "antd";
import { dateToString } from "src/utils/date";
import { getSupporterSummaryProjects } from "src/services/apiService/users/getSupporterSummaryProjects";
import { UserData } from "src/interfaces/datas/user";


export interface ProjectDetailPayloadInterface {
    ProjectInfo: Partial<ProjectData>;
    UserInfo: Partial<UserModel>;
    isLoading: boolean;
    UserStatus : UserStatusType;
    error: boolean;
    OnGettingUserDetails?: (uid: string) => Promise<void>;
    OnReFetchingData?: ()=> Promise<void>;
    OnCheckIsCommentAble?: (currentUser : UserData)=> Promise<void>;
}

enum UserStatusType {
    SUPPORTER = 1,
    CREATOR = 2,
    GUEST = 3,
}

const initializedProjectDetailPayload: ProjectDetailPayloadInterface = {
    ProjectInfo: {}, // Initialize with an empty object instead of undefined
    UserInfo: {},
    UserStatus : UserStatusType.GUEST ,
    isLoading: true,
    error: false,
};

// Define the shape of your project data
const ProjectDetailsContext = createContext<ProjectDetailPayloadInterface>(
    initializedProjectDetailPayload
);

export const ProjectDetailProvider = ({
    projectId,
    children,
}: {
    projectId: string;
    children: React.ReactNode;
}) => {
    const [projectDetailPayload, SetProjectDetailsPayload] =
        useState<ProjectDetailPayloadInterface>(initializedProjectDetailPayload);

    const fetchProjectData = async () => {
        if (projectId) {
            try {
                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    isLoading: true,
                });

                const response = await getProjectById(projectId);
                const data = response.data;

                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    ProjectInfo: data !== undefined ? data : projectDetailPayload.ProjectInfo,
                    isLoading: false,
                });
            } catch (error) {
                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    error: true,
                });
            }
        }
    };

    const OnGettingUserDetails = async (uid: string) => {
        try {
            const response = await getUserById(uid);
            const data = response.data;
            if (data) {
                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    UserInfo: {
                        uid: data.uid,
                        username: data.username,
                        profileImageUrl: data.profileImageUrl,
                        birthDate: dateToString(new Date(data.birthDate)),
                    },
                });
            }
        } catch (error) {
            message.error("User data not found!");
        }
    };

    const OnReFetchingData = async () => {
        if (projectId) {
            await fetchProjectData();
        }
    }

    const OnCheckIsCommentAble = async (currentUser : UserData)=>{
        // console.log(currentUser)
        if (currentUser){
            const isCreator = projectDetailPayload.ProjectInfo.uid === currentUser.uid
            console.log(isCreator)
            if (isCreator){
                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    UserStatus : UserStatusType.CREATOR
                })
                return 
            }
            const response = await getSupporterSummaryProjects()
            // console.log(response)
            const supported = response.data.contributed.find((project)=> project.projectId === projectId)
            // console.log(supported)
            if (supported?.projectId === projectId){
                SetProjectDetailsPayload({
                    ...projectDetailPayload,
                    UserStatus : UserStatusType.SUPPORTER
                })
            }
            return
        }
        
        SetProjectDetailsPayload({
            ...projectDetailPayload,
            UserStatus : UserStatusType.GUEST
        })        
    }

    useEffect(() => {
        if (projectId) {
            fetchProjectData();
        }
    }, [projectId]);

    return (
        <ProjectDetailsContext.Provider value={{ ...projectDetailPayload, OnGettingUserDetails , OnReFetchingData , OnCheckIsCommentAble }}>
            {children}
        </ProjectDetailsContext.Provider>
    );
};

export const useProjectDetails = () => {
    const context = useContext(ProjectDetailsContext);
    if (context === null) {
        throw new Error("useProjectDetails must be used within a ProjectDetailProvider");
    }
    return context;
}; 
