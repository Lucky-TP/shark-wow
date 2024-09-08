import React from "react";
import Projecttitle from "src/components/account/updateproject/projecttitle";
import Stage from "src/components/account/updateproject/stage";
import Updateor from "src/components/account/updateproject/updateor";
import Ckeditor from "src/components/account/updateproject/ckeditor";

type Props = {};

export default function page({}: Props) {
    return (
        <section className="bg-[#E5D8CA]">
            <div className="p-8">
                <Projecttitle />
                <Updateor />
                <Ckeditor />
            </div>
        </section>
    );
}
