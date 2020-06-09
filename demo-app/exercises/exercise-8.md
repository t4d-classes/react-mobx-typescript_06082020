# Exercise 8

## Steps

1. Move the car form in Car Tool into a new component named Car Form. Utilize the Car Form component in Car Tool.

2. In the Car Table component, add a new header column with a label of 'Actions'.

3. In the Car View Row component, add a new column. In the new column place a button with a label of "Delete". When the button is clicked remove the car from the table.

Hint: to remove an object from an array use the array filter method:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter


4. Create a new component named Car Edit Row. The Car Edit Row is similar to Car View Row except the columns for make, model, year, color and price are input fields. When the Car Edit Row is displayed, prepopulate the fields with the data of the car being edited. Do not make the Id an input field. In the last column, there should be two buttons: save and cancel. Do not implement the logic to do that save and cancel, but display the buttons.

5. Add a button labeled edit to the last column of the Car View Row component. When the button is clicked the row on which it is clicked changes to a Car Edit Row. Only one row is editable at a time. You data structure should only support editing one row at a time.

6. Fully implement save car and cancel car buttons. Be sure to perform you save operation with immutable programming techniques. If you cancel, revert the changes back to the original.

Hint: Helpful JavaScript API functions: findIndex

7. If one of the table rows is being edited, the row should change to a view row after, a car is added, or a car is deleted, or a car is saved.

8. Ensure it works!