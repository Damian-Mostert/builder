"use client";

import React, { useEffect, useState } from "react";
import { Tree } from "react-organizational-chart";
import { Button, Popup, getState, hideState, showState } from "@components";
import { Resizable } from "re-resizable";
import { Build } from "./build";
import StyleEditor from "react-style-editor";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another
import { links, medialinks, code, pages, styles } from "@config";
import { Input } from "@components";

function Builder({ onSave }) {
  //variables
  const [Code, setCode] = useState(code["/"]);

  const [functions, setFunctions] = useState({});

  const [Links, setLinks] = useState(JSON.stringify(links, null, 4));

  const [MediaLinks, setMediaLinks] = useState(
    JSON.stringify(medialinks, null, 4)
  );

  const [ClassNames, setClassNames] = useState(styles["/"]);

  var Page = "/";

  const [history, setHistory] = React.useState([
    {
      children: [
        {
          __component: "Root",
          children: [...pages[Page]],
        },
      ],
    },
  ]);

  const [historyIndex, setHistoryIndex] = React.useState(0);

  const [expand, setExpand] = useState(false);

  const [displayPage, setPage] = useState("/");

  const [showGlobalConfig, setShowGlobalConfig] = useState(false);

  //effects
  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = document.getElementById("web-frame");
      setTimeout(() => {
        frame.contentWindow.postMessage(
          JSON.stringify({
            type: "script",
            script: Code,
          }),
          "*"
        );
      }, 100);
    }
  }, [Code]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = document.getElementById("web-frame");
      frame.addEventListener("load", () => {
        setTimeout(() => {
          let parsed = [];
          try {
            parsed = JSON.parse(Links);
          } catch (e) {}

          frame.contentWindow.postMessage(
            JSON.stringify({
              type: "links",
              links: parsed,
            }),
            "*"
          );
        }, 100);
        setTimeout(() => {
          let parsed = [];
          try {
            parsed = JSON.parse(MediaLinks);
          } catch (e) {}

          frame.contentWindow.postMessage(
            JSON.stringify({
              type: "medialinks",
              medialinks: parsed,
            }),
            "*"
          );
        }, 100);
        setTimeout(() => {
          frame.contentWindow.postMessage(
            JSON.stringify({
              type: "script",
              script: Code,
            }),
            "*"
          );
        }, 100);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = document.getElementById("web-frame");
      setTimeout(() => {
        let parsed = [];
        try {
          parsed = JSON.parse(MediaLinks);
        } catch (e) {}

        frame.contentWindow.postMessage(
          JSON.stringify({
            type: "medialinks",
            medialinks: parsed,
          }),
          "*"
        );
      }, 100);
    }
  }, [MediaLinks]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = document.getElementById("web-frame");
      setTimeout(() => {
        let parsed = [];
        try {
          parsed = JSON.parse(Links);
        } catch (e) {}

        frame.contentWindow.postMessage(
          JSON.stringify({
            type: "links",
            links: parsed,
          }),
          "*"
        );
      }, 100);
    }
  }, [Links]);

  useEffect(() => {
    try {
      setFunctions(
        Function(`
            const [Popup,getState,hideState,showState] = arguments;
            return {
                ${Code}
            }                        
        `)(Popup, getState, hideState, showState)
      );
    } catch (e) {
      console.warn(e);
    }
  }, [Code]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frm = document.getElementById("web-frame");
      let i = setInterval(() => {
        if (frm.contentWindow.window.location.pathname != `${Page}`) {
          Page = frm.contentWindow.window.location.pathname;
          setPage(Page);
          setCode(code[Page] ? code[Page] : "");
          setClassNames(styles[Page] ? styles[Page] : "");
          setHistory([
            {
              children: [
                {
                  __component: "Root",
                  children: [
                    ...(pages[frm.contentWindow.window.location.pathname]
                      ? Remake(
                          pages[frm.contentWindow.window.location.pathname]
                        )
                      : []),
                  ],
                },
              ],
            },
          ]);
          setHistoryIndex(0);
        }
      }, 500);
      return () => {
        clearInterval(i);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = document.getElementById("web-frame");
      setTimeout(() => {
        frame.contentWindow.postMessage(
          JSON.stringify({
            type: "styles",
            classNames: ClassNames,
          }),
          "*"
        );
      }, 100);
    }
  }, [ClassNames]);

  useEffect(enableZoomBox, []);

  //functions
  const setData = (data) => {
    const newData = Remake(data);
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), newData]);
    setHistoryIndex((prev) => prev + 1);

    document.getElementById("web-frame").contentWindow.postMessage(
      JSON.stringify({
        type: "template",
        template: newData.children[0].children,
      }),
      "*"
    );
  };

  const sendData = () => {
    const frame = document.getElementById("web-frame");
    setTimeout(() => {
      frame.contentWindow.postMessage(
        JSON.stringify({
          type: "template",
          template: pages[Page],
        }),
        "*"
      );
    }, 100);
  };

  const undo = () => {
    if (historyIndex > 0) {
      document
        .getElementById("web-frame")
        .contentWindow.postMessage(
          JSON.stringify(history[historyIndex - 1].children[0].children),
          "*"
        );
      setHistoryIndex((prev) => prev - 1);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      document
        .getElementById("web-frame")
        .contentWindow.postMessage(
          JSON.stringify(history[historyIndex + 1].children[0].children),
          "*"
        );
      setHistoryIndex((prev) => prev + 1);
    }
  };

  const openHelp = () => {};

  const update = (path, operation, object) => {
    const data = history[historyIndex];

    // Validate path format
    if (!path.startsWith("root---")) {
      throw new Error(`Invalid path format: ${path}`);
    }

    // Extract child indices from path
    var indexes = path.split("---").slice(1);

    // Perform the specified operation
    try {
      switch (operation) {
        case "remove":
          let removeAt = indexes.pop();
          setData(
            Remake(
              Function(
                `
                        const arr = arguments[0];
                        const newArr = [];
                        for(let i in arr.children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}.children)
                        if(i!=${removeAt})
                        newArr.push(arr.children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}.children[i])
                        arr.children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}.children = newArr;
                        return arr;
                    `
                  .replace(/.children.children/g, ".children")
                  .replace(/,./g, ".")
              )(Remake(data))
            )
          );
          break;
        case "add":
          setData(
            Remake(
              Function(
                `
                        if(arguments[0].children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}.children)
                            arguments[0].children${indexes
                              .map((index) => {
                                return ".children[" + index + "]";
                              })
                              .join()}.children.push(arguments[1])        
                        else
                            arguments[0].children${indexes
                              .map((index) => {
                                return ".children[" + index + "]";
                              })
                              .join()}.children = [arguments[1]]                     
                        return arguments[0];
                    `
                  .replace(/.children.children/g, ".children")
                  .replace(/,./g, ".")
              )(Remake(data), object)
            )
          );
          break;
        case "swap":
          if (path == "root---0" || object == "root---0") return;
          var indexes2 = object.split("---").slice(1);

          if(indexes2 < indexes){
            var temp = indexes2;
            indexes2 = indexes;
            indexes = temp;
          }

          setData(
            Remake(
              Function(
                `
                        let valA = arguments[0].children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}
                        let valB = arguments[0].children${indexes2
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()}
                        arguments[0].children${indexes
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()} = valB;
                        arguments[0].children${indexes2
                          .map((index) => {
                            return ".children[" + index + "]";
                          })
                          .join()} = valA;
                        return arguments[0];
                    `
                  .replace(/.children.children/g, ".children")
                  .replace(/,./g, ".")
              )(Remake(data), object)
            )
          );
          break;
        case "update":
          setData(
            Remake(
              Function(
                `
                     arguments[0].children${indexes
                       .map((index) => {
                         return ".children[" + index + "]";
                       })
                       .join()}.__props = arguments[1];
                    return arguments[0];
                    `
                  .replace(/.children.children/g, ".children")
                  .replace(/,./g, ".")
              )(Remake(data), object)
            )
          );
          break;
        case "copy":
          setData(
            Remake(
              Function(
                `
                    let duplication = {...arguments[0].children${indexes
                      .map((index) => {
                        return ".children[" + index + "]";
                      })
                      .join()}};
                    console.log(duplication)
                    arguments[0].children${indexes
                      .map((index, i) =>
                        i == indexes.length - 1
                          ? ""
                          : ".children[" + index + "]"
                      )
                      .join()}.children.push(duplication);
                    return arguments[0];
                    `
                  .replace(/.children.children/g, ".children")
                  .replace(/,./g, ".")
              )(Remake(data), object)
            )
          );
          break;
        default:
          throw new Error(`Invalid operation: ${operation}`);
      }
    } catch (w) {
      console.warn(w);
    }
    return object;
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-full flex relative">
        <div
          className={`h-full  ${
            showGlobalConfig ? "w-full p-4" : "w-[0]"
          } overflow-auto absolute top-0 left-0 z-50 bg-slate-700 transition-slow`}
        >
          <div
            className="right-4 top-4 absolute text-white text-2xl  cursor-pointer"
            onClick={() => setShowGlobalConfig(false)}
          >
            X
          </div>
          <h2 className="text-white text-2xl" style={{ fontWeight: "bolder" }}>
            GLOBAL CONFIG
          </h2>
          <h3 className="pt-4 text-white ">PAGES</h3>
          <WebsiteLinks links={Links} onChange={setLinks} />
          <h3 className="pt-4 text-white ">MEDIA LINKS</h3>
          <MediaLinksComponent links={MediaLinks} onChange={setMediaLinks} />
        </div>
        <Resizable
          onResize={() => {
            const dragContainer = document.getElementById("drag-container");
            dragContainer.scrollLeft = dragContainer.scrollWidth / 2.2;
          }}
          className="h-full overflow-hidden flex flex-col bg-gray-800 border border-gray-900"
          handleClasses={{
            top: "pointer-events-none",
            bottom: "pointer-events-none",
            topRight: "pointer-events-none",
            bottomRight: "pointer-events-none",
            bottomLeft: "pointer-events-none",
            topLeft: "pointer-events-none",
          }}
          defaultSize={{ width: 400 }}
        >
          <div className="overflow-auto p-2 w-full h-full flex flex-col">
            <h2
              className="text-white text-2xl pt-4"
              style={{ fontWeight: "bolder" }}
            >
              LOCAL CONFIG
            </h2>
            <h3 className="pt-4 text-white ">CLASS NAMES</h3>
            <StyleEditor
              className="bg-white h-full overflow-auto"
              value={ClassNames}
              onChange={(val) => {
                setClassNames(val);
              }}
            />
            <h3 className=" text-white ">INLINE SCRIPT</h3>
            <div className="w-full h-full bg-white max-h-full overflow-auto">
              <Editor
                className=" min-h-full"
                value={Code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
          </div>
        </Resizable>

        <div className="w-full h-full relative">
          <div className="absolute top-0 left-0 w-full h-full flex flex-col">
            <div className="w-full h-max bg-gray-800 border border-gray-900 flex items-center ">
              <button
                onClick={undo}
                className="ml-4 text-sm text-white"
                style={{ transform: "rotate(180deg)" }}
              >
                ↪
              </button>
              <div className="h-2/3 w-[1px] bg-white ml-4" />
              <button
                onClick={redo}
                className="ml-4 text-sm text-white"
                style={{ transform: "rotate(180deg)" }}
              >
                ↩
              </button>
              <div className="h-2/3 w-[1px] bg-white ml-4" />
              <button
                onClick={() => (expand ? setExpand(false) : setExpand(true))}
                className="ml-4 text-sm text-white"
              >
                {expand ? "COLLAPSE ALL" : "EXPAND ALL"}
              </button>
              <div className="h-2/3 w-[1px] bg-white ml-4" />
              <button
                onClick={() =>
                  showGlobalConfig
                    ? setShowGlobalConfig(false)
                    : setShowGlobalConfig(true)
                }
                className="ml-4 text-sm text-white"
              >
                {"SHOW GLOBAL CONFIG"}
              </button>
              <div className="h-2/3 w-[1px] bg-white ml-auto" />
              <button
                onClick={() => {
                  const frame = document.getElementById("web-frame");
                  const page = frame.contentWindow.location.pathname;

                  let CODE = code;
                  code[page] = Code;

                  let CLASS = styles;
                  CLASS[page] = ClassNames;

                  onSave(
                    Links,
                    MediaLinks,
                    CODE,
                    history[historyIndex].children[0].children,
                    CLASS,
                    page
                  );
                }}
                className="ml-4 text-sm text-white"
              >
                save
              </button>
              <div className="h-2/3 w-[1px] bg-white ml-4" />
            </div>
            <div
              id="drag-container"
              className=" drag-me w-full h-full bg-[#222] overflow-auto"
            >
              <div className="page-drag drag-me p-4  h-full w-full text-white ">
                <div
                  id="drag-me"
                  className="drag-me flex justify-center pt-8"
                  style={{ width: "1000%", height: "1000%" }}
                >
                  <Tree
                    className="flex justify-center"
                    lineBorderRadius="10px"
                    lineWidth="4px"
                    lineColor="purple"
                  >
                    <Build
                      obj={history[historyIndex]}
                      update={update}
                      expand={expand}
                      links={Links}
                      functions={functions}
                    />
                  </Tree>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Resizable
          onResize={() => {
            const dragContainer = document.getElementById("drag-container");
            dragContainer.scrollLeft = dragContainer.scrollWidth / 2.2;
          }}
          className="h-full overflow-hidden flex flex-col"
          handleClasses={{
            top: "pointer-events-none",
            bottom: "pointer-events-none",
            topRight: "pointer-events-none",
            bottomRight: "pointer-events-none",
            bottomLeft: "pointer-events-none",
            topLeft: "pointer-events-none",
          }}
          defaultSize={{ width: 400 }}
        >
          <div className="w-full h-full relative">
            <div className="flex w-full h-full flex-col absolute top-0 left-0">
              <div className="w-full h-max bg-gray-800 border border-gray-900 flex items-center ">
                <button
                  onClick={() => {
                    const f =
                      document.getElementById("web-frame").contentWindow;
                    f.history.back();
                    sendData();
                  }}
                  className="ml-4 text-sm text-white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  ↪
                </button>
                <div className="h-2/3 w-[1px] bg-white ml-4" />
                <button
                  onClick={() => {
                    const f =
                      document.getElementById("web-frame").contentWindow;
                    f.history.forward();
                    sendData();
                  }}
                  className="ml-4 text-sm text-white"
                  style={{ transform: "rotate(180deg)" }}
                >
                  ↩
                </button>
                <div className="h-2/3 w-[1px] bg-white ml-4" />
                <button
                  onClick={() => {
                    const f =
                      document.getElementById("web-frame").contentWindow;
                    f.location.reload();
                    sendData();
                  }}
                  className="ml-4 text-xs text-white"
                >
                  ↺
                </button>
                <div className="h-2/3 w-[1px] bg-white ml-4" />
                <button
                  onClick={() => {
                      document.getElementById("web-frame").contentWindow.location.href="/not-found";
                  }}
                  className="ml-4 text-xs text-white"
                >
                  Open 404
                </button>
                <div className="h-2/3 w-[1px] bg-white ml-4" />
                <button className="ml-4 text-sm text-white">
                  {displayPage}
                </button>
              </div>
              <iframe id="web-frame" src={"/"} className="w-full h-full " />
            </div>
          </div>
        </Resizable>
      </div>
    </div>
  );
}

export default Builder;

export const Remake = (data) => {
  if (typeof data == "object")
    if (Array.isArray(data)) {
      let newArray = [];
      for (let i = 0; i < data.length; i++) newArray.push(Remake(data[i]));
      return newArray;
    } else {
      let newObject = {};
      for (let key in data) newObject[key] = Remake(data[key]);
      return newObject;
    }
  return data;
};

const enableZoomBox = () => {
  if (typeof window !== "undefined") {
    const dragContainer = document.getElementById("drag-container");

    const resize = () => {
      dragContainer.scrollLeft = dragContainer.scrollWidth / 2.2;
    };

    resize();

    window.addEventListener("resize", resize);

    let isDragging = false;
    let startX, startY; // Initial drag coordinates

    const handleMouseDown = (event) => {
      if (
        event.target.id == "drag-container" ||
        event.target.classList.contains("page-drag") ||
        event.target.classList.contains("drag-me")
      ) {
        startX = event.clientX;
        startY = event.clientY;
        isDragging = true;
        document.body.classList.add("no-select");
      }
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;

      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;

      // Invert left/right and top/bottom based on your requirements:
      const invertedDeltaX = deltaX * -1; // 1 for normal, -1 for inverted
      const invertedDeltaY = deltaY * -1; // 1 for normal, -1 for inverted

      const scrollLeft =
        dragContainer.scrollLeft +
        (invertedDeltaX > 0
          ? Math.min(
              invertedDeltaX,
              dragContainer.scrollWidth - dragContainer.scrollLeft
            )
          : Math.max(invertedDeltaX, -dragContainer.scrollLeft));
      const scrollTop =
        dragContainer.scrollTop +
        (invertedDeltaY > 0
          ? Math.min(
              invertedDeltaY,
              dragContainer.scrollHeight - dragContainer.scrollTop
            )
          : Math.max(invertedDeltaY, -dragContainer.scrollTop));

      dragContainer.scrollLeft = scrollLeft;
      dragContainer.scrollTop = scrollTop;

      startX = event.clientX;
      startY = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.body.classList.remove("no-select");
    };

    const handleTouchStart = (event) => {
      if (
        event.target.id == "drag-container" ||
        event.target.classList.contains("page-drag") ||
        event.target.classList.contains("drag-me")
      ) {
        event.preventDefault();
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        isDragging = true;
        document.body.classList.add("no-select");
      }
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      if (!isDragging) return;

      const deltaX = event.touches[0].clientX - startX;
      const deltaY = event.touches[0].clientY - startY;

      // Invert deltaX and deltaY here as well
      const invertedDeltaX = deltaX * yourLeftRightInversionFactor;
      const invertedDeltaY = deltaY * yourTopBottomInversionFactor;

      // Calculate scroll amount and set scrollLeft/scrollTop
      // ... (same as in handleMouseMove)

      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      isDragging = false;
      isDragging = false;
      document.body.classList.remove("no-select");
    };

    // Add event listeners directly to the DOM elements:
    dragContainer.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    dragContainer.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    // Remove event listeners on cleanup:

    return () => {
      dragContainer.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      dragContainer.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }
};

function WebsiteLinks({ links, onChange }) {
  let Links = JSON.parse(links);

  const newLink = () => {
    Links.push({
      label: "",
      href: "",
    });
    onChange(JSON.stringify(Links, null, 4));
  };

  const updateLinkLabel = (index, value) => {
    Links[index].label = value;
    onChange(JSON.stringify(Links, null, 4));
  };

  const updateLinkHref = (index, value) => {
    Links[index].href = value;
    onChange(JSON.stringify(Links, null, 4));
  };

  const updateLinkTitle = (index, value) => {
    Links[index].title = value;
    onChange(JSON.stringify(Links, null, 4));
  };

  const updateLinkDescription = (index, value) => {
    Links[index].description = value;
    onChange(JSON.stringify(Links, null, 4));
  };

  const remove = (index) => {
    Popup.fire({
      icon: "warn",
      background: "blur",
      text:
        "Are you sure you want to remove page " +
        index +
        "? Note this will not be permanent until saved. Page data will not be removed, but this action will hide the page.",
      confirmButton: {
        label: "remove",
      },
      canClose: true,
    }).then((res) => {
      if (res.confirmed) {
        let newArray = [];

        for (let i in Links) if (i != index) newArray.push(Links[i]);

        onChange(JSON.stringify(newArray, null, 4));
      }
    });
  };

  return (
    <div className="w-full flex flex-wrap justify-center">
      {Links &&
        Links.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white p-2 w-full m-2 rounded-lg max-w-[400px] relative"
            >
              <div
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => {
                  remove(index);
                }}
              >
                x
              </div>
              <Input
                onChange={(ev) => {
                  updateLinkLabel(index, ev);
                }}
                label="label"
                value={item.label}
                className="text-white"
              />
              <Input
                onChange={(ev) => {
                  updateLinkHref(index, ev);
                }}
                label="href"
                value={item.href}
                className="text-white"
              />
              <Input
                onChange={(ev) => {
                  updateLinkTitle(index, ev);
                }}
                label="title"
                value={item.title}
                className="text-white"
              />
              <Input
                onChange={(ev) => {
                  updateLinkDescription(index, ev);
                }}
                label="description"
                value={item.description}
                className="text-white"
              />
            </div>
          );
        })}
      <Button label="+" className={"m-2 text-2xl"} onClick={newLink} />
    </div>
  );
}

function MediaLinksComponent({ links, onChange }) {
  return <></>;
}
