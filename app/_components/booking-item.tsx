"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Loader2, User2 } from "lucide-react";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { CancelBooking } from "../_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    }
  }>;
}
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const handleCancelClick = async () => {
    setIsDeleteLoading(true);
    setSheetIsOpen(true)
    try {
      await CancelBooking(booking.id);
      toast.success("Reserva cancelada com sucesso!");

    } catch (error) {
      toast.success("Erro ao cancelar reserva");
      console.error(error);
    } finally {
      setIsDeleteLoading(false)
      setSheetIsOpen(false)
    }
  }
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger className="w-full" asChild>
        <Card >
          <CardContent className="p-0 flex justify-between">
            <div className="grid gap-3 p-4">
              {isPast(booking.date) ? <Badge variant="secondary" className="max-w-max rounded-lg">Finalizado</Badge> : <Badge className="max-w-max rounded-lg bg-[#221c3d] text-primary hover:bg-[#221c3d]">Confirmado</Badge>}

              <h3 className="font-bold text-left">{booking.service.name}</h3>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback><User2 /></AvatarFallback>
                </Avatar>
                <span>{booking.barbershop.name}</span>
              </div>
            </div>
            <div className="w-28 flex flex-col gap-1 p-4 justify-center items-center border-l border-secondary">
              <span className="capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</span>
              <span className="text-xl font-bold">{format(booking.date, "dd")}</span>
              <span>{format(booking.date, "hh:mm")}</span>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0 w-[400px] sm:w-[540px]">
        <SheetHeader className="py-6 pl-4 text-left border-b">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-4 py-6">
          <div className="relative h-[200px] w-full">
            <Image src="/barbershop-map.png" fill objectFit="contain"
              alt={booking.barbershop.name} />
            <Card className="absolute bottom-[8px] w-[95%] left-[2.5%] inline-auto">
              <CardContent className="flex items-center gap-3 p-3">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback><User2 /></AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold">{booking.barbershop.name}</h3>
                  <p className="text-sm text-muted-foreground">{booking.barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="px-4 grid gap-3">
          {isPast(booking.date) ? <Badge variant="secondary" className="max-w-max rounded-lg">Finalizado</Badge> : <Badge className="max-w-max rounded-lg bg-[#221c3d] text-primary hover:bg-[#221c3d]">Confirmado</Badge>}
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="flex text-lg items-center justify-between">
                <span>{booking.service.name}</span>
                <span>
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 text-lg text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Data</span>
                <span className="capitalize">{format(booking.date, "dd 'de' MMMM", {
                  locale: ptBR,
                })}</span>
              </div>
              <div className="flex items-center py-2 justify-between">
                <span>Horário</span>
                <span>
                  {format(booking.date, "HH:mm")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Barbearia</span>
                <span>
                  {booking.barbershop.name}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <SheetFooter className="px-4 py-6 flex flex-row gap-3">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">Voltar</Button>
          </SheetClose>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full" variant="destructive">
                Cancelar Reserva
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%] px-4 rounded-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar reserva</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esse agendamento?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-row justify-between gap-3 items-center">
                <AlertDialogCancel asChild className="mt-0">
                  <Button className="w-full" variant="secondary">Voltar</Button>
                </AlertDialogCancel>
                {!isPast(booking.date)
                  ? <Button onClick={handleCancelClick} className="w-full" variant="destructive">
                    Cancelar Reserva
                    {isDeleteLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                  </Button>
                  : null}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;