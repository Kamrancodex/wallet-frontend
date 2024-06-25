function IndividualBal({ acName, balance }) {
  return (
    <div className="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50 flex space-x-12 justify-center">
      <p>{acName}</p>
      <span>{balance}</span>
    </div>
  );
}

export default IndividualBal;
