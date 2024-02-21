import { BuildBody } from "@modules";

export function Layout({ type = "default", children, className = "", ...props }) {
    if (type.startsWith("split")) {
        return <div className={`layout-${type} ${className}`} {...props}>
            <div className={`layout-${type}-container-a`}>
                {BuildBody(children[0])}
            </div>
            <div className={`layout-${type}-container-b`}>
                {BuildBody(children[1])}
            </div>
        </div>

    }
    return <div className={`layout-${type} ${className}`} {...props}>
        <div className={`layout-${type}-container`}>
            {BuildBody(children)}
        </div>
    </div>
}