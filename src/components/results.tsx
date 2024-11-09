import { Button, Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";

type ResultsProps = {
    testName: string;
    rightCount: number;
    questions: number;
}

export function Results(props: ResultsProps) {
    return (
        <div className="min-h-screen">
        <Card className="m-3">
            <CardHeader>
            <div className="h-1/5 p-5 w-full text-center border-y-1 text-xl text-primary-500 font-bold">
                {props.testName}
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
                        value={100 * props.rightCount / props.questions}
                        strokeWidth={4}
                        showValueLabel={true}
                    />
                </div>
                <p className="w-full text-primary text-center font-bold text-3xl">
                    {props.rightCount}/{props.questions}
                </p>
                <p className="w-full text-center text-xl m-2">
                    You got awesome score! Keep going!
                </p>
                <Button onClick={() => window.location.href = "/dashboard"} radius="full" className="m-2 mt-5 w-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white shadow-lg">
                    Leave
                </Button>
                </div>
            </CardBody>
        </Card>
    </div>
    )
}