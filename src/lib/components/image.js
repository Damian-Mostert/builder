import { Input } from "./input";

function Image({ children, ...props }) {
    return <img {...props} />
}

Image.Options = function Options({ update, data }) {
    return <div className='p-2'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className}
                onChange={className => {
                    update({
                        ...data,
                        className
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="src" value={data.label} onChange={src => {
                update({
                    ...data,
                    src
                })
            }} />
        </div>
    </div>
}

Image.canAppend = false;

export { Image };