import React from "react";

import { notice } from "../../../../Data/notice";
import NoticeTable from "../../Notice/NoticeTable";
import IPAddress from "./IPAddress";

const HomePage = () => {
  return (
    <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
      <NoticeTable data={notice} />
      <h1>{IPAddress}</h1>
    </div>
  );
};

export default HomePage;
