import Components from "@components";

export function BuildBody({ template, links, mediaLinks, functions }) {
    if (Array.isArray(template))
        return <>
            {template.map((item, index) => <BuildBody functions={functions} key={index} links={links} mediaLinks={mediaLinks} template={item} {...item} />)}
        </>

    if (template) {
        const C = Components[template.__component];
        return <C {...template.__props} functions={functions} links={links} mediaLinks={mediaLinks} children={BuildBody({ template: template.children, links, mediaLinks, functions })} />
    }
}
