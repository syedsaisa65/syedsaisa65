import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { DialogFormContainer, Loader } from 'components';
import CreateProjectContainer from 'components/DialogForm/CreateProject/CreateProjectContainer';
import CreateDocumentContainer from 'components/DialogForm/CreateDocument/CreateDocumentContainer';
import { useGetAllProjectQuery, useGetAllProjectDropdownQuery } from 'store/API/projectApi';
import { useGetUsersQuery } from 'store/API/userApi';
import { useTranslation } from 'react-i18next';
import { DocumentApi } from 'store/API/documentApi';
import { useDispatch } from 'react-redux';
import ResponseHandler from 'utils/ResponseHandler';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSharePointUrl } from 'utils';
import AlertMessage from 'utils/AlertMessage';

const DashboardContainer = () => {
  const PAGE = 1;
  const LIMIT = 10;
  const [pageData] = useState({
    limit: LIMIT,
    pagNum: PAGE
  });
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetAllProjectQuery(pageData);
  const { data: allDropdown } = useGetAllProjectDropdownQuery();
  const { data: users } = useGetUsersQuery();
  const [uploadDocumentData, setUploadDocumentData] = useState(null);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const { t } = useTranslation();
  const [createProjectDialogInfo, setCreateProjectDialogInfo] = React.useState({
    type: '',
    isOpen: false,
    id: ''
  });

  useEffect(() => {
    if (error) ResponseHandler(error?.data);
  }, [error]);

  useEffect(() => {
    let referralUrl = localStorage.getItem('referralUrl');
    if (referralUrl) {
      localStorage.removeItem('referralUrl');
      navigate(referralUrl);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('state')) {
      AlertMessage('Your document has been sign successfully.', 'success');
      navigate('/dashboard', { replace: true });
    }
  }, []);

  const defaultValues = {
    name: '',
    owners: [],
    counterParties1List: [],
    counterParties2List: [],
    description: '',
    estimatedCompletionDate: null,
    projectId: '',
    source: 'UI'
  };
  const [projectData] = useState(defaultValues);
  const dialogChangeHandler = (isOpen, formType, type, id = '') => {
    setCreateProjectDialogInfo({
      isOpen,
      formType,
      type,
      id
    });
  };
  // Doc Link Click
  const [isLinkClickLoading, setIsLinkClickLoading] = useState(false);
  const documentLinkClick = async (e, Id, documentActionUserID) => {
    e.stopPropagation();
    try {
      setIsLinkClickLoading(true);
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

  return (
    <>
      <Dashboard
        projectRows={data?.data?.result}
        setupDocument={(fileData) => {
          setUploadDocumentData(fileData);
          dialogChangeHandler(true, 'document-project', 'create');
        }}
        isPagination={false}
        showViewAll={true}
        isLoading={isLoading}
        projectFormType={'project-form'}
        createProject={dialogChangeHandler}
        docLinkClick={documentLinkClick}
        setupNegotiation={(fileData) => {
          setUploadDocumentData(fileData);
          dialogChangeHandler(true, 'negotiation-project', 'create');
        }}
      />
      {/* Create Project Modal Form */}
      {createProjectDialogInfo.isOpen && createProjectDialogInfo.formType === 'project-form' && (
        <DialogFormContainer
          open={createProjectDialogInfo.isOpen}
          dialogSize={'sm'}
          isHeader={true}
          headerTitle={t('new_project')}
          footerBtnFirstLabel={t('create_project')}
          footerBtnSecondLabel={t('cancel')}
          isFooter={true}
          close={() => dialogChangeHandler(false, '')}
          formType={createProjectDialogInfo.formType}>
          <CreateProjectContainer
            initialValues={projectData}
            type={createProjectDialogInfo.type}
            id={createProjectDialogInfo.id}
            close={() => dialogChangeHandler(false, '')}
            formType={createProjectDialogInfo?.formType}
            users={users?.data}
          />
        </DialogFormContainer>
      )}

      {/* Create Document Modal Form */}
      {createProjectDialogInfo.isOpen &&
        (createProjectDialogInfo.formType === 'document-project' ||
          createProjectDialogInfo.formType === 'negotiation-project') && (
          <DialogFormContainer
            open={createProjectDialogInfo.isOpen}
            dialogSize={'sm'}
            isHeader={true}
            headerTitle={t('new_document')}
            footerBtnFirstLabel={t('create_document')}
            footerBtnSecondLabel={t('cancel')}
            isFooter={true}
            close={() => dialogChangeHandler(false, '')}
            formType={createProjectDialogInfo.formType}>
            <CreateDocumentContainer
              projects={allDropdown?.data}
              formType={createProjectDialogInfo.formType}
              uploadDocumentData={uploadDocumentData}
              close={() => dialogChangeHandler(false, '')}
            />
          </DialogFormContainer>
        )}

      {isLinkClickLoading && <Loader />}
    </>
  );
};

export default DashboardContainer;
