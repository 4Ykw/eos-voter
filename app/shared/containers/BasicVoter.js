// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Producers from '../components/Producers';
import Wallet from '../components/Wallet';

import * as AccountsActions from '../actions/accounts';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as WalletActions from '../actions/wallet';

import { Tab } from 'semantic-ui-react'

type Props = {};

class BasicVoterContainer extends Component<Props> {
  props: Props;


  render() {
    const panes = [
      {
        menuItem: 'My Account',
        render: () => <Tab.Pane style={{marginTop: '3em'}}><Wallet {...this.props} /></Tab.Pane>
      },
      {
        menuItem: 'Producer Voting',
        render: () => <Tab.Pane style={{marginTop: '3em'}}><Producers {...this.props} /></Tab.Pane>
      }
    ];
    return (
      <Tab
        menu={{
          fixed: 'top',
          inverted: true,
          size: 'large'
        }}
        panes={panes}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    producers: state.producers,
    settings: state.settings,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...ProducersActions,
      ...SettingsActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));
