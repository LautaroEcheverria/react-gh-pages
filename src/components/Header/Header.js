import './Header.css';

function App() {
  return (
    <nav className="App">
      <header className="App-header">
        <p className='TitleApp'>Test App</p>
        <div className='CardsApp'>
          <a href='#CardIdSync'>ID Sync</a>
          <a href='#CardUserAttributes'>User Attributes</a>
          <a href='#CardLogEvent'>Custom Event</a>
          <a href='#CardLogImpressionEvent'>Impression Event</a>
          <a href='#CardPageView'>Page View Event</a>
          <a href='#CardLogPurchaseEvent'>Purchase Event</a>
        </div>
      </header>
    </nav>
  );
}

export default App;
