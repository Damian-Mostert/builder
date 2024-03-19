import { BuildBody } from "@modules";
import { Input } from "./input";

function Layout({ type = "default", children, className = "", ...props }) {
    if (type.startsWith("split")) {
        return <div className={`layout-${type} ${className}`} {...props}>
            <div className={`layout-${type}-container-a`}>
                {children.props.children[0]}
            </div>
            <div className={`layout-${type}-container-b`}>
                {children.props.children[1]}
            </div>
        </div>

    }
    return <div className={`layout-${type} ${className}`} {...props}>
        <div className={`layout-${type}-container`}>
            {children}
        </div>
    </div>
}

Layout.Options = [
    {
        value:"type",
        type:"select",
        options:[
            {
                label: "default",
                value: "default",
            },
            {
                label: "split",
                value: "split",
            },
            {
                label: "split half right",
                value: "split-half-r",
            },
            {
                label: "split half left",
                value: "split-half-l",
            },
            {
                label: "center",
                value: "center",
            },
            {
                label: "flex",
                value: "flex",
            }
        ]
    },
    {
        value:"className"
    }

];

Layout.canAppend = true;

export { Layout };