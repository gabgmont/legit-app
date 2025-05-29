import { LoadingAnimation } from "./loading-animation";
import CheckCircle from "./ui/check-circle";
import ErrorCircle from "./ui/error-circle";

export function TransactionLoading() {
  return (
    <div className="fixed top-4 left-4 right-4 md:w-80 md:left-auto md:right-4 border border-[#0047FF] rounded-xl p-2 flex items-center justify-center bg-[#050810]">
      <div className="w-10">
        <LoadingAnimation size="md" color="#4169e1" />
      </div>
      <span className="pl-2 text-sm text-white">
        Your transaction is beign processed...
      </span>
    </div>
  );
}

export function TransactionSuccess() {
  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 border border-[#0047FF] rounded-xl p-2 flex items-center justify-center bg-[#050810]">
      <div className="w-6">
        <CheckCircle />
      </div>
      <span className="pl-2 text-sm">Transaction succeeded!</span>
    </div>
  );
}

export function TransactionError() {
  return (
    <div className="fixed top-4 left-4 right-4 md:w-80 md:left-auto md:right-4 border border-[#0047FF] rounded-xl p-2 flex items-center justify-center bg-[#050810]">
      <div className="w-6">
        <ErrorCircle />
      </div>
      <span className="pl-2 text-sm">
        An error ocurred while trying to process your transaction.
      </span>
    </div>
  );
}
