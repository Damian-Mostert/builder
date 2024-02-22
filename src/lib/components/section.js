import { BuildBody } from "@modules";

export function Section({ type = "default", children, className = "", ...props }) {
    if (type.startsWith("split")) {
        return <section className={`section-${type} ${className}`} {...props}>
            <div className={`section-${type}-container-a`}>
                {children.props.children[0]}
            </div>
            <div className={`section-${type}-container-b`}>
                {children.props.children[1]}
            </div>
        </section>

    }
    return <section className={`section-${type} ${className}`} {...props}>
        <div className={`section-${type}-container`}>
            {children}
        </div>
    </section>

}