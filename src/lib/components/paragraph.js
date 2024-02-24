import { Input } from "./input"

function Paragraph({ text, ...props }) {
    return <p {...props}>{text}</p>
}

Paragraph.Options = function Options({ update, data }) {
    return <div className='p-2'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className} onChange={className => {
                update({
                    ...data,
                    className
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="text" value={data.text} onChange={text => {
                update({
                    ...data,
                    text
                })
            }} />
        </div>
    </div>
}


export { Paragraph };