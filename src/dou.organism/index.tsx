import React from 'react';
import {createPortal} from 'react-dom';
import {ContextValue, DouState, Context} from '../context';
import {Background as OriginalBackground} from './background.atom';
import {Box as OriginalBox} from './box.atom';
import {Message as OriginalMessage} from './message.atom';
import {ButtonGroup as OriginalButtonGroup} from './button-group.atom';
import {Button as OriginalButton} from './button.atom';
import {PrimaryButton as OriginalPrimaryButton} from './primary-button.atom';
import * as customizableComponents from '../customizable-components';

export interface DouItem {
  icon?: JSX.Element;
  primary?: boolean;
  label: string;
  button: boolean;
}

export type DouItems = DouItem[] | string[];

export interface DouPassingProps {
  keyName: string;
  items?: DouItems;
  fontSize?: string;
  primaryColor?: string;
  onClickItem?(buttonIndex: number, sendingValue?: any): any;
  components?: Partial<typeof customizableComponents>;
  backgroundEvent?: boolean;
}
export interface DouProps {
  keyName: string;
  items: DouItem[];
  fontSize: string;
  douProviderState: ContextValue;
  primaryColor: string;
  onClickItem(buttonIndex: number, sendingValue?: any): any;
  components: typeof customizableComponents;
  backgroundEvent: boolean;
}

// tslint:disable-next-line:no-empty
const noop = () => {};

export class DouBase extends React.PureComponent<DouPassingProps> {
  static displayName = 'Dou';

  static defaultProps = {
    fontSize: '14px',
    primaryColor: '#fb9966',
    // tslint:disable-next-line:no-empty
    onClickItem() {},
  };

  // @ts-ignore
  props: DouProps;
  case: HTMLDivElement;

  constructor(props: DouProps) {
    super(props);

    this.case = document.createElement('div');
    this.case.setAttribute('data-dou-key', props.keyName);
    document.body.appendChild(this.case);

    props.douProviderState._regist(props.keyName, props.onClickItem);
  }

  componentWillUnmount() {
    if (this.case !== null && this.case.parentNode !== null) {
      this.case.parentNode.removeChild(this.case);
    }
  }

  private getOwnState(): DouState {
    const state = this.props.douProviderState.dialogs.get(this.props.keyName);
    if (state === undefined) {
      throw new Error(`not found key: ${this.props.keyName}`);
    }

    return state;
  }

  Background: React.SFC<{
    onClick: Function;
    'aria-hidden': boolean;
    'data-font-size': string;
  }> =
    // @ts-ignore
    React.memo(props => {
      return (
        <this.props.components.Background
          onClick={props.onClick}
          aria-hidden={props['aria-hidden']}
          data-font-size={props['data-font-size']}
        >
          {props.children}
        </this.props.components.Background>
      );
    });

  Box: React.SFC =
    // @ts-ignore
    React.memo(props => {
      return (
        <this.props.components.Box>{props.children}</this.props.components.Box>
      );
    });

  Message: React.SFC =
    // @ts-ignore
    React.memo(props => {
      return (
        <this.props.components.Message
          data-has-items={this.props.items.length > 0}
        >
          {props.children}
        </this.props.components.Message>
      );
    });

  Button: React.SFC<{
    primary: boolean;
    'data-color'?: string;
    className: string;
    onClick: Function;
  }> =
    // @ts-ignore
    React.memo(props => {
      if (props.primary) {
        return (
          <this.props.components.PrimaryButton
            className={props.className}
            onClick={props.onClick}
            data-color={props['data-color']}
          >
            {props.children}
          </this.props.components.PrimaryButton>
        );
      }

      return (
        <this.props.components.Button
          className={props.className}
          onClick={props.onClick}
        >
          {props.children}
        </this.props.components.Button>
      );
    });

  ButtonGroup: React.SFC<{
    ownState: DouState;
    items?: DouItems;
  }> =
    // @ts-ignore
    React.memo(props => {
      if (props.items.length === 0) {
        return null;
      }

      return (
        <this.props.components.ButtonGroup>
          {this.props.items.map((item, i) => {
            const {onClick} = props.ownState.eventFactory(props.ownState.id, i);
            const className = [];
            if (item.button) {
              className.push('button');
            }

            return (
              <this.Button
                primary={Boolean(item.primary)}
                className={className.join(' ')}
                data-color={this.props.primaryColor}
                onClick={onClick}
              >
                {item.icon === undefined ? null : item.icon}
                {item.label}
              </this.Button>
            );
          })}
        </this.props.components.ButtonGroup>
      );
    });

  render() {
    const ownState = this.getOwnState();

    return createPortal(
      <this.Background
        onClick={
          this.props.backgroundEvent
            ? ownState.hide(ownState.id, this.props.keyName)
            : noop
        }
        aria-hidden={ownState.hidden}
        data-font-size={this.props.fontSize}
      >
        <this.Box>
          <this.Message>{ownState.message}</this.Message>
          <this.ButtonGroup ownState={ownState} items={this.props.items} />
        </this.Box>
      </this.Background>,
      this.case,
    );
  }
}

export class Dou extends React.PureComponent<
  DouPassingProps & {components: typeof customizableComponents}
> {
  static defaultProps = {
    components: {
      Background: OriginalBackground,
      Box: OriginalBox,
      Message: OriginalMessage,
      ButtonGroup: OriginalButtonGroup,
      Button: OriginalButton,
      PrimaryButton: OriginalPrimaryButton,
    },
    items: [],
    backgroundEvent: true,
  };

  // @ts-ignore
  props: DouPassingProps & {components: typeof customizableComponents};

  render() {
    const components = {...customizableComponents, ...this.props.components};

    return (
      <Context.Consumer>
        {state => {
          return (
            <DouBase
              {...this.props as any}
              components={components}
              douProviderState={state}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}
