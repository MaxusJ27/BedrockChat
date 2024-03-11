'use server';
import CardWrapper from "../ui/dashboard/cards";
import FileTypeChart from "../ui/dashboard/file-chart";

import { lato } from "../ui/fonts";
// what should the page display
// most frequent model used 

const Page = async () => {
    return (
        <main className='md:p-6'>
            <h1 className={`${lato.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 space-x-2.5'>
                <CardWrapper />

            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 md:mt-4'>
                <FileTypeChart />
            </div>
        </main>
    )
}

export default Page;