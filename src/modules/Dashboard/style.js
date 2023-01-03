import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => {
  return {
    headerWrapper: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(10),
      background: theme.palette.common.tableHeadingBackground
    },
    docSliderWrap: {
      marginTop: theme.spacing(-6.5),
      [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(2)
      },
      '& .slideBox_0 .cardContentBg': {
        background: theme.palette.primary.background
      },
      '& .slideBox_1 .cardContentBg': {
        background: theme.palette.secondary.background
      },
      '& .slideBox_2 .cardContentBg': {
        background: theme.palette.Tertiary.colorTertiary
      },
      '& .slick-dots': {
        [theme.breakpoints.down('md')]: {
          bottom: '0'
        }
      }
    },
    pageTitle: {
      color: theme.palette.primary.textColor,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(24),
      lineHeight: theme.typography.pxToRem(28),
      marginBottom: theme.spacing(1)
    },
    titleBold: {
      fontWeight: theme.typography.fontWeightBold
    },
    pageSubtitle: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.pxToRem(14)
    },
    docsliderBox: {
      cursor: 'pointer'
    },
    sliderBox: {
      padding: theme.spacing(0, 1)
    },
    documentSection: {
      background: theme.palette.common.backgroundLight,
      padding: theme.spacing(3, 2.5, 2, 2.5),
      borderRadius: theme.spacing(1),
      '&.gradianFirst': {
        '& a, & a svg': {
          color: theme.palette.primary.main
        }
      },
      '&.gradianSecond': {
        background: theme.palette.secondary.gradient,
        '& a, & a svg': {
          color: theme.palette.secondary.background
        },
        '& .fileWrapper': {
          backgroundImage: `repeating-linear-gradient(1deg, ${theme.palette.secondary.background}, ${theme.palette.secondary.background} 11px, transparent 11px, transparent 25px, ${theme.palette.secondary.background} 25px), repeating-linear-gradient(91deg, ${theme.palette.secondary.background}, ${theme.palette.secondary.background} 11px, transparent 11px, transparent 25px, ${theme.palette.secondary.background} 25px), repeating-linear-gradient(181deg, ${theme.palette.secondary.background}, ${theme.palette.secondary.background} 11px, transparent 11px, transparent 25px, ${theme.palette.secondary.background} 25px), repeating-linear-gradient(271deg, ${theme.palette.secondary.background}, ${theme.palette.secondary.background} 11px, transparent 11px, transparent 25px, ${theme.palette.secondary.background} 25px)`
        }
      },
      '&.gradianThird': {
        background: theme.palette.secondary.gradient2,
        '& a, & a svg': {
          color: theme.palette.Tertiary.colorTertiary
        },
        '& .fileWrapper': {
          backgroundImage: `repeating-linear-gradient(1deg, ${theme.palette.Tertiary.colorTertiary}, ${theme.palette.Tertiary.colorTertiary} 11px, transparent 11px, transparent 25px, ${theme.palette.Tertiary.colorTertiary} 25px), repeating-linear-gradient(91deg, ${theme.palette.Tertiary.colorTertiary}, ${theme.palette.Tertiary.colorTertiary} 11px, transparent 11px, transparent 25px, ${theme.palette.Tertiary.colorTertiary} 25px), repeating-linear-gradient(181deg, ${theme.palette.Tertiary.colorTertiary}, ${theme.palette.Tertiary.colorTertiary} 11px, transparent 11px, transparent 25px, ${theme.palette.Tertiary.colorTertiary} 25px), repeating-linear-gradient(271deg, ${theme.palette.Tertiary.colorTertiary}, ${theme.palette.Tertiary.colorTertiary} 11px, transparent 11px, transparent 25px, ${theme.palette.Tertiary.colorTertiary} 25px)`
        }
      },
      // Search
      '& .searchButton': {
        width: '1.5rem',
        height: '2rem',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        borderRadius: theme.spacing(1),
        '&.activeSearch': {
          width: '11.375rem',
          padding: theme.spacing(1),
          background: theme.palette.common.themeBackground
        }
      },
      '& .searchInput': {
        border: 'none',
        outline: 'none',
        padding: theme.spacing(1),
        width: '100%'
      }
    },
    uploadWrap: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    paddingRight: {
      paddingRight: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        paddingRight: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        paddingRight: 0
      }
    },
    borderRightPrimary: {
      borderRight: `1px solid ${theme.palette.primary.borderPrimary}`,
      [theme.breakpoints.down('sm')]: {
        border: 'none'
      }
    },
    borderRightSecondary: {
      borderRight: `1px solid ${theme.palette.secondary.borderSecondary}`,
      '& .browsLabel': {
        color: theme.palette.secondary.background
      },
      [theme.breakpoints.down('sm')]: {
        border: 'none'
      }
    },
    borderRightTertiary: {
      borderRight: `1px solid ${theme.palette.Tertiary.borderTertiary}`,
      '& .browsLabel': {
        color: theme.palette.Tertiary.colorTertiary
      },
      [theme.breakpoints.down('sm')]: {
        border: 'none'
      }
    },
    templateMain: {
      '&.MuiGrid-root': {
        paddingLeft: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
          paddingLeft: theme.spacing(2)
        }
      }
    },
    uploadLabel: {
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(18),
      lineHeight: theme.typography.pxToRem(20),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(15),
        lineHeight: theme.typography.pxToRem(18)
      }
    },
    flexBetween: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1.5),
      width: '100%',
      alignItems: 'flex-start'
    },
    recentMain: {
      padding: theme.spacing(3, 0, 4)
    },
    sectionTitle: {
      fontSize: theme.typography.pxToRem(18),
      [theme.breakpoints.down('md')]: {
        fontSize: theme.typography.pxToRem(15),
        lineHeight: theme.typography.pxToRem(18)
      }
    },
    templateWrap: {
      width: '100%',
      minHeight: '12.5rem'
    },
    exitingDoc: {
      maxWidth: '210px'
    },
    emptyCardBox: {
      padding: theme.spacing(0, 1)
    }
  };
});

export default useStyle;
