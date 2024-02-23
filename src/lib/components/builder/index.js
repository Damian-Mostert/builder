"use client";

import React, { useEffect } from 'react';
import { Tree } from 'react-organizational-chart';
import { Popup } from '@components';
import { Resizable } from 're-resizable';

import { Build } from './build';



function Builder({
    template
}) {

    const [data, setData] = React.useState(template);

    useEffect(() => {
        document.getElementById("web-frame").contentWindow.postMessage(
            JSON.stringify(data.children[0].children),
            '*'
        );
    }, [data]);

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
                     arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}.__props = arguments[1];
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

    useEffect(enableZoomBox, []);

    return <div className='w-full h-full flex '>
        <div id="drag-container" className=" drag-me w-full h-full bg-[#222] overflow-hidden ">
            <div className='page-drag drag-me p-4  h-full w-full text-white '>
                <div id='drag-me' style={{ width: "300%", height: "300%" }}>
                    <Tree lineBorderRadius='100px' lineWidth='4px' lineColor='#84CC16'>
                        {Build({ obj: data, update, data })}
                    </Tree>
                </div>
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
            <iframe id="web-frame" src="/view" className='w-full h-full ' />
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

const enableZoomBox = () => {
    const dragContainer = document.getElementById('drag-container');

    // Scroll horizontally to the middle of the element
    dragContainer.scrollLeft = dragContainer.scrollWidth / 3;

    let isDragging = false;
    let startX, startY; // Initial drag coordinates

    const handleMouseDown = (event) => {
        if (event.target.id == "drag-container" || event.target.classList.contains("page-drag") || event.target.classList.contains("drag-me")) {
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
        if (event.target.id == "drag-container" || event.target.classList.contains("page-drag") || event.target.classList.contains("drag-me")) {
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

    // Function to handle the mouse wheel event
    function handleMouseWheel(event) {
        // Get the container element
        var container = document.getElementById("drag-me");
        // Calculate the scale change based on the wheel delta
        var delta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
        var scaleChange = delta * 0.1; // Adjust as needed

        // Apply the scale change
        var currentScale = parseFloat(container.style.transform.replace("scale(", "").replace(")", ""));


        if (isNaN(currentScale)) {
            currentScale = 1;
        }
        var newScale = currentScale + scaleChange;
        container.style.transform = "scale(" + newScale + ")";

        // Calculate the scroll position change based on the scale change
        var containerRect = container.getBoundingClientRect();
        var scrollChangeX = event.clientX - containerRect.left;
        var scrollChangeY = event.clientY - containerRect.top;
        container.scrollLeft += scrollChangeX * scaleChange;
        container.scrollTop += scrollChangeY * scaleChange;
    }

    // Add event listener for mouse wheel
    dragContainer.addEventListener("wheel", handleMouseWheel);

    return () => {
        dragContainer.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        dragContainer.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        dragContainer.removeEventListener("wheel", handleMouseWheel);
    };
}