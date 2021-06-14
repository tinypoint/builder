import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../../store";
import "./index.css";

const connector = connect((state: State) => {
  return {
    loading: state.loading,
  };
});

type Props = ConnectedProps<typeof connector>;

class Loading extends React.Component<Props> {
  isLoading = () => {
    const { loading = {} } = this.props;

    return Object.keys(loading).some((key) => {
      return loading[key];
    });
  };

  render() {
    const loading = this.isLoading();
    if (loading) {
      return (
        <div className="loading">
          <CircularProgress size={96} />
        </div>
      );
    }
    return null;
  }
}

export default connector(Loading);
