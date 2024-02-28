import { Input } from "./input";

function Division({ children, ...props }) {
    return <div {...props}>
        {children}
    </div>
}

Division.Options = function Options({ update, data }) {
    return <div className='py-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className}
                onChange={className => {
                    update({
                        ...data,
                        className
                    })
                }} />
        </div>
    </div>
}

Division.canAppend = [
    "ShowState",
    "Division",
    "TextBox",
    "Image",
    "Video",
    "Layout",
    "Section",
    "Form",
    "Input",
    "Button",
    "Nav",
    "Accordion",
    "List",
    "Slider",
];

export { Division };