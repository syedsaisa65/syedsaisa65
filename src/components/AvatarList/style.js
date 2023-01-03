import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => {
  return {
    userImage: {
      width: `2rem`,
      height: `2rem`,
      borderRadius: theme.spacing(6),
      background: theme.palette.primary.main,
      color: theme.palette.common.textWhite,
      textTransform: 'uppercase',
      fontSize: theme.typography.pxToRem(14),
      '&.moreBtn': {
        marginLeft: theme.spacing(-1)
      }
    },
    avatarList: {
      padding: theme.spacing(1, 1.5),
      minWidth: '9.375rem',
      '&:hover': {
        background: theme.palette.common.cardBackground
      }
    },
    title: {
      fontSize: theme.typography.pxToRem(14),
      marginLeft: theme.spacing(1)
    },
    popupAvtar: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(18),
      background: theme.palette.primary.main,
      color: theme.palette.common.textWhite
    },
    avtarModal: {
      maxWidth: '10rem',
      width: '100%'
    }
  };
});

export default useStyle;
