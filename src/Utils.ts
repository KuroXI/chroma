export const BackdropParser = (path: string = "") : string => {
  return "https://images.justwatch.com" + path.replace("{profile}", "s1440");
}

export const PosterParser = (path: string = "") : string => {
  return "https://images.justwatch.com" + path.replace("{profile}", "s166");
}

export const SliderSettings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 100,
  centerPadding: '1px',
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 5,
      }
    }, {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      }
    }, {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
      }
    }, {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      }
    }, {
      breakpoint: 0,
      settings: {
        slidesToShow: 2,
      }
    }
  ],
}