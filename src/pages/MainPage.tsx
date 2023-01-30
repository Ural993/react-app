import React, { ReactElement } from 'react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Table } from 'components/Table';
import { Toolbar } from 'components/Toolbar';
import './MainPage.scss';

const MainPage = (): ReactElement => (
  <div>
    <Header />
    <section>
      <Sidebar />
      <div className="rightblock">
        <Toolbar />
        <Table />
      </div>
    </section>
  </div>
);

export default MainPage;
