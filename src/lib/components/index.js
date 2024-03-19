import { default as LINK } from "next/link";
import { useEffect, useState } from "react";



//general components
import { Header } from "./header";
import { Footer } from "./footer";
import { Heading } from "./heading";
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
import { Division } from "./division";
import { Image } from "./image";
import { Video } from "./video";
import { IndexItem } from "./indexItem";

export { default as Page } from "./page";

import { Device } from "@modules";
import axios from "axios";

function MapData({slug,component}){
    const [data,setData] = useState([]);

    const Component = COMPONENTS[component];

    useEffect(()=>{
        axios.post(process.env.BACKEND_URL+"/"+slug).then(res=>{
            setData(res.data.data)
        });
    },[]);

    return <>{data.map((item,index)=>{
        return <Component {...item} key={index}/>
    })}</>
}

MapData.Options = [
  {
    value:"slug"
  }
]

function ShowOnLg({ children }) {
  const device = Device();
  return <>{device.lg && <>{children}</>}</>;
}
ShowOnLg.Options = false;
ShowOnLg.canAppend = true;

function ShowOnMd({ children }) {
  const device = Device();
  return <>{device.md && <>{children}</>}</>;
}
ShowOnMd.Options = false;
ShowOnMd.canAppend = true;

function Link({ children, ...props }) {
  return <LINK {...props}>{children}</LINK>;
}

const showState = (id) => {
  window.States[id].setShow(true);
};

const hideState = (id) => {
  window.States[id].setShow(false);
};

const getState = (id) => window.States[id].show;

function ShowState({ children, id, active }) {
  const [show, setShow] = useState(active);

  useEffect(() => {
    if (!window.states) window.States = {};

    window.States[id] = {
      show,
      setShow,
    };
  }, [show]);

  useEffect(() => {
    let Active;

    if (typeof active == "string") {
      Active = active == "false" ? false : true;
    } else {
      Active = active;
    }

    setShow(Active);
  }, [active]);

  return <>{show && children}</>;
}
ShowState.canAppend = true;
ShowState.Options = [
  {
    value:"id",
  },
  {
    type: "select-boolean",
    value: "active",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
]


const COMPONENTS = {
    InputElement,
    getState,
    hideState,
    showState,
    IndexItem,
    Header,
    Footer,
    Video,
    ShowState,
    Division,
    Paragraph,
    Link,
    Image,
    Button,
    Nav,
    Accordion,
    Popup,
    Layout,
    Input,
    Table,
    Form,
    TextBox,
    List,
    ListItem,
    Parallax,
    Slider,
    ShowOnLg,
    ShowOnMd,
    MapData,
    Heading
  };

//export
export {
  InputElement,
  getState,
  hideState,
  showState,
  IndexItem,
  Header,
  Footer,
  Video,
  ShowState,
  Division,
  Paragraph,
  Link,
  Image,
  Button,
  Nav,
  Accordion,
  Popup,
  Layout,
  Input,
  Table,
  Form,
  TextBox,
  List,
  ListItem,
  Parallax,
  Slider,
  ShowOnLg,
  ShowOnMd,
  Heading
};
export default COMPONENTS
