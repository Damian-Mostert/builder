import { Input } from "./input";

function List({ children, variant = "default", className = "", ...props }) {
  return (
    <ul className={`list list-variant-${variant} ${className}`} {...props}>
      {children}
    </ul>
  );
}

List.Options = [
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
    value: "className",
  },
];

List.canAppend = ["ShowOnMd", "ShowOnLg", "ShowState", "ListItem"];

function ListItem({ text, ...props }) {
  return <li {...props}>{text}</li>;
}

ListItem.Options = function Options({ update, data }) {
  return (
    <div className="p-2">
      <div className="w-[300px] m-auto">
        <Input
          label="class"
          value={data.className}
          onChange={(className) => {
            update({
              ...data,
              className,
            });
          }}
        />
      </div>
      <div className="w-[300px] m-auto">
        <Input
          label="text"
          value={data.text}
          onChange={(text) => {
            update({
              ...data,
              text,
            });
          }}
        />
      </div>
    </div>
  );
};

export { List, ListItem };
