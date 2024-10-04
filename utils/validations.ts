import { z } from "zod";

const focalLengthSchema = z.number().min(12).max(85).default(16);

export const validateFocalLength = (value: string | number) => {
  const parsedValue = z.coerce.number().safeParse(value); // Try to parse the input value to a number

  if (parsedValue.success) {
    const validValue = focalLengthSchema.safeParse(parsedValue.data);
    if (validValue.success) {
      return validValue.data;
    }
  }

  return 16; // If the input value is invalid or out of zod schema bounds, return the default value
};
