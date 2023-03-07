/* eslint-disable no-return-await */
import React from 'react';
import dynamic from 'next/dynamic';
import { useSubscription } from '@app/hooks/subscription';

interface NormalLayoutProps {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactNode;
  data?: any;
}

export function NormalLayout(props: NormalLayoutProps) {

  return (
    <div className='app__main -normal-layout'>
      <main>{props.children}</main>
    </div>
  )
}
