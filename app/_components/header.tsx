"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="rounded-none px-5 py-6">
      <CardContent className="flex justify-between items-center p-0">
        <Image src="/baebarberlogo.svg" alt="Bae Barber" height={22} width={130} />
        <Button variant="outline" size="icon">
          <MenuIcon/>
        </Button>
      </CardContent>
    </Card>
  );
}

export default Header;