import React from 'react';
import PropTypes from 'prop-types';
import { Card, Box } from '@mui/material';
import { PlaceholderImg } from 'utils/images';
import useStyle from './style';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { CommonButton } from 'components/FormControls/Index';
/* eslint-disable */

const TemplateCard = ({
  templateTitle,
  image,
  zoomClick,
  copyClick,
  isCopy,
  isEdit,
  editClick,
  isEmpty,
  generateThumbClick
}) => {
  const classes = useStyle();
  return (
    <>
      <Card className={classes.cardMain}>
        <Box className={`relative pointer ${classes.cardContent}`}>
          {isEmpty ? (
            <Box className={`d_flex d_flex_align d_flex_content_center ${classes.emptyCard}`}>
              <img src={PlaceholderImg} alt="document image" width={'50'} height="50" />
              <CommonButton
                className={`generateBtn pointer`}
                btnLabel={'Generate'}
                onClick={generateThumbClick}
                size={'small'}></CommonButton>
            </Box>
          ) : (
            <>
              <Box>{image && <img src={image} alt="document image" height="200" />}</Box>
              <h4 className={classes.title}>{templateTitle}</h4>
              {isCopy && (
                <ContentCopyIcon
                  fontSize="small"
                  className={`copyTemplate pointer`}
                  onClick={copyClick}
                />
              )}
              {isEdit && (
                <EditRoundedIcon
                  fontSize="small"
                  className={`copyTemplate pointer`}
                  onClick={editClick}
                />
              )}
              <ZoomInIcon
                className={`zoomIcon pointer ${classes.zoomIcon}`}
                onClick={() => zoomClick()}
              />
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

TemplateCard.propTypes = {
  templateTitle: PropTypes.string,
  image: PropTypes.string,
  zoomClick: PropTypes.func,
  copyClick: PropTypes.func,
  editClick: PropTypes.func,
  generateThumbClick: PropTypes.func,
  isCopy: PropTypes.bool
};
export default TemplateCard;
