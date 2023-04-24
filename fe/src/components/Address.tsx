const Address = (props: any) => {
  const render = () => {
    let string = "";
    string += props.children.substring(0, 8);
    string += "...";
    string += props.children.substr(props.children.length - 8);

    return string;
  };

  return (
    <a
      href={`https://etherscan.io/address/${props.children}`}
      target="__blank"
      className="text-gray-400 hover:text-gray-200 duration-200 underline cursor-pointer text-sm"
    >
      {render()}
    </a>
  );
};

export default Address;
