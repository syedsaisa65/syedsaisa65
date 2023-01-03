import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  cardMain: {
    boxShadow: 'unset',
    width: 250,
    padding: theme.spacing(0, 1),
    flexShrink: '0'
  },
  cardContent: {
    background: theme.palette.common.themeBackground,
    border: '1px solid #DFDFDF',
    padding: theme.spacing(1.5),
    borderRadius: theme.spacing(1),
    height: '100%',
    overflow: 'hidden',
    '&:before': {
      position: 'absolute',
      bottom: '0',
      left: '0',
      top: '0',
      width: '100%',
      height: '100%',
      content: `''`,
      background: 'rgba(0,0,0,0.5)',
      transition: '0.3s ease',
      display: 'none'
    },
    '&.alignCenter': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    },
    '& .copyTemplate': {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      transition: '0.2s ease',
      color: theme.palette.common.textWhite,
      zIndex: '2',
      opacity: '0',
      [theme.breakpoints.down('sm')]: {
        opacity: '1',
        color: theme.palette.primary.main
      },
      '&:hover': {
        color: theme.palette.primary.main,
        opacity: '1'
      }
    },
    '& .actionButtons': {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      transition: '0.2s ease',
      color: theme.palette.common.textWhite,
      zIndex: '2',
      opacity: '0',
      [theme.breakpoints.down('sm')]: {
        opacity: '1',
        color: theme.palette.primary.main
      },
      '& a': {
        color: theme.palette.common.textWhite
      },
      '&:hover': {
        // color: theme.palette.primary.main,
        opacity: '1',
        '& .pointer, a': {
          '&:hover': {
            color: theme.palette.primary.main
          }
        }
      }
    },
    '&:hover': {
      '&:before': {
        display: 'block',
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      },
      '& h4': {
        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(0),
          opacity: '1'
        }
      },
      '& .zoomIcon, .copyTemplate, .actionButtons': {
        opacity: '1'
      }
    }
  },
  descriptionContainer: {
    minHeight: 100
  },
  previewSection: {
    minHeight: 60
  },
  blankTitle: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: theme.typography.pxToRem(20),
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  dateTimeParagraph: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: theme.typography.pxToRem(20)
    // textOverflow: 'ellipsis',
    // overflow: 'hidden',
    // whiteSpace: 'nowrap'
  },
  title: {
    marginTop: theme.spacing(1),
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightMedium
  },
  activityLabel: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20),
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    wordBreak: 'break-all',
    overflow: 'hidden',
    minHeight: 60
  },
  textUnderline: {
    textDecoration: 'underline',
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    marginBottom: 10
  },
  subtitle: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20)
    // display: '-webkit-box',
    // boxOrient: 'vertical',
    // lineClamp: 4,
    // wordBreak: 'break-all',
    // overflow: 'hidden'
  },
  zoomIcon: {
    position: 'absolute',
    left: theme.spacing(1),
    top: theme.spacing(1),
    transition: '0.2s ease',
    color: theme.palette.common.textWhite,
    zIndex: '2',
    opacity: '0',
    [theme.breakpoints.down('sm')]: {
      opacity: '1',
      color: theme.palette.primary.main
    },
    '&:hover': {
      color: theme.palette.primary.main,
      opacity: '1'
    }
  }
}));

export default useStyle;
