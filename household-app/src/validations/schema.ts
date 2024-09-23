import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, { message: "日付は必須です。" }),
  amount: z.number().min(1, { message: "金額は1円以上で必須です。" }),
  content: z
    .string()
    .min(1, { message: "内容を入力してください。" })
    .max(50, { message: "内容は50文字以内で入力してください。" }),
  category: z.union([
    z.enum(["食費", "日用品", "交通費", "医療費", "保険", "水道光熱費", "通信費", "住宅", "税金", "教育", "交際費", "衣料品", "趣味", "その他"]),
    z.enum(["給与", "副収入", "お小遣い"]),
    z.literal("")
  ]).refine((val) => val !== "", {
    message: "カテゴリを選択してください。"
  })
});

export type Schema = z.infer<typeof transactionSchema>;
