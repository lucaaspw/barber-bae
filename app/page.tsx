import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "./_components/header";
import Search from "./(home)/_components/search";
import BookingItem from "./_components/booking-item";
import { db } from "./_lib/prisma";
import { Carousel, CarouselContent, CarouselItem } from "./_components/ui/carousel";
import BarberShopItem from "./(home)/_components/barber-shop-item";
import { MoveLeft, MoveRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOption)

  // chamar prisma e pegas barbearias
  const [barbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    session?.user ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        }
      },
      include: {
        service: true,
        barbershop: true,
      }
    }) : Promise.resolve([]),
  ]);

  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="px-4 py-6 grid gap-1">
          <h2 className="text-xl front-bold">Olá, {session?.user ? `${session.user.name?.split(" ")[0]}!` : "Vamos agendar uma reserva hoje?"}</h2>
          <h6 className="capitalize">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </h6>
        </div>
        <div className="px-4 ">
          <Search />
        </div>
        <div className="px-4 py-6">
          {confirmedBookings && confirmedBookings.length > 0 ? (
            <>
              <h4 className="mb-2 text-muted-foreground">Agendamento</h4>
              <Carousel>
                <CarouselContent>
                  {confirmedBookings.map(booking => (
                    <CarouselItem key={booking.id}>
                      <BookingItem booking={booking} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </>
          ):(<p>Poxa, você não tem nada agendado ainda :/</p>)}

        </div>
      </section>
      <section>
        <div className="px-4 py-6">
          <h4 className="mb-2 flex justify-between items-center text-muted-foreground">
            Recomendados
            <div className="flex gap-2 items-center text-primary">
              <MoveLeft /><MoveRight />
            </div>
          </h4>
          <Carousel>
            <CarouselContent>
              {barbershops.map((barbershop: any) => (
                <BarberShopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
      <section>
        <div className="px-4 py-6">
          <h4 className="mb-2 flex justify-between items-center text-muted-foreground">
            Populares
            <div className="flex gap-2 items-center text-primary">
              <MoveLeft /><MoveRight />
            </div>
          </h4>
          <Carousel>
            <CarouselContent>
              {barbershops.map((barbershop: any) => (
                <BarberShopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </>

  );
}
