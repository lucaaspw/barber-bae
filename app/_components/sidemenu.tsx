"use client"

import { Button } from "./ui/button";
import { CalendarDays, HomeIcon, LogIn, LogOut, MenuIcon, UserCircle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const SideMenu = () => {
  const { data, status } = useSession();
  const handleLogOut = () => signOut();
  const handleLogIn = () => signIn("google");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="py-6 pl-4 text-left border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        {status === 'authenticated' ? (
          <div className="py-6 px-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage width={40} height={40} src={data.user?.image ?? "BA"} alt={data.user?.name ?? "Bae Barber"} />
                  <AvatarFallback>{data.user?.image}</AvatarFallback>
                </Avatar>
                <div className="grid">
                  {data.user?.name}
                  <span className="text-xs text-muted-foreground">{data.user?.email}</span>
                </div>

              </div>
              <Button onClick={handleLogOut} variant="secondary">
                <LogOut size={20} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-6 px-4 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <UserCircle className="text-accent" size={40} />
                Olá, Faça seu login!
              </div>
            </div>
            <Button onClick={handleLogIn} variant="secondary" className="flex items-center justify-start gap-3">
              <LogIn size={16} />
              Fazer login
            </Button>
          </div>
        )}
        <div className="px-4 flex flex-col gap-2">
          <Button asChild variant="outline" className="flex justify-start items-center gap-3">
            <Link href="/">
              <HomeIcon size={16} />
              Início
            </Link>

          </Button>
          {data?.user && (
            <Button asChild variant="outline" className="flex justify-start items-center gap-3">
              <Link href="/bookings">
                <CalendarDays size={16} />
                Agendamentos
              </Link>
            </Button>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SideMenu;