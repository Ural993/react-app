import React, { ReactElement } from 'react';

import './Sidebar.scss';

export const Sidebar = (): ReactElement => (
  <div className="sidebar">
    <div className="sidebar-header">
      <p>Название проекта</p>
      <span>Аббревиатура</span>
    </div>
    <div className="sidebar-body">
      <ul>
        <li className="sidebar-item">По проекту</li>
        <li className="sidebar-item">Объекты</li>
        <li className="sidebar-item">РД</li>
        <li className="sidebar-item">МТО</li>
        <li className="sidebar-item">СМР</li>
        <li className="sidebar-item">График</li>
        <li className="sidebar-item">МиМ</li>
        <li className="sidebar-item">Рабочие</li>
        <li className="sidebar-item">Капвложения</li>
        <li className="sidebar-item">Бюджет</li>
        <li className="sidebar-item">Финансирование</li>
        <li className="sidebar-item">Панорамы</li>
        <li className="sidebar-item">Камеры</li>
        <li className="sidebar-item">Поручения</li>
        <li className="sidebar-item">Контрагенты</li>
      </ul>
    </div>
  </div>
);
