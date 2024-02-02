"use client"

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { ChevronLeftIcon, Info, MapPin, MenuIcon, Scissors, Star } from "lucide-react";
import Image from "next/image";

import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({barbershop}: BarbershopInfoProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <>
      <section>
        <div className="relative h-[270px] w-full">
          <Image className="opacity-60" style={{ objectFit: "cover", }} src={barbershop.imageUrl} fill alt={barbershop.name} />
          <Button onClick={handleBackClick} variant="secondary" size="icon" className="absolute z-10 top-5 left-5">
            <ChevronLeftIcon />
          </Button>
          <Button variant="secondary" size="icon" className="absolute z-10 top-5 right-5">
            <MenuIcon />
          </Button>
        </div>
        <div className="px-4 py-6 grid gap-3 border-b border-solid">
          <h1 className="text-xl font-bold">{barbershop.name}</h1>
          <p className="flex items-center gap-2"><MapPin className="text-primary" /> <span>{barbershop.address}</span></p>
          <p className="flex items-center gap-2"><Star className="text-primary" /> <span>5.0 (889 avaliações)</span></p>
        </div>
      </section>
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
            <TabsContent value="services">
              <Card >
                <CardContent>
                  <Image src={barbershop.imageUrl} width={110} height={110} alt={barbershop.name} />
                  <h2>{barbershop.name}</h2>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

      </section>
    </>
  );
}

export default BarbershopInfo;