"use client";

import { useState, useEffect } from "react";
import { BuildBody, useInViewClass } from "@modules";
import { Popup, getState, hideState, showState } from "@components";
import { links, medialinks, code, pages, styles } from "@config";

export default function View({ url }) {
  useInViewClass();

  const [template, setTemplate] = useState(
    pages[url] ? pages[url] : pages["/not-found"]
  );
  const [Links, setLinks] = useState(links);
  const [MediaLinks, setMediaLinks] = useState(medialinks);

  const [classNames, setClassNames] = useState(styles[url] ? styles[url] : "");
  const [functions, setFunctions] = useState(
    code[url]
      ? Function(`
    const [Popup,getState,hideState,showState] = arguments;
    return {
        ${code[url]}
    }                        
    `)(Popup, getState, hideState, showState)
      : {}
  );

  useEffect(() => {
    const handleMessage = (event) => {
      let message = JSON.parse(event.data);
      switch (message.type) {
        case "template":
          setTemplate(message.template);
          break;
        case "medialinks":
          setMediaLinks(message.medialinks);
          break;
        case "links":
          setLinks(message.links);
          break;
        case "styles":
          setClassNames(message.classNames);
          break;
        case "script":
          try {
            setFunctions(
              Function(`
                        const [Popup,getState,hideState,showState] = arguments;
                        return {
                            ${message.script}
                        }                        
                        `)(Popup, getState, hideState, showState)
            );
          } catch (e) {
            console.warn(e);
          }
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    Links.map((data, i) => {
      if (data.href == window.location.pathname) {
        document.title = Links?.[i]?.title ? Links[i].title : "";
        document
          .querySelector('meta[name="description"]')
          .setAttribute(
            "content",
            Links?.[i]?.description ? Links[i].description : ""
          );
      }
    });
  }, [Links]);

  return (
    <>
      <style>{classNames}</style>
      <BuildBody
        links={Links}
        medialinks={MediaLinks}
        template={template}
        functions={functions}
      />
      <Popup />
    </>
  );
}
