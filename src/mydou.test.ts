import {createDou} from './create-dou';
import {MyBox} from './customizable-components.test';

export const MyDou = createDou({
  Box: MyBox,
});
