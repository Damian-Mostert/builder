import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Input } from "./input";

function Slider({ variant, children, ...props }) {
  return (
    <div className={`slider-${variant}`}>
      <Slick {...props}>
        {children.props.children}
      </Slick>
    </div>
  );
}

Slider.Options = [
  {
    type:"select-boolean",
    value:"infinite",
    options:[
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]
  },

  {
    type:"select-boolean",
    value:"dots",
    options:[
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]
  },
  {
    type:"select-boolean",
    value:"arrows",
    options:[
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]
  },
  {
    type:"select-boolean",
    value:"autoplay",
    options:[
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]
  },
  {
    value:"autoplaySpeed"
  },
  {
    value:"speed"
  },
  {
    value:"className"
  }

]


Slider.canAppend = ["ShowOnMd", "ShowOnLg", "ShowState", "Division"];

export { Slider };
