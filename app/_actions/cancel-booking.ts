"use server"

import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache";

export const CancelBooking = async (bookingId: string) => {
  try {
    // Delete booking from database
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });

    // Revalidate relevant pages after deletion
    revalidatePath("/"); // Revalidate the home page
    revalidatePath("/bookings"); // Revalidate the bookings page

    return { success: true }; // Indicate successful deletion
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { success: false, error }; // Indicate failure with error details
  }
};