import { loginUser } from "../utils/handler";

export default class AuthService {

  login = data => {
    return loginUser(data)
      .then(res => {
        if (res.status != 200) throw "User was not found / wrong password";
        return res.json();
      })
      .then(json => {
        this.setUserInfo(json);
      })
      .catch(e => {
        throw e;
      });
  };

  loggedIn = () => {
    const token = this.getToken();
    return !!token;
  };

  setUserInfo(idToken) {
    localStorage.setItem("user", idToken);
  }

  getToken = () => {
    return localStorage.getItem("user");
  };

  logout = () => {
    localStorage.removeItem("user");
  };
}
