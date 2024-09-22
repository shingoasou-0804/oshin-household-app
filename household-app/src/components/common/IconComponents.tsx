import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AlarmIcon from '@mui/icons-material/Alarm';
import TrainIcon from '@mui/icons-material/Train';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import HotTubIcon from '@mui/icons-material/HotTub';
import CellTowerIcon from '@mui/icons-material/CellTower';
import HomeIcon from '@mui/icons-material/Home';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import SchoolIcon from '@mui/icons-material/School';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { ExpenseCategory, IncomeCategory } from '../../types';

const IconComponents: Record<IncomeCategory | ExpenseCategory, JSX.Element> = {
  給与: <WorkIcon fontSize="small" />,
  副収入: <AddBusinessIcon fontSize="small" />,
  お小遣い: <SavingsIcon fontSize="small" />,
  食費: <FastfoodIcon fontSize="small" />,
  日用品: <AlarmIcon fontSize="small" />,
  交通費: <TrainIcon fontSize="small" />,
  医療費: <LocalPharmacyIcon fontSize="small" />,
  保険: <LocalAtmIcon fontSize="small" />,
  水道光熱費: <HotTubIcon fontSize="small" />,
  通信費: <CellTowerIcon fontSize="small" />,
  住宅: <HomeIcon fontSize="small" />,
  税金: <CurrencyYenIcon fontSize="small" />,
  教育: <SchoolIcon fontSize="small" />,
  交際費: <DinnerDiningIcon fontSize="small" />,
  衣料品: <AccessibilityNewIcon fontSize="small" />,
  趣味: <FitnessCenterIcon fontSize="small" />,
  その他: <TipsAndUpdatesIcon fontSize="small" />,
}

export default IconComponents
