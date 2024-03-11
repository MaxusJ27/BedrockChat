
import { fetchFiles } from "@/app/api/data";
// react 
import { useState, useEffect } from "react";
// model
import { File } from "@/app/lib/models";
// libs 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SelectedFile {
    selectedFile: string;
    setSelectedFile: React.Dispatch<React.SetStateAction<string>>;
}

const SelectFile = ({selectedFile, setSelectedFile}: SelectedFile) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const serverFiles = await fetchFiles();
                setFiles(serverFiles);
            } catch (error) {
                console.error('Failed to fetch files:', error);
            }
        }
        fetch();
    }, []);


    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFile(event.target.value);
    }

    const fileDates = files.map((file) => file.date);
    const filteredFiles = files.filter((file) => {
        // javascript strict equality comparison forces us to have this
        return file.date.toISOString().slice(0, 10) === selectedDate?.toISOString().slice(0, 10);

    });



    return (
        <div className='flex flex-col  bg-gray-600 md:w-[600px] space-y-2.5 px-4 justify-center  h-full rounded-md'>
            <h1 className='text-md font-semibold ml-[-4px]'>Reference File</h1>
            <DatePicker
                selected={selectedDate}
                // onChange={(date) => {setSelectedDate(date); console.log(selectedDate)}}
                onChange={date => setSelectedDate(date)}
                highlightDates={fileDates}
                dateFormat="yyyy-MM-dd"
                className='cursor-pointer rounded-md bg-gray-800 text-white text-sm outline-2 px-2'
                // isClearable
                showYearDropdown
                scrollableYearDropdown />
            <select name="files"
            onChange={handleSelect}
                className="block w-full h-[48px]  cursor-pointer rounded-md bg-gray-800 text-white px-2 text-sm outline-2 placeholder:text-gray-500" id="files">
                <option value="" disabled>
                    Select a file.</option>
                {filteredFiles?.map((file) => {
                    return (
                        <option key={file.id} value={file.name}>{file.name} - {file.type}</option>
                    )
                })}
            </select>
        </div>
    )

}

export default SelectFile;