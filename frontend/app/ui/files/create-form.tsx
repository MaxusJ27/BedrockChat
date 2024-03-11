'use client'

// react 
import { useState } from 'react';
import { useFormState } from 'react-dom';

import { createEmbedding } from "@/app/api/chatbot";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
// libraries
import { useDropzone } from 'react-dropzone';
import { useDebounce } from 'use-debounce';

import { FileType } from "@/app/lib/enum";
import Button from '../neurobutton';
const Form = () => {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const [name, setName] = useState<string>('');
    const [type, setType] = useState<string>('');

    const [nameDebounced] = useDebounce(name, 300);
    const [typeDebounced] = useDebounce(type, 300);

    const { getRootProps, getInputProps } = useDropzone({
        // Configure dropzone options here
        onDrop: (acceptedFiles, rejectedFiles) => {
            setAcceptedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);

            console.log('Rejected files: ', rejectedFiles);
        },
    });
    const initialState = { message: null, errors: { file: [], name: [], type: [] } };

    const [state, setState] = useState(initialState);

    const submitForm = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        formData.append('name', nameDebounced);
        formData.append('type', typeDebounced);
        let isMounted = true;
        const result = await createEmbedding(initialState, formData);
        setState(result);
    }

    return (
        <form onSubmit={submitForm}>
            <div className='rounded-md bg-gray-800 p-4 md:p-6'>
                {/* File Name */}
                <label htmlFor="name" className="mb-2 text-sm font-semibold">
                    File Name
                </label>
                <div className="relative mt-2 mb-4 rounded-md">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        aria-describedby="file-error"
                        className="peer block bg-gray-600  w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300"
                        onChange={(e) => setName(e.target.value)}
                        />

                    <DocumentTextIcon className="absolute w-6 h-6 text-white top-1.5 left-2" />
                </div>
                <div id="file-error" className="text-red-600 text-sm">
                    {
                        state.errors?.name && state.errors.name.map((error: string, index: number) => (
                            <p className="text-red-600 text-sm mt-2" key={index}>{error}</p>
                        ))
                    }
                </div>

                <label htmlFor="type" className="mb-4 text-sm font-semibold">
                    File Type
                </label>
                <div className="relative mt-2 mb-4 rounded-md">
                    <select
                        id="type"
                        name="type"
                        aria-describedby="type-error"
                        onChange={(e) => setType(e.target.value)}
                        className="peer block bg-gray-600  w-full border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-300" >

                        <option>Select a file</option>
                        {
                            Object.values(FileType).map((type: string, index: number) => (
                                <option key={index} value={type}>{type}</option>
                            ))
                        }

                    </select>
                </div>
                <div id="type-error" aria-live="true" aria-atomic="true">
                    {
                        state.errors?.type && state.errors.type.map((error: string, index: number) => (
                            <p className='text-red-500 mt-2 text-sm' key={index}>{error}</p>
                        ))
                    }
                </div>
                <div className="flex flex-col rounded-md border-white p-2 justify-center h-full space-y-2  hover:text-red-100" {...getRootProps()}>
                    <label className='text-sm font-semibold'>Upload File</label>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        accept=".pdf"
                        aria-describedby="file-message"
                        // className={styles.fileInput}
                        {...getInputProps()}
                    />

                    <div className='rounded-md  bg-gray-800 text-center text-md'>
                        {
                            acceptedFiles.length === 0 ?
                                <p>Drag or click to upload a file.</p> :
                                acceptedFiles?.map((file: File) => (
                                    <p key={file.name}>{file.name.length > 150 ? file.name.substring(0, 100) + '...' : file.name}</p>
                                ))
                        }
                    </div>
                </div>

                <div id="file-message" aria-live="polite" aria-atomic="true">
                    {state.errors?.file?.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
            </div>
            <Button type="submit">Submit</Button>


        </form >
    )
}

export default Form;