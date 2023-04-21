import { Col, Row } from "antd";
import React, { useEffect } from "react";
import Logo from "styles/uikit/media/iconset/Logo.svg";

interface AuthLayoutProps {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode;
}

export function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className='auth-page'>
      <div className='container'>
        {props.children}
      </div>
    </div>
  );
}
