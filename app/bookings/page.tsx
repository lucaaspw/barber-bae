import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { isFuture, isPast } from "date-fns";
import { authOption } from "../_lib/auth";

const BookingsPage = async () => {

  const session = await getServerSession(authOption);
  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    })

  ])

  return (
    <>
      <Header />
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold">Agendamentos</h1>
      </div>
      <section className="px-4 ">
        {confirmedBookings.length > 0 && (
          <>
            <h3 className="text-muted-foreground mb-2">Confirmados</h3>
            <div className="grid gap-3">
              {confirmedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}

      </section>
      <section className="px-4 py-6">
        {finishedBookings.length > 0 && (
          <>
            <h3 className="text-muted-foreground mb-2">Finalizados</h3>
            <div className="grid gap-3">
              {finishedBookings.map((booking) => (
                <BookingItem booking={booking} key={booking.id} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default BookingsPage;