'use client'
// react
import React, { useState } from "react";
import { useFormState, useFormStatus } from 'react-dom';
// libraries
import { useDropzone } from 'react-dropzone';
// components
import Button from "../neurobutton";
// server
import { createEmbedding } from "@/app/api/chatbot";

const UploadFile = () => {
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        // Configure dropzone options here
        onDrop: (acceptedFiles, rejectedFiles) => {
            setAcceptedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);

            console.log('Rejected files: ', rejectedFiles);
        },
    });

    const initialState = { message: null, errors: { file: [] } };
    // const [state, dispatch] = useFormState(createEmbedding, initialState);
    const [fileState, setFileState] = useState(initialState);

    const submitFile = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        const result = await createEmbedding(initialState, formData);
        setFileState(result);


    }



    return (
        <div className='w-full border-gray-400 shadow-gray-200  bg-gray-600 rounded-md'>
            <div className="flex flex-col p-2 justify-center h-full space-y-2  hover:text-red-100" {...getRootProps()}>
                <label className='text-lg font-semibold '>Upload File</label>
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

                <div id="file-message" aria-live="polite" aria-atomic="true">
                    {fileState.errors?.file &&
                        fileState?.errors.file?.map((error: string) => (
                            <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                        ))}
                </div>
                <div id="file-message" aria-live="polite" aria-atomic="true">
                    {fileState.success?.file &&
                        fileState?.success.file?.map((success: string) => (
                            <p className="mt-2 text-sm text-green-500" key={success}>{success}</p>
                        ))}
                </div>
            </div>
            <Button type="submit" onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => submitFile(event)}>Create Embedding</Button>
        </div>
    );
}

export default UploadFile;