import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import useStyle from './style';
import { Box, InputLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import Select, { components } from 'react-select';
const MultiSelect = ({ label, name, options, placeholder, isMulti, isClearable, isCreatable }) => {
  const { Option } = components;
  const [field, meta] = useField(name);
  const classes = useStyle();
  const { setFieldValue } = useFormikContext();

  //handleChange method
  const handleChange = (val) => {
    if (val) {
      if (val?.value) {
        // Single select
        setFieldValue(name, val?.value);
      } else {
        // Multi select
        let values = val?.map((item) => item?.value);
        setFieldValue(name, values);
      }
    } else {
      setFieldValue(name, '');
    }
  };
  const styles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontSize: '0.813rem',
        color: '#b7b7b7'
      };
    },
    option: (provided, state) => ({
      ...provided,
      fontWeight: 'normal',
      color: state.isSelected || state.isFocused ? '#fff' : '#000',
      fontSize: '0.813rem',
      backgroundColor: state.isSelected || state.isFocused ? '#0E4394' : 'white',
      wordBreak: 'break-all',
      ':active': {
        backgroundColor: '#0E4394',
        color: 'white'
      },
      ':hover': {
        backgroundColor: '#0E4394',
        color: 'white'
      }
    }),
    control: (styles) => ({
      // should be option, not control
      ...styles,
      borderColor: '#DFDFDF',
      backgroundColor: '#f3f5f9',
      minHeight: '2.813rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#DFDFDF'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '0.813rem'
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    // Selected value parent
    multiValue: (base) => ({
      ...base,
      alignItems: 'center',
      borderRadius: '15px'
    })
    // remove Button
    // multiValueRemove: (styles) => ({})
  };

  const getSingleLabel = () => {
    return options.filter((item) => item.value === field?.value);
  };

  const getMultiLabel = () => {
    return field?.value?.map((val) => {
      return options.find((item) => item?.value === val);
    });
  };

  const IconOption = (props) => {
    const { data } = props;
    return (
      <Option {...props}>
        {data?.Image ? (
          <img
            src={data?.Image}
            style={{ height: '15px', width: '15px', borderRadius: '50%', marginRight: '10px' }}
          />
        ) : (
          ''
        )}
        {data?.label}
      </Option>
    );
  };

  return (
    <Box className={classes.fieldRow}>
      <InputLabel className={classes.inputLabel}> {label} </InputLabel>
      {isCreatable ? (
        <CreatableSelect
          defaultValue={isMulti ? getMultiLabel() : getSingleLabel()}
          className={classes.multiSelect}
          onChange={(value) => {
            handleChange(value);
          }}
          styles={styles}
          options={options}
          isMulti={isMulti}
          formatCreateLabel={(userInput) => `Add New Email:  ${userInput}`}
          isClearable={isClearable}
          name={name}
          menuPosition={'fixed'}
          placeholder={placeholder}
          components={{ Option: IconOption }}
        />
      ) : (
        <Select
          defaultValue={isMulti ? getMultiLabel() : getSingleLabel()}
          className={classes.multiSelect}
          onChange={(value) => {
            handleChange(value);
          }}
          styles={styles}
          options={options}
          isMulti={isMulti}
          isClearable={isClearable}
          name={name}
          menuPosition={'fixed'}
          placeholder={placeholder}
          components={{ Option: IconOption }}
        />
      )}
      <p className={classes.errorText}>{meta && meta.touched && meta?.error ? meta.error : ''}</p>
    </Box>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isCreatable: PropTypes.bool,
  value: PropTypes.any,
  data: PropTypes.object
};

MultiSelect.defaultProps = {
  label: '',
  placeholder: 'Select...',
  name: '',
  options: [],
  isMulti: false,
  isClearable: true,
  isCreatable: false,
  value: []
};

export default MultiSelect;
