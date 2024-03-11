'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { User, File, Embedding } from '../lib/models';
import { sql } from '@vercel/postgres';


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