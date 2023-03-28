import '../Components.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function App() {
  var titleCard = 'Log Purchase Event';
  var mParticle = window.mParticle;
  var products = [];
  var transactionAttributes = {}, customAttributes = {}, customFlags = {};

  ///// Log a purchase event /////
  var logPurchaseEvent = function(){
    var inputs = document.querySelectorAll("input.InputPurchaseEvent");
    var name, sku, price, quantity;
    var id, revenue, shipping, tax;
    var kAttr, kFlag, vAttr, vFlag;
    for (var e of inputs) {
      if (e.name === "EventProduct") {
        if(e.id === "NameProductPurchaseEvent" && e.value) {
          name = e.value;
        }
        if(e.id === "SkuProductPurchaseEvent" && e.value) {
          sku = e.value;
        }
        if(e.id === "PriceProductPurchaseEvent" && e.value) {
          price = e.value;
        }
        if(e.id === "QuantityProductPurchaseEvent") {
          quantity = e.value;
        }
      }
      if (e.name === "EventTransactionAttributes") {
        if(e.id === "IdTransactionAttribute" && e.value) {
          id = e.value;
        }
        if(e.id === "RevenueTransactionAttribute") {
          revenue = e.value;
        }
        if(e.id === "ShippingTransactionAttribute") {
          shipping = e.value;
        }
        if(e.id === "TaxTransactionAttribute") {
          tax = e.value;
        }
      }
      if (e.name === "EventCustomAttributes") {
        if(e.id === "PurchaseEventCustomAttributeKey" && e.value) {
          kAttr = e.value;
        }
        if(e.id === "PurchaseEventCustomAttributeValue") {
          vAttr = e.value;
        }
      }
      if (e.name === "EventCustomFlags") {
        if(e.id === "PurchaseEventFlagKey" && e.value) {
          kFlag = e.value;
        }
        if(e.id === "PurchaseEventFlagValue") {
          vFlag = e.value;
        }
      }
    }
    if (name && sku && price){
      products.push(mParticle.eCommerce.createProduct(
                      name,
                      sku,
                      price,
                      quantity
                    ));
    }
    if (id) {
      transactionAttributes["Id"] = id;
      transactionAttributes["Revenue"] = revenue;
      transactionAttributes["Shipping"] = shipping;
      transactionAttributes["Tax"] = tax;
    }
    if (kAttr) {
      customAttributes[kAttr] = vAttr;
    }
    if (kFlag) {
      customFlags[kFlag] = vFlag;
    }
    if (customAttributes && customFlags) {
      mParticle.eCommerce.logProductAction(
        mParticle.ProductActionType.Purchase,
        products,
        customAttributes,
        customFlags,
        transactionAttributes);
    }
    else {
      if (customAttributes && !customFlags){
        mParticle.eCommerce.logProductAction(
          mParticle.ProductActionType.Purchase,
          products,
          customAttributes,
          null,
          transactionAttributes);
      }
      else {
        if (!customAttributes && customFlags){
          mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.Purchase,
            products,
            null,
            customFlags,
            transactionAttributes);
        }
        else {
          mParticle.eCommerce.logProductAction(
            mParticle.ProductActionType.Purchase,
            products,
            null,
            null,
            transactionAttributes);
        }
      }
    }
    clear();
  }

  ///// Add product /////
  var addProduct = function(){
    var nameP = document.getElementById('NameProductPurchaseEvent').value;
    var skuP = document.getElementById('SkuProductPurchaseEvent').value;
    var priceP = document.getElementById('PriceProductPurchaseEvent').value;
    var quantityP = document.getElementById('QuantityProductPurchaseEvent').value;    
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

  ///// Add transaction attribute /////
  var addTransactionAttribute = function(){
    var id = document.getElementById('IdTransactionAtribute').value;
    var revenue = document.getElementById('RevenueTransactionAtribute').value;
    var shipping = document.getElementById('ShippingTransactionAttribute').value = "";
    var tax = document.getElementById('TaxTransactionAtribute').value;
    if (id){
      if (transactionAttributes === null) {
        alert('Transaction attribute added correctly.');
      }
      else {
        alert('New transaction attribute added correctly and old attribute was deleted.');
      }
      transactionAttributes["Id"] = id;
      transactionAttributes["Revenue"] = revenue;
      transactionAttributes["Shipping"] = shipping;
      transactionAttributes["Tax"] = tax;
    } 
    else {
      alert('An id value is required for the transaction attribute.')
    }
    clearTransactionAttribute();
  }

  ///// Add custom attribute /////
  var addCustomAttribute = function(){
    var k = document.getElementById('PurchaseEventCustomAttributeKey').value;
    var v = document.getElementById('PurchaseEventCustomAttributeValue').value;
    if (k){
      customAttributes[k] = v;
      alert('Custom attribute added correctly.');
    } 
    else {
      alert('A key value is required for the custom attribute.')
    }
    clearCustomAttribute();
  }

  ///// Add custom flag /////
  var addCustomFlag = function(){
    var k = document.getElementById('PurchaseEventFlagKey').value;
    var v = document.getElementById('PurchaseEventFlagValue').value;
    if (k){
      customFlags[k] = v;
      alert('Custom flag added correctly.');
    } 
    else {
      alert('A key value is required for the custom flag.')
    }
    clearCustomFlag();
  }

  ///// Clear all inputs /////
  var clear = function(){
    Array.from(document.querySelectorAll("input.InputPurchaseEvent")).forEach(
      input => (input.value = "")
    );
    transactionAttributes = {};
    customAttributes = {};
    customFlags = {};
  }

  ///// Clear product inputs /////
  var clearProduct = function(){
    document.getElementById('NameProductPurchaseEvent').value = "";
    document.getElementById('SkuProductPurchaseEvent').value = "";
    document.getElementById('PriceProductPurchaseEvent').value = "";
    document.getElementById('QuantityProductPurchaseEvent').value = "";    
  }

  ///// Clear transaction attribute inputs /////
  var clearTransactionAttribute = function(){
    document.getElementById('IdTransactionAtribute').value = "";
    document.getElementById('RevenueTransactionAttribute').value = "";
    document.getElementById('ShippingTransactionAttribute').value = "";
    document.getElementById('TaxTransactionAttribute').value = "";
  }

  ///// Clear custom attribute inputs /////
  var clearCustomAttribute = function(){
    document.getElementById('PurchaseEventCustomAttributeKey').value = "";
    document.getElementById('PurchaseEventCustomAttributeValue').value = "";
  }

  ///// Clear custom flag inputs /////
  var clearCustomFlag = function(){
    document.getElementById('PurchaseEventFlagKey').value = "";
    document.getElementById('PurchaseEventFlagKey').value = "";
  }

  return (
    <Card className='CardPurchaseEvent' id='CardLogPurchaseEvent'>
      <Card.Body>
        <Card.Title>{titleCard}</Card.Title>
        <Card.Text>
          Select product, transaction attributes, custom attributes, custom flags and log a Purchase Event. 
        </Card.Text>
        <div className='d-flex mb-3 container-fluid'>
          <form className='d-flex'>
            <div>
              <p><u>Product:</u></p>
              <label>Name:&nbsp;</label>
              <input className='InputPurchaseEvent' id='NameProductPurchaseEvent' type="text" name="EventProduct" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>SKU:&nbsp;</label>
              <input className='InputPurchaseEvent' id='SkuProductPurchaseEvent' type="text" name="EventProduct" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Price:&nbsp;</label>
              <input className='InputPurchaseEvent' id='PriceProductPurchaseEvent' type="number" name="EventProduct" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Quantity:&nbsp;</label>
              <input className='InputPurchaseEvent' id='QuantityProductPurchaseEvent' type="number" name="EventProduct" />
            </div>
            <div>
              <p><u>Transaction attributes:</u></p>
              <label>Id:&nbsp;</label>
              <input className='InputPurchaseEvent' id='IdTransactionAttribute' type="text" name="EventTransactionAttributes" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Revenue:&nbsp;</label>
              <input className='InputPurchaseEvent' id='RevenueTransactionAttribute' type="number" name="EventTransactionAttributes" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Shipping:&nbsp;</label>
              <input className='InputPurchaseEvent' id='ShippingTransactionAttribute' type="text" name="EventTransactionAttributes" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Tax:&nbsp;</label>
              <input className='InputPurchaseEvent' id='TaxTransactionAttribute' type="number" name="EventTransactionAttributes" />
            </div>
            <div>
              <p><u>Custom attributes:</u></p>
              <label>Key:&nbsp;</label>
              <input className='InputPurchaseEvent' id='PurchaseEventCustomAttributeKey' type="text" name="EventCustomAttributes" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Value:&nbsp;</label>
              <input className='InputPurchaseEvent' id='PurchaseEventCustomAttributeValue' type="text" name="EventCustomAttributes" />
            </div>
            <div>
              <p><u>Custom flags:</u></p>
              <label>Key:&nbsp;</label>
              <input className='InputPurchaseEvent' id='PurchaseEventFlagKey' type="text" name="EventCustomFlags" />
              <p style={{height: "1px"}}>&nbsp;</p>
              <label>Value:&nbsp;</label>
              <input className='InputPurchaseEvent' id='PurchaseEventFlagValue' type="text" name="EventCustomFlags" />
            </div>
          </form>
        </div>
        <div className='d-flex justify-content-end mt-4'>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addProduct}>Add Product</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addCustomAttribute}>Add Custom Attribute</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={addCustomFlag}>Add Custom Flag</Button>
          <Button className='ButtonCard' variant="secondary" style={{marginRight: "5px"}} onClick={clear}>Reset</Button>
          <Button className='ButtonCard' variant="primary" onClick={logPurchaseEvent}>Submit</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
