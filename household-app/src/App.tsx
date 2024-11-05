import { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { formatMonth } from './utils/formatting';
import { Schema } from './validations/schema';

function App() {

  function isFireStoreError(err: unknown): err is {code: string, message: string} {
    return typeof err === "object" && err !== null && "code" in err;
  }
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Transaction
        });
        setTransactions(transactionsData);
      } catch (err) {
        if (isFireStoreError(err)) {
          console.error("Firestore error: ", err)
          console.error("Firestore error messages: : ", err.message);
          console.error("Firestore error code: ", err.code);
        } else {
          console.error("Genaral error: ", err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchTransactions();
  }, [])

  const monthlyTransactions = transactions.filter((transaction) => {
    return transaction.date.startsWith(formatMonth(currentMonth));
  });

  const handleSaveTransaction = async (transaction: Schema) => {
    try {
      const docRef = await addDoc(collection(db, "Transactions"), transaction);
      const newTransaction = {
        id: docRef.id,
        ...transaction,
      } as Transaction;
      setTransactions((prevTransaction) => [...prevTransaction, newTransaction]);
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestore error: ", err)
        console.error("Firestore error messages: : ", err.message);
        console.error("Firestore error code: ", err.code);
      } else {
        console.error("Genaral error: ", err);
      }
    }
  }

  const handleDeleteTransaction = async (
    transactionIds: string | readonly string[]) => {
    try {
      const idsToDelete = Array.isArray(transactionIds) ? transactionIds: [transactionIds];
      for (const id of idsToDelete) {
        await deleteDoc(doc(db, "Transactions", id));
      }
      const filteredTransactions = transactions.filter(
        (transaction) => !idsToDelete.includes(transaction.id)
      );
      setTransactions(filteredTransactions)
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestore error: ", err)
        console.error("Firestore error messages: : ", err.message);
        console.error("Firestore error code: ", err.code);
      } else {
        console.error("Genaral error: ", err);
      }
    }
  }

  const handleUpdateTransaction = async (transaction: Schema, transactionId: string) => {
    try {
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      const updatedTransactions = transactions.map((t) =>  t.id === transactionId ? {
        ...t,
        ...transaction,
      }: t) as Transaction[];
      setTransactions(updatedTransactions)
    } catch (err) {
      if (isFireStoreError(err)) {
        console.error("Firestore error: ", err)
        console.error("Firestore error messages: : ", err.message);
        console.error("Firestore error code: ", err.code);
      } else {
        console.error("Genaral error: ", err);
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={
                <Home
                  monthlyTransactions={monthlyTransactions}
                  setCurrentMonth={setCurrentMonth}
                  onSaveTransaction={handleSaveTransaction}
                  onDeleteTransaction={handleDeleteTransaction}
                  onUpdateTransaction={handleUpdateTransaction}
                />
              }
            />
            <Route path="/report" element={
              <Report
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthlyTransactions={monthlyTransactions}
                isLoading={isLoading}
                onDeleteTransaction={handleDeleteTransaction}
              />
            }/>
            <Route path="*" element={<NoMatch />}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
