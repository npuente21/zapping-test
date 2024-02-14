import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import UserSourceService from "./API/userService";
import createStore from "./components/redux/store";

import SignUpView from "./components/redux/containers/signup/SignUpView";
import HomeView from "./components/redux/containers/home/homeView";
import LoginView from "./components/redux/containers/login/loginView";

const userService = UserSourceService({ baseUrl: 'http://localhost:8080' });
const store = createStore(
  {
    userService
  }

);

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView/>} />
          <Route path="/login" element={<LoginView/>} />
          <Route path="/sign-up" element={<SignUpView/>} />
    
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}