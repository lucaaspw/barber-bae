import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";

const BookingsPage = async () => {

  const session = await getServerSession(authOption);
  if (!session?.user) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    }
  });

  const confirmedBookings = bookings.filter((booking) => isFuture(booking.date));
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));
  
  return (
    <>
      <Header />
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>
      <section className="px-4 ">
        <h3 className="text-muted-foreground mb-2">Confirmados</h3>
        <div className="grid gap-3">
          {confirmedBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </section>
      <section className="px-4 py-6">
        <h3 className="text-muted-foreground mb-2">Finalizados</h3>
        <div className="grid gap-3">
          {finishedBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </section>
    </>
  );
}

export default BookingsPage;