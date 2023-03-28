import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Log Impression Event';
  var mParticle = window.mParticle;
  var products = [];

  ///// Log an impression event /////
  var logImpressionEvent = function(){
    var inputs = document.querySelectorAll("input.InputImpressionEvent");
    var EventName;
    var nameP, skuP, priceP, quantityP;
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
        if (e.name === "EventProduct") {
          if(e.id === "NameProductImpressionEvent" && e.value) {
            nameP = e.value;
          }
          if(e.id === "SkuProductImpressionEvent" && e.value) {
            skuP = e.value;
          }
          if(e.id === "PriceProductImpressionEvent" && e.value) {
            priceP = e.value;
          }
          if(e.id === "QuantityProductImpressionEvent") {
            quantityP = e.value;
          }
        }
      }
    }
    if (nameP && skuP && priceP){
      products.push(mParticle.eCommerce.createProduct(
                      nameP,
                      skuP,
                      priceP,
                      quantityP
                    ));
    }
    var impression = mParticle.eCommerce.createImpression(EventName, products);
    mParticle.eCommerce.logImpression(impression);
    clear();
  }

  ///// Add product /////
  var addProduct = function(){
    var nameP = document.getElementById('NameProductImpressionEvent').value;
    var skuP = document.getElementById('SkuProductImpressionEvent').value;
    var priceP = document.getElementById('PriceProductImpressionEvent').value;
    var quantityP = document.getElementById('QuantityProductImpressionEvent').value;    
    if (nameP && skuP && priceP){
      products.push(mParticle.eCommerce.createProduct(
                      nameP,
                      skuP,
                      priceP,
                      quantityP
                    ));
      alert('Product added correctly.');
    } 
    else {
      alert('A name, SKU and price are required for the product.')
    }
    clearProduct();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputImpressionEvent")).forEach(
      input => (input.value = "")
    );
    products = [];
  }

  ///// Clear product inputs /////
  var clearProduct = function(){
    document.getElementById('NameProductImpressionEvent').value = "";
    document.getElementById('SkuProductImpressionEvent').value = "";
    document.getElementById('PriceProductImpressionEvent').value = "";
    document.getElementById('QuantityProductImpressionEvent').value = "";    
  }

  ///// Reset inputs and products /////
  var reset = function(){
    clear();
  }

  return (
    <Card className='Card' id='CardLogImpressionEvent'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Select name, products and log an Impression Event. 
        </Card.Text>
        <div>
          <form>
            <label>Event Name:&nbsp;</label>
            <input className='InputImpressionEvent' type="text" name="EventValue" />
            <br></br><br></br><hr></hr>
            <p><u>Product:</u></p>
            <label>Name:&nbsp;</label>
            <input className='InputImpressionEvent' id='NameProductImpressionEvent' type="text" name="EventProduct" />
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>SKU:&nbsp;</label>
            <input className='InputImpressionEvent' id='SkuProductImpressionEvent' type="text" name="EventProduct" />
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Price:&nbsp;</label>
            <input className='InputImpressionEvent' id='PriceProductImpressionEvent' type="number" name="EventProduct" />
            <p style={{height: "1px"}}>&nbsp;</p>
            <label>Quantity:&nbsp;</label>
            <input className='InputImpressionEvent' id='QuantityProductImpressionEvent' type="number" name="EventProduct" />
          </form>
        </div>
        <br></br><br></br>
        <div className='d-flex justify-content-end mt-5'>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addProduct}>Add Product</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={reset}>Reset</Button>
          <Button className='ButtonCard' variant="primary" onClick={logImpressionEvent}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
