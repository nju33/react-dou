import {FunctionsContext, DouFunctionsContext} from './functions-context';
import {Dou as OriginalDou, DouPassingProps} from './dou.organism';
import {withDou} from './with-dou';

export {Background} from './dou.organism/background.atom';
export {Box} from './dou.organism/box.atom';
export {Message} from './dou.organism/message.atom';
export {Button} from './dou.organism/button.atom';
export {PrimaryButton} from './dou.organism/primary-button.atom';
export * from './locales';
export * from './create-dou';
export * from './dou-provider.organism';
export * from './dou.organism';
export * from './with-dou';

export const DouFunctionsConsumer = FunctionsContext.Consumer;
export interface DouFunctionsProps {
  dou: DouFunctionsContext;
}

export {DouFunctionsContext};
export const Dou: React.ComponentClass<DouPassingProps> = withDou(
  OriginalDou as any,
);

