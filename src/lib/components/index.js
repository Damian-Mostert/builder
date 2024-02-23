
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
        const customEvent = new CustomEvent('State', {
            detail: { message: 'State triggered' }
        });

        const handleState = (event) => {

        };

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
import { Header } from "./navigation/header";
import { Footer } from "./navigation/footer";

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
import { Carousel } from "./carousel";
import { Paragraph } from "./paragraph";
import { Section } from "./section";
import { Division } from "./division";
import { Image } from "./image";
import { Video } from "./video";

//export
export { Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider, Carousel };
export default { Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, ListItem, Parallax, Slider, Carousel };