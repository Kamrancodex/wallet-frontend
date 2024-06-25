import IndividualBal from "./IndividualBal";

function BigCard() {
  return (
    <div className="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 h-3/6 w-3/5 col-span-2 lg:col-span-4">
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Checking Savings Card Balance Mortgage
        </h5>
      </div>
      <IndividualBal acName={"checking"} balance={2000} />
      <IndividualBal acName={"saving"} balance={2000} />
      <IndividualBal acName={"mortgage"} balance={2000} />

      <IndividualBal acName={"total"} balance={6000} />
    </div>
  );
}

export default BigCard;
