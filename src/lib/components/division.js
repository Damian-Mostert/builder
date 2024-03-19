function Division({ children, ...props }) {
    return <div {...props}>
        {children}
    </div>
}

Division.Options = [
    {
        label:"class",
        value:"className",
    }
];

Division.canAppend = true;

export { Division };