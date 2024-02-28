"use client";

import React, { useEffect, useState } from 'react';
import { Tree } from 'react-organizational-chart';
import { Button, Popup, getState, hideState, showState } from '@components';
import { Resizable } from 're-resizable';
import { Build } from './build';
import StyleEditor from 'react-style-editor';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function Builder({
    links = [],
    mediaLinks = [],
    template = {},
    classNames = ``,
    code = ``,
    onSave
}) {

    const [Code, setCode] = useState(code);

    const [functions, setFunctions] = useState({});

    useEffect(() => {
        try {
            setFunctions(Function(`
                        const [Popup,getState,hideState,showState] = arguments;
                        return {
                            ${Code}
                        }                        
                        `)(Popup, getState, hideState, showState));
        } catch (e) {

            console.warn(e)
        }
    }, [Code]);

    const [Links, setLinks] = useState(JSON.stringify(links, null, 4));

    const [MediaLinks, setMediaLinks] = useState(JSON.stringify(mediaLinks, null, 4));

    const [ClassNames, setClassNames] = useState(classNames);

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        setTimeout(() => {
            frame.contentWindow.postMessage(
                JSON.stringify({
                    type: "styles",
                    classNames: ClassNames
                }),
                '*'
            );
        }, 100)
    }, [ClassNames]);

    const [history, setHistory] = React.useState([
        {
            children: [
                {
                    __component: "Root",
                    children: [
                        ...template
                    ]
                }
            ]
        }
    ]);

    const [historyIndex, setHistoryIndex] = React.useState(0);

    const setData = (data) => {
        const newData = Remake(data);
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newData]);
        setHistoryIndex(prev => prev + 1);

        document.getElementById("web-frame").contentWindow.postMessage(
            JSON.stringify({
                type: "template",
                template: newData.children[0].children
            }),
            '*'
        );
    }

    const sendData = () => {
        const frame = document.getElementById("web-frame");
        setTimeout(() => {
            frame.contentWindow.postMessage(
                JSON.stringify({
                    type: "template",
                    template
                }),
                '*'
            );
        }, 100)

    };

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        frame.addEventListener("load", sendData)
        frame.addEventListener("load", () => {
            setTimeout(() => {
                let parsed = [];
                try {
                    parsed = JSON.parse(Links)
                } catch (e) {

                }
                frame.contentWindow.postMessage(
                    JSON.stringify({
                        type: "links",
                        links: parsed
                    }),
                    '*'
                );

            }, 100);
        })
    }, []);

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        setTimeout(() => {
            frame.contentWindow.postMessage(
                JSON.stringify({
                    type: "script",
                    script: Code
                }),
                '*'
            );
        }, 100)
    }, [Code]);

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        frame.addEventListener("load", () => {
            setTimeout(() => {
                let parsed = [];
                try {
                    parsed = JSON.parse(Links)
                } catch (e) {

                }

                frame.contentWindow.postMessage(
                    JSON.stringify({
                        type: "links",
                        links: parsed
                    }),
                    '*'
                );
            }, 100)
            setTimeout(() => {
                let parsed = [];
                try {
                    parsed = JSON.parse(MediaLinks)
                } catch (e) {

                }

                frame.contentWindow.postMessage(
                    JSON.stringify({
                        type: "mediaLinks",
                        mediaLinks: parsed
                    }),
                    '*'
                );
            }, 100)
            setTimeout(() => {
                frame.contentWindow.postMessage(
                    JSON.stringify({
                        type: "script",
                        script: Code
                    }),
                    '*'
                );
            }, 100)
        })
    }, []);

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        setTimeout(() => {
            let parsed = [];
            try {
                parsed = JSON.parse(MediaLinks)
            } catch (e) {

            }

            frame.contentWindow.postMessage(
                JSON.stringify({
                    type: "mediaLinks",
                    mediaLinks: parsed
                }),
                '*'
            );
        }, 100)
    }, [MediaLinks]);

    useEffect(() => {
        const frame = document.getElementById("web-frame");
        setTimeout(() => {
            let parsed = [];
            try {
                parsed = JSON.parse(Links)
            } catch (e) {

            }

            frame.contentWindow.postMessage(
                JSON.stringify({
                    type: "links",
                    links: parsed
                }),
                '*'
            );
        }, 100)
    }, [Links]);



    const undo = () => {
        if (historyIndex > 0) {
            document.getElementById("web-frame").contentWindow.postMessage(
                JSON.stringify(history[historyIndex - 1].children[0].children),
                '*'
            );
            setHistoryIndex(prev => prev - 1);
        }
    }

    const redo = () => {
        if (historyIndex < history.length - 1) {
            document.getElementById("web-frame").contentWindow.postMessage(
                JSON.stringify(history[historyIndex + 1].children[0].children),
                '*'
            );
            setHistoryIndex(prev => prev + 1);
        }
    }

    const newLink = () => {

    }

    const openHelp = () => {

    };

    const update = (path, operation, object) => {
        const data = history[historyIndex];

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
                case "copy":
                    setData(Remake(Function((`
                    let duplication = {...arguments[0].children${indexes.map(index => { return ".children[" + index + "]" }).join()}};
                    console.log(duplication)
                    arguments[0].children${indexes.map((index, i) => (i == indexes.length - 1 ? "" : ".children[" + index + "]")).join()}.children.push(duplication);
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

    const [expand, setExpand] = useState(false);

    return <div className='flex flex-col w-full h-full'>

        <div className='w-full h-full flex '>
            <Resizable
                onResize={() => {
                    const dragContainer = document.getElementById('drag-container');
                    dragContainer.scrollLeft = dragContainer.scrollWidth / 2;
                    dragContainer.scrollTop = 500;
                }}
                className='h-full overflow-hidden flex flex-col bg-gray-800 border border-gray-900'
                handleClasses={{
                    top: "pointer-events-none",
                    bottom: "pointer-events-none",
                    topRight: "pointer-events-none",
                    bottomRight: "pointer-events-none",
                    bottomLeft: "pointer-events-none",
                    topLeft: "pointer-events-none",
                }}
                defaultSize={{ width: 400 }}>
                <div className='overflow-auto p-2 w-full'>
                    <h3 className='pt-4 text-white '>
                        Icon
                    </h3>
                    <input className='bg-transparent text-white focus:outline-none p-2 w-full' placeholder='Meta icon' />
                    <h3 className='pt-4 text-white'>
                        Title
                    </h3>
                    <input className='bg-transparent text-white focus:outline-none p-2 w-full' placeholder='Meta title' />
                    <h3 className='pt-4 text-white '>
                        Description
                    </h3>
                    <input className='bg-transparent text-white focus:outline-none p-2 w-full' placeholder='Meta description' />
                    <h3 className='pt-4 text-white '>
                        WEBSITE LINKS
                    </h3>
                    <Editor
                        className="bg-black min-h-32"
                        value={Links}
                        onValueChange={code => {
                            setLinks(code)
                        }}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }}
                    />
                    <h3 className='pt-4 text-white '>
                        MEDIA LINKS
                    </h3>
                    <Editor
                        className="bg-black min-h-32"
                        value={MediaLinks}
                        onValueChange={code => {
                            setMediaLinks(code)
                        }}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }}
                    />

                    <h3 className='pt-4 text-white '>
                        CLASS NAMES
                    </h3>
                    <StyleEditor
                        className="bg-white min-h-32"
                        defaultValue={ClassNames}
                        onChange={val => {
                            setClassNames(val);
                        }}
                    />
                    <h3 className='pt-4 text-white '>
                        INLINE SCRIPT
                    </h3>
                    <Editor
                        className="bg-black min-h-32"
                        value={Code}
                        onValueChange={code => setCode(code)}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                        }}
                    />
                </div>
            </Resizable>

            <div className='w-full h-full relative'>
                <div className='absolute top-0 left-0 w-full h-full flex flex-col'>
                    <div className='w-full h-max bg-gray-800 border border-gray-900 flex items-center '>
                        <button onClick={undo} className='ml-4 text-sm text-white' style={{ transform: "rotate(180deg)" }}>↪</button>
                        <div className='h-2/3 w-[1px] bg-white ml-4' />
                        <button onClick={redo} className='ml-4 text-sm text-white' style={{ transform: "rotate(180deg)" }}>↩</button>
                        <div className='h-2/3 w-[1px] bg-white ml-4' />
                        <button onClick={() => expand ? setExpand(false) : setExpand(true)} className='ml-4 text-sm text-white'>{expand ? "COLLAPSE ALL" : "EXPAND ALL"}</button>
                        <div className='h-2/3 w-[1px] bg-white ml-auto' />
                        <button onClick={onSave} className='ml-4 text-sm text-white'>save</button>
                        <div className='h-2/3 w-[1px] bg-white mx-4' />
                        <button onClick={openHelp} className='ml-4 text-sm text-white'>Help</button>
                        <div className='h-2/3 w-[1px] bg-white mx-4' />
                    </div>
                    <div id="drag-container" className=" drag-me w-full h-full bg-[#222] overflow-auto ">
                        <div className='page-drag drag-me p-4  h-full w-full text-white '>
                            <div id='drag-me' className='drag-me flex justify-center' style={{ width: "1000%", height: "1000%", scale: "0.8" }}>
                                <Tree className="flex justify-center" lineBorderRadius='10px' lineWidth='4px' lineColor='purple'>
                                    <Build obj={history[historyIndex]} update={update} expand={expand} links={Links} functions={functions} />
                                </Tree>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <Resizable
                onResize={() => {
                    const dragContainer = document.getElementById('drag-container');
                    dragContainer.scrollLeft = dragContainer.scrollWidth / 2;
                    dragContainer.scrollTop = 500;

                }}
                className='h-full overflow-hidden flex flex-col'
                handleClasses={{
                    top: "pointer-events-none",
                    bottom: "pointer-events-none",
                    topRight: "pointer-events-none",
                    bottomRight: "pointer-events-none",
                    bottomLeft: "pointer-events-none",
                    topLeft: "pointer-events-none",
                }}
                defaultSize={{ width: 400 }}>
                <div className='w-full h-full relative'>
                    <div className='flex w-full h-full flex-col absolute top-0 left-0'>
                        <div className='w-full h-max bg-gray-800 border border-gray-900 flex items-center '>
                            <button onClick={() => {
                                const f = document.getElementById("web-frame").contentWindow;
                                f.history.back();
                                sendData();

                            }} className='ml-4 text-sm text-white' style={{ transform: "rotate(180deg)" }}>↪</button>
                            <div className='h-2/3 w-[1px] bg-white ml-4' />
                            <button onClick={() => {
                                const f = document.getElementById("web-frame").contentWindow;
                                f.history.forward();
                                sendData();

                            }} className='ml-4 text-sm text-white' style={{ transform: "rotate(180deg)" }}>↩</button>
                            <div className='h-2/3 w-[1px] bg-white ml-4' />
                            <button onClick={() => {
                                const f = document.getElementById("web-frame").contentWindow;
                                f.location.reload();
                                sendData();


                            }} className='ml-4 text-xs text-white'>↺</button>
                            <div className='h-2/3 w-[1px] bg-white ml-4' />
                        </div>
                        <iframe id="web-frame" src="/edit/view" className='w-full h-full ' />
                    </div>
                </div>
            </Resizable>
        </div >
    </div>
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

    const resize = () => {
        dragContainer.scrollLeft = dragContainer.scrollWidth / 2;
        dragContainer.scrollTop = 500;
    }

    resize();

    window.addEventListener("resize", resize)

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
        event.preventDefault();
        // Get the container element
        var container = document.getElementById("drag-me");
        // Calculate the scale change based on the wheel delta
        var delta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
        var scaleChange = delta * 0.1; // Adjust as needed
        var currentScale = parseFloat(container.style.transform.replace("scale(", "").replace(")", ""));


        if (isNaN(currentScale)) {
            currentScale = 1;
        }
        var newScale = currentScale + scaleChange;

        if (newScale <= 0.2) {
            return
        }
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
        window.removeEventListener("resize", resize);
    };
}