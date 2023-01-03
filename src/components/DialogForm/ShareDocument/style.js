import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sendBtn: {
    marginTop: theme.spacing(3)
  },
  usersList: {
    width: 'calc(100% - 110px)'
  }
}));

export default useStyles;
