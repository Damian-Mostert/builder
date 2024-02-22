
import { default as LINK } from "next/link";
import { useEffect, useState } from "react";


function Video({ children, ...props }) {
    return <video {...props} />
}

function Image({ children, ...props }) {
    return <img {...props} />
}

function Link({ children, ...props }) {
    return <LINK {...props}>
        {children}
    </LINK>
}

function ShowState({ children, id }) {
    const [show, setShow] = useState();

    useEffect(() => {

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
import { List } from "./list";
import { Paralax } from "./paralax";
import { Slider } from "./slider";
import { Carousel } from "./carousel";
import { BuildBody } from "@modules";
import { Paragraph } from "./paragraph";
import { Section } from "./section";
import { Division } from "./division";
import { IAM } from "aws-sdk";

//export
export { Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, Paralax, Slider, Carousel };
export default { Video, ShowState, Section, Division, Paragraph, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, TextBox, List, Paralax, Slider, Carousel };