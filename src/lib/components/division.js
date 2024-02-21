import { BuildBody } from "../modules/buildbody";

export function Division({ children, ...props }) {
    return <div {...props}>
        {BuildBody(children)}
    </div>
}