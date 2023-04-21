import { AuthLayout } from './auth-layout';
import { NormalLayout } from './normal-layout';
import { BlankLayout } from './blank-layout';

export { PageWrapper } from './page-wrapper';

export enum ProjectLayout {
  NORMAL,
  AUTH,
  BLANK,
  WEBVIEW,
}

const availableLayout = {
  [ProjectLayout.AUTH]: AuthLayout,
  [ProjectLayout.NORMAL]: NormalLayout,
  [ProjectLayout.BLANK]: BlankLayout,
}

export function getLayout(layout?: ProjectLayout) {
  return availableLayout[layout || ProjectLayout.NORMAL];
}
