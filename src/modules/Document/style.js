import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => {
  return {
    headerWrapper: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      background: theme.palette.common.tableHeadingBackground
    },
    pageTitle: {
      color: theme.palette.primary.textColor,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(24),
      lineHeight: theme.typography.pxToRem(28),
      marginBottom: theme.spacing(0.5)
    },
    sectionTitle: {
      color: theme.palette.primary.textColor,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(24),
      lineHeight: theme.typography.pxToRem(28)
    },
    pageSubtitle: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.pxToRem(14)
    },
    projectContent: {
      paddingBottom: theme.spacing(3)
    },
    titleSection: {
      margin: theme.spacing(2, 0)
    },
    linkText: {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: theme.typography.pxToRem(16),
      marginBottom: theme.spacing(1.5)
    }
  };
});

export default useStyle;
