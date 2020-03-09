import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as dummyActions from '../actions/dummy';

class Dummy extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('here boy');
    const { actions } = this.props;
    actions.dummy.fetchData();
  }

  render() {
    return (<div />);
  }
}

Dummy.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      dummy: bindActionCreators(dummyActions, dispatch),
    },
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Dummy);
