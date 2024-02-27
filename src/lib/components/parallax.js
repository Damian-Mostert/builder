import { Parallax as Par, ParallaxProvider } from "react-scroll-parallax";
import { Input } from "./input";


function Parallax({ className, children }) {
    return <ParallaxProvider>
        <div className={`overflow-hidden ${className}`}>
            <Par speed={-20} className="w-full h-full">
                {children}
            </Par>
        </div>
    </ParallaxProvider>
};

Parallax.Options = function Options({ update, data }) {
    return <div className='py-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="class" value={data.className} onChange={className => {
                update({
                    ...data,
                    className
                })
            }} />
        </div>
    </div>
}

Parallax.canAppend = [
    "Division",
    "TextBox",
    "Image",
    "Video",
    "Layout",
    "Section",
    "Form",
    "Input",
    "Button",
    "Nav",
    "Accordion",
    "List",
    "Slider",
];

export { Parallax };