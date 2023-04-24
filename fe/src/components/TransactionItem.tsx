import moment from "moment";
import Address from "./Address";

interface Props {
  data: any;
}

const TransactionItem: React.FC<Props> = ({ data }) => {
  const handleOpen = (link: string) => {
    window.open(link, "__blank");
  };

  return (
    <div
      onClick={() => handleOpen(`https://etherscan.io/tx/${data.txHash}`)}
      className="flex justify-between w-full hover:bg-slate-800 py-4 px-1 duration-200 cursor-pointer rounded-md"
    >
      <div className="flex space-x-2 ">
        <img src={data.nft.image} className="w-12 h-12 rounded-md" />
        <div className="flex flex-col justify-evenly">
          <div className="font-semibold">#{data.tokenId}</div>
          <div className="text-gray-400 text-sm">Bored Ape Yacht Club</div>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <div className="font-semibold">
          {Number(data.priceInEth).toFixed(2)} ETH
        </div>
        <div className="text-gray-400 text-sm">
          {Number(data.price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>
      </div>
      <div className="text-left">
        <div className="font-semibold">Seller</div>
        <Address>{data.seller}</Address>
      </div>
      <div className="text-left">
        <div className="font-semibold">Buyer</div>
        <Address>{data.buyer}</Address>
      </div>
      <div className="flex items-end text-gray-400 text-sm">
        <div>{moment(data.createdAt).fromNow()}</div>
      </div>
    </div>
  );
};

export default TransactionItem;
