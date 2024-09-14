import { Box } from '@mui/material'
import React from 'react'
import MonthlySummary from '../components/layout/MonthlySummary'
import Calendar from '../components/layout/Calendar'
import TransactionMenu from '../components/layout/TransactionMenu'
import TransactionForm from '../components/layout/TransactionForm'
import { Transaction } from '../types'

interface HomeProps {
  monthlyTransactions: Transaction[],
}

const Home = ({monthlyTransactions}: HomeProps) => {
  return (
    <Box sx={{display: "flex"}}>
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calendar />
      </Box>

      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  )
}

export default Home
