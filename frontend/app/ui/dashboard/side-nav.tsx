// component
import Link from "next/link";
import Button from "../neurobutton";
import YouGPTLogo from "../yougpt-logo";
import NavLinks from "./nav-links";

// lib 
import { PowerIcon } from "@heroicons/react/24/outline";

// auth
import { signOut } from "@/auth";

const SideNav = () => {
    return (
        <div className='flex flex-col h-full px-3 py-4 md:px-2'>
            <Link
                href="/"
                className="flex h-20 items-center justify-start rounded-md md:h-40">
                <YouGPTLogo />
            </Link>
            <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
                <NavLinks />
                <div className='hidden h-auto w-full grow rounded-md bg-gray-600 md:flex'></div>
                <form
                    action={async () => {
                        'use server';
                        await signOut();
                    }}
                >
                    <Button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-700 p-3 text-sm font-medium
                    hover:shadow-white hover:shadow-md hover:text-gray-200 md:flex-none md:justify-start md:p-2 md:px-3'>
                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SideNav;