import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => {
  return {
    cardMain: {
      boxShadow: 'unset',
      width: '100%',
      height: '100%'
    },
    cardInner: {
      background: theme.palette.common.backgroundCard,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(0.7),
      border: `1px solid ${theme.palette.primary.textColor}`,
      position: 'relative',
      cursor: 'pointer',
      height: '100%'
    },
    cardInnerBorder: {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: theme.spacing(1),
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    headerTop: {
      padding: theme.spacing(2),
      position: 'relative'
    },
    userInfo: {
      padding: theme.spacing(0, 2, 2, 2),
      position: 'relative'
    },
    avatarWrap: {
      '& .MuiAvatar-root': {
        width: '32px',
        height: '32px',
        fontSize: theme.typography.pxToRem(14),
        lineHeight: theme.typography.pxToRem(18),
        background: theme.palette.primary.main,
        textTransform: 'uppercase'
      }
    },
    headerTitle: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightMedium,
      marginBottom: theme.spacing(0.5)
    },
    headerSubtitle: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.pxToRem(13),
      lineHeight: theme.typography.pxToRem(16)
    },
    counterTitle: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(16),
      display: 'block',
      marginBottom: theme.spacing(1)
    },
    notAvailable: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(14),
      display: 'block',
      marginBottom: theme.spacing(2)
    },
    toTitle: {
      fontSize: theme.typography.pxToRem(13),
      lineHeight: theme.typography.pxToRem(18)
    },
    description: {
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.secondary.main,
      padding: theme.spacing(1, 2, 2),
      '& p': {
        marginBottom: theme.spacing(1.5),
        '&:last-child': {
          marginBottom: 0
        }
      }
    },
    textUnderline: {
      textDecoration: 'underline',
      display: '-webkit-box',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': '2',
      '-webkit-box-orient': 'vertical'
    },
    DateText: {
      color: theme.palette.primary.textColor
    },
    Button: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.backgroundWhite,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.backgroundWhite
      },
      '&:last-child': { marginRight: theme.spacing(0) }
    },
    EmptyCard: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      minHeight: '15rem',
      padding: theme.spacing(1)
    },
    dateBox: {
      fontSize: theme.typography.pxToRem(13),
      color: theme.palette.secondary.main,
      padding: theme.spacing(0, 2, 0, 2),
      marginTop: 'auto',
      '& p': {
        marginBottom: theme.spacing(1)
      }
    },
    actionsButtons: {
      marginBottom: theme.spacing(1),
      '& button': {
        marginRight: theme.spacing(0.5),
        '&:last-child': { marginRight: theme.spacing(0) }
      }
    },
    createButton: {
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(22),
      fontWeight: theme.typography.fontWeightMedium,
      marginTop: theme.spacing(1.5)
    }
  };
});

export default useStyle;
