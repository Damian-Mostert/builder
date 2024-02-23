import Builder from "src/lib/components/builder"

export default function () {
    return <>
        <Builder template={{
            children: [
                {
                    __component: "Root",
                    children: [

                    ]
                }
            ]
        }} />
    </>
}