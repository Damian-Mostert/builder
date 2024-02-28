"use client";

import Builder from "src/lib/components/builder"
import { Popup, Navigation } from '@components';

const CODE = `
function TEST(){ //on button add function to call
    alert("Hello world")
}
return {TEST}`;

export default function BUILD() {

    return <div className="flex flex-col w-screen h-screen">
        <Navigation.Header />
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
                ]}
                onSave={(data) => {

                }} />
            <Popup />

        </main>
    </div>
}