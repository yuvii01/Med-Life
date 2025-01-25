import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: "User",
    initialState: {
        data: null,
    },
    reducers: {
        login(currentState, { payload }) {
            currentState.data = payload.user;
            localStorage.setItem("user", JSON.stringify(currentState));
        },
        logout(currentState) {
            currentState.data = null;
            localStorage.removeItem("user");
        },
        lsLogin(currentState) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                currentState.data = user.data;
            }
        }
    }
});

export const { login, logout, lsLogin } = UserSlice.actions;
export default UserSlice.reducer;
