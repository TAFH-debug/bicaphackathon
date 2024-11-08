"use client"
import { useEffect, useState } from 'react';
import { createSwapy } from 'swapy';
import Item from './item';

const DEFAULT = {
  '1': 'a',
  '2': 'b',
  '3': 'c',
  '4': 'd'
};

const itemsConfig = [
  { id: 'a', color: 'bg-red-600', label: 'A' },
  { id: 'b', color: 'bg-gray-600', label: 'B' },
  { id: 'c', color: 'bg-blue-600', label: 'C' },
  { id: 'd', color: 'bg-pink-600', label: 'D' }
];

const shuffle = (array:  any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

function Swap() {
    const data = {
        keys: [
            {
                id: '1',
                value: 'Вопрос 1',
            },
            {
                id: '2',
                value: 'Вопрос 2',
            },
            {
                id: '3',
                value: 'Вопрос 3',
            },
            {
                id: '4',
                value: 'Вопрос 4',
            }
        ],
        values: [
            {
                id: '1',
                value: 'Ответ 1'
            },
            {
                id: '2',
                value: 'Ответ 2'
            },
            {
                id: '3',
                value: 'Ответ 3'
            },
            {
                id: '4',
                value: 'Ответ 4'
            }
        ]
    };
    const [slotItems, setSlotItems] = useState<Record<string, any>>(DEFAULT);

    const colors = ['bg-red-600', 'bg-gray-600', 'bg-blue-600', 'bg-pink-600'];
    const [dict, setDict] = useState<Record<string, () => JSX.Element>>({});

    useEffect(() => {
        const container = document.querySelector('.container')!;
        createSwapy(container);
        
        const keys = shuffle(data.keys);
        const values = data.values;
        
        const newSlotItems = keys.reduce((acc, key, idx) => {
          acc[key.id] = values[idx];
          return acc;
        }, {} as Record<string, string>);
        setSlotItems(newSlotItems);

        const newDict = data.keys.reduce((components, { id, value }) => {
            components[id] = () => (
                <Item id={id} label={value} color={colors[Math.floor(Math.random() * 4)]} />
            );
            return components;
        }, {} as Record<string, () => JSX.Element>);

        setDict(newDict);
        console.log(newDict);
    }, []);
  
    return (
      <div className='h-screen flex items-center justify-center w-full bg-gray-900'>
          <div className="grid grid-rows-4 grid-cols-1 gap-2 p-4 md:w-[30%] container">
              {
                  Object.entries(slotItems).map(([slot, item], idx) => {
                      return (
                          <div className="flex" key={idx}>
                          <div className="bg-gray-800 row-span-1 h-[100px] rounded-[20px] w-1/2" data-swapy-slot={slot}>
                              {dict[slot]()}
                          </div>
                          <div className="text-white flex items-center justify-center text-2xl m-3">
                              {item.value}
                          </div>
                          </div>
                      )
                  })
              }
          </div>
      </div>
    );
}

export default Swap;