
import { userActionTypes } from "./user-action-types"

export const setCurrentUser =  user => ({
    type: userActionTypes.set_current_user,
    payload: user
})