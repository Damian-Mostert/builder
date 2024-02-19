import Components from "@components";


export function BuildBody(body,config) {


    if (Array.isArray(body)) {
        return <>
            {body.map((item, index) => {
                return <BuildBody {...item} key={index} />
            })}
        </>;
    }
    return <>
        {Object.keys(body).map((Component, index) => {
            const COMPONENT = Components[Component];
            return <COMPONENT key={index} {...body[Component]} />
        })
        }
    </>
}