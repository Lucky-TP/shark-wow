import SettingNavbar from "src/components/AccountSetting/SettingNavbar";
import ProfilepictureBasicinformation from "src/components/AccountSetting/ProfileConfig/ProfilepicBasicinfo";
import AboutMe from "src/components/AccountSetting/ProfileConfig/AboutMe";
import LinkResumeSavebutton from "src/components/AccountSetting/ProfileConfig/LinkResumeSavebutton";

type Props = {};

export default function ProfileConfig({}: Props) {
    return (
        <>
            <SettingNavbar />
            <ProfilepictureBasicinformation />
            <AboutMe />
            <LinkResumeSavebutton />
        </>
    );
}
