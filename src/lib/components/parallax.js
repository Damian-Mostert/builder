import { Parallax as Par, ParallaxProvider } from "react-scroll-parallax";
import { Input } from "./input";

function Parallax({ className, children }) {
  return (
    <ParallaxProvider>
      <div className={`overflow-hidden ${className}`}>
        <Par speed={-20} className="w-full h-full">
          {children}
        </Par>
      </div>
    </ParallaxProvider>
  );
}

Parallax.Options = [
  {
    value: "className",
  },
];

Parallax.canAppend = true;

export { Parallax };
