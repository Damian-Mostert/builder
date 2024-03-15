import { Input } from "./input";



function IndexItem({
    title, children
}) {
    return {
        title,
        children,
    }
}

IndexItem.Options = function Options({ data, update }) {
    return <>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="title" value={data.title} onChange={title => {
                update({
                    ...data,
                    title
                })
            }} />
        </div>
    </>
}

IndexItem.canAppend = [
"ShowOnMd",
"ShowOnLg",
    "ShowState",
    "Division",
]

export { IndexItem };