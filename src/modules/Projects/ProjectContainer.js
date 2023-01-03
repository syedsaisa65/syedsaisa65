import React, { useState } from 'react';
import Projects from './Project';
import { useDeleteProjectMutation } from 'store/API/projectApi';
import { useGetUsersQuery } from 'store/API/userApi';
import { DialogFormContainer, ConfirmationModal, Loader } from 'components';
import CreateProjectContainer from 'components/DialogForm/CreateProject/CreateProjectContainer';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ResponseHandler from 'utils/ResponseHandler';
import { DocumentApi } from 'store/API/documentApi';
import { useDispatch } from 'react-redux';
import useInfiniteScroll from 'hooks/InfiniteScroll/InfiniteScroll';
import { getSharePointUrl } from 'utils';
const ProjectContainer = () => {
  const { t } = useTranslation();
  const { combinedData, readMore, refresh, isLoading, isFetching, remoteTotal } = useInfiniteScroll(
    'getInfiniteProjectList',
    {}
  );

  const [deleteProject, { isLoading: deleteLoading }] = useDeleteProjectMutation();
  const dispatch = useDispatch();
  const defaultValues = {
    name: '',
    owners: [],
    counterParties1List: [],
    counterParties2List: [],
    estimatedCompletionDate: null,
    description: '',
    source: 'UI'
  };
  const [projectData, setProjectData] = useState(defaultValues);
  const { data: users } = useGetUsersQuery();
  const [createProjectDialogInfo, setCreateProjectDialogInfo] = React.useState({
    type: '',
    formType: '',
    isOpen: false,
    item: '',
    index: ''
  });

  const dialogChangeHandler = (event, isOpen, formType, type, item = '', index = '') => {
    if (event) event.stopPropagation();
    if (item) {
      setProjectData({
        name: item?.name,
        projectID: item?.projectID,
        owners: item?.ownersList,
        counterParties1List: item?.counterParties1List,
        counterParties2List: item?.counterParties2List,
        estimatedCompletionDate: item?.estimatedCompletionDate,
        description: item?.description
      });
    } else {
      setProjectData(defaultValues);
    }
    setCreateProjectDialogInfo({
      isOpen,
      formType,
      type,
      item,
      index
    });
  };

  const CloseModal = (event) => {
    dialogChangeHandler(event, false);
  };

  const ConfirmYes = async () => {
    const deleteInfo = await deleteProject(projectData?.projectID);
    if (deleteInfo?.data && deleteInfo?.data?.status) {
      setDefaultPagination();
    }
    ResponseHandler(deleteInfo, CloseModal);
  };

  const [isLinkClickLoading, setIsLinkClickLoading] = useState(false);
  const documentLinkClick = async (e, Id, documentActionUserID) => {
    e.stopPropagation();
    setIsLinkClickLoading(true);
    try {
      const docData = { Id, documentActionUserID };
      const result = await dispatch(DocumentApi.endpoints.getDocumentEditLink.initiate(docData));
      if (result?.data?.status && result?.data?.data) {
        const url = getSharePointUrl(result?.data?.data);
        window.location.href = url;
      }
      setIsLinkClickLoading(false);
    } catch (error) {
      setIsLinkClickLoading(false);
    }
  };

  const setPagination = () => {
    readMore();
  };

  const setDefaultPagination = () => {
    refresh();
  };

  return (
    <>
      <Projects
        totalCount={remoteTotal}
        setPageData={setPagination}
        allData={combinedData}
        isLoading={isLoading}
        isFetching={isFetching}
        actionClick={dialogChangeHandler}
        formType={'project-form'}
        docLinkClick={documentLinkClick}
      />

      {/* Create and Edit Modal */}
      {createProjectDialogInfo.isOpen && createProjectDialogInfo.type !== 'delete' && (
        <DialogFormContainer
          open={createProjectDialogInfo.isOpen}
          dialogSize={'sm'}
          isHeader={true}
          headerTitle={
            createProjectDialogInfo.type === 'edit' ? t('edit_project') : t('create_new_project')
          }
          footerBtnFirstLabel={
            createProjectDialogInfo.type === 'edit' ? t('update_project') : t('create_project')
          }
          footerBtnSecondLabel={t('cancel')}
          isFooter={true}
          formType="project-form"
          close={CloseModal}>
          <CreateProjectContainer
            initialValues={projectData}
            formType="project-form"
            type={createProjectDialogInfo.type}
            id={'project-form'}
            close={CloseModal}
            users={users?.data}
            setDefaultPagination={setDefaultPagination}
          />
        </DialogFormContainer>
      )}

      {/* Delete Modal */}
      {createProjectDialogInfo.isOpen &&
        createProjectDialogInfo.type === 'delete' &&
        deleteLoading === false && (
          <DialogFormContainer
            open={createProjectDialogInfo.isOpen}
            dialogSize={'xs'}
            isHeader={false}
            isFooter={true}
            isConfirmFooter={true}
            footerBtnFirstLabel={t('confirm')}
            footerBtnSecondLabel={t('cancel')}
            ConfirmYes={ConfirmYes}
            formType="project-form"
            close={(e) => dialogChangeHandler(e, false, '')}>
            <Box className="text_center">
              <ConfirmationModal
                title={t('are_you_sure_want_to_delete')}
                descriptionFirst={`Project Name: ${projectData?.name}`}
                descriptionSecond={''}
              />
            </Box>
          </DialogFormContainer>
        )}

      {(isLinkClickLoading || deleteLoading) && <Loader />}
    </>
  );
};

export default ProjectContainer;
