'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { User, File, Model, Embedding } from '../lib/models';
import { sql } from '@vercel/postgres';
import { auth } from '@/auth';


export async function fetchFiles() {
    noStore();
    try {
        const data = await sql<File>`SELECT * FROM files`;
        return data.rows;
    } catch (error) {
        console.error('Unable to fetch data: ', error);
        throw new Error('Failed to fetch files data.');
    }
}

export async function fetchFileByType() {
    noStore();
    try {
        const data = await sql<File>`SELECT type, COUNT(*) FROM files GROUP BY type`;
        return data.rows;
    } catch (error) {
        console.error('Unable to fetch data: ', error);
        throw new Error('Failed to fetch files data.');
    }
}

export async function fetchModelCosts() {
    noStore();
    try {
        const session = await auth();
        let userID;
        if (session && session.user) {
            userID = session.user.id;
        } else {
            throw new Error('Failed to obtain user ID from database');
        }
        const data = await sql<Model>`SELECT modelName, SUM(estimatedinput) AS "estimatedInputCosts", SUM(estimatedoutput) AS "estimatedOutputCosts", SUM(inputtoken) AS "inputToken", SUM(outputtoken) AS "outputToken" FROM models WHERE USERID=${userID} GROUP BY modelname`;
        return data.rows;
    } catch (error) {
        console.error('Unable to fetch data: ', error);
        throw new Error('Failed to fetch model costs data.');
    }
}