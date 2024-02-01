import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "./_components/header";
import Search from "./(home)/_components/search";
import BookingItem from "./_components/booking-item";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="px-4 py-6 grid gap-1">
          <h2 className="text-xl front-bold">Olá, Lucas G</h2>
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
          <h4 className="mb-2 text-muted-foreground">Agendamento</h4>
          <div>
            <BookingItem />
          </div>
        </div>
      </section>
    </>

  );
}
