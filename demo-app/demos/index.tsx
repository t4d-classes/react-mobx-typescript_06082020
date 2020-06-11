import { observable, autorun } from 'mobx';


// const person2 = {
//   // firstName: 'Bob',
//   _firstName: '',

//   get firstName() {

//     window.mobxCurrentContext.dependencies.push('firstName');

//     return this._firstName;
//   },

//   set firstName(value) {
//     this._firstName = value;

//     window.getAllContextsWithDependency('firstName').forEach(context => {
//       context.fnToRun();
//     })
//   }
// };


// const autorun2 = (fn) => {

//   window.mobxCurrentContext = {
//     context: 'autorun2',
//     fnToRun: fn,
//     dependencies: [],
//   };

//   fn();

// };



const person = observable({
  firstName: 'Bob',
  lastName: 'Smith',
});

autorun(() => {

  console.log('firstName changed: ', person.firstName);

});

setTimeout(() => {
  person.firstName = 'Sally';
}, 2000);

setTimeout(() => {

  let { firstName } = person;

  firstName = 'Sri';

  console.log(firstName, 'inside the setTimeout');

}, 4000);

