import React from "react";
import { connect } from "react-redux";
import { State } from "../../store";
import "./index.css";

interface Props {
  schema: State["schema"];
}

class Header extends React.Component<Props> {
  save = async () => {
    const { schema } = this.props;
    window.localStorage.setItem("_test_data", JSON.stringify(schema));
  };

  render() {
    return (
      <div className="header">
        <button>回退</button>
        <button>前进</button>
        <button>历史版本</button>
        <button onClick={this.save}>保存</button>
        <button>预览</button>
        <button>发布</button>
      </div>
    );
  }
}

export default connect((state: State) => {
  return {
    schema: state.schema,
  };
})(Header);
