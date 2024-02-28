import { Node } from "./node/index.js";

export function Build({ obj, id = "root", update, expand, links }) {
    return <>
        {id != "root" && Array.isArray(obj) && obj.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} expand={expand} links={links} />
        })}
        {id == "root" && obj.children.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} expand={expand} links={links} />
        })}

    </>
}