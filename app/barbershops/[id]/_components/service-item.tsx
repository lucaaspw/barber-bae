"use client"
import { Barbershop, Service } from "@prisma/client";
import { generateDayTimeList } from "../_helpers/hours";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import React, { useMemo, useState } from "react";
import { saveBooking } from "../_actions/save-booking";
import { signIn, useSession } from "next-auth/react";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
interface ServiceItemProp {
  barbershop: Barbershop;
  service: Service;
  isAuthenticate: boolean;
}
const ServiceItem = ({ barbershop, service, isAuthenticate }: ServiceItemProp) => {
  const {data} = useSession();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<String | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  }
  const handleHourClick = (time: string) => {
    setHour(time);
  }
  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : []
  }, [date]);

  const handleBookingClick = () => {
    if (!isAuthenticate) {
      return signIn("google");
    }
  }

  const handleBookingSubmit = async () => {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }
      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);
      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Card >
        <CardContent className="p-5 flex items-center gap-5">
          <div className="relative min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]">
            <Image className="rounded-md" fill style={{ objectFit: "contain" }} src={service.imageUrl} alt={service.name} />
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant="secondary" className="w-32 flex justify-between items-center">
                    Reservar
                    <ChevronRight />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 w-[400px] sm:w-[540px]">
                  <SheetHeader className="py-6 pl-4 text-left border-b">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    className="py-5 capitalize rounded-md"
                    locale={ptBR}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                      },
                      cell: {
                        width: "100%",
                      },
                    }}
                  />
                  {/* Mostar horários somente se o usuário selecionar uma data */}
                  {date && (
                    <>
                      <div className="px-4 py-6 border-t border-b flex items-center gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden ">
                        {timeList.map((time) => (
                          <Button className="border" onClick={() => handleHourClick(time)}
                            variant={hour === time ? "default" : "outline"} key={time}>
                            {time}
                          </Button>
                        ))}
                      </div>
                      <div className="px-4 py-6">
                        <Card>
                          <CardHeader className="p-4">
                            <CardTitle className="flex text-xl items-center justify-between">
                              <span>{service.name}</span>
                              <span>
                                {Intl.NumberFormat("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                }).format(Number(service.price))}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="px-4 text-lg text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>Data</span>
                              <span className="capitalize">{format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}</span>
                            </div>
                            <div className="flex items-center py-2 justify-between">
                              <span>Horário</span>
                              <span>
                                {hour}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Barbearia</span>
                              <span>
                                {barbershop.name}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                        <SheetFooter className="pt-6">
                          <Button onClick={handleBookingSubmit} disabled={!hour || !date || submitIsLoading} className="flex justify-between items-center">
                            Confirmar Reserva 
                            {submitIsLoading ? <Loader2 className="h-4 w-4 anumate-spin" /> : <ChevronRight />}
                            </Button>
                        </SheetFooter>
                      </div>
                    </>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default ServiceItem;