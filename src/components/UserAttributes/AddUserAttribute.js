import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Add User Attribute';
  var mParticle = window.mParticle;

  ///// Add user attributes /////
  var addUserAttribute = function(){
    var currentUser = mParticle.Identity.getCurrentUser();
    var inputs = document.querySelectorAll("input.InputAddAttribute");
    var key, value;
    for (var e of inputs) {
      if (e.name === "AttributeKey") {
        key = e.value;
      }
      if (e.name === "AttributeValue") {
        value = e.value;
      }
    }
    currentUser.setUserAttribute("$firstname","");
    currentUser.setUserAttribute("$lastname","");
    clear();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputAddAttribute")).forEach(
      input => (input.value = "")
    );
  }

  return (
    <Card className='Card' id='CardUserAttributes'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Add the user attribute to user. 
        </Card.Text>
        <div className='mb-3'>
          <form>
            <label>Attribute:&nbsp;</label>
            <input className='InputAddAttribute' type="text" name="AttributeKey" />
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Value:&nbsp;</label>
            <input className='InputAddAttribute' type="text" name="AttributeValue" />
          </form>
        </div>
        <br></br>
        <div className='d-flex justify-content-end'>
          <Button className='ButtonCard' variant="primary" onClick={addUserAttribute}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
