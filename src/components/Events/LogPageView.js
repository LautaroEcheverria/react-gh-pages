import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Log Page View Event';
  var mParticle = window.mParticle;
  var attributes = {};
  var customFlags = {};

  ///// Log a page view event /////
  var logPageViewEvent = function(){
    var inputs = document.querySelectorAll("input.InputPageView");
    var EventName;
    var k1, k2, v1, v2;
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
          if(e.id === "PageViewAttributeKey" && e.value) {
            k1 = e.value;
          }
          if(e.id === "PageViewAttributeValue") {
            v1 = e.value;
          }
        }
        if (e.name === "EventFlags") {
          if(e.id === "PageViewFlagKey" && e.value) {
            k2 = e.value;
          }
          if(e.id === "PageViewFlagValue") {
            v2 = e.value;
          }
        }
      }
    }
    if (k1) {
      attributes[k1] = v1;
    }
    if (k2) {
      customFlags[k2] = v2;
    }
    customFlags = {
      'Facebook.BrowserId':"123"
    }
    mParticle.logPageView(EventName,attributes,customFlags);
    clear();
  }

  ///// Add attribute /////
  var addAttribute = function(){
    var k = document.getElementById('PageViewAttributeKey').value;
    var v = document.getElementById('PageViewAttributeValue').value;
    if (k){
      attributes[k] = v;
      alert('Attribute added correctly.');
    } 
    else {
      alert('A key value is required for the attribute.')
    }
    clearAttribute();
  }

  ///// Add custom flag /////
  var addCustomFlag = function(){
    var k = document.getElementById('PageViewFlagKey').value;
    var v = document.getElementById('PageViewFlagValue').value;
    if (k){
      customFlags[k] = v;
      alert('Custom flag added correctly.');
    } 
    else {
      alert('A key value is required for the custom flag.')
    }
    clearFlag();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputPageView")).forEach(
      input => (input.value = "")
    );
    attributes = {};
    customFlags = {};
  }

  ///// Clear attribute inputs /////
  var clearAttribute = function(){
    document.getElementById('PageViewAttributeKey').value = "";
    document.getElementById('PageViewAttributeValue').value = "";
  }

  ///// Clear custom flag inputs /////
  var clearFlag = function(){
    document.getElementById('PageViewFlagKey').value = "";
    document.getElementById('PageViewFlagValue').value = "";
  }

  ///// Reset inputs and products /////
  var reset = function(){
    clear();
  }

  return (
    <Card className='CardPageView' id='CardPageView'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Select type and log a Page View. 
        </Card.Text>
        <div>
          <form>
            <label>Event Name:&nbsp;</label>
            <input className='InputPageView' type="text" name="EventValue" />
            <br></br><br></br><hr></hr>
            <p><u>Attributes:</u></p>
            <label>Key:&nbsp;</label>
            <input className='InputPageView' id='PageViewAttributeKey' type="text" name="EventAttributes"/>
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Value:&nbsp;</label>
            <input className='InputPageView' id='PageViewAttributeValue' type="text" name="EventAttributes"/>
            <br></br><br></br>
            <p><u>Custom flags:</u></p>
            <label>Key:&nbsp;</label>
            <input className='InputPageView' id='PageViewFlagKey' type="text" name="EventFlags"/>
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Value:&nbsp;</label>
            <input className='InputPageView' id='PageViewFlagValue' type="text" name="EventFlags"/>
          </form>
        </div>
        <br></br>
        <div className='d-flex justify-content-end mt-4'>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addAttribute}>Add Attribute</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addCustomFlag}>Add Custom Flag</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={reset}>Reset</Button>
          <Button className='ButtonCard' variant="primary" onClick={logPageViewEvent}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;

