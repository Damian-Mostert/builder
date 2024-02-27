import React, { useEffect, useRef, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Input, Button, Popup } from '@components';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import Components from '@components';

export function NewItem(canAppend) {
    return function ({ Resolve }) {
        const componentRef = useRef();

        const [component, setComponent] = useState(canAppend ? canAppend[0] : "Division");

        const [data, setData] = useState({});

        const Return = () => {
            Resolve({
                new_data: {
                    __component: componentRef.current.value,
                    __props: data,
                    children: Components[component]?.canAppend ? [] : null
                }
            })
        };
        return <div className='p-4 bg-slate-950 text-white rounded-xl w-max'>
            <div className='w-full text-center text-[1.5rem]'>
                New
            </div>
            <Input
                variant="builder"
                ref={componentRef}
                type="select"
                value={canAppend?.[0]}
                label="Component"
                onChange={val => setComponent(val)}
                options={canAppend.map(item => {
                    return {
                        label: item,
                        value: item
                    };
                })}
            />
            {function () {
                var Options = Components[component]?.Options;

                if (!Options) {
                    Options = function () {
                        return <></>
                    }
                }
                return <Options data={data} update={setData} />

            }()}
            <Button variant='builder' label="Create" onClick={Return} className={"m-auto mt-4"} />
        </div>
    }
}