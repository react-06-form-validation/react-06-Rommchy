import { z } from "zod";

/**
 * Builds the Zod schema for the booking form.
 *
 * TODO: implement the validation rules described in README.md → "Form Fields & Validation Rules":
 *  - bookerName: string, required, min 2 characters
 *  - bookerEmail: string, optional, must be a valid email when provided (empty string is allowed)
 *  - eventName: string, required, min 2 characters
 *  - eventDate: required, must be a future date
 *  - numberOfGuests: number, required, integer, min 1, max 10
 *  - timeSlot: string, required, must be one of `availableTimeSlots`
 *  - eventLink: string, required, must be a valid URL
 *
 * @param {string[]} availableTimeSlots - time slots fetched from `/api/time-slots`
 */
export const createBookingSchema = (availableTimeSlots = []) =>
  z.object({
    // TODO: define field validations here
    bookerName: z
      .string("Invalid input, expected string")
      .min(2, "Booker name must be at least 2 characters long"),
    bookerEmail: z.string().email().optional().or(z.literal("")),
    eventName: z
      .string("Invalid input, expected string")
      .min(2, "Event name must be at least 2 characters long"),
    eventDate: z.coerce
      .date("Invalid input, expected date")
      .min(new Date(), "Event date must be in the future"),
    numberOfGuests: z
      .number("Invalid input, expected number")
      .int()
      .min(1, "Number of Guests must be greater than or equal to 1")
      .max(10, "Number of Guests must be less than or equal to 10"),
    timeSlot: z
      .string()
      .refine((val) => availableTimeSlots.includes(val), {
        message: "Selected timeslot is unavailable",
      }),
    eventLink: z.string().url("Invalid URL. Please enter a valid event link"),
  });
