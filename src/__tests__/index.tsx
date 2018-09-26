import React from 'react';
import {mount} from 'enzyme';
import {DouProvider, DouFunctionsConsumer, Dou} from '..';
import {Dialog} from '../dou.organism/dialog.atom';
import {Message} from '../dou.organism/message.atom';
import {Box} from '../dou.organism/box.atom';
import {PrimaryButton} from '../dou.organism/primary-button.atom';
import {Button} from '../dou.organism/button.atom';

// tslint:disable-next-line:no-empty
const noop = () => {};

describe('Dou', () => {
  test('', () => {
    const wrapper = mount(
      <DouProvider callback={noop}>
        <DouFunctionsConsumer>
          {({ask}) => {
            return (
              <>
                <button id="button" onClick={ask('1', 'ask')}>
                  ask
                </button>
                <Dou keyName="1" />
              </>
            );
          }}
        </DouFunctionsConsumer>
      </DouProvider>,
    );

    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(Message)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);

    expect(
      wrapper.find(Dialog).filterWhere(item => {
        return item.prop('aria-hidden');
      }),
    ).toHaveLength(1);

    (() => {
      const dialogs = (wrapper.state() as any).dialogs;
      const targetState = dialogs.get('1');
      targetState.message = 'test';
      targetState.hidden = false;
      dialogs.set('1', targetState);
      wrapper.setState({dialogs});

      expect(
        wrapper.find(Dialog).filterWhere(item => {
          return !item.prop('aria-hidden');
        }),
      ).toHaveLength(1);
    })();

    (() => {
      const dialogs = (wrapper.state() as any).dialogs;
      const targetState = dialogs.get('1');
      targetState.message = '';
      targetState.hidden = true;
      dialogs.set('1', targetState);
      wrapper.setState({dialogs});
      wrapper.find('#button').simulate('click');
      expect(
        wrapper.find(Dialog).filterWhere(item => {
          return !item.prop('aria-hidden');
        }),
      ).toHaveLength(1);
    })();

    // 「はい」
    wrapper.find(PrimaryButton).simulate('click');
    expect(
      wrapper.find(Dialog).filterWhere(item => {
        return item.prop('aria-hidden');
      }),
    ).toHaveLength(1);
  });
});
