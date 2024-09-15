import React from "react";
import Contribution from "src/components/account/contribution/contribution";
import Contribution2 from "src/components/account/contribution/contribution2";
type Props = {};

export default function page({}: Props) {
    return (
        <section className="bg-orang-50">
            <div className="p-8">
                <Contribution />
                <Contribution2 />
            </div>
        </section>
    );
}
