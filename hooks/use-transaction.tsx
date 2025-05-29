"use client";

import { TransactionError, TransactionLoading, TransactionSuccess } from "@/components/transaction-baloons";
import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext({
  loadingTransaction: false,
  setLoadingTransaction: (val: boolean) => {},
  setTransactionSuccess: () => {},
  setTransactionError: () => {},
});

export function TransactionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  useEffect(() => {
    if (showSuccess) {
      const timeout = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      const timeout = setTimeout(() => setShowError(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [showError]);
  
  const setTransactionSuccess = () => {
    setLoadingTransaction(false);
    setShowSuccess(true);
  };

  const setTransactionError = () => {
    setLoadingTransaction(false);
    setShowError(true);
  };

  return (
    <TransactionContext.Provider
      value={{ loadingTransaction, setLoadingTransaction, setTransactionSuccess, setTransactionError }}
    >
      {loadingTransaction && <TransactionLoading />}
      {showSuccess && <TransactionSuccess />}
      {showError && <TransactionError /> }
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransaction = () => useContext(TransactionContext);
