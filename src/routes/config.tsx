import React from 'react';
import {IWrapperRouteComponentProps} from 'routes/index.d';

const WapperRouteComponent = ({
  title,
  ...props
}: IWrapperRouteComponentProps) => {
  if (title) document.title = title;
  return <>{props.element}</>;
};
export default WapperRouteComponent;
