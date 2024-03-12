export enum ReceiverType {
    USER = 'user',
    BOT = 'bot'
}

export enum FileType {
    PDF = 'pdf',
    DOCX = 'docx',
    XLSX = 'xlsx',
    CSV = 'csv'
}

export const ModelCost = {
    'amazon.titan-text-lite-v1': [0.0003, 0.0004],
    'amazon.titan-text-express-v1': [0.0008, 0.0016],
    'ai21.j2-mid-v1': [0.0125, 0.0125],
    'ai21.j2-ultra-v1': [0.0188, 0.0188],
    'cohere.command-light-text-v14': [0.0003, 0.0006],
    'cohere.command-text-v14': [0.0015, 0.0020],
    'meta.llama2-13b-chat-v1': [0.00075, 0.00100],
    'meta.llama2-70b-chat-v1': [0.00195, 0.00256],
    'mistral.mistral-7b-instruct-v0:2': [0.00015, 0.0002],
    'mistral.mixtral-8x7b-instruct-v0:1': [0.00045, 0.0007],
}

export const ModelMap = [
    { name: 'Amazon Titan G1 - Lite', keyword: 'amazon.titan-text-lite-v1' },
    { name: 'Amazon Titan G1 - Express', keyword: 'amazon.titan-text-express-v1' },
    { name: 'Jurassic-2 Mid', keyword: 'ai21.j2-mid-v1' },
    { name: 'Jurassic-2 Ultra', keyword: 'ai21.j2-ultra-v1' },
    { name: 'Cohere Command Light', keyword: 'cohere.command-light-text-v14' },
    { name: 'Cohere Command', keyword: 'cohere.command-text-v14' },
    { name: 'Llama 2 Chat 13B', keyword: 'meta.llama2-13b-chat-v1' },
    { name: 'Llama 2 Chat 70B', keyword: 'meta.llama2-70b-chat-v1' },
    { name: 'Mistral 7B Instruct', keyword: 'mistral.mistral-7b-instruct-v0:2' },
    { name: 'Mistral 8x7B Instruct', keyword: 'mistral.mixtral-8x7b-instruct-v0:1' },
];
