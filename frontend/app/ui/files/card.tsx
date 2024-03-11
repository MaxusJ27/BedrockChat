// lib
import { FileType } from "@/app/lib/enum";
import {
    DocumentIcon,
    DocumentChartBarIcon,
    DocumentTextIcon,
    ClipboardDocumentIcon
} from "@heroicons/react/24/outline";


const iconMap = {
    pdf: DocumentIcon,
    docx: DocumentTextIcon,
    xlsx: DocumentChartBarIcon,
    csv: ClipboardDocumentIcon
};





export const Card = ({ name, date, type }: { name: string; date: Date; type: FileType }) => {
    const Icon = iconMap[type];

    return (
        <div className='rounded-xl bg-gray-800 p-2 shadow-sm'>
            <div className='flex p-4'>
                {Icon ? <Icon className='h-8 w-8 text-gray-400' /> : null}
                <h1 className='ml-4 text-lg font-semibold'>{name}</h1>
            </div>
            <div className='flex justify-between p-4'>
                <p className='text-sm font-light'>{date.toDateString()}</p>
                <p className='text-sm font-light'>{type}</p>
            </div>
        </div>
    );

}
