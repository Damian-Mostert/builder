import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const Input = forwardRef(function Input(
  {
    variant = "default",
    value = "",
    type = "text",
    label = false,
    require = false,
    errorMessage = "This input is required.",
    size = "full",
    className = "",
    onChange = () => {},
    ref = useRef(),
    functionToCall,
    functions = {},
    ...props
  },
  Ref
) {
  const [Value, setValue] = useState(value);

  const [error, setError] = useState(null);

  function validate() {
    if (require) {
      switch (type) {
        case "text":
        case "name":
        case "textarea":
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

  useImperativeHandle(Ref, function () {
    return {
      value: Value,
      setValue: setValue,
      validate: validate,
    };
  });

  const handleInstantChange = (ev) => {
    setValue(ev.target.value);
    onChange(ev.target.value);
    functionToCall && functions[functionToCall](ev.target.value)
  };

  return (
    <div
      className={`input-container input-variant-${variant} input-type-${type} input-size-${size} ${className}`}
      {...props}
    >
      {(function () {
        switch (type) {
          case "text":
          case "name":
          case "email":
          case "date":
          case "password":
            return (
              <>
                {label && <label className="label">{label}</label>}
                <input
                  className="input"
                  value={Value}
                  onChange={handleInstantChange}
                />
                {error && <div className="input-error">{error}</div>}
              </>
            );
          case "select":
            return (
              <>
                {label && <label className="label">{label}</label>}
                <select value={Value} onChange={handleInstantChange}>
                  <option value={-1}>Please select a item</option>
                  {props.options &&
                    props.options.map((item, index) => {
                      return (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
                {error && <div className="input-error">{error}</div>}
              </>
            );
          case "file":
            return <></>;
          case "image":
            return <></>;
          case "hex":
            return <></>;
        }
      })()}
    </div>
  );
});
Input.Options = [
  {
    type: "select",
    value: "variant",
    options: [
      {
        label: "default",
        value: "default",
      },
    ],
  },
  {
    type: "select-boolean",
    value: "required",
    options: [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ],
  },
  {
    value: "className",
  },
  {
    value: "value",
  },
  {
    value: "label",
  },
  {
    value: "functionToCall",
    type:"select",
    options:"functions"
  },
];

Input.canAppend = false;

export { Input };
