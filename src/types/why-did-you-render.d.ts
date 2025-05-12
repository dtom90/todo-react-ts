import 'react';

declare module 'react' {
  interface FunctionComponent<P = {}> {
    whyDidYouRender?: boolean | { [key: string]: any };
  }
  
  interface ExoticComponent<P = {}> {
    whyDidYouRender?: boolean | { [key: string]: any };
  }
}

declare module '@welldone-software/why-did-you-render' {
  const whyDidYouRender: any;
  export default whyDidYouRender;
}
