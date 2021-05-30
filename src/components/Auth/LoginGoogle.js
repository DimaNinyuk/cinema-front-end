import React, {useEffect} from "react";
import axios from "axios";
import history from '../../history'
const LoginGoogle = (props) => {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            // Login...
        
        axios.get("http://localhost:8000/api/auth/google/callback"+props.location.search).then(
          (response) => {
            //console.log(response);
            // LOGIN
                     history.push("/profile")
                    },
                    // GET USER ERROR
                    (error) => {
                     console.log(error);
                    }
        );
    });
    }, []);
      return (
        <div className=""> 
        </div>
      );
}
export default LoginGoogle;