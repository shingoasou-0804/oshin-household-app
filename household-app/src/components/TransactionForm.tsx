import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import WorkIcon from '@mui/icons-material/Work';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import SavingsIcon from '@mui/icons-material/Savings';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ExpenseCategory, IncomeCategory } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, transactionSchema } from "../validations/schema";
import { Transaction } from '../types';

interface TransactionFormProps {
  onCloseForm: () => void;
  isEntryDrawerOpen: boolean;
  currentDay: string;
  onSaveTransaction: (transaction: Schema) => Promise<void>;
  selectedTransaction: Transaction | null;
  onDeleteTransaction: (transactionId: string | readonly string[]) => Promise<void>;
  setSelectedTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  onUpdateTransaction: (transaction: Schema, transactionId: string) => Promise<void>;
}

type IncomeExpense = "income" | "expense";

interface CategoryItem {
  label: IncomeCategory | ExpenseCategory;
  icon: JSX.Element;
}

const TransactionForm = ({
  onCloseForm,
  isEntryDrawerOpen,
  currentDay,
  onSaveTransaction,
  selectedTransaction,
  onDeleteTransaction,
  setSelectedTransaction,
  onUpdateTransaction
}: TransactionFormProps) => {
  const formWidth = 320;

  const expenseCategories: CategoryItem[] = [
    {label: "食費", icon: <FastfoodIcon fontSize="small" />},
    {label: "日用品", icon: <AlarmIcon fontSize="small" />},
    {label: "交通費", icon: <TrainIcon fontSize="small" />},
    {label: "医療費", icon: <LocalPharmacyIcon fontSize="small" />},
    {label: "保険", icon: <LocalAtmIcon fontSize="small" />},
    {label: "水道光熱費", icon: <HotTubIcon fontSize="small" />},
    {label: "通信費", icon: <CellTowerIcon fontSize="small" />},
    {label: "住宅", icon: <HomeIcon fontSize="small" />},
    {label: "税金", icon: <CurrencyYenIcon fontSize="small" />},
    {label: "教育", icon: <SchoolIcon fontSize="small" />},
    {label: "交際費", icon: <DinnerDiningIcon fontSize="small" />},
    {label: "衣料品", icon: <AccessibilityNewIcon fontSize="small" />},
    {label: "趣味", icon: <FitnessCenterIcon fontSize="small" />},
    {label: "その他", icon: <TipsAndUpdatesIcon />},
  ];

  const incomeCategories: CategoryItem[] = [
    {label: "給与", icon: <WorkIcon fontSize="small" />},
    {label: "副収入", icon: <AddBusinessIcon fontSize="small" />},
    {label: "お小遣い", icon: <SavingsIcon fontSize="small" />},
  ];

  const [categories, setCategories] = useState(expenseCategories);

  const {
    control,
    setValue,
    watch,
    formState: {errors},
    handleSubmit,
    reset,
  } = useForm<Schema>({
    defaultValues: {
      type: "expense",
      date: currentDay,
      category: "",
      amount: 0,
      content: "",
    },
    resolver: zodResolver(transactionSchema),
  });

  const incomeExpenseToggle = (type: IncomeExpense) => {
    setValue("type", type);
    setValue("category", "");
  };

  const currentType = watch("type");
  useEffect(() => {
    const newCategories = currentType === "expense" ? expenseCategories : incomeCategories;
    setCategories(newCategories);
  }, [currentType]);

  useEffect(() => {
    setValue("date", currentDay);
  }, [currentDay]);

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (selectedTransaction) {
      onUpdateTransaction(data, selectedTransaction.id).then(() => {
        setSelectedTransaction(null);
      }).catch((error) => {
        console.error(error);
      });
    } else {
      onSaveTransaction(data).then(() => {
      }).catch((error) => {
        console.error(error);
      });
    }
    reset({
      date: currentDay,
      type: "expense",
      category: "",
      amount: 0,
      content: "",
    });
  };

  useEffect(() => {
    if (selectedTransaction) {
      const categoryExists = categories.some((
        category) => category.label === selectedTransaction.category
      );
      setValue("category", categoryExists ? selectedTransaction.category : "");
    }
  }, [selectedTransaction, categories]);

  useEffect(() => {
    if (selectedTransaction) {
      setValue("type", selectedTransaction.type);
      setValue("date", selectedTransaction.date);
      setValue("amount", selectedTransaction.amount);
      setValue("content", selectedTransaction.content);
    } else {
      reset({
        type: "expense",
        date: currentDay,
        category: "",
        amount: 0,
        content: "",
      });
    }
  }, [selectedTransaction])

  const handleDelete = () => {
    if (selectedTransaction) {
      onDeleteTransaction(selectedTransaction.id);
      setSelectedTransaction(null);
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: isEntryDrawerOpen ? formWidth : "-2%",
        width: formWidth,
        height: "100%",
        bgcolor: "background.paper",
        zIndex: (theme) => theme.zIndex.drawer - 1,
        transition: (theme) =>
          theme.transitions.create("right", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        p: 2,
        boxSizing: "border-box",
        boxShadow: "0px 0px 15px -5px #777777",
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h6">入力</Typography>
        <IconButton
          onClick={onCloseForm}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <ButtonGroup fullWidth>
                <Button
                  variant={field.value === "expense" ? "contained" : "outlined"}
                  color="error"
                  onClick={() => incomeExpenseToggle("expense")}
                >
                  支出
                </Button>
                <Button
                  onClick={() => incomeExpenseToggle("income")}
                  variant={field.value === "income" ? "contained" : "outlined"}
                >
                  収入
                </Button>
              </ButtonGroup>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="日付"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              // <TextField
              //   {...field}
              //   id="カテゴリ"
              //   label="カテゴリ"
              //   select
              //   error={!!errors.category}
              //   helperText={errors.category?.message}
              //   InputLabelProps={{
              //     htmlFor: "category",
              //   }}
              //   inputProps={{ id: "category" }}
              // >
              //   {categories.map((category, index) => (
              //     <MenuItem
              //       key={index}
              //       value={category.label}
              //     >
              //       <ListItemIcon>
              //         {category.icon}
              //       </ListItemIcon>
              //       {category.label}
              //     </MenuItem>
              //   ))}
              // </TextField>
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-select-label">カテゴリ</InputLabel>
                <Select
                  {...field}
                  labelId="category-select-label"
                  id="category-select"
                  label="カテゴリ"
                >
                {categories.map((category, index) => (
                  <MenuItem
                    key={index}
                    value={category.label}
                  >
                    <ListItemIcon>
                      {category.icon}
                    </ListItemIcon>
                    {category.label}
                  </MenuItem>
                ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10) || 0;
                  field.onChange(newValue);
                }}
                label="金額"
                type="number"
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="内容"
                type="text"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color={currentType === "income" ? "primary" : "error"}
            fullWidth
          >
            {selectedTransaction ? "更新" : "保存"}
          </Button>
          { selectedTransaction && (
            <Button
              onClick={handleDelete}
              variant="outlined"
              color={"secondary"}
              fullWidth
            >
              削除
            </Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionForm;
