import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Header from "./_components/header";
import Search from "./(home)/_components/search";

export default function Home() {
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <div className="px-4 py-6 grid gap-1">
          <h2 className="text-xl front-bold">Olá, Lucas G</h2>
          <span className="capitalize">
            {format(new Date(), "EEEE',' dd 'de' MMMM", {
              locale: ptBR,
            })}
          </span>
        </div>
        <div className="px-4 ">
          <Search />
        </div>
      </section>
    </>

  );
}
