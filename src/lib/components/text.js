"use client";

export function Text({
    pre,
    title,
    paragraphs = [],
    variant = "default",
    className = "",
    ...props
}) {
    return <div className={`text text-variant-${variant} ${className}`} {...props}>
        {pre && <> <h3 className="text-pre-heading">{pre}</h3></>}
        {title && <h2 className="text-heading">{title}</h2>}
        {paragraphs.map((item, index) => {
            return <p className="text-p" key={index}>{item}</p>
        })}
    </div>
}