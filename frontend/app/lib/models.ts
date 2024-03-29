// Models for data
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export type File = {
    id: string,
    name: string,
    type: string,
    date: Date,
};
export type Embedding = {
    id: string,
    file_name: string,
    type: string,
    date: Date,
};


export type Model = {
    id: string, 
    modelname: string,
    inputToken: string,
    outputToken: string,
    estimatedInputCosts: number,
    estimatedOutputCosts: number,
}
export type Select = {
    name: string;
    keyword: string;
}