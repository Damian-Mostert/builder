import { NewItem } from "./new";
import React, { useEffect, useRef, useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Input, Button, Popup } from '@components';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';
import Components from '@components';

import { Build } from "..";

export function Node({ id, index, item, update, expand, links, functions }) {

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

    useEffect(() => {
        if (expand && item.children) {
            setOpen(true)
        } else {
            setOpen(false);
        }
    }, [expand]);

    var Options = Components[item.__component]?.Options;
    if (!Options)
        Options = function () {
            return <></>
        }

    const handleNewItem = () => {
        Popup.fire({
            background: "blur",
            canClose: true,
            modal: NewItem(Components[item.__component] ? Components[item.__component].canAppend : [
                "Header",
                "Footer",
                "Division",
                "Image",
                "Video",
                "List",
                "Slider",
                "Accordion",
                "Nav",
                "Form",

                "Button",
                "Layout",
                "Section",
                "Parallax"
            ], functions)
        }).then(res => {
            if (!res.close) {
                setOpen(true);
                update(id + "---" + index, "add", res.new_data)
            }
        });
    };





    return <TreeNode className="fade-in" key={id + "---" + index} label={

        <div className='w-full flex justify-center page-drag '>
            <Draggable handle={".handle-" + id + "---" + index} position={{ x: 0, y: 0 }} grid={[32, 32]} onStop={(ev) => {

                setTimeout(() => {
                    update(id + "---" + index, "swap", closest)
                }, 50);

            }}>
                <div id={id + "---" + index} className='rounded-xl bg-slate-950 max-w-[500px] relative' style={{ marginTop: id == "root" ? "-2rem" : "" }}>
                    <h2 className={`bg-slate-800 p-1 flex items-center justify-center  ${id == "root" ? "rounded-xl" : "rounded-t-xl"}`} >
                        {id != "root" &&
                            <div onClick={() => Popup.fire({
                                icon: "warn",
                                background: "blur",
                                confirmButton: true,
                                canClose: true,
                                text: "Are you sure you want to remove this " + item.__component + "?"
                            }).then(res => {
                                if (res.confirmed)
                                    update(id + "---" + index, "remove")
                            })} className='cursor-pointer absolute left-2  bg-red-500 p-2 rounded-full text-white flex justify-center items-center'></div>}

                        {id != "root" &&
                            <div onClick={() => update(id + "---" + index, "copy")} className='cursor-pointer absolute right-2  bg-blue-300 p-2 rounded-full text-white flex justify-center items-center'></div>}

                        <div className={`w-full ${"handle-" + id + "---" + index} h-full text-center`}>
                            {item.__component}
                        </div>
                    </h2>
                    {item.__component != "Root" && <div className="w-full p-4">
                        <Options update={UpdateThis} data={item.__props} functions={functions} />
                    </div>}
                    {Components[item.__component]?.canAppend && item.__component != "Root" && <div className='w-full flex'>
                        <Button variant={`builder-toggle${open ? "-invert" : ""}`} onClick={() => open ? setOpen(false) : setOpen(true)} className="m-auto mb-2" />
                    </div>}
                </div>

            </Draggable>


        </div>
    }>
        {
            (Components[item.__component]?.canAppend || item.__component == "Root") && <div onClick={handleNewItem} style={{ left: "calc(50% - 0.5rem)", marginTop: item?.children?.length > 1 ? "-0.5rem" : "-1rem" }} className='cursor-pointer absolute z-10 bg-purple-500 p-2 rounded-full text-white flex justify-center items-center' />
            ||
            <div className='bg-[#222] w-4 h-6 absolute' style={{ left: "calc(50% - 0.5rem)", marginTop: "-20px" }} />
        }
        {(item.__component == "Root" || open) && <>
            <Build obj={item.children} id={id + "---" + index} key={id + "---" + index} update={update} expand={expand} links={links}
                functions={functions}
            />
        </>}
    </TreeNode>
}