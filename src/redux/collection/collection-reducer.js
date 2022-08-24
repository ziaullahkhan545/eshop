
import SHOP_DATA from "../../assets/collection-shop"

const INITIAL_STATE = {
    collections: SHOP_DATA
}

const CollectionReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default CollectionReducer;