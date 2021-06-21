import React from 'react';

interface IProps {
  id: string;
  _$name$_: string
}

class Hoc extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      loading: true,
      Constructor: null,
      hasError: false,
    };
    this.load();
  }

  load = () => new Promise(() => {
    const { _$name$_ } = this.props;
    requirejs([_$name$_], (mod: any) => {
      this.setState({
        loading: false,
        Constructor: mod,
        hasError: false,
      });
    }, (err: Error) => {
      this.setState({
        loading: false,
        Constructor: null,
        hasError: err.stack?.toString(),
      });
    });
  });

  render() {
    const { loading, Constructor, hasError } = this.state;
    const { _$name$_, ...props } = this.props;
    if (loading) {
      return null;
    }

    if (hasError) {
      return <span>{hasError}</span>;
    }

    if (!Constructor) {
      return null;
    }

    return <Constructor key={props.id} {...props} />;
  }
}

export default Hoc;
