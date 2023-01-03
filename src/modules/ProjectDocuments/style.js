import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => {
  return {
    historSidebar: {
      width: '300px'
    },
    themeBackground: {
      background: theme.palette.common.themeBackgroundLight,
      minHeight: 'calc(100vh - 126px)'
    },
    headerWrapper: {
      paddingTop: theme.spacing(3.4),
      background: theme.palette.common.tableHeadingBackground
    },
    projectDocumentContent: {
      padding: theme.spacing(2.5, 3),
      '&.MuiPaper-root': {
        width: '100%',
        borderRadius: theme.spacing(0.5),
        boxShadow: 'none',
        border: `1px solid ${theme.palette.common.tableHeadingBackground}`
      }
    },
    tabContainer: {
      flexGrow: 1,
      backgroundColor: theme.palette.common.backgroundWhite,
      '& .MuiTabs-indicator': {
        display: 'none'
      }
    },
    style: {
      backgroundColor: theme.palette.common.backgroundWhite,
      color: 'black',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '14px',
      border: '2px solid #F4F4F4',
      textTransform: 'none',
      padding: '15px 32px',
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: theme.palette.primary.main
      }
    },
    // Top doc Section
    projectDetail: {
      paddingBottom: theme.spacing(5)
    },
    topFlexItem: {
      minHeight: '10.938rem'
    },
    linkText: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(1.5),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    pageTitle: {
      fontSize: theme.typography.pxToRem(24),
      lineHeight: theme.typography.pxToRem(30),
      marginBottom: theme.spacing(0.5)
    },
    pageDescription: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(20),
      color: theme.palette.secondary.main,
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(0, 0, 1, 0),
        width: '100%'
      }
    },
    flexWrap: {
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap'
      }
    },
    infoTop: {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginBottom: '0'
      }
    },
    projectLabelRow: {
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        marginBottom: theme.spacing(1)
      }
    },
    label: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(20),
      color: theme.palette.secondary.main,
      minWidth: '120px',
      marginRight: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(0.3)
      }
    },
    addMember: {
      maxWidth: 'calc(100% - 120px)',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        maxWidth: '100%'
      }
    },
    valueLabel: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(20),
      color: theme.palette.primary.textColor,
      textTransform: 'capitalize'
    },
    changeText: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(20),
      color: theme.palette.common.linkColor,
      marginLeft: theme.spacing(0.8),
      cursor: 'pointer'
    },
    createBtn: {
      paddingBottom: theme.spacing(2)
    },
    labelSection: {
      paddingTop: theme.spacing(4)
    },
    docName: {
      color: theme.palette.common.linkColor
    },
    topCard: {
      marginBottom: '-9.75rem',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '0'
      }
    }
  };
});

export default useStyle;
