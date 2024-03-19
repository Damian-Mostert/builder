import { Input } from "./input"

function Paragraph({ text, ...props }) {
    return <p {...props}>{text}</p>
}

Paragraph.Options = [
    {
        value:"className"
    },
    {
        value:"text"
    }
]


export { Paragraph };