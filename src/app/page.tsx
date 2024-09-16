import HeroSection from "src/components/homepage/HeroSection";
import PopularProject from "src/components/homepage/PopularProject";
import PopularCreatorCard from "src/components/homepage/PopularCreatorCard";
import { getTenPopularProjects } from "src/services/apiService/projects/getTenPopularProjects";
import { getTenPopularUsers } from "src/services/apiService/users/getTenPopularUsers";

export default async function RootPage() {
    const [fetchTopProjectsResult, fetchTopCreatorsResult] = await Promise.all([
        getTenPopularProjects(),
        getTenPopularUsers(),
    ]);
    return (
        <section>
            <HeroSection />
            <PopularProject topProjects={fetchTopProjectsResult.data} />
            <PopularCreatorCard topCreator={fetchTopCreatorsResult.data} />
        </section>
    );
}
