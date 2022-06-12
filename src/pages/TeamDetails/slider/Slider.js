import SliderItem from "./SliderItem";
import Carousel from "better-react-carousel";
import classes from "./Slider.module.css";

const Slider = (props) => {
  return (
    <div className={classes.wholeCarousel}>
      <Carousel
        cols={4}
        rows={1}
        gap={10}
        autoPlay={500}
        loop={true}
        mobileBreakpoint={0}
        responsiveLayout={[{ breakpoint: 1000, cols: 2 }]}
      >
        {props.players.map((player) => {
          return (
            <Carousel.Item key={`slide${player.id}`}>
              <SliderItem player={player} season={props.season} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slider;
