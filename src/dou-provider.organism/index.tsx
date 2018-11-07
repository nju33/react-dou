import React from 'react';
import {FunctionsContext, DouFunctionsContext} from '../functions-context';
import {Context, DouState, ContextValue} from '../context';
import {DouProps} from '..';

export interface DouProviderProps {
  callback?(keyName: string, buttonIndex: number, sendingValue?: any): void;
}

export class DouProvider extends React.Component<
  DouProviderProps,
  ContextValue
> {
  constructor(props: DouProviderProps) {
    super(props);

    this.state = {
      _regist: this.regist,
      dialogs: new Map(),
    };
  }

  private createInitialState: ((
    keyName: string,
    callback: DouProps['onClickItem'],
  ) => DouState) = (keyName, callback) => {
    return {
      message: '',
      hidden: true,
      hide: passingKeyName => {
        return ev => {
          if (ev !== undefined) {
            ev.preventDefault();
          }

          this.hide(passingKeyName)();
        };
      },
      eventFactory: buttonIndex => ({
        onClick: ev => {
          if (ev !== undefined) {
            ev.preventDefault();
          }

          const targetState = this.state.dialogs.get(keyName);
          if (targetState === undefined) {
            throw new Error(`not found keyName: ${keyName}`);
          }

          if (this.props.callback !== undefined) {
            this.props.callback(keyName, buttonIndex, targetState.payload);
          }
          callback(buttonIndex, targetState.payload);
          this.hide(keyName)();
        },
      }),
      payload: undefined,
    };
  };

  private getDialogState(keyName: string) {
    const targetState = this.state.dialogs.get(keyName);
    if (targetState === undefined) {
      throw new Error(`not found key: ${keyName}`);
    }

    return targetState;
  }

  setMessage(
    keyName: string,
    message: string | JSX.Element,
    sendingValue: any,
  ) {
    const targetState = this.getDialogState(keyName);
    targetState.message = message;
    targetState.hidden = false;
    targetState.payload = sendingValue;
    this.state.dialogs.set(keyName, targetState);
    this.setState({
      dialogs: this.state.dialogs,
    });
  }

  regist: ContextValue['_regist'] = (keyName, callback) => {
    this.state.dialogs.set(keyName, this.createInitialState(keyName, callback));
    this.forceUpdate();
  };

  ask: DouFunctionsContext['ask'] = (keyName, message, sendingValue) => ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }

    this.setMessage(keyName, message, sendingValue);
  };

  hide: DouFunctionsContext['hide'] = keyName => ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }

    const targetState = this.getDialogState(keyName);
    if (targetState.hidden) {
      return;
    }

    targetState.hidden = true;
    this.state.dialogs.set(keyName, targetState);
    this.setState({
      dialogs: this.state.dialogs,
    });
  };

  render() {
    return (
      <FunctionsContext.Provider value={{ask: this.ask, hide: this.hide}}>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </FunctionsContext.Provider>
    );
  }
}
