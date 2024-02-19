import { useState } from "react";
import {Button} from "./button";
import {Input} from "./input";

export function Form({
    className = "",
    title = "",
    variant = "default",
    inputs = [],
    toggle = false,
    submitButton = {
        label: "submit",
        variant: "default"
    },
    onSubmit = () => { },
    ...props
}) {

    const [submited, setSubmitted] = useState(false)

    const [busy, setBusy] = useState(false);

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
                setSubmitted(await onSubmit(values));
            }
            setBusy(false);
        }
    };

    return <form onSubmit={handleSubmit} className={`form form-variant-${variant} ${className}`} {...props}>
        <h2>{title}</h2>
        {inputs.map((item, index) => {
            return <Input key={index} {...item} />
        })}
        <Button {...submitButton} />
    </form>
}