import { sendPasswordResetEmail } from "firebase/auth";
import appAuth from "./firebaseConfig/config";



export function resetAccountWithFirebase() {
    sendPasswordResetEmail(appAuth(), email)
        .then(() => {
            // Password reset email sent!
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

}
