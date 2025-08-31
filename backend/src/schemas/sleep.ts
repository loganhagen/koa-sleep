import { z } from "zod";

export const SleepLevelsSchema = z.object({
  summary: z.object({
    rem: z.object({
      minutes: z.number().int().min(0),
    }),
    light: z.object({
      minutes: z.number().int().min(0),
    }),
    deep: z.object({
      minutes: z.number().int().min(0),
    }),
  }),
});

export type SleepLevels = z.infer<typeof SleepLevelsSchema>;
