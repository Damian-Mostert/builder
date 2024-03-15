import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { useRef } from "react";

function Form({
    className = "",
    title = "",
    variant = "default",
    children = [],
    toggle = false,
    submitButton = {
        label: "submit",
        variant: "default"
    },
    onSubmit = () => { },
    functionToCall,
    functions,
    ...props
}) {

    const [submited, setSubmitted] = useState(false)

    const [busy, setBusy] = useState(false);

    const refs = [
        useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(), useRef(),
    ];

    const inputs = children.props.children.map((item, index) => {
        return {
            ...item.props.__props,
            ref: refs[index]
        }
    });

    const handleSubmit = async ev => {
        if (!busy) {
            ev.preventDefault();
            setBusy(true);
            var valid = true;
            let values = inputs.map(input => {
                const validation = input.ref.current.validate();
                if (valid) valid = validation;
                return input.ref.current.value;
            });
            if (valid) {
                setSubmitted(functionToCall ? await functions[functionToCall](inputs) : await onSubmit(values));
            }
            setBusy(false);
        }
    };

    return <form onSubmit={handleSubmit} className={`form form-variant-${variant} ${className}`} {...props}>
        <h2>{title}</h2>
        {inputs.map((item, index) => {
            return <Input key={index} {...item} />
        })}
        <Button {...submitButton} className="mt-4 mx-auto" />
    </form>
}

Form.Options = function Options({ update, data, functions }) {
    return <div className='p-2'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="variant" value={data.variant}
                type="select"
                options={[
                    {
                        label: "white-bg",
                        value: "white-bg"
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
            <Input variant="builder" label="title" value={data.title}
                onChange={title => {
                    update({
                        ...data,
                        title
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className}
                onChange={className => {
                    update({
                        ...data,
                        className
                    })
                }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="function to call" value={data.functionToCall}
                type="select"
                options={Object.keys(functions).map(item => {
                    return {
                        label: item,
                        value: item
                    }
                })}
                onChange={functionToCall => {
                    update({
                        ...data,
                        functionToCall
                    })
                }} />
        </div>
    </div>
}

Form.canAppend = [
"ShowOnMd",
"ShowOnLg",
    "ShowState",
    "InputElement"
];

function InputElement(props) {
    return {
        ...props,
    }
}

InputElement.Options = Input.Options;

export { Form, InputElement };