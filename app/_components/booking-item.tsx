import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { User2 } from "lucide-react";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    }
  }>;
}
const BookingItem = ({booking}: BookingItemProps) => {
  
  return (
      <Card>
        <CardContent className="p-0 flex justify-between">
          <div className="grid gap-3 p-4">
          {isPast(booking.date) ? <Badge variant="secondary" className="max-w-max rounded-lg">Finalizado</Badge>: <Badge className="max-w-max rounded-lg bg-[#221c3d] text-primary hover:bg-[#221c3d]">Confirmado</Badge>}
            
            <h3 className="font-bold">{booking.service.name}</h3>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={booking.barbershop.imageUrl}/>
                <AvatarFallback><User2/></AvatarFallback>
              </Avatar>
              <span>{booking.barbershop.name}</span>
            </div>
          </div>
          <div className="w-28 flex flex-col gap-1 p-4 justify-center items-center border-l border-secondary">
            <span className="capitalize">{format(booking.date, "MMMM", {locale: ptBR})}</span>
            <span className="text-xl font-bold">{format(booking.date, "dd")}</span>
            <span>{format(booking.date, "hh:mm")}</span>
          </div>
        </CardContent>
      </Card>
  );
}

export default BookingItem;