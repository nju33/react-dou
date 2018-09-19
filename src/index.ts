import {FunctionsContext, DouFunctionsContext} from './functions-context';

export * from './dou-provider.organism';
export * from './dou.organism';
export * from './with-dou';

export const DouFunctionsConsumer = FunctionsContext.Consumer;
export interface DouFunctionsProps {
  dou: DouFunctionsContext;
}

export {DouFunctionsContext};
