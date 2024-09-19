import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const TransactionForm = () => {
  const formWidth = 320;
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        right: formWidth,
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
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box component={"form"}>
        <Stack spacing={2}>
          <ButtonGroup fullWidth>
            <Button variant={"contained"} color="error">
              支出
            </Button>
            <Button>収入</Button>
          </ButtonGroup>
          <TextField
            label="日付"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField id="カテゴリ" label="カテゴリ" select value={"食費"}>
            <MenuItem value={"食費"}>
              <ListItemIcon>
                <FastfoodIcon />
              </ListItemIcon>
              食費
            </MenuItem>
          </TextField>
          <TextField label="金額" type="number" />
          <TextField label="内容" type="text" />
          <Button type="submit" variant="contained" color={"primary"} fullWidth>
            保存
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TransactionForm;
