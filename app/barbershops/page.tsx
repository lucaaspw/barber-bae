import { redirect } from "next/navigation";
import BarberShopItem from "../(home)/_components/barber-shop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { Carousel, CarouselContent, CarouselItem } from "@/app/_components/ui/carousel";
interface BarberShopsPageProps {
  searchParams: {
    search?: string;
  }
}

const BarberShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
  if(!searchParams.search){
    return redirect("/");
  }
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive'
      }
    }
  })
  return (
    <>
      <Header />
      <div className="px-4 py-6">
        <h1 className="text-bold text-xl text-muted-foreground mb-5">Resultados para &quot;{searchParams.search}&quot;</h1>
        <Carousel>
          <CarouselContent>
            {barbershops.map((barbershop) => (
              <BarberShopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}

export default BarberShopsPage;