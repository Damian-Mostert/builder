import { Input } from "./input";



function IndexItem({
    title, children
}) {
    return {
        title,
        children,
    }
}

IndexItem.Options = [
    {
        value:"title"
    }
]

IndexItem.canAppend = [
"ShowOnMd",
"ShowOnLg",
    "ShowState",
    "Division",
]

export { IndexItem };