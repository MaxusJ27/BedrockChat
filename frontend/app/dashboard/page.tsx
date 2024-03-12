'use server';
import CardWrapper from "../ui/dashboard/cards";
import DailyCostChart from "../ui/dashboard/daily-cost";
import FileTypeChart from "../ui/dashboard/file-chart";
import TokenChart from "../ui/dashboard/token-chart";
import { lato } from "../ui/fonts";
// what should the page display
// most frequent model used 

const Page = async () => {
    return (
        <main className='flex h-screen flex-col md:p-6'>
            <h1 className={`${lato.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 space-x-2.5'>
                <CardWrapper />

            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 md:mt-4 space-x-2.5'>
                <FileTypeChart />
                <DailyCostChart />
            </div>
            <div className='grid grid-cols-1 w-full md:mt-4 space-x-2.5 h-full'>
                <TokenChart />
            </div>
        </main>
    )
}

export default Page;