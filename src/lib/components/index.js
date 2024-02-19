import Image from "next/image";
import { default as LINK } from "next/link";

function Link({ children, ...props }) {
    return <LINK {...props}>
        {BuildBody(children)}
    </LINK>
}

function Script({data}){
    return<script type="text/javascript">{data}</script>
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
import { Text } from "./text";
import { List } from "./list";
import { Paralax } from "./paralax";
import { Slider } from "./slider";
import { Carusel } from "./carusel";
import { BuildBody } from "@modules";
export { default as JsonEdit, Remake ,remove__Editor} from "./jsonedit/jsonedit";
//export
export {Script, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, Text, List, Paralax, Slider, Carusel };
export default {Script, Link, Image, Button, Header, Footer, Nav, Accordion, Popup, Layout, Input, Table, Form, Text, List, Paralax, Slider, Carusel };