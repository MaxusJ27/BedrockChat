const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a64427',
        name: 'Maxus Jaisi',
        email: 'maxus@gmail.com',
        password: '123456',
    },
];


const files = [
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Maxus Resume',
        type: 'pdf',
        date: '2024-01-01'
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Booking_Killers_of_the_Flower_Moon',
        type: 'pdf',
        date: '2024-01-01'
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'test',
        type: 'pdf',
        date: '2024-01-01'
    },
];

const embeddings = [
    {
        user_id: users[1].id,
        file_name: files[0].name,
        date: '2024-01-01'
    },
    {
        user_id: users[1].id,
        file_name: files[1].name,
        date: '2024-01-01'
    },
    {
        user_id: users[1].id,
        file_name: files[2].name,
        date: '2024-01-01'
    },
];
module.exports = {
    files,
    embeddings,
    users,
}