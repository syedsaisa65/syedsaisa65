import React from 'react';
import PropTypes from 'prop-types';

//Material UI
import { Dialog, DialogContent, DialogTitle, DialogActions, Grid, Box } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import { CommonButton } from 'components/FormControls/Index';

//Style
import useStyles from './style';

const DialogBox = ({
  open,
  close,
  headerTitle,
  children,
  disable,
  isHeader,
  isFooter,
  formType,
  isLoading,
  dialogSize,
  headerClose,
  footerBtnFirstLabel,
  footerBtnSecondLabel,
  isConfirmFooter,
  ConfirmYes,
  customSize
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={close}
      scroll={'paper'}
      fullWidth
      maxWidth={dialogSize}
      className={classes.dialogContainer}
      classes={{ paper: customSize ? classes.modalSizeCustom : '' }}>
      {isHeader && (
        <DialogTitle className={classes.dialogTitle}>
          <Grid container className={classes.dialogHeader}>
            <Grid item className={classes.modalHeader}>
              <h6 className={classes.headingTxt}>{headerTitle}</h6>
            </Grid>
            {headerClose && (
              <Grid item>
                <CloseOutlined
                  className={classes.closeModalButton}
                  onClick={close}
                  fontSize="small"
                />
              </Grid>
            )}
          </Grid>
        </DialogTitle>
      )}
      <DialogContent dividers className={classes.dialogContent}>
        {children}
      </DialogContent>
      {isFooter && (
        <>
          <DialogActions>
            <Box className={classes.dialogAction}>
              <Box sx={{ mr: 2 }}>
                <CommonButton
                  isLoading={isLoading}
                  disable={disable}
                  form={formType}
                  btnLabel={footerBtnFirstLabel}
                  type="submit"
                  size="Medium"
                  onClick={() => (isConfirmFooter ? ConfirmYes() : null)}
                />
              </Box>
              <Box>
                <CommonButton
                  isLoading={isLoading}
                  disable={disable}
                  form={formType}
                  btnLabel={footerBtnSecondLabel}
                  size="Medium"
                  className="btnSecondary"
                  onClick={close}
                  type="button"
                />
              </Box>
            </Box>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

DialogBox.propTypes = {
  open: PropTypes.bool,
  close: PropTypes.func,
  ConfirmYes: PropTypes.func,
  title: PropTypes.string,
  disable: PropTypes.bool,
  isHeader: PropTypes.bool,
  isFooter: PropTypes.bool,
  isConfirmFooter: PropTypes.bool,
  formType: PropTypes.string,
  dialogSize: PropTypes.string,
  headerTitle: PropTypes.string,
  customSize: PropTypes.bool,
  children: PropTypes.any,
  isLoading: PropTypes.any,
  headerClose: PropTypes.any,
  footerBtnFirstLabel: PropTypes.string,
  footerBtnSecondLabel: PropTypes.string
};

DialogBox.defaultProps = {
  open: false,
  close: () => {},
  title: '',
  disable: false,
  isFooter: true,
  formType: '',
  dialogSize: 'xl',
  isDelete: false
};

export default DialogBox;
