import Components from "@components";

export function BuildBody(body) {

    if (Array.isArray(body))
        return <>
            {body.map((item, index) => <BuildBody key={index} {...item} />)}
        </>
    if (body) {

        const COMPONENT = Components[body.__component];
        return <COMPONENT {...body.__props} children={BuildBody(body.children)} />

    }
}
