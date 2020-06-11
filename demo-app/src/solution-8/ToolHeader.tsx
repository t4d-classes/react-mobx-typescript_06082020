import React, { FC } from 'react';

export interface ToolHeaderProps {
  headerText?: string;
}

export const ToolHeader: FC<ToolHeaderProps> =
  ({ headerText }) => {

    return (
      <header>
        <h1>{headerText}</h1>
      </header>
    );

  };

ToolHeader.defaultProps = {
  headerText: 'The Tool',
};
