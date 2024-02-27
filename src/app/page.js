"use client";

import Builder from "src/lib/components/builder"
import { Popup, Navigation } from '@components';

export default function BUILD() {

    return <div className="flex flex-col w-screen h-screen">
        <Navigation.Header />
        <main className="w-full h-full overflow-auto" >

            <Builder template={[
                {
                    __component: "Header",
                    __props: {
                        orientation: "top",
                        icon: "/vercel.svg"
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
                        className: "w-full h-[250px]"
                    },
                    children: [
                        {
                            __component: "Image",
                            __props: {
                                src: "/vercel.svg",
                                className:"p-4"
                            }
                        }
                    ]
                },
                {
                    __component: "Layout",
                    __props: {
                        className: "lg:mt-8",
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
                        className: "lg:mt-8",
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
                    __component: "Slider",
                    __props: {
                        arrows: false,
                        dots: false,
                        infante: true,
                        className: "mt-8"
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
                            __component: "IndexItem",
                            __props: {
                                title: "test",
                            },
                            children: [
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
                            __component: "IndexItem",
                            __props: {
                                title: "test",
                            },
                            children: [
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
                            __component: "IndexItem",
                            __props: {
                                title: "test",
                            },
                            children: [
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
                            __component: "IndexItem",
                            __props: {
                                title: "test",
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
                                        className: "bg-purple-200 p-8"
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
            ]} onSave={(data) => {

            }} />
            <Popup />

        </main>
    </div>
}