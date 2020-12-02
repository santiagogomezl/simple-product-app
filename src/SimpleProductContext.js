import React from 'react'

const SimpleProductContext = React.createContext(
    {
        products: [],
        compare:[],
        toCompare: false,
        compareProducts: () => {},
        clearProducts: () => {},
        //dashboard and admin
        store:{},
        updateStore: () => {},
        updateProduct: () => {},
        addProduct: () => {},
        deleteProduct: () => {},
        logIn: () => {},
        logOut: () => {},
    }
)

export default SimpleProductContext