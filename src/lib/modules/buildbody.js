import Components from "@components";

export function BuildBody({ template, links, medialinks, functions }) {
    if (Array.isArray(template))
        return <>
            {template.map((item, index) => <BuildBody functions={functions} key={index} links={links} medialinks={medialinks} template={item} {...item} />)}
        </>
    const C = Components[template?.__component];
    return <>
        {C&&<C {...template.__props} functions={functions} links={links} medialinks={medialinks} children={BuildBody({ template: template.children, links, medialinks, functions })} />} 
    </>
}
