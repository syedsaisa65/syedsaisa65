import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import useStyles from './style';
import FileIcon from './FileIcon';

const BrowsFileButton = ({ label, setupDocument }) => {
  const classes = useStyles();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      setupDocument(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    maxFiles: 1,
    accept: {
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.doc', '.docx']
    }
  });
  return (
    <Box className={classes.fieldRow}>
      {label && (
        <InputLabel className={classes.inputLabel}> Uploading Documents {label} </InputLabel>
      )}
      <div className={classes.dragContainer} {...getRootProps()}>
        <Box className={`fileWrapper ${classes.fileWrapper}`}>
          <FileIcon />
          <input {...getInputProps()} />
          <h5 className={classes.dragTitle}>
            Drag and drop your file or{' '}
            <label className={`browsLabel ${classes.label}`}>Browse</label>
          </h5>
          <p className={classes.sizeText}>Allow only .doc or .docx file</p>
        </Box>
      </div>
    </Box>
  );
};

BrowsFileButton.propTypes = {
  label: PropTypes.string,
  setupDocument: PropTypes.func
};

export default BrowsFileButton;
