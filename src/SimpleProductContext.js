import React from 'react'

const SimpleProductContext = React.createContext(
    {
        barbells: [],
        compare:[],
        toCompare: false,
        compareProducts: () => {},
        clearProducts: () => {},
    }
)

export default SimpleProductContext