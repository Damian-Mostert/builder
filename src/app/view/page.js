"use client";


import { useState, useEffect, useRef } from "react";
import { BuildBody } from "@modules";

export default function View() {

    const [template, setTemplate] = useState([]);
    const [links, setLinks] = useState([]);
    const [mediaLinks, setMediaLinks] = useState([]);
    const [classNames, setClassNames] = useState(``);
    const [functions, setFunctions] = useState({

    });

    useEffect(() => {
        const handleMessage = event => {
            let message = JSON.parse(event.data);
            console.info(message);
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
                        let res = Function(message.script)();
                        console.log(res);
                        setFunctions(res);

                    } catch (e) {

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
        <BuildBody links={links} mediaLinks={mediaLinks} template={template} functions={functions} />
    </>
}
