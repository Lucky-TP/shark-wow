import UserProfile from "src/components/account/profile/UserProfile"; // Profile ที่นำเข้ามาจากที่อื่น

export default function page() {
    return (
        <section className="">
            <UserProfile/>  {/* ใช้ Profile ที่นำเข้ามา */}
        </section>
    );
}