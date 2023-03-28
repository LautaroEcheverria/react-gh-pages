import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Add User Attribute List';
  var mParticle = window.mParticle;
  var values = [];

  ///// Add user attribute list /////
  var addUserAttributeList = function(){
    var currentUser = mParticle.Identity.getCurrentUser();
    var inputs = document.querySelectorAll("input.InputAddAttributeList");
    var k;
    for (var e of inputs) {
      if (e.value && e.name === "AttributeKey") {
        k = e.value;
      }
      if (e.value && e.name === "AttributeValue") {
        values.push(e.value);
      }
    }
    currentUser.setUserAttributeList(k,values);
    clear();
  }

  ///// Add a value to the array of values passed with the attribute /////
  var addValueToArray = function(){
    var inputs = document.querySelectorAll("input.InputValue");
    for (var e of inputs) {
      if (e.value && e.name === "AttributeValue") {
        values.push(e.value);
      }
    }
    alert('Value added correctly.');
    clearValue();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputAddAttributeList")).forEach(
      input => (input.value = "") 
    );
    values = [];
  }

  ///// Clear value input /////
  var clearValue = function(){
    document.getElementById('ListValues').value = "";
  }

  ///// Reset inputs and array of values /////
  var reset = function(){
    clear();
    values = [];
  }

  return (
    <Card className='Card' id='CardUserAttributes'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Add the user attribute list to user. 
        </Card.Text>
        <div className='mb-3'>
          <form>
            <label>Attribute:&nbsp;</label>
            <input className='InputAddAttributeList' type="text" name="AttributeKey" />
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Value:&nbsp;</label>
            <input className='InputAddAttributeList' id='ListValues' type="text" name="AttributeValue" />
          </form>
        </div>
        <br></br>
        <div className='d-flex justify-content-end'>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addValueToArray}>Add Value</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={reset}>Reset</Button>
          <Button className='ButtonCard' variant="primary" onClick={addUserAttributeList}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
