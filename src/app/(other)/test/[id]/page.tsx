"use client";
import axiosInstance from "@/axiosInstance";
import { Question, Test } from "@/types/types";
import { Button, Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


type TestPageState = {
    idx: number;
    rightCount: number;
}

export default function TestPage() {
    const { id } = useParams();
    const [test, setTest] = useState<Test | null>(null);
    const [state, setState] = useState<TestPageState>({
        idx: 0,
        rightCount: 0
    });

    const next = (isRight: boolean) => {
        const newRight = isRight ? state.rightCount + 1 : state.rightCount;
        setState({idx: state.idx + 1, rightCount: newRight});
    };

    const fetchTest = async () => {
        try {
            const res = await axiosInstance.get(`/tests/${id}`);
            setTest(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTest();
    }, []);
    
    if (!test) {
        return <div>Loading...</div>
    }

    if (state.idx >= test.questions.length) {
        return (
            <div className="min-h-screen">
                <Card className="m-3">
                    <CardHeader>
                    <div className="h-1/5 p-5 w-full text-center border-y-1 text-xl text-primary-500 font-bold">
                        {test.name}
                    </div>
                    </CardHeader>
                    <CardBody className="flex p-4 box-border items-center">
                        <div className="md:w-3/5">
                        <div className="flex items-center justify-center m-3">
                            <CircularProgress
                                classNames={{
                                    svg: "w-72 h-72 drop-shadow-md",
                                    indicator: "stroke-primary",
                                    track: "stroke-primary/20",
                                    value: "text-3xl font-semibold text-primary",
                                }}
                                value={100 * state.rightCount / test.questions.length}
                                strokeWidth={4}
                                showValueLabel={true}
                            />
                        </div>
                        <p className="w-full text-primary text-center font-bold text-3xl">
                            {state.rightCount}/{test.questions.length}
                        </p>
                        <p className="w-full text-center text-xl m-2">
                            You got awesome score! Keep going!
                        </p>
                        <Button radius="full" className="m-2 mt-5 w-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-lg">
                            Leave
                        </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {
                <QuestionCard key={state.idx} question={test.questions[state.idx]} testName={test.name} next={next}/>
            }
        </div>
    )
}

function QuestionCard({ question, testName, next }: { question: Question, testName: string, next: (isRight: boolean) => void }) {
    const [choosen, setChoosen] = useState<number | null>(null);
    
    return (
        <Card className="m-3">
            <CardHeader>
            <div className="h-1/5 p-5 w-full text-center border-y-1 text-xl text-primary-500 font-bold">
                {testName}
            </div>
            </CardHeader>
            <CardBody className="flex p-4 box-border md:flex-row text-center justify-between">
                <h1>{question.text}</h1>
                <div>
                    {
                        question.options.map((option, index) => 
                            <Button key={index} color={choosen === null ? "primary" : (index === question.right ? "success" : "danger")} variant={choosen === null ? "ghost" : (choosen === index ? "solid" : "bordered")} disabled={choosen !== null}
                                className={"w-full m-2"} onClick={() => setChoosen(index)}>
                                {option}
                            </Button>
                        )
                    }
                    <Button radius="full" className="m-2 mt-5 w-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-lg" onClick={() => next(choosen == question.right)}>
                        Next
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}