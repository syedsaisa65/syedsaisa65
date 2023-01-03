import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  inputLabel: {
    '&.MuiInputLabel-root': {
      marginBottom: theme.spacing(0.5),
      color: theme.palette.common.themeFontColor,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(14),
      fontFamily: theme.typography.fontFamily
    }
  },
  fieldRow: {
    marginTop: theme.spacing(2),
    '&:first-child': {
      marginTop: theme.spacing(0)
    }
  },
  multiSelect: {
    '& .css-xb97g8': {
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      width: '1.375rem',
      height: '1.375rem',
      justifyContent: 'center',
      flexShrink: '0',
      color: theme.palette.common.backgroundWhite,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.backgroundWhite
      }
    }
  },
  errorText: {
    color: theme.error,
    fontSize: theme.typography.pxToRem(12)
  }
}));

export default useStyle;
