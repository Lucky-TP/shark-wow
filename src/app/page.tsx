import HeroSection from "src/components/homepage/HeroSection";
import PopularCreatorCard from "src/components/homepage/PopularCreatorCard";
import PopularProject from "src/components/homepage/PopularProject";
import { ShowProject } from "src/interfaces/datas/project";
import { PopularCreator } from "src/interfaces/datas/user";
import { getTenPopularProjects } from "src/services/apiService/projects/getTenPopularProjects";
import { getTenPopularUsers } from "src/services/apiService/users/getTenPopularUsers";

export default async function RootPage() {
    let topProjects: ShowProject[] = [];
    let topCreators: PopularCreator[] = [];
    let error: string | null = null;

    try {
        const [fetchTopProjectsResult, fetchTopCreatorsResult] = await Promise.all([
            getTenPopularProjects(),
            getTenPopularUsers(),
        ]);
        topProjects = fetchTopProjectsResult.data;
        topCreators = fetchTopCreatorsResult.data;
    } catch (err) {
        console.error("Failed to fetch data:", err);
        error = "Failed to load data. Please try again later.";
    }

    return (
        <section>
            <HeroSection />
            {error && <div>{error}</div>}{" "}
            {!error && (
                <>
                    <PopularProject topProjects={topProjects} />
                    <PopularCreatorCard topCreator={topCreators} />
                </>
            )}
        </section>
    );
}
