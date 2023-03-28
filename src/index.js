import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header/Header';
import IDSyncAPI from './components/IDSyncAPI';

import AddUserAttribute from './components/UserAttributes/AddUserAttribute';
import AddUserAttributeList from './components/UserAttributes/AddUserAttributeList';
import RemoveUserAttribute from './components/UserAttributes/RemoveUserAttribute';
import AddUserTag from './components/UserAttributes/AddUserTag';

import LogEvent from './components/Events/LogEvent';
import LogPurchaseEvent from './components/Events/LogPurchaseEvent';
import LogImpressionEvent from './components/Events/LogImpressionEvent';
import LogPageView from './components/Events/LogPageView';

window.onload = (event) => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Header />
      <div className='d-flex justify-content-around'>
        <IDSyncAPI />
      </div>
      <p className='Docs'><u>Documentation:</u>&nbsp;<a className='LinkDocs' target="_blank" rel="noopener noreferrer" href='https://docs.mparticle.com/developers/sdk/web/idsync/'>docs.mparticle.com/developers/sdk/web/idsync/</a></p>
      <br></br>
      <hr className='container'></hr>
      <div className='d-flex justify-content-around'>
        <AddUserAttribute />
        <AddUserAttributeList />
        <RemoveUserAttribute />
        <AddUserTag />
      </div>
      <p className='Docs'><u>Documentation:</u>&nbsp;<a className='LinkDocs' target="_blank" rel="noopener noreferrer" href='https://docs.mparticle.com/developers/sdk/web/users/'>docs.mparticle.com/developers/sdk/web/users/</a></p>
      <br></br>
      <hr className='container'></hr>
      <div className='d-flex justify-content-between'>
        <LogEvent />
        <LogImpressionEvent />
        <LogPageView />
      </div>
      <p className='Docs'><u>Documentation:</u>&nbsp;<a className='LinkDocs' target="_blank" rel="noopener noreferrer" href='https://docs.mparticle.com/developers/sdk/web/event-tracking/'>docs.mparticle.com/developers/sdk/web/event-tracking/</a></p>
      <br></br>
      <hr className='container'></hr>
      <div className='d-flex justify-content-around'>
        <LogPurchaseEvent />
      </div>
    </React.StrictMode>
  );
};