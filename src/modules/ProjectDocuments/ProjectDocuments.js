import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import useStyle from './style';
import DocumentListTable from 'components/DocumentListTable/DocumentListTable';
import ProjectDocumentTop from './ProjectDocumentTop/ProjectDocumentTop';
import { CommonButton } from 'components/FormControls/Index';
import { useTranslation } from 'react-i18next';
import { DocumentApi } from 'store/API/documentApi';
import { useDispatch } from 'react-redux';
import { Loader, DialogFormContainer, ZoomDocumentModal, CustomContainer } from 'components';
import { getSharePointUrl } from 'utils';

const ProjectDocuments = ({
  isLoading,
  tableData,
  tableColumn,
  projectData,
  createDocumentHandler
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyle();

  const [isRequestLoading, setRequestLoading] = useState(false);
  const [zoomdocument, setZoomdocument] = useState(false);
  const [zoomdata, setZoomData] = useState('');

  if (isLoading === true || !projectData) {
    return null;
  }

  const documentLinkClick = async (e, Id, documentActionUserID) => {
    e.stopPropagation();
    try {
      setRequestLoading(true);
      const docData = { Id, documentActionUserID };
      const result = await dispatch(DocumentApi.endpoints.getDocumentEditLink.initiate(docData));
      if (result?.data?.status && result?.data?.data) {
        const url = getSharePointUrl(result?.data?.data);
        window.location.href = url;
      }
      setRequestLoading(false);
    } catch (error) {
      setRequestLoading(false);
    }
  };

  const documentZoomClick = async (e, paramsData) => {
    e?.stopPropagation();
    setZoomData('');
    try {
      setRequestLoading(true);
      const { data: docData } = await dispatch(
        DocumentApi.endpoints.originalDocumentPreview.initiate(paramsData)
      );
      if (docData?.status) {
        setZoomdocument(true);
        setZoomData(docData?.data);
      }
      setRequestLoading(false);
    } catch (error) {
      setRequestLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.themeBackground}>
        <Box className={classes.projectDetail}>
          <ProjectDocumentTop projectData={projectData} docLinkClick={documentLinkClick} />
        </Box>
        <CustomContainer>
          <Box sx={{ py: 3 }}>
            <Box className={`d_flex d_flex_content_end ${classes.createBtn}`}>
              {projectData?.isReviewer === false && (
                <CommonButton
                  btnLabel={t('create_document')}
                  size="small"
                  onClick={createDocumentHandler}
                />
              )}
            </Box>

            <DocumentListTable
              columns={tableColumn}
              rows={tableData}
              docLinkClick={documentLinkClick}
              documentZoomClick={documentZoomClick}
            />
          </Box>
        </CustomContainer>
      </Box>
      {isRequestLoading && <Loader />}
      <DialogFormContainer
        open={zoomdocument}
        dialogSize={'sm'}
        customSize
        isFooter={false}
        close={() => setZoomdocument(false)}>
        <ZoomDocumentModal
          thumbnail={zoomdata}
          close={() => setZoomdocument(false)}
          documentName={'atestt'}
        />
      </DialogFormContainer>
    </>
  );
};

ProjectDocuments.propTypes = {
  isLoading: PropTypes.bool,
  tableData: PropTypes.array,
  tableColumn: PropTypes.array,
  projectData: PropTypes.object,
  createDocumentHandler: PropTypes.func
};

export default ProjectDocuments;
