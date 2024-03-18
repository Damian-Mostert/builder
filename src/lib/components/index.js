import { default as LINK } from "next/link";
import { useEffect, useState } from "react";

//header,footer
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Footer } from "./footer";

//general components
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
import { Section } from "./section";
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

MapData.Options = function Options({ data, update }) {
    return (
      <div className="p-2">
        <div className="w-[300px] m-auto">
          <Input
            variant="builder"
            label="slug"
            value={data.slug}
            onChange={(slug) => {
              update({
                ...data,
                slug,
              });
            }}
          />
        </div>
        <div className="w-[300px] m-auto">
          <Input
            variant="builder"
            label="Component"
            value={data.active}
            type="select"
            options={Object.keys(COMPONENTS).map((name)=>({
                label:name,
                value:name
            }))}
            onChange={(active) => {
              update({
                ...data,
                active,
              });
            }}
          />
        </div>
      </div>
    );
  };

function ShowOnLg({ children }) {
  const device = Device();
  return <>{device.lg && <>{children}</>}</>;
}
ShowOnLg.Options = () => <div className="w-[200px]"/>;
ShowOnLg.canAppend = [
  "ShowOnMd",
  "ShowOnLg",
  "Division",
  "TextBox",
  "Image",
  "Video",
  "Layout",
  "Section",
  "Form",
  "Button",
  "Nav",
  "Accordion",
  "List",
  "Slider",
];

function ShowOnMd({ children }) {
  const device = Device();
  return <>{device.md && <>{children}</>}</>;
}
ShowOnMd.Options = () => <div className="w-[200px]"/>;
ShowOnMd.canAppend = [
  "ShowOnMd",
  "ShowOnLg",
  "Division",
  "TextBox",
  "Image",
  "Video",
  "Layout",
  "Section",
  "Form",
  "Button",
  "Nav",
  "Accordion",
  "List",
  "Slider",
];

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

ShowState.canAppend = [
  "ShowOnMd",
  "ShowOnLg",
  "Division",
  "TextBox",
  "Image",
  "Video",
  "Layout",
  "Section",
  "Form",
  "Button",
  "Nav",
  "Accordion",
  "List",
  "Slider",
];

ShowState.Options = function Options({ data, update }) {
  return (
    <div className="p-2">
      <div className="w-[300px] m-auto">
        <Input
          variant="builder"
          label="id"
          value={data.id}
          onChange={(id) => {
            update({
              ...data,
              id,
            });
          }}
        />
      </div>
      <div className="w-[300px] m-auto">
        <Input
          variant="builder"
          label="Show / Hide"
          value={data.active}
          type="select"
          options={[
            {
              label: "Show",
              value: true,
            },
            {
              label: "Hide",
              value: false,
            },
          ]}
          onChange={(active) => {
            update({
              ...data,
              active,
            });
          }}
        />
      </div>
    </div>
  );
};

const COMPONENTS = {
    InputElement,
    getState,
    hideState,
    showState,
    IndexItem,
    Header,
    Footer,
    Navigation,
    Video,
    ShowState,
    Section,
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
  Navigation,
  Video,
  ShowState,
  Section,
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
