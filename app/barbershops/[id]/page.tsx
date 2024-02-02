import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Info, Scissors } from "lucide-react";

interface BarberShopDetailsPageProps {
  params: {
    id?: string,
  };
}

const BarberShopDetailsPage = async ({ params }: BarberShopDetailsPageProps) => {
  // TODO: redirecionar para home
  if (!params.id) {
    return null
  }
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    }
  });

  if (!barbershop) {
    // TODO: redirecionar para home page
    return null
  }
  return (
    <>
      <BarbershopInfo barbershop={barbershop} />
      <section>
        <div className="px-4 py-6">
          <Tabs defaultValue="services" className="w-[400px]">
            <TabsList className="grid w-full gap-3 grid-cols-2">
              <TabsTrigger value="services" className="flex items-center gap-2" >
                <Scissors size={20} />
                Serviços
              </TabsTrigger>
              <TabsTrigger value="information" className="flex items-center gap-2">
                <Info size={20} />
                Informações
              </TabsTrigger>
            </TabsList>
            <TabsContent className="grid gap-5" value="services">
              {barbershop.services.map((service: any) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default BarberShopDetailsPage;