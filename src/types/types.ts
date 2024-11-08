export type Question = {
    id: string;
    text: string;
    options: string[];
    right: number;
}

export type QuestionCreate = {
    text: string, 
    options: string[], 
    right: number
}

export type Test = {
    id: string;
    name: string;
    questions: Question[];
}

export type Exercise = {
    id: string;
    name: string;
}

export type User = {
    id: string;
    name: string;
    surname: string;
    email: string;
    score: number;
    tests: Test[];
    exercises: Exercise[];
}