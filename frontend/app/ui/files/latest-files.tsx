

import { fetchFiles } from "@/app/api/data";
// font 
import { lato } from "../fonts";

// lib
import clsx from "clsx";
import { DocumentIcon } from "@heroicons/react/16/solid";

export const LatestFiles = async () => {
    const fileList = await fetchFiles();

    return (
        <div className='flex flex-col w-full md:col-span-4 space-y-2.5'>
            <h2 className={`${lato.className} text-xl from-semibold`}>Latest Files</h2>

            <div className='flex grow justify-between flex-col rounded-md text-white bg-gray-600 p-4'>
                <div className='px-2'>


                    {
                        fileList.map((file, index) => {
                            return (
                                <div key={index} className={
                                    clsx('flex-row items-center grow justify-between  p-2',
                                        { 'border-t': index !== 0 }
                                    )}>
                                    <div className='flex items-center'>
                                        <div className='flex flex-col items-center justify-center w-8 h-8 rounded-md bg-gray-800 text-gray-400'>

                                            <DocumentIcon className='h-2 text-gray-400' />
                                            <h1 className="text-md font-semibold">{file.type}</h1>
                                        </div>
                                        <div className='min-w-0 ml-4'>
                                            <h1 className="text-lg font-semibold">{file.name}</h1>
                                            <p className='text-sm font-light'>{file.date.toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>


        </div >
    );
}

export default LatestFiles;