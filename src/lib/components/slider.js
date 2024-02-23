import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Slider({ variant, children }) {



    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return <div className={`slider-${variant}`}>
        <Slick {...settings}>
            {children.props.children}
        </Slick>
    </div>
}

Slider.Options = function Options() {
    return
}

Slider.canAppend = [
    "Division"
];

export { Slider };