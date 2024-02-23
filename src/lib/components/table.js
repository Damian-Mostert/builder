"use client";

function Table({
    head, body, foot, variant = "default", className = "", ...props
}) {
    return <table className={`table-component table-component-variant-${variant} ${className}`} {...props}>
        {head && <thead>
            {head.map((item, index) => {
                return <tr key={"tr-" + index}>
                    {item.map((sub, subi) => {
                        return <td key={"td-" + index + "-" + subi}>
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
                        return <td key={"td-" + index + "-" + subi}>
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
                        return <td key={"td-" + index + "-" + subi}>
                            {sub}
                        </td>
                    })}
                </tr>
            })}
        </tfoot>}
    </table>
}

Table.Options = function Options({ update, data }) {
    return <div className='p-2'>
        <div className='w-[300px] m-auto'>
            <Input label="variant" value={data.variant}
                type="select"
                options={[
                    {
                        label: "default",
                        value: "default"
                    }
                ]}
                onChange={variant => {
                    update({
                        ...data,
                        variant
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="class" value={data.className}
                onChange={className => {
                    update({
                        ...data,
                        className
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input label="value" value={data.label} onChange={value => {
                update({
                    ...data,
                    value
                })
            }} />
        </div>
    </div>
}

export { Table };