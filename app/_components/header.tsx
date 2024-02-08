"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SideMenu from "./sidemenu";
import Link from "next/link";

const Header = () => {
  return (
    <Card className="rounded-none px-4 py-6">
      <CardContent className="flex justify-between items-center p-0">
        <Link href="/">
          <Image src="/baebarber-logo.svg" alt="Bae Barber" height={22} width={130} />
        </Link>
        <SideMenu />
      </CardContent>
    </Card>
  );
}

export default Header;