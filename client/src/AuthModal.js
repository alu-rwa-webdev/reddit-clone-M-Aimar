import Input from "./Input";
import Button from "./Button";
import {useState,useContext} from 'react';
import axios from 'axios';
import AuthModalContext from "./AuthModalContext";
import ClickOutHandler from 'react-clickout-handler';
import UserContext from "./UserContext";

function AuthModal() {
  const [modalType,setModalType] = useState('login');
  const [email,setEmail] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const modalContext = useContext(AuthModalContext);
  const user = useContext(UserContext);

  const visibleClass = modalContext.show ? 'block' : 'hidden';
  if (modalContext.show && modalContext.show !== modalType) {
    setModalType(modalContext.show);
  }

  function register(e) {
    e.preventDefault();
    const data = {email,username,password};
    axios.post('http://localhost:4000/register', data, {withCredentials:true})
      .then(() => {
        user.setUser({username});
        modalContext.setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
      });
  }

  function login() {
    const data = {username,password};
    axios.post('http://localhost:4000/login', data, {withCredentials:true})
	  .then(() => {
	    modalContext.setShow(false);
	    user.setUser({username})
	  });
  }

  return (
    <div className={"w-screen h-screen fixed top-0 left-0 z-30 flex "+visibleClass} style={{backgroundColor:'rgba(0,0,0,.6)'}}>
      <ClickOutHandler onClickOut={() => modalContext.setShow(false)}>
        <div className="border border-gray-200 w-/4 sm:w-1/2 md:w1/2 bg-white p-5 self-center rounded-md mx-auto">
          {modalType === 'login' && (
              <h1 className="text-2xl mb-3">Login</h1>
          )}
          {modalType === 'register' && (
              <h1 className="text-2xl mb-3">Register</h1>
          )}
          {modalType === 'register' && (
            <label>
              <span>E-mail:</span>
              <Input type="email" className="mb-3 w-full" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
          )}
          <label>
            <span>Username:</span>
            <Input type="text" className="mb-3 w-full" value={username} onChange={e => setUsername(e.target.value)} />
          </label>

          <label>
            <span>Password:</span>
            <Input type="password" className="mb-3 w-full" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          {modalType === 'login' && (
            <Button className="w-full py-2 mb-3" onClick={()=>login()}>
              Log In
            </Button>
          )}
          {modalType === 'register' && (
            <Button className="w-full py-2 mb-3" onClick={e => register(e)}>
              Sign Up
            </Button>
          )}

          {modalType === 'login' && (
            <div>
              New to Reddit? Click <button className="text-blue-600 text-sm" onClick={() => modalContext.setShow('register')}>SIGN UP</button>
            </div>
          )}
          {modalType === 'register' && (
            <div>
              Already have an account? Click <button className="text-blue-600 text-sm" onClick={() => modalContext.setShow('login')}>LOG IN</button>
            </div>
          )}
        </div>
      </ClickOutHandler>
    </div>
  );
}

export default AuthModal;
