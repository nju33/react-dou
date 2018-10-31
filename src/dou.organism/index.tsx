import React from 'react';
import {createPortal} from 'react-dom';
import {Context, ContextValue, DouState} from '../context';
import {Background as OriginalBackground} from './background.atom';
import {Box as OriginalBox} from './box.atom';
import {Message as OriginalMessage} from './message.atom';
import {ButtonGroup} from './button-group.atom';
import {Button as OriginalButton} from './button.atom';
import {PrimaryButton as OriginalPrimaryButton} from './primary-button.atom';
import ja from '../locales/ja';

const componentMap = new Map();
componentMap.set('Background', OriginalBackground);
componentMap.set('Box', OriginalBox);
componentMap.set('Message', OriginalMessage);
componentMap.set('Button', OriginalButton);
componentMap.set('PrimaryButton', OriginalPrimaryButton);
export interface DouItem {
  icon?: JSX.Element;
  primary?: boolean;
  label: string;
  button: boolean;
}

export type DouItems = DouItem[] | string[];

export interface CustomizableComponent {
  Background: typeof OriginalBackground;
  Box: typeof OriginalBox;
  Message: typeof OriginalMessage;
  Button: typeof OriginalButton;
  PrimaryButton: typeof OriginalPrimaryButton;
}

export interface DouPassingProps {
  keyName: string;
  items?: DouItems;
  fontSize?: string;
  primaryColor?: string;
  onClickItem?(buttonIndex: number, sendingValue?: any): any;
  components?: Partial<CustomizableComponent>;
}
export interface DouProps {
  keyName: string;
  items: DouItem[];
  fontSize: string;
  douProviderState: ContextValue;
  primaryColor: string;
  onClickItem(buttonIndex: number, sendingValue?: any): any;
  components?: Partial<CustomizableComponent>;
}

class RealDou extends React.Component<DouProps> {
  static defaultProps = {
    fontSize: '14px',
    primaryColor: '#fb9966',
    // tslint:disable-next-line:no-empty
    onClickItem() {},
  };

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

  private hasPropComponent(name: keyof CustomizableComponent) {
    if (this.props.components === undefined) {
      return false;
    }

    if (this.props.components[name] === undefined) {
      return false;
    }

    return true;
  }

  private getPropComponent(name: keyof CustomizableComponent) {
    if (this.props.components === undefined) {
      throw new Error('components is empty');
    }

    if (this.props.components[name] === undefined) {
      throw new Error('components[name] is empty');
    }

    return this.props.components[name];
  }

  Background: React.SFC<{
    onClick: Function;
    'aria-hidden': boolean;
    'data-font-size': string;
  }> =
    // @ts-ignore
    React.memo(props => {
      let Background = componentMap.get('Background');
      if (this.hasPropComponent('Background')) {
        Background = this.getPropComponent('Background');
      }

      return (
        <Background
          onClick={props.onClick}
          aria-hidden={props['aria-hidden']}
          data-font-size={props['data-font-size']}
        >
          {props.children}
        </Background>
      );
    });

  Box: React.SFC =
    // @ts-ignore
    React.memo(props => {
      let Box = componentMap.get('Box');
      if (this.hasPropComponent('Box')) {
        Box = this.getPropComponent('Box');
      }

      return <Box>{props.children}</Box>;
    });

  Message: React.SFC =
    // @ts-ignore
    React.memo(props => {
      let Message = componentMap.get('Message');
      if (this.hasPropComponent('Message')) {
        Message = this.getPropComponent('Message');
      }

      return <Message>{props.children}</Message>;
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
        let PrimaryButton = componentMap.get('PrimaryButton');
        if (this.hasPropComponent('PrimaryButton')) {
          PrimaryButton = this.getPropComponent('PrimaryButton');
        }

        return (
          <PrimaryButton
            className={props.className}
            onClick={props.onClick}
            data-color={props['data-color']}
          >
            {props.children}
          </PrimaryButton>
        );
      }

      let Button = componentMap.get('Button');
      if (this.hasPropComponent('Button')) {
        Button = this.getPropComponent('Button');
      }

      return (
        <Button className={props.className} onClick={props.onClick}>
          {props.children}
        </Button>
      );
    });

  ButtonGroup: React.SFC<{
    ownState: DouState;
    items?: DouItems;
  }> =
    // @ts-ignore
    React.memo(props => {
      if (props.items === undefined) {
        return null;
      }

      return (
        <ButtonGroup>
          {this.props.items.map((item, i) => {
            const {onClick} = props.ownState.eventFactory(i);
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
        </ButtonGroup>
      );
    });

  render() {
    const ownState = this.getOwnState();

    return createPortal(
      <this.Background
        onClick={ownState.hide(this.props.keyName)}
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

// export const Dou: React.SFC<DouPassingProps> = props => {
export class Dou extends React.PureComponent<DouPassingProps> {
  static resetGlobalComponents(): void {
    componentMap.set('Background', OriginalBackground);
    componentMap.set('Box', OriginalBox);
    componentMap.set('Message', OriginalMessage);
    componentMap.set('Button', OriginalButton);
    componentMap.set('PrimaryButton', OriginalPrimaryButton);
  }

  static set Background(CustomizedBackground: typeof OriginalBackground) {
    componentMap.set('Background', CustomizedBackground);
  }

  static set Box(CustomizedBox: typeof OriginalBox) {
    componentMap.set('Box', CustomizedBox);
  }

  static set Message(CustomizedMessage: typeof OriginalMessage) {
    componentMap.set('Message', CustomizedMessage);
  }

  static set Button(CustomizedButton: typeof OriginalButton) {
    componentMap.set('Button', CustomizedButton);
  }

  static set PrimaryButton(
    CustomizedPrimaryButton: typeof OriginalPrimaryButton,
  ) {
    componentMap.set('PrimaryButton', CustomizedPrimaryButton);
  }

  render() {
    let items: DouItem[];
    if (this.props.items === undefined) {
      items = ja.map((label, i) => {
        return {
          label,
          primary: i === 0,
          button: true,
        };
      });
    } else if (typeof this.props.items[0] === 'string') {
      items = (this.props.items as string[]).map((label, i) => {
        return {
          label,
          primary: i === 0,
          button: true,
        };
      });
    } else {
      items = this.props.items as DouItem[];
    }

    return (
      <Context.Consumer>
        {state => {
          return (
            <RealDou
              {...{...RealDou.defaultProps, ...this.props}}
              items={items}
              douProviderState={state}
            />
          );
        }}
      </Context.Consumer>
    );
  }
}
