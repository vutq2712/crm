import { IPage } from '@app/types/page.type';
import React from 'react';
import { ISeoMetadata } from '@app/types/seo-metadata.type';
import PageContext from '@app/context/page-context';
import SEOMetadata from './block/seo-metadata';

interface PageWrapperProps {
  // eslint-disable-next-line react/require-default-props
  pageContext?: IPage;
  metadata?: ISeoMetadata;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode | React.ReactPortal | null | undefined;
}

export function PageWrapper(props?: PageWrapperProps) {
  return (
    <PageContext.Provider value={props.pageContext}>
      <SEOMetadata metadata={props.metadata} />
      <div className='main-container'>
        { props.children }
      </div>
    </PageContext.Provider>
  )
}
