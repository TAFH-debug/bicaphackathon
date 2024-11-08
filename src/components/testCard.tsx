import { Test } from "@/types/types";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

export default function TestCard(test: Test) {
    return <Link href={`/test/${test.id}`}>
        <Card className="m-5 min-h-64" shadow="sm" isPressable isHoverable>
            <CardBody className="overflow-visible p-0">
                {test.name}
            </CardBody>
        </Card>
    </Link>
}