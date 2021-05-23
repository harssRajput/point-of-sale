import React from "react";
import dataset from "../dataset/pos.products.json";

import CartItem from "./CartItem";
import Footer from "./Footer";

class Cart extends React.Component {
  constructor() {
    super();
    // console.log("inside constructor");
    this.state = {
      products: dataset.map((data) => {
        let newData = data;
        newData["qty"] = 1;
        return newData;
      }),
      totalQty:0,
    };
  }

  handleTotalQuantity = () =>{
    const{products} = this.state;

    let totalQty=0;
    for(let product of products)
    {
      totalQty += product.qty;
    }

    this.setState({totalQty: totalQty});
  }

  handleIncreaseQuantity = (product) => {
    // console.log("it's working");
    const index = this.state.products.indexOf(product);
    this.state.products[index].qty++;

    this.setState({
      products: this.state.products,
    });

    this.handleTotalQuantity();
  };
  handleDecreaseQuantity = (product) => {
    // console.log("it's working");
    const index = this.state.products.indexOf(product);

    if (this.state.products[index].qty === 0) {
      return;
    }

    this.state.products[index].qty--;

    this.setState({
      products: this.state.products,
    });

    this.handleTotalQuantity();

  };

  handleDeleteItem = (prdt) => {
    const item = this.state.products.filter((product) => {
      return prdt !== product;
    });

    // console.log("it's working", item);
    this.setState({
      products: item,
    });

    this.handleTotalQuantity();
  };

  render() {
    console.log("products ", this.state);
    const { products } = this.state;
    return (
      <div className="cart">
        <div className="cart-header">
          <table>
            <thead></thead>
            <tbody>
              <tr>
                {/* <td>
                  <span>delete</span>
                </td> */}
                <td>
                  <span>PRODUCTS</span>
                </td>
                <td>
                  <span>PRICE</span>
                </td>
                <td>
                  <span>QUANTITY</span>
                </td>
                <td>
                  <span>TOTAL</span>
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
        <div className="items">
          <table>
            <thead></thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <CartItem
                    product={product}
                    key={index}
                    onIncreaseQuantity={this.handleIncreaseQuantity}
                    onDecreaseQuantity={this.handleDecreaseQuantity}
                    onDeleteItem={this.handleDeleteItem}
                  />
                );
              })}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
        <Footer
          totalQty={this.state.totalQty}
        />
      </div>
    );
  }
}

export default Cart;
