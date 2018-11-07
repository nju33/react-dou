import {FunctionsContext, DouFunctionsContext} from './functions-context';
import {Dou as OriginalDou, DouPassingProps} from './dou.organism';
import {withDou} from './with-dou';

export * from './customizable-components';
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

