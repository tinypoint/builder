import React from "react";
import { connect, ConnectedProps } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import store, { State } from "../../store";
import "./index.css";
import DialogContent from "@material-ui/core/DialogContent";

const connector = connect((state: State) => {
  return {
    settingsPanelVisible: state.settingsPanelVisible,
  };
});

type Props = ConnectedProps<typeof connector>;

class SettingsPanel extends React.Component<Props> {
  handleClose = () => {
    store.dispatch({
      type: "CHANGE_VALUE",
      payload: [{ key: "settingsPanelVisible", value: false }],
    });
  };

  render() {
    const { settingsPanelVisible } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="settings"
        open={settingsPanelVisible}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <DialogContent style={{ width: "552px" }}>
          <Grid container spacing={3}>
            <Grid item>
              <List>
                {["Canvas", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default connector(SettingsPanel);
