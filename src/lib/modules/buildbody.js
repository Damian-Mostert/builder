import Components from "@components";

export function BuildBody({ template, links, mediaLinks }) {
    if (Array.isArray(template))
        return <>
            {template.map((item, index) => <BuildBody key={index} links={links} mediaLinks={mediaLinks} template={item} {...item} />)}
        </>

    if (template) {
        const COMPONENT = Components[template.__component];
        return <COMPONENT {...template.__props} links={links} mediaLinks={mediaLinks} children={BuildBody({ template: template.children, links, mediaLinks })} />
    }
}
