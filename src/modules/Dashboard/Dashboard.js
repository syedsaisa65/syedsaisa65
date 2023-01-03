import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

//Material UI
import { Box } from '@mui/material';
import {
  CustomContainer,
  DashboardDocTypeCard,
  CustomLink,
  ProjectCard,
  SliderContainer,
  EmptyCard,
  Loader
} from 'components';
import useStyle from './style';
import { useTranslation } from 'react-i18next';
import DraftContainer from './documents/DraftContainer';
import NegotiateContainer from './documents/NegotiateContainer';
import SignatureContainer from './documents/SignatureContainer';
import { DraftIcon, NegotiateIcon, signIcon } from 'utils/images';

const Dashboard = ({
  isLoading,
  projectRows,
  setupDocument,
  setupNegotiation,
  projectFormType,
  createProject,
  docLinkClick
}) => {
  const classes = useStyle();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [activeDoc, setActiveDocs] = React.useState(0);
  // Create Doc Slider Setting
  let docSetting = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ],
    beforeChange: (oldIndex, newIndex) => {
      setActiveDocs(newIndex);
    }
  };

  //  NDA Slider setting
  let settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const documents = [
    {
      title: 'Draft',
      subtitle: 'Step one',
      docIcon: DraftIcon
    },
    {
      title: 'Negotiate',
      subtitle: 'Step two',
      docIcon: NegotiateIcon
    },
    {
      title: 'Sign',
      subtitle: 'Step three',
      docIcon: signIcon
    }
  ];

  const templates = [
    {
      projectName: 'Sign First',
      documentName: 'Testing Documents'
    },
    {
      projectName: 'Sign Second',
      documentName: 'Testing Documents'
    },
    {
      projectName: 'Sign Third',
      documentName: 'Testing Documents'
    },
    {
      projectName: 'Sign Fourth',
      documentName: 'Testing Documents'
    },
    {
      projectName: 'Sign Five',
      documentName: 'Testing Documents'
    }
  ];

  const changeDocument = (index) => {
    setActiveDocs(index);
  };

  const cardClick = (projectId) => {
    navigate(`/project-documents/${projectId}`, { replace: true });
  };

  return (
    <>
      <Box className={classes.headerWrapper}>
        <CustomContainer>
          <Box className={`text_center`}>
            <h1 className={classes.pageTitle}>
              Hassle free
              <span className={classes.titleBold}> Drafting & Negotiating Contracts</span>
            </h1>
            <p className={classes.pageSubtitle}>
              Bargaining table helps you draft your contract quickly and get counter party feedback
              securely
            </p>
          </Box>
        </CustomContainer>
      </Box>
      <CustomContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Box className={classes.docSliderWrap}>
              <SliderContainer settings={docSetting} slideArray={documents}>
                {documents?.map((doc, Index) => {
                  return (
                    <Box
                      key={Index}
                      className={`slideBox_${Index} ${classes.docsliderBox}`}
                      onClick={() => changeDocument(Index)}>
                      <DashboardDocTypeCard
                        title={doc?.title}
                        subtitle={doc?.subtitle}
                        docIcon={doc?.docIcon}
                      />
                    </Box>
                  );
                })}
              </SliderContainer>
            </Box>
            {activeDoc === 0 && (
              <Box className={`gradianFirst ${classes.documentSection}`}>
                <DraftContainer setupDocument={setupDocument} />
              </Box>
            )}
            {activeDoc === 1 && (
              <Box className={`gradianSecond ${classes.documentSection}`}>
                <NegotiateContainer setupDocument={setupNegotiation} />
              </Box>
            )}
            {activeDoc === 2 && (
              <Box className={`gradianThird ${classes.documentSection}`}>
                <SignatureContainer setupDocument={setupDocument} templates={templates} />
              </Box>
            )}
            <Box className={classes.recentMain}>
              <Box className={classes.flexBetween}>
                <p className={classes.sectionTitle}>{t('recent_projects')}</p>
                {projectRows.length ? <CustomLink to="/projects" text={'View All'} /> : ''}
              </Box>
              <Box className={classes.sliderWrap}>
                <SliderContainer settings={settings}>
                  <Box className={classes.emptyCardBox}>
                    <EmptyCard actionClick={() => createProject(true, projectFormType, 'create')} />
                  </Box>
                  {projectRows?.map((project, Index) => {
                    return (
                      <Box key={Index} className={classes.sliderBox}>
                        <ProjectCard
                          project={project}
                          cardClick={cardClick}
                          docLinkClick={docLinkClick}
                        />
                      </Box>
                    );
                  })}
                </SliderContainer>
              </Box>
            </Box>
          </>
        )}
      </CustomContainer>
    </>
  );
};

Dashboard.propTypes = {
  isLoading: PropTypes.any,
  projectRows: PropTypes.array,
  actionBtnClick: PropTypes.any,
  setupDocument: PropTypes.any,
  setupNegotiation: PropTypes.func,
  projectFormType: PropTypes.string,
  createProject: PropTypes.func,
  docLinkClick: PropTypes.func
};

export default Dashboard;
