import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import useStyle from './style';
const SliderContainer = ({ settings, children }) => {
  const classes = useStyle();
  return (
    <Slider
      {...settings}
      className={`sliderMain ${classes.customSlider} ${settings.dots ? 'dotSLider' : ''}`}>
      {children}
    </Slider>
  );
};

SliderContainer.propTypes = {
  settings: PropTypes.object,
  children: PropTypes.any
};

export default SliderContainer;
