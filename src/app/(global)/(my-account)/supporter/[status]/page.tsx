"use client";

import React, { useEffect } from "react";
import ProjectStatusDropdown from "src/components/account/creator/ProjectStatusDropdown";
import SupporterDropdown from "src/components/account/supporter/SupporterDropDown";
import SupporterProjectList from "src/components/account/supporter/SupporterProjectList";

export default function Page({ params }: { params: { status: string } }) {
  const status = params.status;
 

  return (
    <section className="px-[4vw]">
          <SupporterDropdown status={status}/>
          <SupporterProjectList status={status}/>
    </section>
  );
}
