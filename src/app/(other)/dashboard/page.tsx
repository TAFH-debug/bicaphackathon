"use client"
import axiosInstance from "@/axiosInstance";
import TestCard from "@/components/testCard";
import { User } from "@/types/types";
import { Card, CardFooter, Chip, CircularProgress, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        try {
            axiosInstance.get("/users/me-full").then((res) => {
                setUser(res.data);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    if (!user) {
        return <div className="min-h-screen w-full flex justify-center">
            <Spinner />
        </div>
    }
    
    return <div className="w-full min-h-screen">
    <div className="flex w-full flex-col md:flex-row">
        <Card className="md:w-3/4 m-2">
                <h1 className="font-bold text-xl mx-5 mt-5">Completed tests</h1>
                <div className='horizontal-scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                    {
                        user.tests.length == 0 ? <p className="text-gray-300 m-auto my-[50%]">No completed tests</p> : user.tests.map((test) => <TestCard key={test.id} {...test} />)
                    }
                </div>
        </Card>
        <Card className="md:w-1/4 m-2 bg-gradient-to-br from-primary to-primary-500 text-background">
            <h1 className="font-bold text-xl mx-5 mt-5">Progress</h1>
            <div className="flex items-center justify-center m-3">
                <CircularProgress
                    classNames={{
                        svg: "w-48 h-48 drop-shadow-md",
                        indicator: "stroke-background",
                        track: "stroke-white/20",
                        value: "text-3xl font-semibold text-white",
                    }}
                    value={user?.score}
                    strokeWidth={4}
                    showValueLabel={true}
                />
            </div>
            <CardFooter className="justify-center items-center pt-0">
                <Chip
                  classNames={{
                    base: "border-1 border-background",
                    content: "text-background text-xl font-semibold",
                  }}
                  variant="bordered"
                >
                  {`Level ${Math.floor(user!.score / 100)}`}
                </Chip>
            </CardFooter>
        </Card>
    </div>
    <div className="flex w-full flex-col md:flex-row">
        <Card className="w-full m-2">
                <h1 className="font-bold text-xl mx-5 mt-5">Completed exercises</h1>
                <div className='horizontal-scroll grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                    {
                        user.tests.length == 0 ? <p className="text-gray-300 m-auto my-[50%]">No completed tests</p> : user.tests.map((test) => <TestCard key={test.id} {...test} />)
                    }
                </div>
        </Card>
    </div>
</div>
}