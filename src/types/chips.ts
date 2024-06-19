import z from "zod";

export const colors = z.object({
  name: z.string().min(1),
  theme: z.string().min(1),
  group: z.string().min(1),
  hex: z.string().min(1),
  rgb: z.string().min(1),
});

export const chosenColor = z.object({
  name: z.string().min(1),
  hex: z.string().min(1),
  group: z.string().min(1),
});

export const chipsSchema = z.object({
  color: chosenColor,
  // color: z.string(),
  value: z.number(),
  startingAmount: z.number(),
});

export type Chips = z.infer<typeof chipsSchema>;
export type ColorProps = z.infer<typeof colors>;

// export type ColorGroups = {
//   chosen:
//     | "Red"
//     | "Blue"
//     | "Brown"
//     | "Aqua"
//     | "Cyan"
//     | "Green"
//     | "Orange"
//     | "Pink"
//     | "Purple"
//     | "Yellow";
// };
export type ColorGroups =
  | "Red"
  | "Blue"
  | "Brown"
  | "Aqua"
  | "Cyan"
  | "Green"
  | "Orange"
  | "Pink"
  | "Purple"
  | "Yellow";
