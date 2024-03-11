// icons
import { DocumentIcon, RocketLaunchIcon } from "@heroicons/react/16/solid";
const iconMap = {
    model: RocketLaunchIcon,
    file: DocumentIcon
}



const CardWrapper = () => {
    
    return (
        <>
            <Card title='Total Models' value={8} type='model' />
            <Card title='Total Files' value={10} type='file' />
        </>
    )
}



const Card = ({ title, value, type }: { title: string; value: number | string; type: 'model' | 'file'; }) => {
    const Icon = iconMap[type];
    return (
        <div className='bg-gray-600 rounded-md p-4 flex flex-col items-center'>
            <div className='flex justify-start gap-2 items-center p-2'>
                <Icon className='h-8 w-8' />
                <h1 className='text-lg font-semibold'>{title}</h1>
            </div>
            <h1 className='text-2xl font-bold'>{value}</h1>
        </div>
    );
};

export default CardWrapper;