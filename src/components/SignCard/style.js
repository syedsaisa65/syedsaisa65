import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  cardMain: {
    boxShadow: 'unset',
    width: '100%',
    height: '100%',
    padding: theme.spacing(0, 1),
    backgroundColor: 'transparent',
    minHeight: '12.5rem'
  },
  signContent: {
    background: theme.palette.common.themeBackground,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    height: '100%',
    overflow: 'hidden'
  },
  title: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
    wordBreak: 'break-all'
  },
  subTitle: {
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightMedium
  }
}));

export default useStyle;
