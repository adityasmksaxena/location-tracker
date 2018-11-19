import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

function ButtonAppBar(props) {
  const { classes, deviceList, device, handleDeviceSelection } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Location Tracker
          </Typography>

          <FormControl className={classes.formControl} style={{ color: 'white' }}>
            <InputLabel htmlFor="age-helper">Device</InputLabel>
            <NativeSelect
              value={device}
              onChange={e => {
                const { value } = e.target;
                handleDeviceSelection(value);
              }}
              name="Device"
              className={classes.selectEmpty}
            >
              <option value=" ">ALL</option>
              {deviceList.map(device => (
                <option key={device} value={device}>
                  {device.toUpperCase()}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(ButtonAppBar);
