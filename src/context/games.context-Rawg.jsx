import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { RAWG_URL } from '../services/external_urls.js'

const ProductContext = createContext();

const ProductProvider = ({ children }) => {

    const [games, setGames] = useState([])


    const getGames = () => {   
        axios.get(RAWG_URL)
            .then((response) => {
                console.log("Games =", response.name) 
                setGames(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }

    useEffect(() => {
        
        getGames()

    }, [])

  return (
    <ProductContext.Provider value={{ games }}>
        {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };

//new