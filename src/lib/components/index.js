
import { default as LINK } from "next/link";
import { useEffect, useState } from "react";


function Link({ children, ...props }) {
    return <LINK {...props}>
        {children}
    </LINK>
}

function ShowState({ children, id }) {
    const [show, setShow] = useState();

    useEffect(() => {
        const customEvent = new CustomEvent('State-' + id, {
            detail: { message: 'State triggered' }
        });

        const handleState = _ => show ? setShow(false) : setShow(true)

        window.addEventListener("State", handleState)
        window.dispatchEvent(customEvent);

        return () => {
            window.removeEventListener("State", handleState);
        }
    }, []);

    return <>
        {show && children}
    </>
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
import { Form } from "./form";
import { TextBox } from "./text";
import { List, ListItem } from "./list";
import { Parallax } from "./parallax";
import { Slider } from "./slider";
import { Paragraph } from "./paragraph";
import { Section } from "./section";
import { Division } from "./division";
import { Image } from "./image";
import { Video } from "./video";

//export
export { Header, Footer, Navigation, Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider };
export default { Header, Footer, Navigation, Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider };