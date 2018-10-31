# React Dou

[![CircleCI](https://circleci.com/gh/nju33/react-dou.svg?style=svg&circle-token=9c6b0217483ac8aca3220b42a652f08e0b36cfa4)](https://circleci.com/gh/nju33/react-dou)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
[![react-dou](https://img.shields.io/npm/v/react-dou.svg)](https://www.npmjs.com/package/react-dou)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Install

```bash
yarn add react-dou react react-dom styled-components # @types/react @types/react-dom @types/styled-components
```

## [Example](https://nju33.github.io/react-dou/)

### by `DouFunctionsConsumer`

```typescript
(
  <DouProvider callback={callback}>
    <DouFunctionsConsumer>
      {({ask}) => {
        return (
          <button onClick={ask('ハンバーガー食べますか？')}>ハンバーガー食べますか？</button>
        );
      }}
    </DouFunctionsConsumer>
    <Dou />
  </DouProvider>
)

```

### by `withDou`

```typescript
interface Props {
  text: string;
}

class IComponent extends React.Component<
  Props & Partial<DouFunctionsProps>,
  {a: string}
> {
  // @ts-ignore
  props: Props & DouFunctionsProps
  
  render() {
    return (
      <button onClick={this.props.dou.ask('message')}>{this.props.text}</button>
    );
  }
}

const IComponentWithDou = withDou<Props>(IComponent);

```

## References

- [npm](https://www.npmjs.com/package/react-dayo)
- [github](https://github.com/nju33/react-dayo)

## License

MIT
