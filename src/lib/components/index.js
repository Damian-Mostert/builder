

//builder components
import { Link } from "./link";
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
import { MapData } from "./mapData";
import { State, getState, setState } from "./State";
import { ShowOnMd,ShowOnLg } from "./ShowOnScreen";

const BUILDER_COMPONENTS = {
  InputElement,
  IndexItem,
  Header,
  Footer,
  Video,
  State,
  Division,
  Paragraph,
  Link,
  Image,
  Button,
  Nav,
  Accordion,
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
  Heading,
};




export { default as Page } from "./page";

//exported for use
export {
  getState,
  setState,
  IndexItem,
  Button,
  Popup,
  Input,
};
export default BUILDER_COMPONENTS;
