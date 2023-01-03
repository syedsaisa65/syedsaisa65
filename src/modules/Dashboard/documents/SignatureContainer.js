import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Grid, Box } from '@mui/material';
import useStyle from '../style';
import { SignCard, CustomLink, SliderContainer, NoDataFound } from 'components';

const SignatureContainer = ({ templates }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  let TemplateSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} container className={classes.templateMain}>
        <Grid item xs={12} sm={12} className={classes.flexBetween}>
          <h3 className={classes.uploadLabel}>{t('select_existing_doc_signature')}</h3>
          {templates?.length > 0 && <CustomLink to="" text={'View All'} />}
        </Grid>
        {/* Template slider */}
        <Box className={classes.templateWrap}>
          {templates?.length > 0 ? (
            <SliderContainer settings={TemplateSettings} slideArray={templates}>
              {templates?.map((template, Index) => {
                return (
                  <Box key={Index} className={classes.templateCardWrap}>
                    <SignCard templateData={template} />
                  </Box>
                );
              })}
            </SliderContainer>
          ) : (
            <NoDataFound />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
SignatureContainer.propTypes = {
  templates: PropTypes.array,
  setupDocument: PropTypes.any
};
export default SignatureContainer;
