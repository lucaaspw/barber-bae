'use client'
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react";
import { z } from "zod"

const formSchema = z.object({
  search: z
    .string({
      required_error: "Campo Obrigatório.",
    })
    .trim()
    .min(1, "Campo Obrigatório.")
})

const Search = () => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <Input placeholder="Encontre uma barbearia disponivel pra você..." />
      <Button className="px-3" variant="default" size="icon">
        <SearchIcon size={25} />
      </Button>
    </div>
  );
}

export default Search;