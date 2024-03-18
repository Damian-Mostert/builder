export function Heading({text,...props}){
    return <h1 {...props}>
        {text}
    </h1>
}

Heading.Options = function Options(){

}

Heading.canAppend = false;