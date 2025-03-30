import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            data: [],
            total: 0,
        },
        reducers: {
            dbToCart(currentState, { payload }) {
                if (payload && payload.data) {
                    currentState.data = payload.data;
                    currentState.total = payload.total;
                    localStorage.setItem("cart", JSON.stringify(currentState));
                } else {
                    console.error("Invalid payload structure:", payload);
                }
            } ,
            
            addToCart(currentState, { payload }) {
                const d = currentState.data.find(cart => cart.pId === payload.pId)
                if (d) {
                    d.qty++;
                } else {
                    currentState.data.push(payload);
                }
                currentState.total += payload.price;
                localStorage.setItem("cart", JSON.stringify(currentState))
            },

            removeFromCart(currentState, { payload }) {

                const newState = currentState.data.filter(
                    (d) => {
                        return d.pId != payload.pId
                    }
                )
                currentState.data = newState;
                currentState.total -= parseFloat(payload.total_price);
                localStorage.setItem("cart", JSON.stringify(currentState));

            },
            changeCartQty(currentState, { payload }) {
                const d = currentState.data.find(d => d.pId === payload.pId)
                if (payload.flag) {
                    d.qty++;
                    currentState.total += parseFloat(payload.price);

                } else {
                    d.qty--;
                    currentState.total -= parseFloat(payload.price);

                }
                localStorage.setItem("cart", JSON.stringify(currentState))

            },
            lsToCart(currentState) {
                const lsCart = localStorage.getItem("cart");
                if (lsCart != null) {
                    const d = JSON.parse(lsCart);
                    currentState.data = d.data;
                    currentState.total = d.total
                }
            },
            emptyCart(currentState) {
                currentState.data = [];
                currentState.total = 0;
                localStorage.removeItem("Cart")
            }
        }
    }
)
export const { addToCart, removeFromCart, dbToCart, changeCartQty, lsToCart, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;
