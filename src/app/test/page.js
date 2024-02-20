"use client";

import React, { useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

import { Analytics, track } from '@vercel/analytics/react';


const object = [
    {
        __component: "Layout",
        __label: "test",
        children: [
            {
                __component: "Text",
                __label: "test",

            },
            {
                __component: "Text",
                __label: "test",

            },
            {
                __component: "Text",
                __label: "test",

            }

        ]
    }
];


function Build({ obj, id = "root", update }) {
    return <>
        {obj.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} />
        })}
    </>
}

function Node({ id, index, item, update }) {

    const [open, setOpen] = React.useState(false);
    return <TreeNode key={id + "---" + index} label={<div onClick={() => setOpen(true)} id={id + "---" + index} className='rounded-xl bg-white relative'>
        <div onClick={() => update(id + "---" + index, ["remove"])} className='absolute -top-2 -left-2 bg-red-500 p-2 rounded-full text-white flex justify-center items-center'><span className='absolute' style={{ paddingLeft: "1px" }}>X</span></div>


        <h2 className='bg-gray-300'>
            {item.__component}
        </h2>
        {item.__label}
        <div className='w-full'>
            {function () {
                switch (item.__component) {
                    case "Text":
                        return <>
                            <Text />
                        </>
                    case "Layout":
                        return <Layout />
                }
            }()}
        </div>
        {item.children && <div onClick={() => update(id + "---" + index, ["add"])} className='w-full text-center'>
            [INSERT]
        </div>}
    </div>}>
        {open && item.children && <>
            <Build obj={item.children} id={id + "---" + index} key={id + "---" + index} update={update} />
        </>}

    </TreeNode>
}

function Builder() {
    const [data, setData] = React.useState(object);

    useEffect(() => {
        track("test", {
            data: "Hello world",
        });
    }, [])

    function update(path, operation, object,) {
        // Validate path format
        if (!path.startsWith("root---")) {
            throw new Error(`Invalid path format: ${path}`);
        }

        // Extract child indices from path
        const childIndices = path.split("---").slice(1).map(Number);

        // Handle potential empty path or insufficient indices
        if (childIndices.length < 1 || childIndices.length < 2) {
            throw new Error(`Invalid path: insufficient child indices: ${path}`);
        }

        // Determine parent and target indices
        const parentIndex = childIndices.pop();
        const targetIndex = childIndices.pop();

        // Validate parent and target indices
        if (isNaN(parentIndex) || parentIndex < 0 || parentIndex >= object.length) {
            throw new Error(`Invalid child index in path: ${path}`);
        }
        if (isNaN(targetIndex) || targetIndex < 0 || targetIndex >= object[parentIndex].length) {
            throw new Error(`Invalid child index in path: ${path}`);
        }

        // Perform the specified operation
        switch (operation) {
            case "remove":
                object[parentIndex].splice(targetIndex, 1);
                break;
            default:
                throw new Error(`Invalid operation: ${operation}`);
        }

        return object;
    }
    // Example usage (modified operations):

    return <div className='p-4'>
        <Tree label={<div>ROOT</div>}>
            {Build({ obj: object, update })}
        </Tree>
    </div>
};

export default Builder;

function Layout() {
    return <div>

    </div>
}

function Text() {
    return <div>

    </div>
}




export const Remake = (data) => {
    if (typeof data == "object")
        if (Array.isArray(data)) {
            let newArray = [];
            for (let i = 0; i < data.length; i++)newArray.push(Remake(data[i]));
            return newArray;
        } else {
            let newObject = {};
            for (let key in data) newObject[key] = Remake(data[key])
            return newObject;
        }
    return data;
};