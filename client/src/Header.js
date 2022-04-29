import Logo from "./reddit_logo.svg";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  PlusIcon,
  SearchIcon,
  UserIcon
} from "@heroicons/react/outline";
import Avatar from "./avtr.png";
import ClickOutHandler from 'react-clickout-handler';
import Button from "./Button";
import {useState,useContext} from 'react';
import AuthModalContext from "./AuthModalContext";
import UserContext from "./UserContext";
import {Link} from "react-router-dom";
import RedirectContext from "./RedirectContext";

function Header() {
  const [userDropdownVisibilityClass,setUserDropdownVisibilityClass] = useState('hidden');
  const [searchText,setSearchText] = useState('');
  const {setRedirect} = useContext(RedirectContext);
  function toggleUserDropdown() {
    if (userDropdownVisibilityClass === 'hidden') {
      setUserDropdownVisibilityClass('block');
    } else {
      setUserDropdownVisibilityClass('hidden');
    }
  }
  function doSearch(ev) {
    ev.preventDefault();
    setRedirect('/search/'+encodeURIComponent(searchText));
  }
  const authModal = useContext(AuthModalContext);
  const user = useContext(UserContext);
  return (
    <header className="w-full p-2.5">
      <div className="mx-2.5 flex relative">
        <Link to="/">
          <img src={Logo} alt="" className="w-25 h-9 mr-4"/>
        </Link>
        <form onSubmit={doSearch} className='bg-gray-100 p-1 flex rounded-md border border-gray-200 mx-2 flex-grow '>
          <SearchIcon className="text-gray-300 h-7 w-6 " />
          <input type="text" className="bg-gray-100 h-6 text-m p-2 block flex-grow"
                 placeholder="Search"
                 value={searchText}
                 onChange={ev => setSearchText(ev.target.value)}
          />
        </form>

        {user.username && (
          <>
            <button className="px-2 py-1">
              <ChatIcon className="w-6 h-6 mx-2" />
            </button>
            <button className="px-2 py-1">
              <BellIcon className="w-6 h-6 mx-2" />
            </button>
            <button className="px-2 py-1">
              <PlusIcon className="w-6 h-6 mx-2" />
            </button>
          </>
        )}

        {!user.username && (
          <div className="mx-2 hidden sm:block">
            <Button outline={1} className="mr-1 h-8" onClick={() => authModal.setShow('login')}>Log In</Button>
            <Button className="h-8" onClick={() => authModal.setShow('register')}>Sign Up</Button>
          </div>
        )}

        <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
          <button className="rounded-md flex ml-4 border border-gray-700" onClick={() => toggleUserDropdown()}>
            {!user.username && (
              <UserIcon className="w-6 h-6 text-gray-400 m-1" />
            )}
            {user.username && (
              <div className="rounded-md w-8 h-8">
                <img src={Avatar} className="block"/>
              </div>
            )}

            <ChevronDownIcon className="text-gray-500 w-5 h-5 mt-2 m-1" />
          </button>
          <div className={"absolute right-0 top-8 bg-white border-gray-700 z-10 rounded-md text overflow-hidden "+userDropdownVisibilityClass}>
            {user.username && (
              <span className="block w-50 py-2 px-3 text-sm">
                Hello, {user.username}!
              </span>
            )}
            {!user.username && (
              <button
                onClick={() => authModal.setShow('login')}
                className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm">
                <LoginIcon className="w-5 h-5 mr-2" />
                Log In / Sign Up
              </button>
            )}
            {user.username && (
              <button
                onClick={() => user.logout()}
                className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-sm">
                <LogoutIcon className="w-5 h-5 mr-2" />
                Logout
              </button>
            )}
          </div>
        </ClickOutHandler>
      </div>
    </header>
  );
}

export default Header;