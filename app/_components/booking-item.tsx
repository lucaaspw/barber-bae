import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
      <Card>
        <CardContent className="p-0 flex justify-between">
          <div className="grid gap-3 p-4">
            <Badge className="max-w-max bg-[#221c3d] text-primary hover:bg-[#221c3d]">Confirmado</Badge>
            <h3 className="font-bold">Corte de Cabelo</h3>
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src="https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png"/>
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <span>Barber Shop</span>
            </div>
          </div>
          <div className="w-28 flex flex-col gap-1 p-4 justify-center items-center border-l border-secondary">
            <span>Fevereiro</span>
            <span className="text-xl font-bold">10</span>
            <span>09:00</span>
          </div>
        </CardContent>
      </Card>
  );
}

export default BookingItem;