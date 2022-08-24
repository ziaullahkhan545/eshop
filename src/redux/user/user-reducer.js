
import { userActionTypes } from "./user-action-types";

const INTIAL_STATE = {
    currentUser: null
}

const UserReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.set_current_user:
            return {
                ...state, 
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;