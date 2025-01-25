import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Reducers/cartSlice";
import UserReducer from "./Reducers/UserSlice"
const store = configureStore(
    {
        reducer: {
            cart: CartReducer,
            user: UserReducer,
        }
    }
)
export default store;