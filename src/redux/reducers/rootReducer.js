import AuthReducer from "./AuthReducer"
import ChatReducer from "./ChatReducer"
import OwnerReducer from "./OwnerReducer"
import ProfileReducer from "./ProfileReducer"
import PropertyReducer from "./PropertyReducer"
import UsersReducer from "./UsersReducer"
import BookingsReducer from "./BookingsReducer"
import AllChatsreducer from "./AllChatsReducer"

export default {
  Auth: AuthReducer,
  Profile: ProfileReducer,
  Property: PropertyReducer,
  Owner: OwnerReducer,
  Chat: ChatReducer,
  Users: UsersReducer,
  Bookings: BookingsReducer,
  AllChat: AllChatsreducer
}
