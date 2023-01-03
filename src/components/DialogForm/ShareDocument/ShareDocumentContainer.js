import React, { useState } from 'react';
import ShareDocument from './ShareDocument';
import * as Yup from 'yup';
import i18n from 'i18next';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { DocumentApi } from 'store/API/documentApi';
import AlertMessage from 'utils/AlertMessage';
const ShareDocumentContainer = ({ id, usersList, documentData, close, closeWithRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const DocumentReviewSchema = Yup.object().shape({
    users: Yup.array()
      .min(1, i18n.t('error.users_is_required'))
      .of(Yup.string().email(({ value }) => `${value} is not a valid email`)),
    // users: Yup.array().min(1, i18n.t('error.users_is_required')).required(),
    message: Yup.string()
      .max(250, 'Message has to be grater than 250 characters!')
      .required(i18n.t('error.message_is_required'))
  });

  const submitForReview = async (value) => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        DocumentApi.endpoints.sendForReviewCall.initiate({
          message: value.message,
          emailIDs: value.users,
          documentID: documentData?.documentID,
          driveItemID: documentData?.driveItemID,
          source: 'UI'
        })
      );
      if (result?.data?.status) {
        AlertMessage(result?.data?.message, 'success');
        closeWithRefresh();
      } else {
        AlertMessage('Something went wrong', 'error');
        close();
      }
      setIsLoading(false);
    } catch (error) {
      AlertMessage('Something went wrong', 'error');
      setIsLoading(false);
      close();
    }
  };

  return (
    <>
      <ShareDocument
        validationSchema={DocumentReviewSchema}
        submitForReview={submitForReview}
        formType={id}
        usersList={usersList}
      />
      {isLoading && <Loader />}
    </>
  );
};

ShareDocumentContainer.propTypes = {
  id: PropTypes.string,
  usersList: PropTypes.array,
  documentData: PropTypes.any,
  close: PropTypes.func,
  closeWithRefresh: PropTypes.func
};

export default ShareDocumentContainer;
