export function Section({ type = "default", children, className = "", ...props }) {
    if (type.startsWith("split")) {
        return <section className={`section-${type} ${className}`} {...props}>
            <div className={`section-${type}-container-a`}>
                {BuildBody(children[0])}
            </div>
            <div className={`section-${type}-container-b`}>
                {BuildBody(children[1])}
            </div>
        </section>

    }
    return <section className={`section-${type} ${className}`} {...props}>
        <div className={`section-${type}-container`}>
            {BuildBody(children)}
        </div>
    </section>

}