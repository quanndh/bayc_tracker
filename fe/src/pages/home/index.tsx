import { useEffect, useState } from "react";
import { request } from "../../shared/utils/request";
import { Env } from "../../constants/env";
import TransactionItem from "../../components/TransactionItem";
import Chart from "../../components/Chart";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [txs, setTxs] = useState<Array<any>>([]);
  const [totalPage, setTotalPage] = useState(0);

  const getTransactions = async () => {
    try {
      const res: any = await request.get(`${Env.apiUrl}/api/txs?page=${page}`);
      const { items, meta } = res.data;
      if (page === 1) {
        setTxs(items);
      } else {
        setTxs([...txs, ...items]);
      }
      setTotalPage(meta.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPage) {
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="py-40 px-8 md:px-14 lg:px-60">
      <div className="my-6 h-[500px]">
        <Chart />
      </div>
      <div className="space-y-4">
        {txs.map((tx: any) => (
          <TransactionItem data={tx} key={tx.txHash} />
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <div
          onClick={handleLoadMore}
          className="px-8 py-4 border-white border w-fit self-center hover:border-rose-400 hover:text-rose-400 duration-200 cursor-pointer"
        >
          LOAD MORE
        </div>
      </div>
    </div>
  );
};

export default HomePage;
