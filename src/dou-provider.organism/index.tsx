import React from 'react';
// import {css, InterpolationValue} from 'styled-components';
import {FunctionsContext, DouFunctionsContext} from '../functions-context';
import {Context, DouState, ContextValue} from '../context';
import {DouProps} from '..';

export interface DouProviderProps {
  callback(keyName: string, buttonIndex: number): void;
}

export interface DouProviderState {
  message: string;
  hidden: boolean;
  eventFactory(
    buttonIndex: number,
  ): {
    onClick(ev?: React.MouseEvent<unknown>): void;
  };
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
      eventFactory: buttonIndex => ({
        onClick: ev => {
          if (ev !== undefined) {
            ev.preventDefault();
          }

          this.props.callback(keyName, buttonIndex);
          callback(buttonIndex);
          this.hide(keyName);
        },
      }),
    };
  };

  private getDialogState(keyName: string) {
    const targetState = this.state.dialogs.get(keyName);
    if (targetState === undefined) {
      throw new Error(`not found key: ${keyName}`);
    }

    return targetState;
  }

  setMessage(keyName: string, message: string) {
    const targetState = this.getDialogState(keyName);
    targetState.message = message;
    targetState.hidden = false;
    this.state.dialogs.set(keyName, targetState);
    this.setState({
      dialogs: this.state.dialogs,
    });
  }

  hide(keyName: string) {
    const targetState = this.getDialogState(keyName);
    targetState.hidden = true;
    this.state.dialogs.set(keyName, targetState);
    this.setState({
      dialogs: this.state.dialogs,
    });
  }

  regist: ContextValue['_regist'] = (keyName, callback) => {
    this.state.dialogs.set(keyName, this.createInitialState(keyName, callback));
    this.forceUpdate();
  };

  ask: DouFunctionsContext['ask'] = (keyName, message) => ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }

    this.setMessage(keyName, message);
  };

  render() {
    return (
      <FunctionsContext.Provider value={{ask: this.ask}}>
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </FunctionsContext.Provider>
    );
  }
}
