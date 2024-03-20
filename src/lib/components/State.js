import { useEffect, useState } from "react";

export const setState = (id, value) => {
  window.States[id].setValue(value);
};

export const getState = (id) => window?.States[id]?.value;

export function State({ children, id, val }) {
  const [value, setValue] = useState(val);

  useEffect(() => {
    if (!window.States)
      window.States = {
        onUpdateListener(fun) {
          window.States.updateListeners.push(fun);
        },
        updateListeners: [],
      };
      
    if (window.States[id]) {
      window.States[id].value = value;
    } else {
      window.States[id] = {
        value,
        setValue,
      };
      console.log(window.States[id])
    }
    window.States.updateListeners.map((fun) => fun());
  }, [value]);

  useEffect(() => {
    setValue(val);
  }, [val]);

  return <>{value && children}</>;
}
State.canAppend = true;
State.Options = [
  {
    value: "id",
  },
  {
    type: "select-boolean",
    value: "val",
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
    value: "val",
  },
];
