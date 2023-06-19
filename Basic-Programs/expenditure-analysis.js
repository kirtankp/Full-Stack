/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]

  Once you've implemented the logic, test your code by running
  - `npm run test-expenditure-analysis`
*/

function calculateTotalSpentByCategory(transactions) {
  let items = {};
  transactions.forEach((trans) => {
    //let { category, price } = trans;

    if (items[trans.category] === undefined) {
      items[trans.category] = trans.price;
    } else {
      items[trans.category] += trans.price;
    }
  });

  let Output = [];
  let keys = Object.keys(items);

  keys.forEach(key => {
    Output.push({ "category": key, "totalSpent": items[key] });
  });

  return Output;
}

let transactions = [
  { itemName: "Pizza", category: "Food", price: 150, timestamp: "2023-06-10" },
  { itemName: "Laptop", category: "Gadget", price: 200000, timestamp: "2023-06-10" },
  { itemName: "Pen", category: "Stationary", price: 15, timestamp: "2023-06-10" },
  { itemName: "Roti Shabji", category: "Food", price: 200, timestamp: "2023-06-10" },
  { itemName: "Chess", category: "Game", price: 100, timestamp: "2023-06-10" },
  { itemName: "Dosa", category: "Food", price: 70, timestamp: "2023-06-10" }
];
console.log(calculateTotalSpentByCategory(transactions));
module.exports = calculateTotalSpentByCategory;
