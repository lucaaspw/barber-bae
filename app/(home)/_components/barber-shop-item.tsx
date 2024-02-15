'use client'

import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent, CardHeader, } from "@/app/_components/ui/card";
import { CarouselItem } from "@/app/_components/ui/carousel";
import { Barbershop } from "@prisma/client";
import { ChevronRight, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarberShopItemProps {
  barbershop: Barbershop;
}
const BarberShopItem = ({ barbershop }: BarberShopItemProps) => {
  const router = useRouter();
  const handleBookingClick = () => {
    router.push(`/barbershops/${barbershop.id}`);
  }

  return (
    <CarouselItem className=" basis-1/2 md:basis-1/3 lg:basis-1/4">
      <Card>
        <CardHeader className="p-0 relative h-28">
          <Image className="rounded-t-lg " width={189} height={189} src={barbershop.imageUrl} alt={barbershop.name} />
          <Badge className="absolute rounded-lg left-2 top-1 bg-[#221c3d] text-primary hover:bg-[#221c3d]"><StarIcon className="mr-1" size={12}/>5.0</Badge>
        </CardHeader>
        <CardContent className="px-2 pt-4 pb-2 grid gap-2">
          <h2 className="text-base">{barbershop.name}</h2>
          <p className="text-sm text-muted-foreground max-[420px]:overflow-hidden max-[420px]:text-nowrap max-[420px]:text-ellipsis">{barbershop.address}</p>
          <Button onClick={handleBookingClick} variant="secondary" className="flex justify-between items-center">
            Reservar <ChevronRight/>
          </Button>
        </CardContent>
      </Card>
    </CarouselItem>

  );
}

export default BarberShopItem;