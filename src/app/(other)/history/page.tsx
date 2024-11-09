"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import Item from "@/components/item";
import { Button, Chip } from "@nextui-org/react";
import { Results } from "@/components/results";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = (array: any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

export default function List() {
    const colors = ['bg-red-600', 'bg-gray-600', 'bg-blue-600', 'bg-pink-600'];

    const data2 = {
        keys: [
            {
                id: '1',
                value: 'Оғыз мемлекеті'
            },
            {
                id: '2',
                value: 'Түрік қағаны'
            },
            {
                id: '3',
                value: 'Түргеш  қағанаты'
            },
            {
                id: '4',
                value: 'Қимақ  қағанаты'
            }
        ],
        values: [
            {
                id: '1',
                value: 'IX соңы – XI ғасырдың басы'
            },
            {
                id: '2',
                value: '603-704 жж'
            },
            {
                id: '3',
                value: '704-756 жж'
            },
            {
                id: '4',
                value: 'IX соңы – XI ғасырдың басы'
            }
        ]
    };
    const [checked, setChecked] = useState(false);
    const [items, setItems] = useState<Array<{ id: string, value: string, color: string }>>([]);
    const [rightCount, setRightCount] = useState(0);
    const [next, setNext] = useState(false);

    useEffect(() => {
        const newItems = shuffle(data2.keys).map((item) => {
            item.color = colors[Math.floor(Math.random() * colors.length)];
            return item;
        });
        console.log(newItems);
        setItems(newItems);
    }, []);

    const checkAnswers = () => {
        let cnt = 0;
        items.forEach((item, idx) => {
            if (item.id == data2.values[idx].id) {
                cnt++;
            }
        });
        setRightCount(cnt);
        setChecked(true);
    }

    if (next) {
        return <Results rightCount={rightCount} questions={items.length} testName="Something"/>
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-400">
            <div className="flex md:w-1/2">
            <Reorder.Group axis={"y"} values={items} onReorder={checked ? () => {} : setItems} className="w-1/2">
                {items.map((item) => (
                    <Reorder.Item key={item.id} value={item} className="m-2">
                        <Item id={item.id} color={item.color} label={item.value} />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
            <div className="w-1/2">
                {
                    data2.values.map((item, idx) => {
                        return (
                            <Chip size="lg" color={(checked ? (item.id == items[idx].id ? "success" : "danger")  : "primary")} key={item.id} className={"flex items-center justify-center text-xl m-2 text-white p-6"}>
                                {item.value}
                            </Chip>
                        )
                    })
                }
            </div>
            </div>
            <div className="flex justify-center md:w-1/2">
                <Button color="primary" className="mx-2" onClick={checkAnswers}>Check</Button>
                <Button color="primary" className="mx-2" isDisabled={!checked} onClick={() => setNext(true)}>Next</Button>
            </div>
        </div>
    )
}
