import { LoginButton, LogoutButton } from "@/src/components/auth_buttons";

function Profile_Settings () {
    return (
        <>
        <div className="flex justify-center text-2xl p-10">
            <div>Profile Settings</div>
        </div>
        <span className="border-b-[1px] border-gray-600 w-full "></span>
        <div className="flex justify-center mt-10 p-10">
            <LogoutButton/>
        </div>
        </>
    )
}

export default Profile_Settings