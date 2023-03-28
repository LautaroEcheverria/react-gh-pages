import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Log Custom Event';
  var mParticle = window.mParticle;
  var attributes = {};

  ///// Log an event /////
  var logEvent = function(){
    var typeIn = document.getElementById('SelectEventType');
    var inputs = document.querySelectorAll("input.InputEvent");
    var EventName, typeOut;
    var k, v;
    for (var e of inputs) {
      if (e.name === "EventValue" && e.value) {
        EventName = e.value;
      } 
      else {
        if (!EventName) {
          alert('An event value is required.');
          clear();
          return 0;
        }
        if (e.name === "EventAttributes") {
          if(e.id === "EventAttributeKey" && e.value) {
            k = e.value;
          }
          if(e.id === "EventAttributeValue") {
            v = e.value;
          }
        }
      }
    }
    if (k) {
      attributes[k] = v;
    }
    switch(parseInt(typeIn.value)) {
      case 1:
        typeOut = mParticle.EventType.Navigation;
        break;
      case 2:
        typeOut = mParticle.EventType.Location;
        break;
      case 3:
        typeOut = mParticle.EventType.Search;
        break;
      case 4:
        typeOut = mParticle.EventType.Transaction;
        break;
      case 5:
        typeOut = mParticle.EventType.UserContent;
        break;
      case 6:
        typeOut = mParticle.EventType.UserPreference;
        break;
      case 7:
        typeOut = mParticle.EventType.Social;
        break;
      case 8:
        typeOut = mParticle.EventType.Other;
        break;
      default:
        break;
    }
    mParticle.logEvent(EventName,typeOut,attributes);
    clear();
  }

  ///// Add attribute /////
  var addAttribute = function(){
    var k = document.getElementById('EventAttributeKey').value;
    var v = document.getElementById('EventAttributeValue').value;
    if (k){
      attributes[k] = v;
      alert('Attribute added correctly.');
    } 
    else {
      alert('A key value is required for the attribute.')
    }
    clearAttribute();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputEvent")).forEach(
      input => (input.value = "")
    );
    attributes = {};
  }

  ///// Clear attributes inputs /////
  var clearAttribute = function(){
    document.getElementById('EventAttributeKey').value = "";
    document.getElementById('EventAttributeValue').value = "";
  }

  ///// Reset inputs and attributes /////
  var reset = function(){
    clear();
    attributes = {};
  }

  return (
    <Card className='Card' id='CardLogEvent'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Select type and log an Event. 
        </Card.Text>
        <div className='mb-3'>
          <form>
            <div className='d-flex' style={{lineHeight: "1.2"}}>
              <label style={{width: "50%"}}>Type:&nbsp;</label> 
              <select className='form-select form-select-sm' name='EventType' id='SelectEventType' style={{width: "185px", marginLeft: "12px"}}>
                <option value="1">Navigation</option>
                <option value="2">Location</option>
                <option value="3">Search</option>
                <option value="4">Transaction</option>
                <option value="5">UserContent</option>
                <option value="6">UserPreference</option>
                <option value="7">Social</option>
                <option value="8">Other</option>
              </select>
            </div>
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Event Name:&nbsp;</label>
            <input className='InputEvent' type="text" name="EventValue" />
            <br></br><br></br><hr></hr>
            <p><u>Attributes:</u></p>
            <label>Key:&nbsp;</label>
            <input className='InputEvent' id='EventAttributeKey' type="text" name="EventAttributes"/>
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Value:&nbsp;</label>
            <input className='InputEvent' id='EventAttributeValue' type="text" name="EventAttributes"/>
          </form>
        </div>
        <br></br><br></br><br></br><br></br>
        <div className='d-flex justify-content-end mt-3'>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addAttribute}>Add Attribute</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={reset}>Reset</Button>
          <Button className='ButtonCard' variant="primary" onClick={logEvent} >Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
