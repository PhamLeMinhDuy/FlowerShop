const CartUtil = {
    getTotal(mycart) {
      var total = 0;
      for (const item of mycart) {
        total += item.plant.price * item.quantity;
      }
      return total;
    }
  };
  export default CartUtil;