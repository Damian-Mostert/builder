function Division({ children,functions,links,medialinks,className, ...props }) {
    return <div {...props} className={className}>
        {children}
    </div>
}

Division.Options = [
    {
        value:"className",
    }
];

Division.canAppend = true;

export { Division };