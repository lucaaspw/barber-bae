"use client"
import { Barbershop, Booking, Service } from "@prisma/client";
import { generateDayTimeList } from "../_helpers/hours";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import React, { useEffect, useMemo, useState } from "react";
import { saveBooking } from "../_actions/save-booking";
import { signIn, useSession } from "next-auth/react";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-booking";
interface ServiceItemProp {
  barbershop: Barbershop;
  service: Service;
  isAuthenticate: boolean;
}
const ServiceItem = ({ barbershop, service, isAuthenticate }: ServiceItemProp) => {
  const router = useRouter();
  const {data} = useSession();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<String | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    if(!date){
      return;
    }
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);
      setDayBookings(_dayBookings);
    };

    refreshAvailableHours();
  }, [barbershop.id, date])

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  }
  const handleHourClick = (time: string) => {
    setHour(time);
  }
  const timeList = useMemo(() => {
    if(!date){
      return [];
    }
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const booking = dayBookings.find(booking => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });
      if(!booking){
        return true;
      }

      return false;
    })
  }, [date, dayBookings]);

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
      });

      setSheetIsOpen(false)
      setSubmitIsLoading(false);
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {locale: ptBR, }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings")
        }
      })
      
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <Card >
        <CardContent className="max-[420px]:p-3 p-5 flex items-center max-[420px]:gap-2 gap-5">
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
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button onClick={handleBookingClick} variant="secondary" className="max-[420px]:w-30 max-[420px]:px-2 max-[420px]:py-2 flex justify-between items-center">
                    Reservar
                    <ChevronRight />
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0 w-[400px] max-[420px]:w-[350px] max-[420px]:overflow-auto">
                  <SheetHeader className="py-6 pl-4 text-left border-b">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    className="py-5 capitalize rounded-md"
                    locale={ptBR}
                    fromDate={addDays(new Date(), 1)}
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
                            {submitIsLoading && <Loader2 className="h-4 w-4 animate-spin" /> || <ChevronRight />}
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