"use client"

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, Info, MapPin, MenuIcon, Star } from "lucide-react";
import Image from "next/image";

import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import SideMenu from "@/app/_components/sidemenu";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <>
      <section>
        <div className="relative h-[270px] w-full">
          <Image className="opacity-60" style={{ objectFit: "cover", }} src={barbershop.imageUrl} fill alt={barbershop.name} />
          <div className="absolute z-10 px-4 top-5 w-full flex justify-between">
            <Button onClick={handleBackClick} variant="secondary" size="icon">
              <ChevronLeftIcon />
            </Button>
            <SideMenu />
          </div>

        </div>
        <div className="px-4 py-6 grid gap-3 border-b border-solid">
          <h1 className="text-xl font-bold">{barbershop.name}</h1>
          <p className="flex items-center gap-2"><MapPin className="text-primary" /> <span>{barbershop.address}</span></p>
          <p className="flex items-center gap-2"><Star className="text-primary" /> <span>5.0 (889 avaliações)</span></p>
        </div>
      </section>
    </>
  );
}

export default BarbershopInfo;