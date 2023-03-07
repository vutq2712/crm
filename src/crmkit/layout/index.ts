import { AuthLayout } from './auth-layout';
import { NormalLayout } from './normal-layout';
import { BlankLayout } from './blank-layout';

export { PageWrapper } from './page-wrapper';

export enum CrmLayout {
  NORMAL,
  AUTH,
  BLANK,
  WEBVIEW,
}

const availableLayout = {
  [CrmLayout.AUTH]: AuthLayout,
  [CrmLayout.NORMAL]: NormalLayout,
  [CrmLayout.BLANK]: BlankLayout,
}

export function getLayout(layout?: CrmLayout) {
  return availableLayout[layout || CrmLayout.NORMAL];
}
