import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { Info, Scissors } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsPageProps {
  params: {
    id?: string,
  };
}

const BarberShopDetailsPage = async ({ params }: BarberShopDetailsPageProps) => {
  const session = await getServerSession(authOption);
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
                <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticate={!!session?.user} />
              ))}
            </TabsContent>
            <TabsContent className="grid gap-5" value="information">
              <Card>
                <CardHeader>
                  <CardTitle>Barbearia {barbershop.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-justify">
                    Venha experimentar a excelência em cuidados capilares na Barbearia <span className="text-primary">{barbershop.name}</span>. Nossa barbearia oferece uma experiência única, onde a arte do corte e estilo se funde com um ambiente acolhedor e moderno. Com uma equipe de profissionais qualificados e apaixonados pelo que fazem, garantimos não apenas cortes impecáveis, mas também um atendimento personalizado que atende às suas necessidades e preferências individuais. Na Barbearia <span className="text-primary">{barbershop.name}</span>, cada cliente é tratado com cuidado e dedicação, buscando sempre superar expectativas e proporcionar resultados que elevam sua autoestima. Venha nos visitar e descubra o verdadeiro significado de estilo e sofisticação em cada corte. Seja bem-vindo à Barbearia <span className="text-primary">{barbershop.name}</span>, onde sua satisfação é nossa prioridade.
                  </CardDescription>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

export default BarberShopDetailsPage;