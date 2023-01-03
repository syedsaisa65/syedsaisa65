import React, { useState } from 'react';
import { Box, CircularProgress, Grid, InputAdornment } from '@mui/material';
import {
  CustomContainer,
  DocumentCard,
  Loader,
  DialogFormContainer,
  ZoomDocumentModal,
  NoDataFound
} from 'components';
import { CopyDocumentContainer } from 'components/DialogForm';
import { useTranslation } from 'react-i18next';
import useStyles from './style';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Search } from '@mui/icons-material';
import { InputField } from 'components/FormControls/Index';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DocumentApi } from 'store/API/documentApi';
import { useDispatch } from 'react-redux';
import ResponseHandler from 'utils/ResponseHandler';
import { Link } from 'react-router-dom';
import { ArrowBack } from 'utils/images';

function Document({
  isLoading,
  totalCount,
  setPageData,
  allData,
  isFetching,
  search,
  setSearch,
  IsShared
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const copy_form = 'template-copy-form';
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState();
  const [zoomDocument, setZoomDocument] = useState(false);
  const [zoomData, setZoomData] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);

  const documentZoomClick = async (e, document) => {
    e?.stopPropagation();
    setZoomData('');
    setPreviewLoading(true);
    setSelectedItem(document);
    try {
      const { data } = await dispatch(
        DocumentApi.endpoints.documentPreview.initiate(document?.driveItemID)
      );
      if (data?.status) {
        setZoomDocument(true);
        setZoomData(data?.data);
        setPreviewLoading(false);
      }
    } catch (error) {
      setPreviewLoading(false);
      setIsLinkClickLoading(false);
    }
  };
  const [createProjectDialogInfo, setCreateProjectDialogInfo] = React.useState({
    type: '',
    isOpen: false,
    id: ''
  });
  const initialValues = {
    search
  };
  const dialogChangeHandler = (e, isOpen, type, id = '') => {
    if (e) e?.stopPropagation();
    setCreateProjectDialogInfo({
      isOpen,
      type,
      id
    });
  };
  const [isLinkClickLoading, setIsLinkClickLoading] = useState(false);
  const editNegotiation = async (e, doc) => {
    e?.stopPropagation();
    try {
      setIsLinkClickLoading(true);
      const docData = { Id: doc?.driveItemID, documentActionUserID: doc?.documentActionUserID };
      const result = await dispatch(DocumentApi.endpoints.getDocumentEditLink.initiate(docData));
      if (result?.data?.status && result?.data?.data) {
        setIsLinkClickLoading(false);
        window.location.href = result?.data?.data;
      } else if (result?.isError) {
        ResponseHandler(result?.error?.data);
        setIsLinkClickLoading(false);
      }
    } catch {
      setIsLinkClickLoading(false);
    }
  };

  // generate Thumbnail

  const generateThumbClick = async (e, data) => {
    e?.stopPropagation();
    const docData = {
      documentActionUserID: data?.documentActionUserID,
      driveItemID: data?.driveItemID
    };
    try {
      setIsLinkClickLoading(true);
      const result = await dispatch(DocumentApi.endpoints.documentThumbnail.initiate(docData));
      if (result?.data?.status) {
        setIsLinkClickLoading(false);
      } else if (result?.isError) {
        ResponseHandler(result?.error?.data);
        setIsLinkClickLoading(false);
      }
    } catch (error) {
      setIsLinkClickLoading(false);
    }
  };

  return (
    <div>
      <Box className={classes.headerWrapper}>
        <CustomContainer>
          <Box className={classes.linkText}>
            <Link to="/dashboard">
              <img src={ArrowBack} alt="back" /> Back
            </Link>
          </Box>
          <Box className={`text_center`}>
            <h1 className={classes.pageTitle}> Hassle free Drafting & Negotiating Contracts </h1>
            <p className={classes.pageSubtitle}>
              Bargaining table helps you draft your contract quickly and get counter party feedback
              securely
            </p>
          </Box>
        </CustomContainer>
      </Box>
      <CustomContainer>
        <Box className={classes.titleSection}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={12}>
              <h4 className={classes.sectionTitle}>{t('all_documents')}</h4>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Box>
                <Formik initialValues={initialValues}>
                  {() => (
                    <Form id="search-form">
                      <InputField
                        name="search"
                        type="search"
                        fullWidth
                        value={search}
                        placeholder="Search Document"
                        variant="outlined"
                        onChange={(e) => setSearch(e?.target?.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search fontSize="small" />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          {isLoading ? (
            <Loader />
          ) : (
            <InfiniteScroll
              dataLength={allData.length}
              next={setPageData}
              hasMore={allData.length > 0 && totalCount !== allData.length ? true : false}
              loader={
                <Box sx={{ mt: 2 }} className={'d_flex d_flex_content_center'}>
                  <CircularProgress />
                </Box>
              }
              className={classes.projectContent}>
              <Box>
                <Grid container spacing={2}>
                  {allData.length > 0 ? (
                    allData?.map((document, Index) => {
                      return (
                        <Grid item lg={2.4} md={3} sm={4} xs={12} key={Index}>
                          <DocumentCard
                            image={document?.thumbnail}
                            title={document?.name}
                            isEmptyThumb={document?.isGenerateThumbnail}
                            subTitle={document?.owner}
                            zoomClick={(e) => documentZoomClick(e, document)}
                            isCopyEdit={IsShared}
                            copyClick={(e) => dialogChangeHandler(e, true, copy_form, document)}
                            editClick={(e) => editNegotiation(e, document)}
                            generateThumbClick={(e) => generateThumbClick(e, document)}
                          />
                        </Grid>
                      );
                    })
                  ) : (
                    <Grid item xs={12}></Grid>
                  )}
                </Grid>
              </Box>
            </InfiniteScroll>
          )}
          {allData.length === 0 && !isFetching && <NoDataFound />}
        </Box>
      </CustomContainer>
      {/* Zoom Templates */}
      <DialogFormContainer
        open={zoomDocument}
        dialogSize={'sm'}
        isFooter={false}
        customSize
        close={() => setZoomDocument(false)}>
        <ZoomDocumentModal
          thumbnail={zoomData}
          close={() => setZoomDocument(false)}
          isCopy={!IsShared}
          isEdit={IsShared}
          copyClick={(e) => dialogChangeHandler(e, true, copy_form, selectedItem)}
          documentName={selectedItem?.name}
          editClick={(e) => editNegotiation(e, selectedItem)}
        />
      </DialogFormContainer>

      <DialogFormContainer
        open={createProjectDialogInfo?.isOpen}
        dialogSize={'sm'}
        isHeader={true}
        headerTitle={t('copy_document')}
        footerBtnFirstLabel={t('copy_btn')}
        footerBtnSecondLabel={t('cancel')}
        isFooter={true}
        close={() => dialogChangeHandler(false)}
        formType={copy_form}>
        <CopyDocumentContainer formType={copy_form} projectInfo={createProjectDialogInfo?.id} />
      </DialogFormContainer>

      {(isLinkClickLoading || previewLoading) && <Loader />}
    </div>
  );
}
Document.propTypes = {
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  IsShared: PropTypes.bool,
  totalCount: PropTypes.number,
  setPageData: PropTypes.func,
  setSearch: PropTypes.func,
  pageData: PropTypes.any,
  allData: PropTypes.array,
  search: PropTypes.string
};
export default Document;
