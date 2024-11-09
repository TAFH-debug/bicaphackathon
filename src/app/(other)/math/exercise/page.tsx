"use client";
import { Results } from "@/components/results";
import { Exercise } from "@/types/types"; // Updated to use Exercise instead of Question and Test
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


type ExercisePageState = {
    idx: number;
    rightCount: number;
}

export default function ExercisePage() {
    const { id } = useParams();
    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [state, setState] = useState<ExercisePageState>({
        idx: 0,
        rightCount: 0
    });

    const next = (isRight: boolean) => {
        const newRight = isRight ? state.rightCount + 1 : state.rightCount;
        setState({idx: state.idx + 1, rightCount: newRight});
    };

    // Commented out backend fetch
    // const fetchExercise = async () => {
    //     try {
    //         const res = await axiosInstance.get(`/exercises/${id}`);
    //         setExercise(res.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // Dummy data instead of the fetch
    const dummyData: Exercise = {
        name: "Math Exercises",
        exercises: [
            { expression: "5 + 3", answer: 8 },
            { expression: "12 - 7", answer: 5 },
            { expression: "3 * 6", answer: 18 },
            { expression: "15 / 3", answer: 5 }
        ]
    };

    useEffect(() => {
        // Replaced fetch with dummy data
        setExercise(dummyData);
    }, []);
    
    if (!exercise) {
        return <div>Loading...</div>
    }

    if (state.idx >= exercise.exercises.length) {
        return (
            <Results testName={exercise.name} rightCount={state.rightCount} questions={exercise.exercises.length}/>
        )
    }

    return (
        <div className="min-h-screen">
            {
                <ExerciseCard key={state.idx} exercise={exercise.exercises[state.idx]} exerciseName={exercise.name} next={next}/>
            }
        </div>
    )
}

function ExerciseCard({ exercise, exerciseName, next }: { exercise: Exercise, exerciseName: string, next: (isRight: boolean) => void }) {
    const [userAnswer, setUserAnswer] = useState<string>("");
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleCheckAnswer = () => {
        const correct = parseFloat(userAnswer) === exercise.answer;
        setIsCorrect(correct);
        next(correct);
    };

    return (
        <Card className="m-3">
            <CardHeader>
                <div className="h-1/5 p-5 w-full text-center border-y-1 text-xl text-primary-500 font-bold">
                    {exerciseName}
                </div>
            </CardHeader>
            <CardBody className="flex p-4 box-border md:flex-row text-center justify-between">
                <h1>{exercise.expression}</h1>
                <div>
                    <Input
                        aria-label="Enter your answer"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        type="number"
                        placeholder="Enter your answer"
                        bordered
                        color="primary"
                        size="lg"
                        className="mb-3"
                    />
                    {isCorrect !== null && (
                        <div className={`text-xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                            {isCorrect ? "Correct!" : "Incorrect, try again!"}
                        </div>
                    )}
                    <Button radius="full" className="m-2 mt-5 w-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-lg" onClick={handleCheckAnswer} disabled={isCorrect !== null}>
                        Check Answer
                    </Button>
                    <Button radius="full" className="m-2 mt-5 w-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-lg" onClick={() => next(isCorrect === true)} disabled={isCorrect === null}>
                        Next
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
