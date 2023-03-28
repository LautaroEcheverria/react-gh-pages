import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Add User Tag';
  var mParticle = window.mParticle;

  ///// Add user tags /////
  var addUserTag = function(){
    var currentUser = mParticle.Identity.getCurrentUser();
    var inputs = document.querySelectorAll("input.InputAddTag");
    var key;
    for (var e of inputs) {
      if (e.name === "AttributeKey") {
        key = e.value;
      }
    }
    currentUser.setUserTag(key);
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
          Add the user tag to user. 
        </Card.Text>
        <div className='mb-4'>
          <form>
            <label>Tag:&nbsp;</label>
            <input className='InputAddTag' type="text" name="AttributeKey" />
          </form>
        </div>
        <br></br>
        <br></br>
        <div className='d-flex justify-content-end mt-2'>
          <Button className='ButtonCard' variant="primary" onClick={addUserTag}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
