import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  },
  snackbar: {
    backgroundColor: green[600]
  }
});

class SnackbarNotification extends React.Component {
  state = {
    open: this.props.open
  };
  handleClose = (event, reason) => {
    if (reason === 'clickAway') {
      return;
    }

    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}>
          <SnackbarContent
            className={classes.snackbar}
            message={<span id="message-id">Song saved to profile!</span>}
            aria-describedby="message-id"
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            ]}
          />
        </Snackbar>
      </div>
    );
  }
}

SnackbarNotification.propypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnackbarNotification);
