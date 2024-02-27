import { Input } from "./input";

function Video({ children, ...props }) {
    return <video {...props} />
}
Video.Options = function Options({ update, data }) {
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
            <Input variant="builder" label="src" value={data.src} onChange={src => {
                update({
                    ...data,
                    src
                })
            }} />
        </div>
    </div>
}

Video.canAppend = false;

export { Video };