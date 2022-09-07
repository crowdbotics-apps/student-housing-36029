import AuthReducer from "./AuthReducer";
import ChatReducer from "./ChatReducer";
import OwnerReducer from "./OwnerReducer";
import ProfileReducer from "./ProfileReducer";
import PropertyReducer from "./PropertyReducer";

export default {
    Auth: AuthReducer,
    Profile: ProfileReducer,
    Property: PropertyReducer,
    Owner: OwnerReducer,
    Chat: ChatReducer
}