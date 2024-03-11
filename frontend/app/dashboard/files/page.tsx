// nextjs
import Link from "next/link";
// font
import { lato } from "@/app/ui/fonts";
// component
import LatestFiles from "@/app/ui/files/latest-files";

const Page = () => {
    return (
        <main className='w-full md:p-6'>
            <div className='flex w-full justify-between items-center'>
                <h1 className='text-xl text-semibold'>Files</h1>
                <Link
                    href="/dashboard/files/create">
                    Create File
                </Link>
            </div>
            <LatestFiles />
        </main>
    )
}

export default Page;
