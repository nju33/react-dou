import React from 'react';
import {Context, ContextValue, DouState} from '../context';
import {Dialog} from './dialog.atom';
import {Box} from './box.atom';
import {Message} from './message.atom';
import {ButtonGroup} from './button-group.atom';
import {Button} from './button.atom';
import {PrimaryButton} from './primary-button.atom';
import ja from '../locales/ja';

export interface DouItem {
  icon?: JSX.Element;
  primary?: boolean;
  label: string;
  button: boolean;
}

export interface DouPassingProps {
  keyName: string;
  items?: DouItem[] | string[];
  fontSize?: string;
  primaryColor?: string;
  onClickItem?(buttonIndex: number, sendingValue?: any): any;
}
export interface DouProps {
  keyName: string;
  items: DouItem[];
  fontSize: string;
  douProviderState: ContextValue;
  primaryColor: string;
  onClickItem(buttonIndex: number, sendingValue?: any): any;
}

class RealDou extends React.Component<DouProps> {
  static defaultProps = {
    fontSize: '14px',
    primaryColor: '#fb9966',
    // tslint:disable-next-line:no-empty
    onClickItem() {},
  };

  constructor(props: DouProps) {
    super(props);

    props.douProviderState._regist(props.keyName, props.onClickItem);
  }

  private getOwnState(): DouState {
    const state = this.props.douProviderState.dialogs.get(this.props.keyName);
    if (state === undefined) {
      throw new Error(`not found key: ${this.props.keyName}`);
    }

    return state;
  }

  render() {
    const ownState = this.getOwnState();

    return (
      <Dialog
        onClick={ownState.hide(this.props.keyName)}
        aria-hidden={ownState.hidden}
        data-font-size={this.props.fontSize}
      >
        <Box>
          <Message>{ownState.message}</Message>
          <ButtonGroup>
            {this.props.items.map((item, i) => {
              const {onClick} = ownState.eventFactory(i);
              const className = [];
              if (item.button) {
                className.push('button');
              }

              if (Boolean(item.primary)) {
                return (
                  <PrimaryButton
                    key={item.label}
                    className={className.join(' ')}
                    data-color={this.props.primaryColor}
                    onClick={onClick}
                  >
                    {item.icon === undefined ? null : item.icon}
                    {item.label}
                  </PrimaryButton>
                );
              }
              return (
                <Button
                  key={item.label}
                  className={className.join(' ')}
                  onClick={onClick}
                >
                  {item.icon === undefined ? null : item.icon}
                  {item.label}
                </Button>
              );
            })}
          </ButtonGroup>
        </Box>
      </Dialog>
    );
  }
}

export const Dou: React.SFC<DouPassingProps> = props => {
  let items: DouItem[];
  if (props.items === undefined) {
    items = ja.map((label, i) => {
      return {
        label,
        primary: i === 0,
        button: true,
      };
    });
  } else if (typeof props.items[0] === 'string') {
    items = (props.items as string[]).map((label, i) => {
      return {
        label,
        primary: i === 0,
        button: true,
      };
    });
  } else {
    items = props.items as DouItem[];
  }

  return (
    <Context.Consumer>
      {state => {
        return (
          <RealDou
            {...{...RealDou.defaultProps, ...props}}
            items={items}
            douProviderState={state}
          />
        );
      }}
    </Context.Consumer>
  );
};
