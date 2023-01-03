import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputLabel, TextField, Box } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import useStyles from './style';
import InputAdornment from '@mui/material/InputAdornment';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
/* eslint-disable */
const AddItemInput = ({
  name,
  label,
  multiline,
  rows,
  Required,
  tooltip,
  tooltipMessage,
  btnLabel,
  addItem,
  ...rest
}) => {
  const classes = useStyles();
  const [field, meta] = useField(name);
  const [textValue, setTextValue] = useState('');
  const [itemArray, setItemArray] = useState(field?.value);
  const { setFieldValue } = useFormikContext();
  const configTextField = {
    ...field,
    ...rest,
    size: 'small',
    multiline: multiline,
    rows: rows,
    className: classes.textField
  };
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  //handleChange method
  const handleChange = (e) => {
    const { value } = e?.target;
    setTextValue(value);
  };

  const addItemClick = () => {
    if (textValue) {
      setItemArray([...itemArray, textValue]);
      setFieldValue(name, [...itemArray, textValue]);
      setTextValue('');
      forceUpdate();
    }
  };

  const handleDelete = (e, item) => {
    let allArray = [...itemArray];
    const index = allArray.indexOf(item);
    if (index > -1) {
      allArray.splice(index, 1);
    }
    setItemArray(allArray);
    setFieldValue(name, allArray);
    forceUpdate();
  };

  return (
    <>
      <div className={classes.fieldRow}>
        {label && <InputLabel className={classes.inputLabel}> {label} </InputLabel>}
        <Box className={`d_flex ${classes.itemRow}`}>
          <TextField
            {...rest}
            autoComplete="Off"
            className={classes.textField}
            FormHelperTextProps={{
              classes: {
                root: classes.helperText
              }
            }}
            value={textValue}
            InputProps={{
              classes: { input: multiline ? classes.textArea : classes.input },
              endAdornment: tooltip && (
                <Tooltip title={tooltipMessage} placement="top-end">
                  <InputAdornment position="end">
                    <HelpOutlineOutlinedIcon fontSize="small" />
                  </InputAdornment>
                </Tooltip>
              )
            }}
            fullWidth
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <Box className={`pointer ${classes.addItem}`} onClick={addItemClick}>
            {btnLabel}
          </Box>
        </Box>
        <Box className={classes.errorText}>{configTextField.helperText}</Box>
      </div>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {itemArray?.map((item, index) => {
          return (
            <Chip
              label={item}
              key={index}
              onDelete={(e) => handleDelete(e, item)}
              className={classes.chipItem}
            />
          );
        })}
      </Stack>
    </>
  );
};

AddItemInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  Required: PropTypes.bool,
  tooltip: PropTypes.bool,
  rest: PropTypes.object,
  variant: PropTypes.string,
  tooltipMessage: PropTypes.string,
  addItem: PropTypes.func
};

AddItemInput.defaultProps = {
  name: '',
  label: '',
  multiline: false,
  Required: false,
  tooltip: false,
  rows: 1,
  rest: {},
  variant: 'outlined',
  tooltipMessage: '',
  btnLabel: ''
};

export default AddItemInput;
