import {FunctionsContext, DouFunctionsContext} from './functions-context';

export {Background} from './dou.organism/background.atom'
export {Box} from './dou.organism/box.atom'
export {Message} from './dou.organism/message.atom'
export {Button} from './dou.organism/button.atom'
export {PrimaryButton} from './dou.organism/primary-button.atom'
export * from './dou-provider.organism';
export * from './dou.organism';
export * from './with-dou';

export const DouFunctionsConsumer = FunctionsContext.Consumer;
export interface DouFunctionsProps {
  dou: DouFunctionsContext;
}

export {DouFunctionsContext};
