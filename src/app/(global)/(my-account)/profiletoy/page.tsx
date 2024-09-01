import Profile from "src/components/account/profile/profile"; // Profile ที่นำเข้ามาจากที่อื่น

export default function page() {
    return (
        <section className="">
            <Profile/>  {/* ใช้ Profile ที่นำเข้ามา */}
        </section>
    );
}
