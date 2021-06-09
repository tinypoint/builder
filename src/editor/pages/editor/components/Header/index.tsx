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
        <div className="header-group-left">
          <button className="header-button">回退</button>
          <button className="header-button">前进</button>
        </div>
        <div className="header-group-center">
          <select className="header-select" defaultValue="iPhone XR">
            <option value="iPhone12 Pro Max">iPhone12 Pro Max</option>
            <option value="iPhone XR">iPhone XR</option>
            <option value="iPhone 6">iPhone 6</option>
          </select>
          <input
            type="text"
            className="header-input"
            defaultValue="375px"
            style={{ width: 48 }}
          />
          <input
            type="text"
            className="header-input"
            defaultValue="75%"
            style={{ width: 32 }}
          />
        </div>
        <div className="header-group-right">
          {/* <button className="header-button">历史版本</button> */}
          <button className="header-button" onClick={this.save}>
            保存
          </button>
          <button className="header-button">预览</button>
          <button className="header-button">发布</button>
        </div>
      </div>
    );
  }
}

export default connect((state: State) => {
  return {
    schema: state.schema,
  };
})(Header);
