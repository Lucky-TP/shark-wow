"use client";
import FavoriteProject from "./FavoriteProject";
import ContributionProject from "./ContributionProject";

type Props = {
    status: string; // projectType prop passed into the component
};

export default function SupporterProjectList({ status }: Props) {
    return (
        <div>
            {/* Render based on the current project type in payload or fallback to prop */}
            {status === "favorite" && <FavoriteProject />}
            {status === "contribution" && <ContributionProject />}

            {!status && <div>No Data</div>}
        </div>
    );
}
