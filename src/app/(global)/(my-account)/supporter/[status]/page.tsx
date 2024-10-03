"use client";

import React, { useEffect } from "react";
import ProjectStatusDropdown from "src/components/account/creator/ProjectStatusDropdown";
import SupporterDropdown from "src/components/account/supporter/SupporterDropDown";

export default function Page({ params }: { params: { status: string } }) {
  const status = params.status;
 

  return (
    <section className="px-[4vw]">
        {/* <ProjectStatusDropdown status={Type}/> */}
        <SupporterDropdown status={status}/>
    </section>
  );
}
