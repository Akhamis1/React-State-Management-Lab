import { useState } from "react";

const items = [
  { id: 1,
  name: "Black T shirt",
  price: 5
  },
  { id: 2,
  name: "Hanger Set",
  price: 8 
  },
  { id: 3, 
  name: "Thoub",
  price: 12 
  },
  { id: 4,
  name: "Computer Bag",
  price: 20
   },
  { id: 5,
  name: "Couch",
  price: 50 
  },
  { id: 6,
  name: "Gaming Chair",
  price: 70 
  },
];

function App() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(100);
  const [warningMessage, setWarningMessage] = useState(null);

  const availableItems = items.filter(
  (item) =>
  shoppingCart.find((cartItem) => cartItem.id === item.id) === undefined,
  );

  function handleAddToCart(item) {
  if (availableBalance <= item.price) {
  setWarningMessage(
  "Insufficient funds.",
  );
  setTimeout(() => setWarningMessage(null), 4000);
   return;
  }

  setShoppingCart((cart) => [...cart, item]);
  setAvailableBalance((balance) => balance - item.price);
  setWarningMessage(null);
  }

  function handleRemoveFromShoppingCart(item) {
  setShoppingCart((cart) =>
  cart.filter((cartItem) => cartItem.id !== item.id),
  );
  setAvailableBalance((balance) => balance + item.price);
  setWarningMessage(null);
  }

  return (
    <>
  <h1>Sayed Hameds Closet</h1>
  <h2>Your Balance: {availableBalance}</h2>
  {warningMessage && <p role="alert">{warningMessage}</p>}

  <h2>Available Items</h2>
  {availableItems.length === 0 ? (
  <p>No items are currently available.</p>
  ) : (
  availableItems.map((item) => (
  <div key={item.id}>
  <h3>{item.name}</h3>
  <p>Price: {item.price}</p>
  <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
</div>
))
)}

<h2>Shopping Cart</h2>
{shoppingCart.length === 0 ? (
<p>Your shopping cart is empty.</p>
) : (
shoppingCart.map((item) => (
<div key={item.id}>
<h3>{item.name}</h3>
<p>Price: {item.price}</p>
<button onClick={() => handleRemoveFromShoppingCart(item)}>
Remove from Cart
</button>
</div>
))
)}
</>
);
}

export default App;
