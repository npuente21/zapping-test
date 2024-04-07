import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import UserSourceService from "./API/userService";
import StreamSourceService from "./API/streamService";
import createStore from "./components/redux/store";

import SignUpView from "./components/redux/containers/signup/SignUpView";
import HomeView from "./components/redux/containers/home/homeView";
import LoginView from "./components/redux/containers/login/loginView";
import Navbar from "./components/redux/containers/layout/navbar";
import ProtectedRoute from "./components/redux/containers/protectedRoute";

const userService = UserSourceService({ baseUrl: process.env.REACT_APP_API_URL });
const streamService = StreamSourceService({ baseUrl: process.env.REACT_APP_GO_API_URL });
const store = createStore(
  {
    userService,
    streamService,
  }

);

export default function App() {
  return (
    <Provider store={store}>
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomeView />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginView/>} />
          <Route path="/sign-up" element={<SignUpView/>} />
         
    
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}