"use client";

import "./jsonedit.scss";
import Draggable, { DraggableCore } from 'react-draggable';
import hljs from 'highlight.js';
import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);
import 'highlight.js/styles/default.css';
import { Button, Popup, Accordion, Nav } from "@components";
import { useEffect, useState } from "react";
import { Resizable } from 're-resizable';
import { v4 as uuid } from 'uuid';

import { HexColorPicker } from "react-colorful";

import * as JsDiff from 'diff';

function BuildJsonDiffGitHubES(Old, New) {
    const diff = JsDiff.diffLines(Old, New);
    let result = [];

    diff.forEach(part => {
        const color = part.added ? "rgb(174 255 45 / 19%)" : part.removed ? "rgb(255 45 45 / 8%)" : "inherit";

        part.value.split("\n").forEach(line => {
            result.push(
                <div style={{ background: color }}>{line + "\n"}</div>
            );
        });
    });

    return result;
}


export function ReadLog(Data) {
    switch (Data.Type) {
        case "JSON edit":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4" >
                        JSON UPDATE
                    </div>
                </div>
                <div className="w-full flex">

                    <pre className="w-full flex">
                        <code className="p-2 !bg-transparent max-h-[200px] overflow-auto w-full h-full" data-highlighted="no">
                            {BuildJsonDiffGitHubES(Data.PrevValue, Data.NextValue)}
                        </code>
                    </pre>
                </div>
            </div>;
        case "place":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        PLACE
                    </div>
                    <div className="w-full flex">
                        <div className="w-full">
                            {Data.Key.KeyA.replace(/-:::-/g, " > ")}
                        </div>
                        <div className="p-4" />
                        <div className="w-full">
                            {Data.Key.KeyB.replace(/-:::-/g, " > ")}
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="w-full h-full p-2 " style={{ background: "rgb(174 255 45 / 19%)" }}>
                            <pre className="overflow-auto max-h-[120px]">
                                <code className="js !p-0 overflow-auto !bg-transparent">
                                    {JSON.stringify(Data.PrevValue, null, 4)}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        case "swap":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        SWAP
                    </div>
                    <div className="w-full flex">
                        <div className="w-full">
                            {Data.Key.KeyA.replace(/-:::-/g, " > ")}
                        </div>
                        <div className="p-4" />
                        <div className="w-full">
                            {Data.Key.KeyB.replace(/-:::-/g, " > ")}
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/2 flex " style={{ background: "rgb(174 255 45 / 19%)" }}>
                        <pre className="w-full flex ">
                            <code className="p-2 js !bg-transparent max-h-[200px] overflow-auto w-full h-full">
                                {JSON.stringify(Data.PrevValue, null, 4)}
                            </code>
                        </pre>
                    </div>
                    <div className="w-1/2 flex " style={{ background: "rgb(174 255 45 / 19%)" }}>
                        <pre className="w-full flex ">
                            <code className="p-2 js !bg-transparent max-h-[200px] overflow-auto w-full h-full">
                                {JSON.stringify(Data.NextValue, null, 4)}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        case "insert":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        INSERT
                    </div>
                    <div className="w-full">
                        {Data.Key.replace(/-:::-/g, " > ")}{" > "}{Data.PrevValue + 1}
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="w-full h-full p-2 " style={{ background: "rgb(174 255 45 / 19%)" }}>
                            <pre className="overflow-auto max-h-[120px]">
                                <code className="js !p-0 overflow-auto !bg-transparent">
                                    {JSON.stringify(Data.NextValue, null, 4)}
                                </code>
                            </pre>

                        </div>
                    </div>
                </div>
            </div>
        case "prev":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        UP
                    </div>
                    <div className="w-full">
                        {Data.Key.replace(/-:::-/g, " > ")}
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="p-2 w-full h-full flex " style={{ background: "rgb(174 255 45 / 19%)" }}>
                            <div className="w-full">
                                {Data.PrevValue} {"-->"} {Data.NextValue}
                            </div>
                            <div className="w-full">
                                {Data.PrevValue} {"<--"} {Data.NextValue}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        case "next":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap" >
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        DOWN
                    </div>
                    <div className="w-full">
                        {Data.Key.replace(/-:::-/g, " > ")}
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="p-2 w-full h-full flex" style={{ background: "rgb(174 255 45 / 19%)" }}>
                            <div className="w-full">
                                {Data.PrevValue} {"-->"} {Data.NextValue}
                            </div>
                            <div className="w-full">
                                {Data.PrevValue} {"<--"} {Data.NextValue}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        case "remove":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap" >
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        REMOVE
                    </div>
                    <div className="w-full">
                        {Data.Key.replace(/-:::-/g, " > ")}{" > "}{Data.PrevValue + 1}
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="w-full h-full p-2" style={{ background: "rgb(255 45 45 / 8%)" }}>
                            <pre className="overflow-auto max-h-[120px]">
                                <code className="js overflow-auto !p-0 !bg-transparent">
                                    {JSON.stringify(Data.NextValue, null, 4)}
                                </code>
                            </pre>

                        </div>
                    </div>
                </div>
            </div>
        case "string": case "number": case "boolean":
            return <div className="w-full text-[.9rem]  h-auto flex flex-wrap">
                <div className="w-full flex py-1">
                    <div className="w-full pl-4">
                        {Data.Type.toUpperCase()}
                    </div>
                    <div className="w-full">
                        {Data.Key.replace(/-:::-/g, " > ")}
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full flex">
                        <div className="p-2 w-full h-full" style={{ background: "rgb(255 45 45 / 8%)" }}>
                            {Data.PrevValue}
                        </div>
                    </div>
                    <div className="w-[40px] text-center my-auto mx-1">{"-->"}</div>

                    <div className="w-full flex">
                        <div className="p-2 w-full h-full" style={{ background: "rgb(174 255 45 / 19%)" }}>
                            {Data.NextValue}
                        </div>
                    </div>
                </div>
            </div>
    }
}
export const remove__Editor = (data) => {
    switch (typeof data) {
        case "object":
            if (Array.isArray(data)) {
                if (data[0]?.__Hide) {
                    let newArray = [];
                    for (let i = 1; i < data.length; i++)newArray.push(remove__Editor(data[i]));
                    return newArray;
                }
                return data;
            } else {
                let newObject = {};
                for (let key in data)
                    if (key != "__Hide" && key != "__KeyClassName")
                        newObject[key] = remove__Editor(data[key]);
                return newObject;
            }
        default:
            return data;
    }
};

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


function InputElement({ value, onChange, id }) {
    const [Val, setVal] = useState(value);
    useEffect(() => setVal(value), [value]);
    return <input id={id} value={Val} className={"editer-string"} onChange={ev => setVal(ev.target.value)} type="string" onBlur={onChange} />
};

function ArrayElement({ z, Index, Key, variant, button, Permisions, Global, setData, Data, Level, Id }) {

    const getMousePosition = async () => {
        return await new Promise(Resolve => {
            let ev = document.addEventListener('mousemove', e => {
                Resolve({ x: e.clientX, y: e.clientY });
                document.removeEventListener("mousemove", ev);
            });
        })
    }

    const onDragStop = ({ Key, index }) => {
        return async (ev) => {
            let pos = await getMousePosition();
            const el = document.elementFromPoint(pos.x, pos.y)
            if (el.getAttribute("id")?.startsWith("Editer-ArrayNew-")) {
                const ArrKey = el.getAttribute("htmlkey");
                let built = ""; for (let x = 0; x < Key.split("-:::-").length; x++) {
                    let path = Key.split("-:::-")[x];
                    built += path.length ? "[`" + path + "`]" : "";
                };
                let built2 = ""; for (let x = 0; x < ArrKey.split("-:::-").length; x++) {
                    let path = ArrKey.split("-:::-")[x];
                    built2 += path.length ? "[`" + path + "`]" : "";
                };
                const rules = Function(`return arguments[0]${built}[${index}];`)(Remake(Global));
                let result = Function(`
                   let spliced = arguments[0]${built}.splice(${index},1);
                    arguments[0]${built2}.push(arguments[1]);
                     return {data:arguments[0],spliced};
                `)(Remake(Global), rules);
                return setData(result.data, "place", { KeyA: Key + "-:::-" + index, KeyB: ArrKey }, rules, rules);
            }

            const elmKey = (el?.closest("[id^=Editer-ArrayKey-" + "]"))?.getAttribute("htmlkey");
            elmKey && dragNdDrop(Key + "-:::-" + index, elmKey);

        }
    }

    const dragNdDrop = (Key, targetKey) => {
        if (targetKey && targetKey != Key) {
            let built = ""; for (let x = 0; x < Key.split("-:::-").length - 1; x++) {
                let path = Key.split("-:::-")[x];
                built += path.length ? "[`" + path + "`]" : "";
            }
            let built2 = ""; for (let x = 0; x < targetKey.split("-:::-").length - 1; x++) {
                let path = targetKey.split("-:::-")[x];
                built2 += path.length ? "[`" + path + "`]" : "";
            }

            const index = Key.split("-:::-")[Key.split("-:::-").length - 1];
            const indexKey = targetKey.split("-:::-")[targetKey.split("-:::-").length - 1];

            const rules = Function(`return arguments[0]${built}[${index}];`)(Remake(Global));
            const rulesKey = Function(`return arguments[0]${built2}[${indexKey}];`)(Remake(Global));

            let Act0 = Function(`
                arguments[0]${built}.splice(${index},1,arguments[1]);
                return arguments[0];
            `)(Remake(Global), rulesKey);

            let Act1 = Function(`
                arguments[0]${built2}.splice(${indexKey},1,arguments[1]);
                return arguments[0];
            `)(Remake(Act0), rules);

            setData(Act1, "swap", { KeyA: Key, KeyB: targetKey }, rules, rulesKey);
        }
    };

    const remove = (index) => {
        Popup.fire({
            z: z + 1,
            text: "are you shure you want to remove this item off the menu?",
            canClose: true,
            background: "blur",
            confirmButton: {
                label: "Confirm",
                variant: button,
            }
        }).then(resolve => {
            if (resolve.confirmed) {
                let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
                let DataValue = Array.isArray(Global) ? [...Global] : { ...Global };
                let result = Function(`
                let spliced = arguments[0]${built}.splice(${index},1);
                return {data:arguments[0],spliced};
                `)(DataValue);
                setData(result.data, "remove", Key, index, result.spliced[0]);
            }
        })
    };

    const insertHere = (index, rules, optionalRules) => {
        Popup.fire({
            canClose: true,
            background: blur,
            modal: function ({ Resolve }) {
                const [option, setOption] = useState("");
                const [strValue, setStrValue] = useState("");
                return <div className="bg-white" style={{ padding: "2rem", borderRadius: "1.5rem" }}>
                    <label className="w-full" style={{ fontSize: "0.8rem" }}>Component</label>
                    <select value={option} onChange={(ev) => setOption(ev.target.value)} className="w-full focus:outline-none" style={{ fontSize: "1.5rem" }}>
                        <option value={"Popup"}>Popup</option>
                        <option value={"Header"}>Header</option>
                        <option value={"Footer"}>Footer</option>
                        <option value={"Array"}>Array</option>
                        <option value={"String"}>String</option>
                        <option value={"Button"}>Button</option>
                        <option value={"Layout"}>Layout</option>
                        <option value={"Text"}>Text</option>
                        <option value={"Accordion"}>Accordion</option>
                        <option value={"Nav"}>Nav</option>
                        <option value={"List"}>List</option>
                        <option value={"Parallax"}>Parallax</option>
                        <option value={"Table"}>Table</option>
                    </select>
                    {option == "String" && <>
                        <input className="w-full p-4 mt-4 focus:outline-none" value={strValue} onChange={ev => setStrValue(ev.target.value)} style={{ border: "1px solid" }} />
                    </>}
                    <Button label="create" className="mt-4" onClick={() => Resolve({ option, strValue })} />
                </div>
            },
            z,
            canClose: true,
            background: "blur",
        }).then(resolve => {
            if (resolve.option) {

                let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
                setData(Function(`
                    arguments[0]${built}.splice(${index + 1},0,arguments[1]);
                    return arguments[0];
                `)(Remake(Global), function () {

                    switch (resolve.option) {
                        case "Popup":
                            return {
                                Popup: {}
                            };
                        case "Header":
                            return {
                                Header: {}
                            };
                        case "Footer":
                            return {
                                Footer: {}
                            };
                        case "Button":
                            return {
                                Button: {
                                    label: "",
                                    variant: "default",
                                    href: ""
                                }
                            }
                        case "Array":
                            return [
                                {
                                    __Hide: true,
                                    edit: true
                                },

                            ];
                        case "Table":
                            return {
                                Table: {
                                    head: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                        [
                                            {
                                                __Hide: true,
                                                edit: true
                                            },

                                        ]
                                    ],
                                    body: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                        [
                                            {
                                                __Hide: true,
                                                edit: true
                                            },

                                        ]
                                    ],

                                    foot: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                        [
                                            {
                                                __Hide: true,
                                                edit: true
                                            },

                                        ]
                                    ],

                                }
                            };
                        case "String":
                            return resolve.strValue;
                        case "Layout":
                            return {

                                Layout: {
                                    type: "default",
                                    children: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },


                                    ]
                                },
                            }
                        case "Text":
                            return {
                                Text: {
                                    variant: "default",
                                    pre: "",
                                    title: "",
                                    paragraphs: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ]
                                }
                            }
                            break;
                        case "Accordion":
                            return {
                                Accordion: {
                                    variant: "default",
                                    tabs: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ],
                                    indexes: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ],
                                    tab: ""
                                }
                            }
                            break;
                        case "Nav":
                            return {
                                Nav: {
                                    variant: "default",
                                    tabs: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ],
                                    indexes: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ],
                                    tab: ""
                                }
                            }
                            break;
                        case "List":
                            return {
                                List: {
                                    variant: "default",
                                    items: [
                                        {
                                            __Hide: true,
                                            edit: true
                                        },
                                    ]
                                }
                            }
                            break;
                    }
                    return {};

                }()), "insert", Key, index, rules);


            }
        });
    }

    const movePrev = (Index) => {
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
        let cache = Array.isArray(arguments[0]${built}) ? [...arguments[0]${built}] : { ...arguments[0]${built} };
        if(arguments[0]${built}[${Index - 1}]){
            cache[${Index - 1}] = arguments[0]${built}[${Index}]
            cache[${Index}] = arguments[0]${built}[${Index - 1}]
        }        
        arguments[0]${built} = cache;
        return arguments[0];
        `)(Remake(Global)), "prev", Key, Index, Index - 1);
    };

    const moveNext = (Index) => {
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
        let cache = Array.isArray(arguments[0]${built}) ? [...arguments[0]${built}] : { ...arguments[0]${built} };           
        if(arguments[0]${built}[${Index - 1}]){
            cache[${Index + 1}] = arguments[0]${built}[${Index}]
            cache[${Index}] = arguments[0]${built}[${Index + 1}]
        }        
        arguments[0]${built} = cache;
        return arguments[0];
        `)(Remake(Global)), "next", Key, Index, Index + 1);
    };

    const Config = Data[0]?.__Hide ? Data[0] : null;

    return <div key="obj" className={`${Config?.className ? Config?.className : "editer-array"}`}>
        {Data.map((item, index) => {
            if (item.__Hide && index == 0) return <div key={Key + "-:::-" + index} />
            return <Draggable key={Key + "-:::-" + index} handle={".DRAG" + Id.replace(/ /g, "___").replace(/&/g, "_AND_") + "-" + index} position={{ x: 0, y: 0 }} grid={[32, 32]} onStop={() => onDragStop({ Key, index })()}>
                <div id={"Editer-ArrayKey-" + Id.replace(/ /g, "___").replace(/&/g, "_AND_") + "-" + index} htmlkey={Key + "-:::-" + index} className={`array-key ${item?.__KeyClassName ? item.__KeyClassName : ""}`}>
                    {Config?.edit && (Permisions ? Permisions.Update : true) && <>
                        <div className={"array-control"}>
                            <button className={`array-drag ${"DRAG" + Id.replace(/ /g, "___").replace(/&/g, "_AND_") + "-" + index}`} />
                            {index > 1 && <button className={"array-prev"} onClick={() => movePrev(index)} />}
                            {index < Data.length - 1 && <button className={"array-next"} onClick={() => moveNext(index)} />}
                            {Data.length > 1 && <button className={"array-remove"} onClick={() => remove(index)} />}
                        </div>
                    </>}
                    {Build({ z, variant, button, Permisions, textNotEditable: Config?.textNotEditable, Global, setData, Data: item, Level: Level + 1, Index: index, Id: Id + "-" + index, Key: Key + "-:::-" + index })}
                </div>
            </Draggable>
        })}
        {Config ? Config.edit && <div id={"Editer-ArrayNew-" + Id.replace(/ /g, "___").replace(/&/g, "_AND_")} htmlkey={Key} className={`array-insert-key ${Config.appendKeyClassName}`} onClick={() => insertHere(Data.length - 1, Config?.rules, Config?.optionalRules)} /> : <div className={"array-insert-key"} onClick={() => insertHere(Config ? 1 : 0, Config?.rules, Config?.optionalRules)} />}
    </div>
}

function ObjectElement({ z, variant, button, Permisions, textNotEditable, Global, setData, Data, Level, Id, Key }) {
    const Config = Data?.__Hide;
    const hidden = Config?.hideItems ? Config.hideItems.split(" ") : [];
    const types = Config?.types ? Config.types.split(" ").map(item => {
        let Key = {};
        Key[item.split(":")[0]] = item.split(":")[1];
        return Key
    }) : [];


    return <div key="obj" className={`${Config?.className ? Config.className : "editer-object"}`} >
        {Object.keys(Data).map(keyName => {
            let TypeNameIn;
            for (let t of types)
                if (t[keyName]) TypeNameIn = t[keyName];
            if (keyName == "__Hide" || keyName == "__KeyClassName") return <span key={Key + "-:::-" + keyName} />
            for (let lbl of hidden) if (lbl == keyName) return <div key={Key + "-:::-" + keyName} />
            return <div key={Key + "-:::-" + keyName} className={`${Config?.classNameForKeys?.[keyName] ? Config?.classNameForKeys?.[keyName] : "object-key"} `}>
                {!Config?.dontShowTitles && <>
                    <div className={"object-title"}>
                        {keyName}
                    </div>
                </>}
                <div className={"object-data"}>
                    {Build({ TypeName: TypeNameIn, variant, button, Permisions, textNotEditable: textNotEditable || Config ? !Config?.edit : false, z, Global, setData, Data: Data[keyName], Level: Level + 1, Index: keyName, Id: Id + "-" + keyName, Key: Key + "-:::-" + keyName })}
                </div>
            </div>
        })}
    </div>
}


//build
export function Build({ TypeName, variant, Permisions, textNotEditable, Global, Data, setData, Level = 0, Index = 0, Key = "", Id = "EditerRoot", z = 0, button }) {

    const updateNumber = ev => {
        const value = ev.target.value;
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
            const Props = {...arguments[0]};             
            Props.Data${built} = Number(Props.Value);
            return Props.Data; 
        `)({ Data: Remake(Global), Value: value }), "number", Key, "" + Data, "" + value);
    };

    const updateBoolean = ev => {
        const value = ev.target.checked;
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
            const Props = {...arguments[0]};             
            Props.Data${built} = Props.Value;
            return Props.Data; 
        `)({ Data: Remake(Global), Value: value }), "boolean", Key, "" + Data, "" + value);
    };

    const updateString = ev => {
        const value = ev.target.value;
        if (value == Data) return;
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
            const Props = {...arguments[0]};             
            Props.Data${built} = Props.Value;
            return Props.Data; 
        `)({ Data: Remake(Global), Value: value }), "string", Key, Data, value);
    };

    const updateStringFile = async ev => {
        const value = await new Promise(Resolve => {
            var reader = new FileReader();
            reader.onload = e => Resolve(e.target.result);
            reader.readAsDataURL(ev.target.files[0])
        });
        if (value == Data) return;
        let built = ""; for (let path of Key.split("-:::-")) built += path.length ? "[`" + path + "`]" : "";
        setData(Function(`
            const Props = {...arguments[0]};             
            Props.Data${built} = Props.Value;
            return Props.Data; 
        `)({ Data: Remake(Global), Value: value }), "string", Key, Data, value);
    };

    switch (typeof Data) {
        case "number":
            if (textNotEditable || (Permisions && !Permisions.Update)) return <label className={"editer-string"}>{Data}</label>
            return <input id={Id} value={Data} onChange={updateNumber} className={"editer-number"} type="number" />
        case "boolean":
            if (textNotEditable || (Permisions && !Permisions.Update)) return <label className={"editer-string"}>{Data}</label>
            return <input id={Id} checked={Data} onChange={updateBoolean} className={"editer-boolean"} type="checkbox" />
        case "string":
            if (textNotEditable || (Permisions && !Permisions.Update)) return <label className={"editer-string"}>{Data}</label>
            if (TypeName == "Hex") return <div className="w-full flex justify-center p-4">
                <HexColorPicker color={Data} onChange={(val) => updateString({ target: { value: val } })} />
                <input id={Id} onChange={updateString} value={Data} className={"ml-4"} type="text" />
            </div>
            if (TypeName == "Date") return <>
                <button className="editer-date" onClick={ev => document.getElementById(Id).showPicker()}>
                    {["Sunday", "Moday", "Teusday", "Wednesday", "Thursday", "Friday", "Saturday"][(new Date(Data)).getDay()]},{" "}{(new Date(Data)).getDate()}{" "}{["January", "February", "March", "April", "May", "June", "Jully", "Augest", "September", "October", "November", "December"][(new Date(Data)).getMonth()]}
                </button>
                <input id={Id} onChange={updateString} value={Data} className={"mt-6 absolute max-w-0 max-h-0 p-0"} type="date" />
            </>
            if (TypeName == "Time") return <>
                <button className="editer-time" onClick={ev => document.getElementById(Id).showPicker()}>
                    {Data}
                </button>
                <input id={Id} onChange={updateString} value={Data} className={"mt-6 absolute max-w-0 max-h-0 p-0"} type="time" />
            </>
            if (TypeName == "Image") return <div className="editer-image">
                <img src={Data} />
                <InputElement id={Id} value={Data} onChange={updateString} />
            </div>
            if (TypeName == "Blob") return <div className="editer-blob">
                <label htmlFor={Id}><img src={Data} /></label>
                <input id={Id} hidden type={"file"} onChange={updateStringFile} />
            </div>
            return <InputElement id={Id} value={Data} onChange={updateString} />
        case "object":
            if (Array.isArray(Data)) return ArrayElement({ Index, Key, variant, button, Permisions, textNotEditable, z, Global, setData, Data, Level, Id });
            return ObjectElement({ Index, Key, variant, button, Permisions, textNotEditable, z, Global, setData, Data, Level, Id })

    }
};

export default function JsonEdit({ DataIn, variant = "default", buttons, devSites = [], onSave = () => { }, Permissions, setWarnOnExit = () => { } }) {
    const iframeId = uuid();

    const [jsonData, setJsonData] = useState(null);
    const [Tab, setTab] = useState("normal");
    const [Global, setGlobal] = useState(Array.isArray(DataIn) ? [...DataIn] : { ...DataIn });
    const [showDev, setShowDev] = useState(false);
    const [HistoryCache, setHistory] = useState([
        {
            index: 0,
            Type: "start",
            Data: Array.isArray(DataIn) ? [...DataIn] : { ...DataIn },
        },

    ]);
    const [showHistory, setShowHistory] = useState(false);
    const [JsonError, setJsonError] = useState(false);

    useEffect(() => {
        showDev && document.getElementById(iframeId).contentWindow.postMessage(
            remove__Editor(JSON.stringify(Global)),
            '*'
        );
    }, [Global]);


    useEffect(() => {
        setJsonError(null);
    }, [jsonData]);

    useEffect(() => {
        hljs.highlightAll();
    }, [Tab, showHistory, HistoryCache]);

    useEffect(() => {
        setHistory([
            {
                index: 0,
                Type: "start",
                Data: Remake(DataIn),
            },
        ]);

    }, [DataIn])

    useEffect(() => {
        let h = [...HistoryCache][HistoryCache[0].index]?.Data;
        let NewData = Array.isArray(h) ? [...h] : { ...h }
        setGlobal(NewData);
        if (HistoryCache.length > 1) setWarnOnExit({
            icon: "warn",
            text: "Are you shure you want to exit? all changes will be unsaved.",
            canClose: true,
            background: "blur",
            confirmButton: {
                label: "confirm",
                variant: buttons
            }
        })
        else setWarnOnExit(null);
    }, [HistoryCache]);

    const undo = () => {
        let newHistory = [...HistoryCache];
        newHistory[0].index = HistoryCache[0].index - 1;
        setHistory(newHistory);
    };

    const redo = () => {
        let newHistory = [...HistoryCache];
        newHistory[0].index = HistoryCache[0].index + 1;
        setHistory(newHistory);
    };

    const appendData = async (data, Type, Key, PrevValue, NextValue) => {
        let newHistory = [];
        for (let i = 0; i < HistoryCache[0].index + 1; i++)newHistory.push(HistoryCache[i]);
        newHistory.push({ Type, Key, Data: Remake(data), PrevValue, NextValue });
        newHistory[0].index++;
        setHistory(newHistory);
    };



    const saveJson = async () => {
        if (jsonData) {
            try {
                appendData(JSON.parse(jsonData), "JSON edit", null, JSON.stringify(Array.isArray(Global) ? [...Global] : { ...Global }, null, 4), jsonData);
                setTab("normal");
            } catch (e) {
                setJsonError(String(e))
            }
        }
    };

    return <div className="flex flex-col w-full h-full overflow-hidden">
        {(() => {
            switch (Tab) {
                case "json":
                    return <>
                        <div className={`editer-${variant}`}>
                            <div className="flex flex-col w-full h-full">
                                {JsonError && <div className="w-full p-4" style={{ background: "rgb(255 45 45 / 8%)" }}>
                                    {JsonError}
                                </div>}
                                <pre className="overflow-auto">
                                    <code className="js !bg-transparent overflow-auto focus:outline-none" contentEditable={true} suppressContentEditableWarning={true} onKeyUpCapture={(ev) => {
                                        setJsonData(ev.target.innerText)
                                    }}>
                                        {JSON.stringify(Global, null, 4)}
                                    </code>
                                </pre>
                            </div>
                        </div>
                        <div className="w-full flex min-h-[50px] justify-start p-4">
                            <Button label="back" variant={buttons} onClick={() => [setJsonError(false), setTab("normal")]} />
                            <div className="m-auto" />
                            {jsonData && jsonData != JSON.stringify(Global, null, 4) && <Button label="set new data" variant={buttons} onClick={saveJson} />}
                        </div>
                    </>
                case "normal":
                    return <>

                        <div className="w-full flex-row flex h-full">
                            <div className="h-full flex flex-col" style={{ padding: "1rem" }}>
                                {HistoryCache[0].index > 0 && <>
                                    <Button label="undo" variant={buttons} onClick={undo} />
                                    <div className="h-4" />
                                </>}
                                {(HistoryCache[HistoryCache[0].index + 1] ? true : false) && <>
                                    <Button label="redo" variant={buttons} onClick={redo} />
                                    <div className="h-4" />
                                </>}
                                <div className="m-auto" />
                                {HistoryCache.length > 1 && <>
                                    <Button label={showHistory ? "hide history" : "show history"} variant={buttons} onClick={() => showHistory ? setShowHistory(false) : setShowHistory(true)} />
                                    <div className="h-4" />
                                </>}
                                {(Permissions ? (Permissions.Export) : true) && <>
                                    <Button label={"json"} variant={buttons} onClick={() => setTab("json")} />
                                    <div className="h-4" />
                                </>}
                                {HistoryCache[0].index > 0 && <>
                                    <Button label="save" variant={buttons} onClick={async () => {
                                        onSave(JSON.stringify(Global, null, 4), JSON.stringify(remove__Editor(Global), null, 4), (() => {
                                            let History = [];
                                            for (let i = 1; i < HistoryCache[0].index + 1; i++) {
                                                History.push({ Type: HistoryCache[i].Type, Key: HistoryCache[i].Key, PrevValue: HistoryCache[i].PrevValue, NextValue: HistoryCache[i].NextValue });
                                            }
                                            return History;
                                        })());
                                    }} />
                                    <div className="h-4" />
                                </>}
                                <Button label={`${showDev ? "Hide" : "Show"} Preview`} variant={buttons} onClick={() => showDev ? setShowDev(false) : setShowDev(true)} />
                            </div>
                            <div className={"overflow-auto w-full editer-" + variant}>
                                <Build variant={variant} button={buttons} Permisions={Permissions} Global={Global} Data={Global} setData={appendData} />
                            </div>
                            {showDev && <Resizable defaultSize={{ width: 400 }} className={`flex editer-${variant}-history h-full flex flex-col max-h-full`} style={{ borderLeft: "1px solid" }}>
                                <iframe id={iframeId} className="w-full h-full" src={devSites} />
                            </Resizable>}
                            {showHistory && <Resizable defaultSize={{ width: 400 }} className={`flex editer-${variant}-history  flex flex-col max-h-full`} style={{ borderLeft: "1px solid", height: "100% !important" }}>
                                <div className={"text-[1.5rem] w-full px-4 flex"} style={{ background: "#99999920" }}>
                                    History <div className="w-full text-right">{HistoryCache.length - 1}</div>
                                </div>
                                <div className=" overflow-auto">
                                    {[...HistoryCache].map((item, index) => {
                                        return <div key={index} style={{ filter: (HistoryCache[0].index < index) ? "opacity(50%)" : "" }} className={"history-key"} >{ReadLog(item)}</div>;
                                    }).reverse()}
                                </div>
                            </Resizable>}
                        </div>

                    </>
            }
        })()}

    </div>
}


