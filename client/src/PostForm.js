import Avatar from "./avtr.png";
import {useContext} from "react";
import PostFormModalContext from "./PostFormModalContext";

function PostForm() {
  const modalContext = useContext(PostFormModalContext);
  return (
    <div className="bg-white px-6 py-4 text-gray-400">

      <div className="border border-gray-200 p-2 rounded-md flex bg-white">
        <div className="rounded-full bg-gray-400 overflow-hidden w-10 h-10">
          <img src={Avatar} alt="" />
        </div>
        <form action="" className="flex-grow bg-gray-100 border border-gray-200 ml-4 mr-2 rounded-md">
          <input type="text"
                 onFocus={e => {
                   e.preventDefault();
                   modalContext.setShow(true);
                 }}
                 className="bg-gray-100 p-2 px-3 text-sm block w-full rounded-md" placeholder="New post" />
        </form>
      </div>

    </div>
  );
}

export default PostForm;