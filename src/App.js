import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";

  function App() {
    const [cart, setcart] = useState([]);

    function addToCart(book) {
      setcart([...cart, {...book, quantity: 1}])
    }

    function changeQuantity(book, quantity) {
      setcart(cart.map(item =>  item.id === book.id
        ? {
          ...item,
          quantity: +quantity,
        } 
        : item
      )
      );
    }

    function removeItem (item) {
      setcart(cart.filter(book => book.id !== item.id))
    }

    function numberOfItems() {
      let counter = 0;
      cart.forEach(item => {
        counter += item.quantity
      })
      return counter;
    }

    useEffect(() => {
      console.log(cart)
    }, [cart])

  return (
    <Router>
      <div>
        <Nav numberOfItems={numberOfItems()}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={books} />} />
          <Route path="/books/:id" element={<BookInfo books={books} addToCart={addToCart} cart={cart} />} />
          <Route path="/cart" element={<Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

