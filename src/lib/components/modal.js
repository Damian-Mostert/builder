"use client";

import { useState, useEffect } from "react";
import { BuildBody, } from "@modules";
import { Popup, getState, hideState, showState } from "@components";
import {  code, modals } from "@config";

export default function Modal({ resolve, modal }) {

  const [template, setTemplate] = useState(
    modals[modal]
  );

  const [functions, setFunctions] = useState(
    code["Modal-"+modal]
      ? Function(`
    const [Popup,getState,hideState,showState,Resolve] = arguments;
    return {
        ${code["Modal-"+modal]}
    }                        
    `)(Popup, getState, hideState, showState,resolve)
      : {}
  );

  useEffect(() => {
    const handleMessage = (event) => {
      let message = JSON.parse(event.data);
      switch (message.type) {
        case "template":
          setTemplate(message.template);
          break;
        case "script":
          try {
            setFunctions(
              Function(`
                        const [Popup,getState,hideState,showState,resolve] = arguments;
                        return {
                            ${message.script}
                        }                        
                        `)(Popup, getState, hideState, showState,resolve)
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
  return (
    <>
      <BuildBody
        template={template}
        functions={functions}
        />
    </>
  );
}
