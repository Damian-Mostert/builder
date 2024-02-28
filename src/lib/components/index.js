
import { default as LINK } from "next/link";
import { useEffect, useState } from "react";


function Link({ children, ...props }) {
    return <LINK {...props}>
        {children}
    </LINK>
}

const showState = (id) => {
    window.States[id].setShow(true)
};

const hideState = (id) => {
    window.States[id].setShow(false)
};

const getState = (id) => (window.States[id].show);

function ShowState({ children, id, active }) {

    const [show, setShow] = useState(active);

    useEffect(() => {
        if (!window.states)
            window.States = {}


        window.States[id] = {
            show,
            setShow,
        }

    }, [show]);

    return <>
        {show && children}
    </>
}

ShowState.canAppend = [
    "Division",
    "TextBox",
    "Image",
    "Video",
    "Layout",
    "Section",
    "Form",
    "Input",
    "Button",
    "Nav",
    "Accordion",
    "List",
    "Slider",
];

ShowState.Options = function Options({ data, update }) {
    return <div className='p-2'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="id" value={data.id} onChange={id => {
                update({
                    ...data,
                    id
                })
            }} />
        </div>
    </div>
}



//header,footer
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Footer } from "./footer";

//general components
import { Button } from "./button";
import { Nav } from "./nav";
import { Accordion } from "./accordion";
import { Popup } from "./popup";
import { Layout } from "./layout";
import { Input } from "./input";
import { Table } from "./table";
import { Form, InputElement } from "./form";
import { TextBox } from "./text";
import { List, ListItem } from "./list";
import { Parallax } from "./parallax";
import { Slider } from "./slider";
import { Paragraph } from "./paragraph";
import { Section } from "./section";
import { Division } from "./division";
import { Image } from "./image";
import { Video } from "./video";
import { IndexItem } from "./indexItem";

//export
export { InputElement, getState, hideState, showState, IndexItem, Header, Footer, Navigation, Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider };
export default { InputElement, getState, hideState, showState, IndexItem, Header, Footer, Navigation, Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider };