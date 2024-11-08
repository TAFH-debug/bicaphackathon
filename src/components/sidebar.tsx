import { Button, Link } from "@nextui-org/react";
import { AiOutlineBook, AiOutlineComment, AiOutlineDashboard, AiOutlineGroup } from "react-icons/ai";

export function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="w-full flex flex-col md:flex-row">
                {/* Sidebar on larger screens, horizontal nav on small screens */}
                <div className="flex md:flex-col w-full md:w-1/6 space-x-2 md:space-x-0 md:space-y-2">
                    <Button className="w-full mx-1" as={Link} href="/dashboard" variant="light">
                        <AiOutlineDashboard /><span>Dashboard</span>
                    </Button>
                    <Button className="w-full mx-1" as={Link} href="/kaz" variant="light">
                        <AiOutlineGroup /><span>Bookshelfs</span>
                    </Button>
                    <Button className="w-full mx-1" as={Link} href="/math" variant="light">
                        <AiOutlineComment /><span>Clubs</span>
                    </Button>
                    <Button className="w-full mx-1" as={Link} href="/history" variant="light">
                        <AiOutlineBook /><span>Books</span>
                    </Button>
                </div>

                {/* Content Area */}
                <div className="w-full md:w-5/6">
                    {children}
                </div>
            </div>
        </div>
    );
}
