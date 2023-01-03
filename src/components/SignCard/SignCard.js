import React from 'react';
import useStyle from './style';
import { Card, Box } from '@mui/material';
import PropTypes from 'prop-types';

const SignCard = ({ templateData }) => {
  const classes = useStyle();
  const { projectName, documentName } = templateData;
  return (
    <Card className={classes.cardMain}>
      <Box
        className={`relative pointer d_flex flex_direction_col d_flex_content_between ${classes.signContent}`}>
        <h4 className={classes.title}>{projectName}</h4>
        <h4 className={`text_center ${classes.subTitle}`}>{documentName}</h4>
      </Box>
    </Card>
  );
};
SignCard.propTypes = {
  templateData: PropTypes.object
};
export default SignCard;
