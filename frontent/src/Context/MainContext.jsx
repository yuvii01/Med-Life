import React, { createContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Context = createContext();

const MainContext = (props) => {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const CATEGORY_BASE_URL = process.env.REACT_APP_CATEGORY_BASE_URL;
    const COLOR_BASE_URL = process.env.REACT_APP_COLOR_BASE_URL;
    const PRODUCT_BASE_URL = process.env.REACT_APP_PRODUCT_BASE_URL;
    const USER_BASE_URL = process.env.REACT_APP_USER_BASE_URL;
    const CART_BASE_URL = process.env.REACT_APP_CART_BASE_URL;
    const CART_ORDER_URL = process.env.REACT_APP_ORDER_BASE_URL;



    const [category, setCategory] = useState([]);
    const [categoryImageUrl, setCategoryImageUrl] = useState("");
    const [colors, setColor] = useState([]);
    const [products, setProduct] = useState([]);
    const [productImageUrl, setProductImageUrl] = useState("");

    const fetchProduct = (limit = 0, color_id = null, category_slug = null) => {
        const urlQuery = new URLSearchParams({ limit, color_id, category_slug });
        axios.get(API_BASE_URL + PRODUCT_BASE_URL + `?${urlQuery.toString()}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setProduct(success.data.product);
                        setProductImageUrl(success.data.imageBaseUrl);
                    } else {

                    }
                }
            ).catch(
                () => {

                }
            )
    }

    useEffect(
        () => {
            fetchCategory();
            fetchColor();
            fetchProduct();
        }, []
    )


    const fetchCategory = () => {
        axios.get(API_BASE_URL + CATEGORY_BASE_URL)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setCategory(success.data.category);
                        setCategoryImageUrl(success.data.imageBaseUrl);
                    } else {

                    }
                }
            ).catch(
                () => {

                }
            )
    }


    const fetchColor = () => {
        axios.get(API_BASE_URL + COLOR_BASE_URL)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setColor(success.data.colors);
                    } else {

                    }
                }
            ).catch(
                () => {

                }
            )
    }


    const openToast = (msg, flag) => {
        toast(msg, { type: flag });
    }

  



    return (
        <Context.Provider value={{ CART_ORDER_URL, category, USER_BASE_URL, setProduct, productImageUrl, products, fetchColor, fetchProduct, fetchCategory, colors, categoryImageUrl, openToast, API_BASE_URL, PRODUCT_BASE_URL, CATEGORY_BASE_URL, COLOR_BASE_URL, CART_BASE_URL }}>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    );
}
export { Context };
export default MainContext;
