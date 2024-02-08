"use server"

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma"

export const CancelBooking = async (bookingId: string) => {
  return await db.booking.delete({
    where: {
      id: bookingId,
    },
  });

  revalidatePath("/bookings");
};