
// icon
import { AcademicCapIcon } from "@heroicons/react/16/solid";

// font 
import { inika } from "./fonts";

const YouGPTLogo = () => {
    return (
        <div className='flex flex-row justify-center items-center leading-none md:gap-2 h-[64px]'>
            <AcademicCapIcon className='w-12 h-12' />
            <h1 className={`${inika.className} antialiased text-[32px] text-red-200 tracking-tighter`}>BedrockChat</h1>

        </div>
    );
}

export default YouGPTLogo;