import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { MultiSelect, InputField, CommonButton } from 'components/FormControls/Index';
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/material';
import useStyle from './style';

const ShareDocument = ({ formType, validationSchema, submitForReview, usersList }) => {
  const classes = useStyle();
  const { t } = useTranslation();
  const initialValues = {
    users: [],
    message: ''
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(value) => submitForReview(value)}>
        {() => (
          <Form id={formType}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <CommonButton
                form={formType}
                endIcon={<SendIcon />}
                btnLabel={'Send'}
                type="submit"
                size="Large"
                uppercase
                className={classes.sendBtn}
              />
              <Box className={classes.usersList}>
                <MultiSelect
                  name={'users'}
                  value={initialValues?.users}
                  label={t('to')}
                  isMulti
                  isClearable={false}
                  options={usersList}
                  placeholder={t('select_users')}
                  isCreatable
                />
              </Box>
            </Box>
            <InputField
              name="message"
              label={t('message')}
              placeholder={t('please_enter_message')}
              multiline={true}
              rows={4}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
ShareDocument.propTypes = {
  initialValues: PropTypes.any,
  type: PropTypes.any,
  formType: PropTypes.any,
  validationSchema: PropTypes.any,
  submitForReview: PropTypes.any,
  usersList: PropTypes.array
};
export default ShareDocument;
