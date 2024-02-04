"use client"
import { Service } from "@prisma/client";
import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronRight } from "lucide-react";
import { signIn } from "next-auth/react";
interface ServiceItemProp {
  service: Service;
  isAuthenticate: boolean;
}
const ServiceItem = ({ service, isAuthenticate }: ServiceItemProp) => {
  const handleBookingClick = () => {
    if(!isAuthenticate){
      return signIn("google");
    }
  }
  return (
    <>
      <Card >
        <CardContent className="p-5 flex items-center gap-5">
          <div className="relative min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]">
            <Image className="rounded-md" fill style={{objectFit: "contain"}} src={service.imageUrl} alt={service.name} />
          </div>
          <div className="grid gap-2">
            <h2 className="text-lg font-bold">{service.name}</h2>
            <p className="text-muted-foreground text-sm">{service.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-md font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </span>
              <Button onClick={handleBookingClick} variant="secondary" className="w-32 flex justify-between items-center">
                Reservar
                <ChevronRight />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    </>
  );
}

export default ServiceItem;