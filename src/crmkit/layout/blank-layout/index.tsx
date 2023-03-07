import React from 'react';

interface BlankLayoutProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNode;
}

export function BlankLayout(props: BlankLayoutProps) {
  return <>{props.children}</>;
}
