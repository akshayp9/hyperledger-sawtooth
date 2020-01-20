var { _hash } = require("./lib");
var { TP_NAMESPACE } = require("./constants");

class SimpelStoreState {
 constructor(context) {
   this.context = context;
   this.timeout = 500;
   this.stateEntries = {};
 }

 setValue(value) {
   var address = makeAddress(value);
   var stateEntriesSend = {}
   stateEntriesSend[address] = Buffer.from("Asset Registered - " + value);
   return  this.context.setState(stateEntriesSend, this.timeout).then(function(result) {
     console.log("Success", result)
   }).catch(function(error) {
     console.error("Error", error)
   })
 }

 getValue(value) {
   return  this.context.getState([value], this.timeout).then(function(stateEntries) {
     Object.assign(this.stateEntries, stateEntries);
     console.log(this.stateEntries[value].toString())
     return  this.stateEntries;
   }.bind(this))
 }
}

const makeAddress = (x, label) => TP_NAMESPACE + _hash(x)
console.log(makeAddress)
console.log(TP_NAMESPACE)
module.exports = SimpelStoreState;
