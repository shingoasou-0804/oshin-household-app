import { Box } from '@mui/material'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns/format'
import { useState } from 'react'
import { Schema } from '../validations/schema'

interface HomeProps {
  monthlyTransactions: Transaction[],
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  selectedTransaction: Transaction | null;
}

const Home = ({
  monthlyTransactions,
  setCurrentMonth,
  onSaveTransaction,
  setSelectedTransaction,
  selectedTransaction
}: HomeProps) => {
  const today = format(new Date(), "yyy-MM-dd");
  const [currentDay, setCurrentDay] = useState(today);
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false);

  const dailyTransactions = monthlyTransactions.filter((transaction) => {
    return transaction.date === currentDay;
  });

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen);
  }

  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  const handleSelectTransaction = (transaction: Transaction) => {
    setIsEntryDrawerOpen(true);
    setSelectedTransaction(transaction);
  }

  return (
    <Box sx={{display: "flex"}}>
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calendar
          monthlyTransactions={monthlyTransactions}
          setCurrentMonth={setCurrentMonth}
          setCurrentDay={setCurrentDay}
          currentDay={currentDay}
          today={today}
        />
      </Box>
      <Box>
        <TransactionMenu
          dailyTransactions={dailyTransactions}
          currentDay={currentDay}
          onAddTransactionForm={handleAddTransactionForm}
          onSelectTransaction={handleSelectTransaction}
        />
        <TransactionForm
          onCloseForm={closeForm}
          isEntryDrawerOpen={isEntryDrawerOpen}
          currentDay={currentDay}
          onSaveTransaction={onSaveTransaction}
          selectedTransaction={selectedTransaction}
        />
      </Box>
    </Box>
  )
}

export default Home
