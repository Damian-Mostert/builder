
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const Input = forwardRef(function Input({
    variant = "default",
    value = "",
    type = "text",
    label = false,
    require = false,
    errorMessage = "This input is required.",
    size = "full",
    className = "",
    ...props
}, ref) {

    const [cacheValue, setCacheValue] = useState(value);

    const [Value, setValue] = useState(value);

    const [error, setError] = useState(null);

    function validate() {
        if (require) {
            switch (type) {
                case "text": case "name": case "textarea":
                    if (Value.length) return true;
                    setError(errorMessage);
                    return false;
                case "email":
                    if (Value.match()) return true;
                    setError(errorMessage);
                    return false;

            }
        }
        return true;
    }

    useImperativeHandle(ref, function () {
        return {
            value: Value,
            setValue: setValue,
            validate: validate,
        }
    });

    const handleBlur = () => setValue("" + cacheValue);

    const handleInstantChange = (ev) => setValue(ev.target.value);

    const handleFocus = () => setError(null);

    const handleChange = ev => setCacheValue(ev.target.value);

    return <div className={`input-container input-variant-${variant} input-type-${type} input-size-${size} ${className}`} {...props}>
        {function () {
            switch (type) {
                case "text": case "name": case "email": case "date": case "password":
                    return <>
                        {label && <label className="label">{label}</label>}
                        <input className="input" ref={ref} value={cacheValue} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} />
                        {error && <div className="input-error">{error}</div>}
                    </>
                case "select":
                    return <>
                        {label && <label className="label">{label}</label>}
                        <select value={Value} onChange={handleInstantChange}>
                            {props.options && props.options.map((item, index) => {
                                return <option key={index} value={item.value}>{item.label}</option>
                            })}
                        </select>
                        {error && <div className="input-error">{error}</div>}
                    </>
                case "file":
                    return <>
                    </>
                case "image":
                    return <>
                    </>
                case "hex":
                    return <>
                    </>
            }
        }()}
    </div>

})

export { Input };