import { BuildBody } from "@modules";
import { Input } from "./input";

function Section({ type = "default", children, className = "", ...props }) {
    if (type.startsWith("split")) {
        return <section className={`layout-${type} ${className}`} {...props}>
            <div className={`layout-${type}-container-a`}>
                {children.props.children[0]}
            </div>
            <div className={`layout-${type}-container-b`}>
                {children.props.children[1]}
            </div>
        </section>

    }
    return <section className={`layout-${type} ${className}`} {...props}>
        <div className={`layout-${type}-container`}>
            {children}
        </div>
    </section>
}

Section.Options = function Options({ update, data }) {
    return <div className='py-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="type" type="select" value={data.value} size="full" options={[
                {
                    label: "default",
                    value: "default",
                },
                {
                    label: "split",
                    value: "split",
                },
                {
                    label: "split half right",
                    value: "split-half-r",
                },
                {
                    label: "split half left",
                    value: "split-half-l",
                },
                {
                    label: "center",
                    value: "center",
                },
                {
                    label: "flex",
                    value: "flex",
                }
            ]} onChange={type => {
                update({
                    ...data,
                    type
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className} onChange={className => {
                update({
                    ...data,
                    className
                })
            }} />
        </div>


    </div>
}

Section.canAppend = [
    "Division",
    "TextBox",
    "Paragraph",
    "Image",
    "Video"
];

export { Section };