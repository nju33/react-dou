import React from 'react';
import {Context} from '../context';
import {Dialog} from './dialog.atom';
import {Box} from './box.atom';
import {Message} from './message.atom';
import {ButtonGroup} from './button-group.atom';
import {Button} from './button.atom';
import {PrimaryButton} from './primary-button.atom';
import ja from '../locales/ja';

interface DouProps {
  locale: string[];
  primaryColor: string;
}

export class Dou extends React.Component<Partial<DouProps>> {
  // @ts-ignore
  props: DouProps;

  static defaultProps = {
    locale: ja,
    primaryColor: '#fb9966',
  };

  render() {
    return (
      <Context.Consumer>
        {state => {
          return (
            <Dialog aria-hidden={state.hidden}>
              <Box>
                <Message>{state.message}</Message>
                <ButtonGroup>
                  {this.props.locale.map((text, i) => {
                    const {onClick} = state.eventFactory(i);

                    if (i === 0) {
                      return (
                        <PrimaryButton
                          key={text}
                          color={this.props.primaryColor}
                          onClick={onClick}
                        >
                          {text}
                        </PrimaryButton>
                      );
                    }
                    return (
                      <Button key={text} onClick={onClick}>
                        {text}
                      </Button>
                    );
                  })}
                </ButtonGroup>
              </Box>
            </Dialog>
          );
        }}
      </Context.Consumer>
    );
  }
}
