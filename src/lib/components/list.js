export function List({ items, variant = "default", className = "" ,...props}) {
    return <ul className={`list list-variant-${variant} ${className}`} {...props}>
        {items.map((item, index) => {
            return <li key={index}>{item}</li>
        })}
    </ul>
}