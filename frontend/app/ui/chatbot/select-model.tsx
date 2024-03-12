'use client'

import { Select } from "@/app/lib/models";

import { ModelMap } from "@/app/lib/enum";

interface SelectedModel {
    selectedModel: string;
    setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}


const SelectModel = ({ selectedModel, setSelectedModel }: SelectedModel) => {
    const modelList: Select[] = ModelMap;
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(event.target.value);
    }
    return (
        <div className='flex flex-col  bg-gray-600 md:w-[600px] space-y-2.5 px-4 justify-center  h-full rounded-md'>
            <h1 className='text-md font-semibold ml-[-4px]'>AI Model</h1>
            <select
                id='modelName'
                name='modelName'
                className="block w-full h-[48px] cursor-pointer rounded-md bg-gray-800 text-whitew py-2 px-2 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                aria-describedby='modelName-error'
                onChange={handleSelect}
            >
                <option value="" disabled>
                    Select an AI model.
                </option>
                {
                    modelList.map((item: any) => (
                        <option key={item.keyword} value={item.keyword}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default SelectModel;