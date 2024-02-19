"use client";

export function Table({
    head, body, foot, variant = "default",className="",...props
}) {
    return <table className={`table-component table-component-variant-${variant} ${className}`} {...props}>
        {head && <thead>
            {head.map((item, index) => {
                return <tr key={"tr-" + index}>
                    {item.map((sub, subi) => {
                        return<td key={"td-" + index + "-" + subi}>
                            {sub}
                        </td>
                    })}
                </tr>
            })}
        </thead>}
        {body && <tbody>
            {body.map((item, index) => {
                return <tr key={"tr-" + index}>
                    {item.map((sub, subi) => {
                        return<td key={"td-" + index + "-" + subi}>
                            {sub}
                        </td>
                    })}
                </tr>
            })}
        </tbody>}
        {foot && <tfoot>
            {foot.map((item, index) => {
                return <tr key={"tr-" + index}>
                    {item.map((sub, subi) => {
                        return<td key={"td-" + index + "-" + subi}>
                            {sub}
                        </td>
                    })}
                </tr>
            })}
        </tfoot>}
    </table>
}