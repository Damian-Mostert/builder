"use client";

export function TextBox({
    pre,
    title,
    children = [],
    variant = "default",
    className = "",
    ...props
}) {
    return <div className={`text text-variant-${variant} ${className}`} {...props}>
        {pre && <> <h3 className="text-pre-heading">{pre}</h3></>}
        {title && <h2 className="text-heading">{title}</h2>}
        {children}
    </div>
}