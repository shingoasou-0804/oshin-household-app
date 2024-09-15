import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import '../calendar.css'
import { EventContentArg } from '@fullcalendar/core';
import { Balance, CalendarContent, Transaction } from '../types';
import { calculateDailyBalances } from '../utils/financeCalculations';
import { start } from 'repl';
import { formatCurrency } from '../utils/formatting';

interface CalendarProps {
  monthlyTransactions: Transaction[];
}

const Calendar = ({monthlyTransactions}: CalendarProps) => {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Shopping', start: "2024-09-24", income: 300, expense: 200, balance: 100 }
  ]

  const dailyBalances = calculateDailyBalances(monthlyTransactions)
  
  const createCalendarEvents = (dailyBalances: Record<string, Balance>): CalendarContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const {income, expense, balance} = dailyBalances[date]
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance)
      }
    })
  }

  const calendarEvents = createCalendarEvents(dailyBalances)
  console.log(calendarEvents)

  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div>
        <div className='money' id='event-income'>
          {eventInfo.event.extendedProps.income}
        </div>
        <div className='money' id='event-expense'>
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className='money' id='event-balance'>
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    )
  }
  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar
