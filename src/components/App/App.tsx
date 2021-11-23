import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "../Header/Header";
import Login from "../../pages/Login";
import Register from "../../pages/Signup";
import Home from "../../pages/Home/Home";
import SinglePost from "../../pages/SinglePost/SinglePost";
import Profile from "../../pages/Profile/Profile";
import UsersList from "../../pages/UsersList";
import PrivateRoute from "../../utils/PrivateRoute";
import GlobalStyle from "../../style/global";
import { LightTheme, DarkTheme } from "../../style/themes";

function App() {
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <Router>
        <Header />
        <div>
          <input
            onClick={toggleTheme}
            type="checkbox"
            id="toggle-button"
            className="toggle-button"
          />
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/posts/:post_id" component={SinglePost} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/users-list" component={UsersList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
