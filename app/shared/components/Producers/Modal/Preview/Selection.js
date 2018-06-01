
// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Grid, Header, Icon, List, Message, Modal, Segment, Table } from 'semantic-ui-react';
import { chunk, times } from 'lodash';

export default class ProducersVotingPreviewSelection extends Component<Props> {
  render() {
    const {
      lastError,
      onClose,
      onConfirm,
      selected,
      submitting
    } = this.props;
    const rows = chunk(times(selected.length, i => (
      <Table.Cell key={i}>
        {selected[i]}
      </Table.Cell>
    )), 4);
    return (
      <I18n ns="producers">
        {
          (t) => (
            <Segment loading={submitting}>
              <Header icon="alarm outline" content={t('producer_voter_preview_confirm_changes_title')} />
              <Modal.Content>
                <h3>
                  {t('producer_voter_preview_confirm_changes_message')}
                </h3>
                <Segment basic padded>
                  <Table celled>
                    {(selected.length > 0)
                      ? rows.map((row) => (
                        <Table.Row>{row}</Table.Row>
                      ))
                      : <Grid.Column textAlign="center" width={12}>{t('producer_voter_preview_confirm_none')}</Grid.Column>
                    }
                  </Table>
                </Segment>
                {(lastError)
                  ? (
                    <Message negative>
                      {(lastError.code)
                        ? (
                          <div>
                            <Message.Header>
                              {lastError.error.code}: {lastError.error.name}
                            </Message.Header>
                            <code>{lastError.error.what}</code>
                          </div>
                        )
                        : (
                          <div>
                            <Message.Header>
                              {t(['producer_voter_preview_error_title'])}
                            </Message.Header>
                            <code>{lastError}</code>
                          </div>
                        )
                      }
                    </Message>
                  )
                  : ''
                }
                <Divider />
                <Button
                  onClick={onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="green"
                  floated="right"
                  onClick={onConfirm}
                >
                  <Icon name="checkmark" /> {t('producer_voter_preview_submit')}
                </Button>
              </Modal.Content>
            </Segment>
          )
        }
      </I18n>
    );
  }
}
