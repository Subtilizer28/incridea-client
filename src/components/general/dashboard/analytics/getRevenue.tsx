import React from "react";
import { useQuery } from "@apollo/client";
import { GetRevenueDocument } from "~/generated/generated";
import { IndianRupee } from "lucide-react";
import Spinner from "~/components/spinner";

const RevenueCard = () => {
  const { data, loading, error } = useQuery(GetRevenueDocument);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  const revenueResult = data?.getRevenue;

  if (revenueResult?.__typename === "Error") {
    return <p>Error: {revenueResult.message}</p>;
  }

  if (revenueResult?.__typename === "QueryGetRevenueSuccess") {
    const revenue = revenueResult.data;

    return (
      <div className="flex-1 rounded-xl bg-white/10 backdrop-blur-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 flex items-center border-b border-white/20 justify-center">
          <h2 className="text-2xl font-bold text-white text-center">Revenue</h2>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-center">
            <IndianRupee className="size-12 text-gray-300" />
            <p className="text-6xl font-bold text-white">{revenue / 100}</p>
          </div>
        </div>
      </div>
    );
  }
  return <p>Unexpected result</p>;
};

export default RevenueCard;
