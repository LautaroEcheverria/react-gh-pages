import './Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'IDSync API Request';
  var mParticle = window.mParticle;

  window.mParticle.logEvent("Test Event",mParticle.EventType.Other,{"attribute":"true"});

  ///// Login API /////
  var login = function(){
    var identityRequest = {
      userIdentities: {
        customerid: "LautaroTest3",
        email: 'please-work@please-work-lautaro.com'
      }
    };
    var identityCallback = function(result) { 
    };
    /*
    var inputs = document.querySelectorAll("input.InputIdSync");
    for (var e of inputs) {
      if (e.value) {
        identityRequest.userIdentities[e.name] = e.value;
      }
    }
    if (identityRequest.userIdentities["customerid"] || identityRequest.userIdentities["email"]){
      mParticle.Identity.login(identityRequest,identityCallback);
      clear();
    }
    else {
      alert("At least the Customer ID or Email must be provided.")
    }
    */
    mParticle.Identity.login(identityRequest,identityCallback);

  }

  ///// Logout API /////
  var logout = function(){
    var identityCallback = function(result) { 
      if (result.getUser()) { 
        //proceed with logout 
      } 
    };
    mParticle.Identity.logout({}, identityCallback);
    clear();
  }

  ///// Modify API call /////
  var modify = function(){
    var identityRequest = {
      userIdentities: {
      }
    };
    var identityCallback = function(result) { 
      if (result.getUser()) { 
        //proceed with login 
      } 
    };
    var inputs = document.querySelectorAll("input.InputIdSync");
    for (var e of inputs) {
      if (e.value) {
        identityRequest.userIdentities[e.name] = e.value;
      }
    }
    if (identityRequest.userIdentities["customerid"] || identityRequest.userIdentities["email"]){
      mParticle.Identity.modify(identityRequest,identityCallback);
      clear();
    }
    else {
      alert("At least the Customer ID or Email must be provided.")
    }
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputIdSync")).forEach(
      input => (input.value = "")
    );
  }

  return (
    <Card className='Card' style={{width: "100%"}} id='CardIdSync'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Add the user identities values. 
        </Card.Text>
        <form>
          <div className='d-flex mb-3'>
            <div className='col-3'>
              <label>Customer ID:&nbsp;</label>
              <input className='InputIdSync' type="text" name="customerid" id='CustomerID'/>
            </div>
            <div className='col-3'>
              <label>Email:&nbsp;</label>
              <input className='InputIdSync' type="text" name="email" id='Email'/>
            </div>
            <div className='col-3'>
              <label>Other:&nbsp;</label>
              <input className='InputIdSync' type="text" name="other" id='Other'/>
            </div>
            <div className='col-3'>
              <label>Other 2:&nbsp;</label>
              <input className='InputIdSync' type="text" name="other2" id='Other2'/>
            </div>
          </div>
          <div className='d-flex mb-3'>
            <div className='col-3'>
              <label>Other 3:&nbsp;</label>
              <input className='InputIdSync' type="text" name="other3" id='Other3'/>
            </div>
            <div className='col-3'>
              <label>Mobile Number:&nbsp;</label>
              <input className='InputIdSync' type="text" name="mobile_number" id='MobileNumber'/>
            </div>
            <div className='col-3'>
              <label>Phone Number 2:&nbsp;</label>
              <input className='InputIdSync' type="text" name="phone_number_2" id='PhoneNumber2'/>
            </div>
            <div className='col-3'>
              <label>Phone Number 3:&nbsp;</label>
              <input className='InputIdSync' type="text" name="phone_number_3" id='PhoneNumber3'/>
            </div>
          </div>
          <div className='d-flex mb-3'>
            <div className='col-3'>
              <label>Facebook:&nbsp;</label>
              <input className='InputIdSync' type="text" name="facebook" id='Facebook'/>
            </div>
            <div className='col-3'>
              <label>FB Cust. Audience ID:&nbsp;</label>
              <input className='InputIdSync' type="text" name="facebookcustomaudienceid" id='FacebookCustomAudienceId'/>
            </div>
            <div className='col-3'>
              <label>Google:&nbsp;</label>
              <input className='InputIdSync' type="text" name="google" id='Google'/>
            </div>
            <div className='col-3'>
              <label>Twitter:&nbsp;</label>
              <input className='InputIdSync' type="text" name="twitter" id='Twitter'/>
            </div>
          </div>
          <div className='d-flex mb-3'>
            <div className='col-3'>
              <label>Microsoft:&nbsp;</label>
              <input className='InputIdSync' type="text" name="microsoft" id='Microsoft'/>
            </div>
            <div className='col-3'>
              <label>Yahoo:&nbsp;</label>
              <input className='InputIdSync' type="text" name="yahoo" id='Yahoo'/>
            </div>
          </div>
        </form>
        <br></br>
        <div className='d-flex justify-content-end'>
          <Button className='ButtonCard' style={{marginRight: "5px"}} variant="primary" disabled>Identify</Button>
          <Button className='ButtonCard' style={{marginRight: "5px"}} variant="primary" onClick={login}>Login</Button>
          <Button className='ButtonCard' style={{marginRight: "5px"}} variant="primary" onClick={logout}>Logout</Button>
          <Button className='ButtonCard' style={{marginRight: "5px"}} variant="primary" onClick={modify}>Modify</Button>
          <Button className='ButtonCard' variant="secondary" onClick={clear}>Clear</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
