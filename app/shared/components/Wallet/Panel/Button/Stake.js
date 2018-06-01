// @flow
import React, { Component } from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

import StakeForm from '../Form/Stake';

type Props = {
  actions: {},
  accounts: {},
  balances: {},
  settings: {},
  validate: {},
  system: {}
};

export default class WalletPanelButtonStake extends Component<Props> {
  props: Props;

  state = {
    open: false
  }

  onOpen = () => {
    const { actions } = this.props;
    const { resetStakeForm } = actions;

    resetStakeForm();

    this.setState({ open: true });
  }

  onClose = () => this.setState({ open: false });

  render() {
    const {
      actions,
      accounts,
      balances,
      settings,
      validate,
      system
    } = this.props;

    const {
      open
    } = this.state;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Modal
              trigger={(
                <Button
                  color="blue"
                  content={t('stake_form')}
                  fluid
                  icon="money"
                  onClick={this.onOpen}
                />
              )}
              open={open}
              size="small"
            >
              <Header icon="money" content={t('stake_modal_title')} />
              <Modal.Content>
                <StakeForm
                  account={accounts[settings.account]}
                  key="StakeForm"
                  settings={settings}
                  actions={actions}
                  validate={validate}
                  balance={balances[settings.account]}
                  system={system}
                />
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
              </Modal.Actions>
            </Modal>
          )
        }
      </I18n>
    );
  }
}
