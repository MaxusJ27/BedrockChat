'use server'

// nextjs
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// database 
import { sql } from '@vercel/postgres';
// libraries 
import { z } from 'zod';
// auth
import { auth } from '@/auth';
import { ReceiverType } from '../lib/enum';
// parse the contents of the uploaded file
export type FileState = {
    errors?: {
        file?: string[];
        name?: string[];
        fileType?: string[];
    };
    message?: string | null;
};



const FileSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {     // min 3 characters
        message: 'Please ensure that name is not empty.'
    }),
    fileType: z.enum(['pdf', 'xslx', 'docx', 'csv'], {
        invalid_type_error: 'Please enter a valid file type.'
    }),
    file: z.instanceof(File),
    date: z.string(),
});

const MessageSchema = z.object({
    id: z.string(),
    message: z.string().min(1, {
        message: 'Please ensure that message is not empty.'
    }),
    file: z.string().min(1, {
        message: 'Please ensure that file is not empty.'
    }),
    model: z.string().min(1, {
        message: 'Please ensure that model is not empty.'
    }),
    date: z.string(),
})

const CreateEmbedding = FileSchema.omit({ id: true, date: true });
const CreateMessage = MessageSchema.omit({ id: true, date: true });

// convert file to base 64
const convertFileToBase64 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    let binaryString = '';
    uint8Array.forEach((byte) => {
        binaryString += String.fromCharCode(byte);
    });
    return btoa(binaryString);
}


// genrate random string
const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const createEmbedding = async (prevState: FileState, formData: FormData) => {
    const session = await auth();
    let userID;
    if (session && session.user) {
        userID = session.user.id;
    } else {
        return {
            errors: { file: ['Failed to obtain user ID from database'] },
            message: 'Failed to Create Embedding. User not found.'
        };
    }
    const validatedFields = CreateEmbedding.safeParse({
        file: formData.get('file'),
        name: formData.get('name'),
        fileType: formData.get('type'),
    });
    // return error state if fails validation
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Request',
        }
    }

    const { name, fileType, file } = validatedFields.data;
    console.log(name, file, fileType);

    // convert file to base64 
    const encodedFile = await convertFileToBase64(file);
    const fileName = name;

    const url = process.env.NEXT_PUBLIC_STORE_EMBEDDINGS_API;

    // Make a POST request to the API Gateway
    try {
        if (!url) {
            throw new Error('URL is undefined');
        }

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ encodedFile, fileName, fileType ,userID }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);

        const date = new Date().toISOString().split('T')[0];

        const generatedID = '3958dc9e-712f-4377-85e9-fec4b6a6442d';

        await sql`
            INSERT INTO files (id, name, type, date)
            VALUES (${generatedID}, ${name}, ${fileType}, ${date})
            ON CONFLICT (id) DO NOTHING;
            `;
        console.log('Successfully inserted file into database');

    } catch (error) {
        console.error('Error sending request to API Gateway', error);

        return {
            errors: { file: ['Failed to send request to API Gateway'] },
            message: 'Failed to Create Request.'
        };
    } finally {
        revalidatePath('/dashboard/files');
        // why redirect not working lol
        redirect('/dashboard/files');
    }
}

export const createMessage = async (formData: FormData) => {
    const session = await auth();
    let userID;
    if (session && session.user) {
        userID = session.user.id;
    } else {
        return {
            errors: { file: ['Failed to obtain user ID from database'] },
            message: 'Failed to Create Embedding. User not found.'
        };
    };
    console.log(formData);
    const validatedFields = CreateMessage.safeParse({
        message: formData.get('message'),
        file: formData.get('file'),
        model: formData.get('model'),
    });


    if (!validatedFields.success) {
        return {
            message: 'Failed to validatedFields'
        };
    }
    const { message, model, file } = validatedFields.data;

    const faissKey = userID + '/' + file + '/' + 'index.faiss';
    const pklKey = userID + '/' + file + '/' + 'index.pkl';

    const url = process.env.NEXT_PUBLIC_BEDROCK_RAG_API;

    if (url) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ faissKey, pklKey, model, message }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);
        
            return {
                message: result,
                receiver: ReceiverType.BOT,
            }
        } catch (error) {
            console.error('Error sending request to API Gateway', error);
            return {
                message: 'Failed to send message. Please try again.',
                receiver: ReceiverType.BOT,
            };
        }
    } else {
        console.error('URL is undefined');
        return {
            message: 'Failed to send message. Please try again.',
            receiver: ReceiverType.BOT,
        };
    }


}