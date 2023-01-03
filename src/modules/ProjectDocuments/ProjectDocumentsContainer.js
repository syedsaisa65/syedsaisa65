import React, { useEffect, useState } from 'react';
import ProjectDocuments from './ProjectDocuments';
import {
  useGetProjectDocumentsQuery,
  useDeleteDocumentMutation,
  DocumentApi
} from 'store/API/documentApi';
import { ButtonIcon } from 'components/FormControls/Index';
import { DialogFormContainer, ConfirmationModal, ShareDocumentModal } from 'components';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponseHandler from 'utils/ResponseHandler';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormatedDate, getRandomValue, getSharePointUrl } from 'utils';
import Loader from 'components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from 'utils/AlertMessage';
import CreateDocumentContainer from 'components/DialogForm/CreateDocument/CreateDocumentContainer';
import { useGetUsersQuery } from 'store/API/userApi';
import { HistoryIcon, ShareIcon, DeleteIcon } from 'utils/images';
import useStyle from './style';
import { useGetAllProjectDropdownQuery } from 'store/API/projectApi';

function ProjectDocumentsContainer() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [documentData, setDocumentData] = useState(null);
  const [isDeleteOpenModal, setIsDeleteOpenModal] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isOpenCreateDocumentModal, setIsOpenCreateDocumentModal] = useState(false);
  const [usersOptionIgnoreItself, setUsersOptionIgnoreItself] = useState([]);
  const [randomParamId, setRandomParamId] = useState(getRandomValue());

  const userDetail = useSelector((state) => state.userData.user);
  const classes = useStyle();
  const { data: allDropdown } = useGetAllProjectDropdownQuery();

  const {
    data,
    isLoading,
    error: errorGetProjectDocumentApi
  } = useGetProjectDocumentsQuery(
    { ProjectID: params?.id, uId: randomParamId },
    { refetchOnMountOrArgChange: true }
  );
  const [deleteDocument, { isLoading: isDeletedLoading }] = useDeleteDocumentMutation();
  const [shareDocDialogInfo, setShareDocDialogInfo] = React.useState({
    type: '',
    formType: '',
    isOpen: false,
    item: '',
    Index: ''
  });
  const { data: users } = useGetUsersQuery();

  const deleteHandler = (item) => {
    setDocumentData(item);
    setIsDeleteOpenModal(true);
  };

  useEffect(() => {
    if (users) {
      if (users?.status) {
        const usersOptionIgnore = users?.data
          ?.filter((item) => item.userID !== userDetail?.localAccountId)
          .map((item) => {
            return { label: `${item.displayName} (${item.email})`, value: item.email };
          });
        setUsersOptionIgnoreItself(usersOptionIgnore);
      }
    }
  }, [users]);

  useEffect(() => {
    if (errorGetProjectDocumentApi) {
      if (errorGetProjectDocumentApi?.status === 400) {
        AlertMessage(errorGetProjectDocumentApi.data.message, 'error');
        navigate('/dashboard');
      }
    }
  }, [errorGetProjectDocumentApi]);

  const editHandler = async (row) => {
    const docData = { Id: row?.driveItemID, documentActionUserID: row?.documentActionUserID };
    try {
      setIsEditLoading(true);
      const result = await dispatch(DocumentApi.endpoints.getDocumentEditLink.initiate(docData));
      if (result?.data?.status && result?.data?.data) {
        const url = getSharePointUrl(result?.data?.data);
        window.location.href = url;
      }
      setIsEditLoading(false);
    } catch (error) {
      setIsEditLoading(false);
    }
  };

  const closeModal = () => {
    setIsDeleteOpenModal(false);
    setIsOpenCreateDocumentModal(false);
  };

  const confirmYes = async () => {
    closeModal();
    const deleteInfo = await deleteDocument(documentData?.documentID);
    ResponseHandler(deleteInfo, closeModal);
  };

  const documentColumns = [
    {
      label: t('document_name'),
      field: 'name',
      type: 'custom',
      render: (row) => {
        return (
          <Box className={'pointer'} onClick={() => editHandler(row)}>
            <p className={classes.docName}>{row?.name}</p>
          </Box>
        );
      }
    },
    { label: t('status'), field: 'documentStatus' },
    {
      label: t('primary_author'),
      field: 'owner',
      type: 'custom',
      align: 'left',
      render: (row) => {
        return row?.owner ? row?.owner : '-';
      }
    },
    {
      label: t('time'),
      field: 'createdDate',
      type: 'custom',
      align: 'left',
      render: (row) => {
        return getFormatedDate(row.createdDate, 'hh:mm A Do MMMM YYYY');
      }
    },
    {
      label: t('actions'),
      field: 'actions',
      type: 'custom',
      align: 'left',
      render: (row) => {
        if (row.isReviewer) {
          return (
            <>
              {/* <Box component="span" m={0.5} className="inline_block">
                <ButtonIcon
                  aria-label={t('share')}
                  size={'medium'}
                  Icon={<ShareIcon fontSize="medium" />}
                  buttonClick={(e) =>
                    dialogChangeHandler(e, true, 'shareDocument-form', 'share', row)
                  }></ButtonIcon>
              </Box> */}
              <Box component="span" m={0.5} className="inline_block">
                --
              </Box>
            </>
          );
        }
        return (
          <>
            <Box component="span" m={0.5} className="inline_block">
              <ButtonIcon
                aria-label={t('edit')}
                size={'medium'}
                buttonClick={() => editHandler(row)}
                Icon={<HistoryIcon fontSize="medium" />}></ButtonIcon>
            </Box>
            {row?.isSendForReviewButton && row?.isSendForReviewButton === true && (
              <Box component="span" m={0.5} className="inline_block">
                <ButtonIcon
                  aria-label={t('share')}
                  size={'medium'}
                  Icon={<ShareIcon fontSize="medium" />}
                  buttonClick={(e) =>
                    dialogChangeHandler(e, true, 'shareDocument-form', 'share', row)
                  }></ButtonIcon>
              </Box>
            )}

            <Box component="span" m={0.5} className="inline_block">
              <ButtonIcon
                aria-label={t('delete')}
                size={'medium'}
                buttonClick={() => deleteHandler(row)}
                Icon={<DeleteIcon fontSize="medium " />}></ButtonIcon>
            </Box>
          </>
        );
      }
    }
  ];

  const dialogChangeHandler = (event, isOpen, formType, type, item = '') => {
    if (event) event.stopPropagation();
    setShareDocDialogInfo({
      isOpen,
      formType,
      type,
      item,
      Index: ''
    });
  };

  const createDocumentHandler = () => {
    setIsOpenCreateDocumentModal(true);
  };

  useEffect(() => {
    let uploadDocumentID = localStorage.getItem('UploadDocumentID');
    if (uploadDocumentID) {
      localStorage.removeItem('UploadDocumentID');
      dialogChangeHandler('', true, 'shareDocument-form', 'share', {
        driveItemID: uploadDocumentID
      });
    }
  }, []);

  return (
    <>
      <ProjectDocuments
        tableData={data?.data?.result?.documents}
        isLoading={isLoading}
        tableColumn={documentColumns}
        projectData={data?.data?.result?.project}
        createDocumentHandler={createDocumentHandler}
      />
      {/* Delete Modal */}
      {isDeleteOpenModal && (
        <DialogFormContainer
          open={isDeleteOpenModal}
          dialogSize={'xs'}
          isHeader={false}
          isFooter={true}
          isConfirmFooter={true}
          footerBtnFirstLabel={t('confirm')}
          footerBtnSecondLabel={t('cancel')}
          ConfirmYes={confirmYes}
          formType="project-form"
          close={() => closeModal()}>
          <Box className="text_center">
            <ConfirmationModal
              title={t('are_you_sure_want_to_delete')}
              descriptionFirst={`${t('document_name')}: ${documentData?.name}`}
              descriptionSecond={''}
            />
          </Box>
        </DialogFormContainer>
      )}

      {/* Document Shared Modal */}
      <DialogFormContainer
        open={shareDocDialogInfo.isOpen}
        dialogSize={'sm'}
        isHeader={true}
        isFooter={false}
        footerBtnFirstLabel={t('send_for_review')}
        footerBtnSecondLabel={t('cancel')}
        headerTitle={t('send_for_review')}
        formType="shareDocument-form"
        headerClose={true}
        close={() => dialogChangeHandler()}>
        <ShareDocumentModal
          id={'shareDocument-form'}
          usersList={usersOptionIgnoreItself}
          documentData={shareDocDialogInfo.item}
          close={() => dialogChangeHandler()}
          closeWithRefresh={() => {
            setRandomParamId(getRandomValue());
            dialogChangeHandler();
          }}
        />
      </DialogFormContainer>

      {isOpenCreateDocumentModal && (
        <DialogFormContainer
          open={isOpenCreateDocumentModal}
          dialogSize={'sm'}
          isHeader={true}
          headerTitle={t('create_document')}
          footerBtnFirstLabel={t('create_document')}
          footerBtnSecondLabel={t('cancel')}
          isFooter={true}
          formType={'document-create'}
          close={() => closeModal()}>
          <CreateDocumentContainer
            selectedProjectID={data?.data?.result?.project?.projectID}
            formType={'document-create'}
            close={() => closeModal()}
            projects={allDropdown?.data}
          />
        </DialogFormContainer>
      )}

      {(isLoading || isDeletedLoading || isEditLoading) && <Loader />}
    </>
  );
}

export default ProjectDocumentsContainer;
