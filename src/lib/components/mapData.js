import axios from "axios";

import BUILDER_COMPONENTS from "@components";

import {useState,useEffect} from "react";
import { BuildBody } from "@modules";

export function MapData({ slug, component="Division" }) {

  const [data, setData] = useState([]);

  const Component = BUILDER_COMPONENTS[component];

  useEffect(() => {
    axios.post("/api/" + slug).then((res) => {
      
      setData(res.data);
    });
  }, []);

  return (
    <>
      {data && data.map((item, index) => {
        return <Component {...item} key={index} />;
      })}
    </>
  );
}

MapData.Options = [
  {
    value: "slug",
  },
  {
    value: "component",
    type:"select",
    options:"components"
   },
];
