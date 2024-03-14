"use client";


import { useState, useEffect, useRef } from "react";
import { BuildBody } from "@modules";
import { Popup, getState, hideState, showState } from "@components";
import { links, mediaLinks, functions, pages } from "@config";

export default function View({ url }) {

    const [template, setTemplate] = useState(pages[url] ? pages[url] : pages["not-found"]);
    const [Links, setLinks] = useState(links);
    const [MediaLinks, setMediaLinks] = useState(mediaLinks);

    const [classNames, setClassNames] = useState(``);
    const [functions, setFunctions] = useState({});

    useEffect(() => {
        const handleMessage = event => {
            let message = JSON.parse(event.data);
            switch (message.type) {
                case "template":
                    setTemplate(message.template);
                    break;
                case "mediaLinks":
                    setMediaLinks(message.mediaLinks)
                    break;
                case "links":
                    setLinks(message.links)
                    break;
                case "styles":
                    setClassNames(message.classNames)
                    break
                case "script":
                    try {

                        setFunctions(Function(`
                        const [Popup,getState,hideState,showState] = arguments;
                        return {
                            ${message.script}
                        }                        
                        `)(Popup, getState, hideState, showState));

                    } catch (e) {
                        console.warn(e)

                    }
                    break

            }
        };
        window.addEventListener("message", handleMessage);
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    return <>
        <style>
            {classNames}
        </style>
        <BuildBody links={Links} mediaLinks={MediaLinks} template={template} functions={functions} />
        <Popup />
    </>
}
