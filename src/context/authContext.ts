import { createContext } from "react";
import { User } from "firebase/auth";


interface AuthContextModel {
    user: User | null; // null when not logged in

}

const defaultValues: AuthContextModel = {
    user: null
}

const AuthContext = createContext(defaultValues)

export default AuthContext;