import React from "react";
import { Carousel } from "antd";

const prev = (carousel: any) => {
  carousel.current.prev();
},
  next = (carousel: any) => {
    carousel.current.next();
  };

const Slider: React.FunctionComponent = () => {
  const inputElement = React.useRef<Carousel>(null),
    props = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  return (
    <div>
      <button type="button" onClick={() => prev(inputElement)}>Prev</button>
      <Carousel ref={inputElement} {...props}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel>
      <button type="button" onClick={() => next(inputElement)}>next</button>
    </div>
  );
}

export default Slider;