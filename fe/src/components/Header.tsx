const Header = () => {
  return (
    <div className="bg-black w-full flex items-center py-4 px-8 md:px-14 lg:px-60 fixed z-50 space-x-2">
      <img
        src="https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&w=256"
        className="p-1 bg-white rounded-md h-28 w-28 mr-4"
      />
      <div className="font-bold text-lg cursor-pointer">BAYC Tracker</div>
    </div>
  );
};

export default Header;
