import { Node } from "./node/index.js";

export function Build({ obj, id = "root", update, expand }) {
    return <>
        {id != "root" && obj.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} expand={expand} />
        })}
        {id == "root" && obj.children.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} expand={expand} />
        })}

    </>
}