function Input (props) {
  return (
    <input {...props} className={"bg-white text p-2 border border-gray-200 rounded-md block "+props.className} />
  );
}

export default Input;