import { Input } from "./input";

export function Footer({
  variant = "default",
  icon = "vercel.svg",
  orientation,
  links,
  medialinks,
}) {
  return (
    <footer
      className={`footer footer-${variant} footer-orientation-${orientation}`}
    >
      <div className={`footer-body`}>
        <div
          className={`footer-links ${
            orientation == "top" || orientation == "bottom" ? "w-full" : ""
          }`}
        >
          {links.map((data, index) => {
            return (
              <div className="footer-link" key={index}>
                {data.label}
              </div>
            );
          })}
        </div>
        <div
          className={`footer-logos ${
            orientation == "top" || orientation == "bottom" ? "w-full" : ""
          }`}
        >
          <img className="footer-app-logo" src="/vercel.svg" />
        </div>
      </div>
    </footer>
  );
}

Footer.Options = [
    {
      type: "select",
      value: "variant",
      options: [
        {
          label: "default",
          value: "default",
        },
        {
          label: "dark",
          value: "dark",
        },
      ],
    },
    {
      type: "select",
      value: "orientation",
      options: [
        {
          label: "top",
          value: "top",
        },
        {
          label: "bottom",
          value: "bottom",
        },
        {
          label: "right",
          value: "right",
        },
        {
          label: "left",
          value: "left",
        },
      ],
    },
    {
      value: "icon",
    },
  ];


