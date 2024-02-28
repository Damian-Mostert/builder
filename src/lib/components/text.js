"use client";
import { Input } from "./input";

function TextBox({
    pre,
    title,
    children = [],
    variant = "default",
    className = "",
    ...props
}) {
    return <div className={`text text-variant-${variant} ${className}`} {...props}>
        {pre && <> <h3 className="text-pre-heading">{pre}</h3></>}
        {title && <h2 className="text-heading">{title}</h2>}
        {children}
    </div>
}

TextBox.Options = function Options({ update, data }) {
    return <div className='py-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="Pre title" value={data.pre} onChange={pre => {
                update({
                    ...data,
                    pre
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="title" value={data.title} onChange={title => {
                update({
                    ...data,
                    title
                })
            }} />
        </div>
    </div>
}

TextBox.canAppend = [
    "ShowState",
    "Paragraph",
    "Button",
    "Input"
];

export { TextBox };
