import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja';
import '../calendar.css'
import { EventContentArg } from '@fullcalendar/core';

const Calendar = () => {
  const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Shopping', start: "2024-09-24", income: 300, expense: 200, balance: 100 }
  ]

  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo.event.extendedProps)
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
      events={events}
      eventContent={renderEventContent}
    />
  )
}

export default Calendar
