'use client'
import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input"
import { SearchIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z.string({
    required_error: "Campo Obrigatório.",
  })
    .trim().min(1, "Campo Obrigatório.")
})

const Search = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleSubmit = (data: Zod.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`);
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2 items-center justify-between">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Encontre uma barbearia disponivel pra você..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-3" variant="default" size="icon">
            <SearchIcon size={25} />
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Search;