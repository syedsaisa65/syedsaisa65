/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Box } from '@mui/material';
import useStyle from './style';
import { getFormatedDate } from 'utils';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const ShareDocumentInfoCard = ({ historyInfo, docLinkClick, documentZoomClick }) => {
  const classes = useStyle();
  let pdfArrayList = [];
  if (historyInfo?.pdfurl) {
    pdfArrayList = historyInfo?.pdfurl.split(';');
  }

  return (
    <Card className={classes.cardMain}>
      <Box
        className={`relative pointer d_flex flex_direction_col d_flex_content_between ${classes.cardContent}`}>
        {historyInfo?.originalDriveItemID && (
          <ZoomInIcon
            className={`zoomIcon pointer ${classes.zoomIcon}`}
            onClick={(e) =>
              documentZoomClick(e, {
                itemID: historyInfo?.originalDriveItemID,
                documentActionUserID: historyInfo?.documentActionUserID,
                isOriginalItem: true
              })
            }
          />
        )}
        <Box className={'actionButtons'}>
          {historyInfo?.driveItemID && historyInfo?.documentActionUserID !== 0 && (
            <EditRoundedIcon
              fontSize="small"
              className={`pointer`}
              sx={{ mr: 1 }}
              onClick={(e) =>
                docLinkClick(e, historyInfo?.driveItemID, historyInfo?.documentActionUserID)
              }
            />
          )}

          {pdfArrayList?.map((item) => {
            return (
              <a target={'_blank'} href={item} download rel="noreferrer">
                <PictureAsPdfIcon fontSize="small" className={`pointer`} />
              </a>
            );
          })}
        </Box>
        <Box className={classes.descriptionContainer}>
          {historyInfo?.message && <p className={classes.subtitle}>{historyInfo.message}</p>}
        </Box>
        <Box>
          <p className={classes.activityLabel}>{historyInfo.activityLabel}</p>
          <h5 className={classes.blankTitle}>{historyInfo.userDisplayName}</h5>
          <h5 className={classes.dateTimeParagraph}>
            {getFormatedDate(historyInfo.activityDate, 'MMMM Do YYYY, hh:mm A')}
          </h5>
        </Box>
      </Box>
    </Card>
  );
};

ShareDocumentInfoCard.propTypes = {
  historyInfo: PropTypes.any,
  docLinkClick: PropTypes.any,
  documentZoomClick: PropTypes.any
};
export default ShareDocumentInfoCard;
