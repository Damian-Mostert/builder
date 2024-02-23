import { Node } from "./node/index.js";

export function Build({ obj, id = "root", update, data }) {
    return <>
        {id != "root" && obj.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} />
        })}
        {id == "root" && obj.children.map((item, index) => {
            return <Node key={index} id={id} index={index} item={item} update={update} />
        })}

    </>
}