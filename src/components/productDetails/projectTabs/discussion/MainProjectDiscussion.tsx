import React from "react";

import { addCommentToProject } from "src/services/apiService/comments/addCommentToProject";

import { useProjectDetails } from "src/context/custom-hooks/useProjectDetails";
import CommentSection from "../CommentSection/CommentSection";

type Props = {};

export default function MainProjectDiscussion({}: Props) {
    const { ProjectInfo } = useProjectDetails();

    const OnCreatingComment = (details : string) => {

        if (!ProjectInfo.projectId) {
            return;
        }

        addCommentToProject(ProjectInfo.projectId, { detail: details });
    }
    

    return (
        <section className="flex items-center justify-center w-full ">
            {ProjectInfo.discussion && ProjectInfo.discussion.length > 0 && 
                <div className="flex flex-col w-[70vw] items-center">
                    {
                        ProjectInfo.discussion.map((e) => (
                            <CommentSection key={e.authorId} data={e} type="discusstion"/>
                        ))
                    }
                </div>
            }
        </section>
    );
}
