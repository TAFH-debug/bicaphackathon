export type Question = {
    id: string;
    text: string;
    options: string[];
    right: number;
}

export type Test = {
    id: string;
    name: string;
    questions: Question[];
}

export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    score: number;
}