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
  buttonvariant = "default",
  buttonlabel = "submit",
  onSubmit = () => {},
  functionToCall,
  functions,
  ...props
}) {
  const [submited, setSubmitted] = useState(false);

  const [busy, setBusy] = useState(false);

  const refs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const inputs = children.props.children.map((item, index) => {
    return {
      ...item.props.__props,
      ref: refs[index],
    };
  });

  const handleSubmit = async (ev) => {
    if (!busy) {
      ev.preventDefault();
      setBusy(true);
      var valid = true;
      let values = inputs.map((input) => {
        const validation = input.ref.current.validate();
        if (valid) valid = validation;
        return input.ref.current.value;
      });
      if (valid) {
        setSubmitted(
          functionToCall
            ? await functions[functionToCall](inputs)
            : await onSubmit(values)
        );
      }
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form form-variant-${variant} ${className}`}
      {...props}
    >
      <h2>{title}</h2>
      {inputs.map((item, index) => {
        return <Input key={index} {...item} />;
      })}
      <Button
        label={buttonlabel}
        variant={buttonvariant}
        className="mt-4 mx-auto"
      />
    </form>
  );
}

Form.Options = [
  {
    type: "select",
    value: "variant",
    options: [
      {
        label: "white-bg",
        value: "white-bg",
      },
      {
        label: "black-bg",
        value: "black-bg",
      },
    ],
  },
  {
    type: "select",
    value: "button",
    options: [
      {
        label: "default",
        value: "default",
      },
      {
        label: "light",
        value: "light",
      },
    ],
  },
  {
    value: "title",
  },
  {
    value: "buttonlabel",
  },
  {
    value: "className",
  },
  {
    value: "functionToCall",
    type: "select",
    options: "functions",
  },
];

Form.canAppend = ["ShowOnMd", "ShowOnLg", "ShowState", "InputElement"];

function InputElement(props) {
  return {
    ...props,
  };
}

InputElement.Options = Input.Options;

export { Form, InputElement };
