console.log('Start seeding...');
const {
    users,
    files,
    embeddings
} = require('../app/data/index');
const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
          INSERT INTO users (id, name, email, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}


async function seedFiles(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await client.sql`DROP TABLE IF EXISTS files CASCADE;`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS files (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          type TEXT NOT NULL,
          date DATE NOT NULL DEFAULT CURRENT_DATE
        );
      `;

        // console.log(`Created "files" table`);

        // // Insert data into the "files" table
        // const insertedFiles = await Promise.all(
        //     files.map(async (file) => {
        //         return client.sql`
        //   INSERT INTO files (id, name, type, date)
        //   VALUES (${file.id}, ${file.name}, ${file.type}, ${file.date})
        //   ON CONFLICT (id) DO NOTHING;
        // `;
        //     }),
        // );

        // console.log(`Seeded ${insertedFiles.length} files`);

        return {
            createTable,
            // files: insertedFiles,
        };
    } catch (error) {
        console.error('Error seeding files:', error);
        throw error;
    }
}


async function seedEmbeddings(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await client.sql`DROP TABLE IF EXISTS embeddings CASCADE;`;
        // Create the "embeddings" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS embeddings (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES users(id),
          file_name TEXT NOT NULL,
          date DATE NOT NULL DEFAULT CURRENT_DATE
        );
        `;

        console.log("Created 'embeddings' table");
        const insertedEmbeddings = await Promise.all(
            embeddings.map(async (embedding) => {
                return client.sql`
          INSERT INTO embeddings (user_id, file_name, date)
          VALUES (${embedding.user_id}, ${embedding.file_name}, ${embedding.date})
          ON CONFLICT (id) DO NOTHING;
        `;
            }),
        );
        console.log(`Seeded ${insertedEmbeddings.length} embeddings`);
    } catch (error) {
        console.error('Error seeding embeddings:', error);
        throw error;
    }
}

async function seedModels(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        await client.sql`DROP TABLE IF EXISTS models CASCADE;`;
        // Create the "embeddings" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS models (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          user_id UUID REFERENCES users(id),
          file_name TEXT NOT NULL,
          date DATE NOT NULL DEFAULT CURRENT_DATE
        );
        `;

        console.log("Created 'models' table");
        const insertedModels = await Promise.all(
            embeddings.map(async (model) => {
                return client.sql`
          INSERT INTO models (user_id, file_name, date)
          VALUES (${model.user_id}, ${model.file_name}, ${model.date})
          ON CONFLICT (id) DO NOTHING;
        `;
            }),
        );
        console.log(`Seeded ${insertedModels.length} models`);
    } catch (error) {
        console.error('Error seeding models:', error);
        throw error;
    }

}
async function main() {
    const client = await db.connect();
    // await seedUsers(client);
    await seedFiles(client);
    // await seedEmbeddings(client);

    await client.end()
}

main().catch((err) => {
    console.error(`An error occured while trying to seed the database: ${err}`);
});