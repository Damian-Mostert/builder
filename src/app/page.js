"use client";

import Builder from "src/lib/components/builder"
import { Popup, Navigation } from '@components';
import { useEffect } from "react";

import {
    links,
    mediaLinks
} from "@config";

const CODE = `
TEST(){ //on button add function to call
    Popup.fire({
        icon:"approved",
        title:"HELLO WORLD",
        text:"test",
        canClose:true,
        background:"blur"
    })
},
TOGGLE(){
    let active = getState("test");
    if(active){
        hideState("test")
    }else{
        showState("test")
    }
},
Submit(values){
    console.log(values)
}
`;

export default function BUILD() {
    useEffect(() => {
        document.getElementById("tailwind")?.remove();
    }, [])
    return <div className="flex flex-col w-screen h-screen">
        <main className="w-full h-full overflow-auto" >
            <Builder
                mediaLinks={{
                    twitter: "",
                    faceBook: "",
                    instagram: "",
                    linkedIn: ""
                }}
                code={CODE}
                classNames=".test{}"
                links={[
                    {
                        href: "/",
                        label: "hello world"
                    },
                    {
                        href: "/",
                        label: "hello world"
                    },
                    {
                        href: "/",
                        label: "hello world"
                    },
                    {
                        label: "hello world",
                        links: [
                            {
                                href: "/",
                                label: "hello world"
                            },

                        ]
                    }
                ]}
                template={[
                    {
                        __component: "Header",
                        __props: {
                            orientation: "top",
                            icon: "/vercel.svg"
                        }
                    },
                    {
                        __component: "Button",
                        __props: {
                            label: "HELLO WORLD",
                            functionToCall: "TEST"
                        }
                    },
                    {
                        __component: "Slider",
                        __props: {
                            arrows: false,
                            dots: false,
                            infante: true
                        },
                        children: [
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-green-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-yellow-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-red-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },

                        ]
                    },
                    {
                        __component: "Parallax",
                        __props: {
                            className: "w-full h-[250px] bg-purple-200"
                        },
                        children: [
                            {
                                __component: "Image",
                                __props: {
                                    src: "/vercel.svg",
                                    className: "p-4"
                                }
                            }
                        ]
                    },
                    {
                        __component: "Layout",
                        __props: {
                            className: "",
                            type: "split-half-r"
                        },
                        children: [
                            {
                                __component: "Slider",
                                __props: {
                                    arrows: false,
                                    dots: false,
                                    infante: true
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-green-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-yellow-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-red-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },

                                ]
                            },
                            {
                                __component: "TextBox",
                                __props: {
                                    pre: "pre",
                                    title: "TITLE"
                                },
                                children: [
                                    {
                                        __component: "Paragraph",
                                        __props: {
                                            text: "blahs asdlashd askldh askldh lasdh lkash dlkas dklas dhlkskldkasdkl asld asd as.a sda sdaslhdlkas dlkash dklash kld hlkashlkas dklas klsald askldj alsdhasl"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        __component: "Layout",
                        __props: {
                            className: "",
                            type: "split-half-l"
                        },
                        children: [
                            {
                                __component: "TextBox",
                                __props: {
                                    pre: "pre",
                                    title: "TITLE"
                                },
                                children: [
                                    {
                                        __component: "Paragraph",
                                        __props: {
                                            text: "blahs asdlashd askldh askldh lasdh lkash dlkas dklas dhlkskldkasdkl asld asd as.a sda sdaslhdlkas dlkash dklash kld hlkashlkas dklas klsald askldj alsdhasl"
                                        }
                                    }
                                ]
                            },
                            {
                                __component: "Slider",
                                __props: {
                                    arrows: false,
                                    dots: false,
                                    infante: true
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-green-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-yellow-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-red-200 p-8"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },

                                ]
                            },

                        ]
                    },
                    {
                        __component: "Parallax",
                        __props: {
                            className: "w-full h-[250px] bg-yellow-200"
                        },
                        children: [
                            {
                                __component: "Image",
                                __props: {
                                    src: "/vercel.svg",
                                    className: "p-4"
                                }
                            }
                        ]
                    },
                    {
                        __component: "Slider",
                        __props: {
                            arrows: false,
                            dots: false,
                            infante: true,
                            className: ""
                        },
                        children: [
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-green-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-yellow-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },
                            {
                                __component: "Division",
                                __props: {
                                    className: "bg-red-200 p-8"
                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            },

                        ]
                    },
                    {
                        __component: "Accordion",
                        __props: {
                            orientation: "top",
                            icon: "/vercel.svg"
                        },
                        children: [
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-red-200 p-8  h-full  flex items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-yellow-200 p-8  h-full  flex items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-pink-200 p-8  h-full  flex items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-red-200 p-8  h-full flex items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        __component: "Parallax",
                        __props: {
                            className: "w-full h-[250px] bg-pink-200"
                        },
                        children: [
                            {
                                __component: "Image",
                                __props: {
                                    src: "/vercel.svg",
                                    className: "p-4"
                                }
                            }
                        ]
                    },
                    {
                        __component: "Nav",
                        __props: {
                            orientation: "top",
                            icon: "/vercel.svg"
                        },
                        children: [
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-red-200 p-8 h-full flex items-center items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-green-200 p-8 h-full flex items-center items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-yellow-200 p-8 h-full flex items-center items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                __component: "IndexItem",
                                __props: {
                                    title: "test",
                                },
                                children: [
                                    {
                                        __component: "Division",
                                        __props: {
                                            className: "bg-purple-200 p-8 h-full flex items-center items-center"
                                        },
                                        children: [
                                            {
                                                __component: "Image",
                                                __props: {
                                                    src: "/vercel.svg"
                                                }
                                            }
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        __component: "Division",
                        __props: {
                            className: "bg-yellow-200 p-8"
                        },
                        children: [
                            {
                                __component: "Button",
                                __props: {
                                    functionToCall: "TOGGLE"
                                }
                            },
                            {
                                __component: "ShowState",
                                __props: {
                                    active: false,
                                    id: "test",

                                },
                                children: [
                                    {
                                        __component: "Image",
                                        __props: {
                                            src: "/vercel.svg"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        __component: "Form",
                        __props: {
                            title: "test",
                            variant: "white-bg",
                            className: "m-4",
                            functionToCall: "Submit"
                        },
                        children: [
                            {
                                __component: "InputElement",
                                __props: {
                                    value: "test"
                                }
                            },
                            {
                                __component: "InputElement",
                                __props: {
                                    value: "test"
                                }
                            },
                            {
                                __component: "InputElement",
                                __props: {
                                    value: "test"
                                }
                            }


                        ]
                    }
                ]}
                onSave={(data) => {

                }} />
            <Popup />

        </main>
    </div>
}

/* "use client";


import { Page } from "@modules";

export default function View() {
    return <Page url="/" />
}
 */