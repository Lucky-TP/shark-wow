import React from "react";

import { Update } from "src/interfaces/models/project";

type Props = {
    data: Update;
};

export default function UpdateBlog({ data }: Props) {
    // console.log(data)
    return (
        <section className="min-h-[150vh]">
            <div className="flex flex-col px-[3vw] py-[3vh] rounded-xl border bg-orange-100 border-orange-200 h-full">
                <h1>Update Topic</h1>
                <div className="flex flex-row gap-x-[1vw] ">
                    <p>Posted on: {data.date}</p>
                    <p>By: {data.belongTo}</p>
                </div>
                <div className="ql-editor !p-0 preview-content" dangerouslySetInnerHTML={{ __html: data.detail }} />
            </div>
        </section>
    );
}
