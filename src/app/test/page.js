"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Input, Button, Popup } from '@components';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';

const object = {
    children: [
        {
            __component: "Root",
            children: [

            ]
        }
    ]

};

const canAppend = (item) => {
    return (
        item.__component != "Button"
        && item.__component != "Input"
        && item.__component != "Paragraph"
    );
};


function DivisionOptions({ update }) {
    return <div className='p-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input label="type" type="select" size="full" options={[
                {
                    label: "test",
                    value: "test"
                }
            ]} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="style" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" />
        </div>


    </div>
}

function ImageOptions({ update }) {
    return <div className='p-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input label="type" type="select" size="full" options={[
                {
                    label: "test",
                    value: "test"
                }
            ]} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="style" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" />
        </div>


    </div>
}


function SectionOptions({ update }) {
    return <div className='p-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input label="type" type="select" size="full" options={[
                {
                    label: "test",
                    value: "test"
                }
            ]} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="style" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" />
        </div>


    </div>
}

function LayoutOptions({ update }) {
    return <div className='p-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input label="type" type="select" size="full" options={[
                {
                    label: "test",
                    value: "test"
                }
            ]} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="style" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" />
        </div>


    </div>
}

function TextBoxOptions({ update }) {
    return <div className='p-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input label="type" type="select" size="full" options={[
                {
                    label: "test",
                    value: "test"
                }
            ]} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="variant" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="style" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="Pre title" />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="title" />
        </div>
    </div>
}

function ParagraphOptions() {
    return <div className='p-2'>
        <Input label="text" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function ButtonOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function InputOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function FormOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function AccordionOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function NavOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function TableOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function ListOptions({ update }) {
    return <div className='p-2'>
        <Input label="variant" />
        <Input label="style" />
        <Input label="class" />
    </div>
}

function Build({ obj, id = "root", update }) {
    return <>
        {id != "root" && obj.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} />
        })}
        {id == "root" && obj.children.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} />
        })}

    </>
}

function NewItem({ Resolve }) {
    const componentRef = useRef();

    const Return = () => {
        Resolve({
            new_data: {
                __component: componentRef.current.value,
                __props: {},
                children: []
            }
        })
    };

    return <div className='p-4 bg-white rounded-xl w-[300px]'>
        <div className='w-full text-center text-[1.5rem]'>
            New
        </div>
        <Input
            ref={componentRef}
            type="select"
            value={"Layout"}
            label="Component"
            options={[
                {
                    label: "Division",
                    value: "Division"
                },
                {
                    label: "Image",
                    value: "Image"
                },
                {
                    label: "Layout",
                    value: "Layout"
                },
                {
                    label: "Section",
                    value: "Section"
                },
                {
                    label: "TextBox",
                    value: "TextBox"
                },
                {
                    label: "Paragraph",
                    value: "Paragraph"
                },
                {
                    label: "Button",
                    value: "Button"
                },
                {
                    label: "Input",
                    value: "Input"
                },
                {
                    label: "Form",
                    value: "Form"
                },
                {
                    label: "Accordion",
                    value: "Accordion"
                },
                {
                    label: "Nav",
                    value: "Nav"
                },
                {
                    label: "List",
                    value: "List"
                },
                {
                    label: "Carousel",
                    value: "Carousel"
                },

                {
                    label: "Slider",
                    value: "Slider"
                },

            ]}

        />
        <Button label="Create" onClick={Return} className={"m-auto mt-4"} />
    </div>
}


function Node({ id, index, item, update }) {

    const [closest, setClosest] = useState(null);

    useEffect(() => {
        function getClosestIdStartsWithAndRemoveListener(event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            let closest = null;
            let minDistance = Infinity;

            for (const element of document.querySelectorAll("*")) {
                if (element.id && element.id.startsWith("root---")) {
                    const rect = element.getBoundingClientRect();
                    const distance = Math.sqrt(
                        Math.pow(mouseX - (rect.left + rect.width / 2), 2) +
                        Math.pow(mouseY - (rect.top + rect.height / 2), 2)
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        closest = element;
                    }
                }
            }
            setClosest(closest.id);
        }
        document.addEventListener("mousemove", getClosestIdStartsWithAndRemoveListener);
        return () => {
            document.removeEventListener("mousemove", getClosestIdStartsWithAndRemoveListener);
        }
    }, []);

    const UpdateThis = (data) => {
        update(id + "---" + index, "update", data);
    };

    const [open, setOpen] = React.useState(false);


    const handleNewItem = () => {
        Popup.fire({
            background: "blur",
            canClose: true,
            modal: NewItem
        }).then(res => {
            if (!res.close) {
                console.log(res);
                setOpen(true);
                update(id + "---" + index, "add", res.new_data)
            }
        });
    };

    return <TreeNode key={id + "---" + index} label={

        <div className='w-full flex justify-center page-drag'>
            <Draggable position={{ x: 0, y: 0 }} grid={[32, 32]} onStop={(ev) => {

                setTimeout(() => {
                    update(id + "---" + index, "swap", closest)
                }, 50);

            }}>
                <div id={id + "---" + index} className='rounded-xl bg-white max-w-[500px] relative' style={{ marginTop: id == "root" ? "-2rem" : "" }}>
                    <h2 className={`bg-gray-300 p-2 flex items-center justify-center  ${id == "root" ? "rounded-xl" : "rounded-t-xl"}`} >
                        {id != "root" && <div onClick={() => update(id + "---" + index, "remove")} className='cursor-pointer absolute -left-1 -top-1 bg-red-500 p-2 rounded-full text-white flex justify-center items-center'></div>}

                        {item.__component}
                    </h2>
                    <div className='w-full'>
                        {function () {
                            switch (item.__component) {
                                case "TextBox":
                                    return <TextBoxOptions update={UpdateThis} />
                                case "Layout":
                                    return <LayoutOptions update={UpdateThis} />
                                case "Button":
                                    return <ButtonOptions update={UpdateThis} />
                                case "Input":
                                    return <InputOptions update={UpdateThis} />
                                case "Form":
                                    return <FormOptions update={UpdateThis} />
                                case "Accordion":
                                    return <AccordionOptions update={UpdateThis} />
                                case "Nav":
                                    return <NavOptions update={UpdateThis} />
                                case "Table":
                                    return <TableOptions update={UpdateThis} />
                                case "List":
                                    return <ListOptions update={UpdateThis} />
                                case "Paragraph":
                                    return <ParagraphOptions update={UpdateThis} />
                                case "Division":
                                    return <DivisionOptions update={UpdateThis} />
                                case "Image":
                                    return <ImageOptions update={UpdateThis} />

                            }
                        }()}
                    </div>
                    {canAppend(item) && item.__component != "Root" && <div className='w-full flex'>
                        <Button onClick={() => open ? setOpen(false) : setOpen(true)} label={open ? "CLOSE" : "OPEN"} className="m-auto mb-2" />
                    </div>}
                </div>

            </Draggable>


        </div>
    }>
        {
            canAppend(item) && <div onClick={handleNewItem} style={{ left: "calc(50% - 0.5rem)", marginTop: item?.children?.length > 1 ? "-0.5rem" : "-1rem" }} className='cursor-pointer absolute z-10 bg-lime-500 p-2 rounded-full text-white flex justify-center items-center' />
            ||
            <div className='bg-slate-700 w-4 h-6 absolute' style={{ left: "calc(50% - 0.5rem)", marginTop: "-20px" }} />
        }
        {(item.__component == "Root" || open) && <>
            <Build obj={item.children} id={id + "---" + index} key={id + "---" + index} update={update}
            />
        </>}
    </TreeNode>
}

function Builder() {
    const [data, setData] = React.useState(object);

    function getParentObject(data, indexes) {
        let parent = data;
        for (let i = 0; i < indexes.length - 1; i++) {
            const index = parseInt(indexes[i]);
            if (parent.children && parent.children[index]) {
                parent = parent.children[index];
            } else {
                return null; // Invalid index, parent doesn't exist
            }
        }
        return parent;
    }

    function update(path, operation, object,) {
        // Validate path format
        if (!path.startsWith("root---")) {
            throw new Error(`Invalid path format: ${path}`);
        }

        // Extract child indices from path
        const indexes = path.split("---").slice(1);

        // Perform the specified operation
        try {
            switch (operation) {
                case "remove":
                    let removeAt = indexes.pop();
                    setData(Remake(Function((`
                        const arr = arguments[0];
                        const newArr = [];
                        for(let i in arr.children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children)
                        if(i!=${removeAt})
                        newArr.push(arr.children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children[i])
                        arr.children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children = newArr;
                        return arr;
                    `).replace(/.children.children/g, ".children").replace(/,./g, "."))(Remake(data))));
                    break;
                case "add":
                    setData(Remake(Function((`
                        if(arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children)
                            arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children.push(arguments[1])        
                        else
                            arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}.children = [arguments[1]]                     
                        return arguments[0];
                    `).replace(/.children.children/g, ".children").replace(/,./g, "."))(Remake(data), object)));
                    break;
                case "swap":
                    if (path == "root---0" || object == "root---0") return;
                    const indexes2 = object.split("---").slice(1);
                    setData(Remake(Function((`
                        let valA = arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}
                        let valB = arguments[0].children${indexes2.map(index => { return ".children[" + index + "]" }).join()}
                        arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()} = valB;
                        arguments[0].children${indexes2.map(index => { return ".children[" + index + "]" }).join()} = valA;
                        return arguments[0];
                    `).replace(/.children.children/g, ".children").replace(/,./g, "."))(Remake(data), object)));
                    break;
                case "update":
                    setData(Remake(Function((`
                     arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()} = arguments[1];
                        return arguments[0];
                    `).replace(/.children.children/g, ".children").replace(/,./g, "."))(Remake(data), object)));
                    break;
                default:
                    throw new Error(`Invalid operation: ${operation}`);
            }

        } catch (w) {
            console.warn(w);
        }
        return object;
    };

    useEffect(() => {
        const dragContainer = document.getElementById('drag-container');
        let isDragging = false;
        let startX, startY; // Initial drag coordinates

        const handleMouseDown = (event) => {
            if (event.target.id == "drag-container" || event.target.classList.contains("page-drag")) {
                startX = event.clientX;
                startY = event.clientY;
                isDragging = true;
                document.body.classList.add('no-select');
            }

        };

        const handleMouseMove = (event) => {
            if (!isDragging) return;

            const deltaX = event.clientX - startX;
            const deltaY = event.clientY - startY;

            // Invert left/right and top/bottom based on your requirements:
            const invertedDeltaX = deltaX * (-1); // 1 for normal, -1 for inverted
            const invertedDeltaY = deltaY * (-1); // 1 for normal, -1 for inverted

            const scrollLeft = dragContainer.scrollLeft + (
                invertedDeltaX > 0
                    ? Math.min(invertedDeltaX, dragContainer.scrollWidth - dragContainer.scrollLeft)
                    : Math.max(invertedDeltaX, -dragContainer.scrollLeft)
            );
            const scrollTop = dragContainer.scrollTop + (
                invertedDeltaY > 0
                    ? Math.min(invertedDeltaY, dragContainer.scrollHeight - dragContainer.scrollTop)
                    : Math.max(invertedDeltaY, -dragContainer.scrollTop)
            );

            dragContainer.scrollLeft = scrollLeft;
            dragContainer.scrollTop = scrollTop;

            startX = event.clientX;
            startY = event.clientY;
        };

        const handleMouseUp = () => {
            isDragging = false;
            document.body.classList.remove('no-select');
        };

        const handleTouchStart = (event) => {
            if (event.target.id == "drag-container" || event.target.classList.contains("page-drag")) {
                event.preventDefault();
                startX = event.touches[0].clientX;
                startY = event.touches[0].clientY;
                isDragging = true;
                document.body.classList.add('no-select');
            }
        };

        const handleTouchMove = (event) => {
            event.preventDefault();
            if (!isDragging) return;

            const deltaX = event.touches[0].clientX - startX;
            const deltaY = event.touches[0].clientY - startY;

            // Invert deltaX and deltaY here as well
            const invertedDeltaX = deltaX * (yourLeftRightInversionFactor);
            const invertedDeltaY = deltaY * (yourTopBottomInversionFactor);

            // Calculate scroll amount and set scrollLeft/scrollTop
            // ... (same as in handleMouseMove)

            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            isDragging = false;
            isDragging = false;
            document.body.classList.remove('no-select');
        };

        // Add event listeners directly to the DOM elements:
        dragContainer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        dragContainer.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        // Remove event listeners on cleanup:
        return () => {
            dragContainer.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            dragContainer.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return <div className='w-full h-full flex'>
        <div id="drag-container" className='p-4 bg-slate-700 h-full w-full text-white overflow-hidden'>
            <div style={{ width: "150%", height: "150%" }}>
                <Tree lineBorderRadius='100px' lineColor='#84CC16'>
                    {Build({ obj: data, update })}
                </Tree>
            </div>
        </div>
        <Resizable
            className='h-full overflow-hidden'
            style={{ borderLeft: "2px solid grey" }}
            handleClasses={{
                top: "pointer-events-none",
                bottom: "pointer-events-none",
                topRight: "pointer-events-none",
                bottomRight: "pointer-events-none",
                bottomLeft: "pointer-events-none",
                topLeft: "pointer-events-none",
            }}
            defaultSize={{ width: 400 }}>
            <iframe src="/view" className='w-full h-full ' />
        </Resizable>
        <Popup />
    </div >
};

export default Builder;




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

