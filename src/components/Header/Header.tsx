import React, { ReactElement } from 'react';

import { ArrowBackIcon, HeaderIcon } from 'components/Icons';

import './Header.scss';

export const Header = (): ReactElement => (
  <div className="header">
    <div className="haderIcon">
      <HeaderIcon />
    </div>
    <div className="arrowBackIcon">
      <ArrowBackIcon />
    </div>
    <div className="watch active">Просмотр</div>
    <div className="rule">Управление</div>
  </div>
);
