import { Input } from "./input";

function Image({ children, ...props }) {
    return <img {...props} />
}

Image.Options = [
    {
        value:"className"
    },
    {
        value:"src"
    }
]

Image.canAppend = false;

export { Image };