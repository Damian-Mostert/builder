import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Input } from "./input";

function Slider({ variant, children, ...props }) {
    return <div className={`slider-${variant}`}>
        <Slick {...props}>
            {children.props.children}
        </Slick>
    </div>
}

Slider.Options = function Options({ update, data }) {
    return <div className='py-2 flex flex-wrap'>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="infinite" type="select" value={data.infinite} size="full" options={[
                {
                    label: "Yes",
                    value: true,
                },
                {
                    label: "No",
                    value: false,
                }
            ]} onChange={infinite => {
                update({
                    ...data,
                    infinite: infinite == "true" ? true : false
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="dots" type="select" value={data.dots} size="full" options={[
                {
                    label: "Yes",
                    value: true,
                },
                {
                    label: "No",
                    value: false,
                }
            ]} onChange={dots => {
                update({
                    ...data,
                    dots: dots == "true" ? true : false
                })
            }} />
        </div>
        <div className='w-[300px] m-auto'>
            <Input variant="builder" label="arrows" type="select" value={data.arrows} size="full" options={[
                {
                    label: "Yes",
                    value: true,
                },
                {
                    label: "No",
                    value: false,
                }
            ]} onChange={arrows => {
                update({
                    ...data,
                    arrows: arrows == "true" ? true : false
                })
            }} />
        </div>

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

Slider.canAppend = [
    "Division"
];

export { Slider };