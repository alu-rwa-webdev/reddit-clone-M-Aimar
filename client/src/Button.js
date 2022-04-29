function Button(props) {
  let classNames = "border border-gray-300 rounded-full px-3 text-sm font-bold ";
  if (props.outline) {
    classNames += " ";
  } else {
    classNames += " ";
  }
  return (
    <button {...props} className={classNames + props.className} />
  );
}

export default Button;