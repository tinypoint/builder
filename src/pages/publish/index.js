const components = [];
const MAPS = {};

const _traverse = (schema, callback) => {
  // 深度优先
  callback(schema);

  const { children = [] } = schema;
  for (let i = 0, len = children.length; i < len; i++) {
    _traverse(children[i], callback);
  }
};

_traverse(window.$$schema$$, (schema) => {
  if (components.indexOf(schema.type) <= -1) {
    components.push(schema.type);
  }
});

window.require(
  ['react', 'react-dom', 'redux', 'react-redux', ...components],
  function (React, ReactDOM, { createStore }, { Provider, connect }, ...mods) {
    mods.forEach((mod, index) => {
      MAPS[components[index]] = mod.default;
    });

    const initState = {
      schema: window.$$schema$$,
    };

    const reducer = (state = initState, action) => {
      const { type, payload } = action;
      switch (type) {
        default:
          return state;
      }
    };

    const store = createStore(reducer);

    class Renderer extends React.Component {
      cycle = (schema) => React.createElement(
        MAPS[schema.type],
        {
          ...(schema.props || {}),
          key: schema.id,
          id: schema.id,
        },
        (schema.children || []).map(this.cycle),
      );

      render() {
        const { schema } = this.props;
        return this.cycle(schema);
      }
    }

    const Client = connect((state) => ({
      schema: state.schema,
    }))(Renderer);

    class App extends React.Component {
      render() {
        return React.createElement(
          Provider,
          {
            store,
          },
          React.createElement(Client),
        );
      }
    }

    ReactDOM.render(React.createElement(App), document.getElementById('root'));
  },
);
