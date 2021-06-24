import "./App.css";
import Products from "./components/Products/Products";
import productDetails from "./static/data/products";

function App() {
  return (
    <div className="App">
      <Products productDetails={productDetails} />
    </div>
  );
}

export default App;
