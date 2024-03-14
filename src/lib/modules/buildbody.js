import Components from "@components";

export function BuildBody({ template, links, mediaLinks, functions }) {
    return Array.isArray(template) ? (
        <>
            {template.map((item, index) => (
                <BuildBody
                    functions={functions}
                    key={index}
                    links={links}
                    mediaLinks={mediaLinks}
                    template={item}
                    {...item}
                />
            ))}
        </>
    ) : template && (function(Component){
                <Component
            {...template.__props}
            functions={functions}
            links={links}
            mediaLinks={mediaLinks}
            children={BuildBody({
                template: template.children,
                links,
                mediaLinks,
                functions,
            }(Components[template.__component]))}
        />
    }());
}
