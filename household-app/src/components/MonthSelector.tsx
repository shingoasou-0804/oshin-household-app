import { Box, Button } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ja } from 'date-fns/locale'

const MonthSelector = () => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ja}
    >
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Button color={"error"} variant="contained">
          先月
        </Button>
        <DatePicker
          label="年月を選択"
          sx={{ mx: 2, backgroundColor: "white" }}
          views={["year", "month"]}
          format="yyyy/MM"
          slotProps={{
            calendarHeader: { format: "yyyy年MM月" },
          }}
        />
        <Button color={"primary"} variant="contained">
          次月
        </Button>
      </Box>
    </LocalizationProvider>
  )
}

export default MonthSelector
