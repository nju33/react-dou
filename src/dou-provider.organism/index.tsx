import React from 'react';
import {css, InterpolationValue} from 'styled-components';
import {Context} from '../context';

export interface DouProviderFunctions {
  ask(message: string): (ev?: React.MouseEvent<unknown>) => void;
}

export interface DouProviderProps {
  children(functions: DouProviderFunctions): JSX.Element;
  callback(buttonIndex: number): void;
  userCSS?: InterpolationValue[];
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
  DouProviderState
> {
  static defaultProps = {
    userCSS: css``,
  };

  constructor(props: DouProviderProps) {
    super(props);

    this.state = {
      message: '',
      hidden: true,
      eventFactory: buttonIndex => ({
        onClick: ev => {
          if (ev !== undefined) {
            ev.preventDefault();
          }

          props.callback(buttonIndex);
          this.hide();
        },
      }),
    };
  }

  setMessage(message: string) {
    this.setState({message, hidden: false});
  }

  hide() {
    this.setState({hidden: true});
  }

  ask: DouProviderFunctions['ask'] = message => ev => {
    if (ev !== undefined) {
      ev.preventDefault();
    }

    this.setMessage(message);
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children({
          ask: this.ask,
        })}
      </Context.Provider>
    );
  }
}
