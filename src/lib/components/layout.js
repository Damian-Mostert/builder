import { BuildBody } from "@modules";

export function Layout({ type = "default", children, section = false, className = "", ...props}) {
    if (section) {
        return <section className={`layout-${type} ${className}`} {...props}>
            <div className={`layout-${type}-container`}>
                {BuildBody(children)}
            </div>
        </section>
    }
    return <section className={`layout-${type} ${className}`} {...props}>
        <div className={`layout-${type}-container`}>
            {BuildBody(children)}
        </div>
    </section>
}