import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { maskPhone } from "@/src/global/utils/formatPhone";
import { LeadFormSectionProps } from "../types";

export default function LeadFormSection(props: LeadFormSectionProps) {
  const { form, leadFormRules, birthMonths, requestStatus, formComplete, handleSubmit } = props;

  return (
    <section className="flex w-full max-w-md flex-col gap-4 px-4 pt-8 pb-6 sm:max-w-[422px] sm:pt-10">
      <p className="text-center text-lg leading-snug text-white sm:text-xl">
        <strong className="font-semibold">Cadastre-se</strong> agora e tenha{" "}
        <strong className="font-semibold">acesso antecipado</strong> à seleção de joias e relógios de luxo com 30%
        OFF. Peças únicas.
      </p>

      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            rules={leadFormRules.name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 sm:h-8 sm:text-xs" placeholder="Nome" aria-label="Nome" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={leadFormRules.email}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-10 sm:h-8 sm:text-xs" type="email" placeholder="Email" aria-label="Email" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsapp"
            rules={leadFormRules.whatsapp}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 sm:h-8 sm:text-xs"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Whatsapp"
                    aria-label="Whatsapp"
                    autoComplete="tel"
                    {...field}
                    onChange={(event) => field.onChange(maskPhone(event.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthMonth"
            rules={leadFormRules.birthMonth}
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <select
                      aria-label="Mês de Aniversário"
                      className={`h-10 w-full cursor-pointer appearance-none rounded-[4px] border border-zinc-300 bg-white px-3 pr-10 text-base shadow-none outline-none aria-invalid:border-red-500 sm:h-8 sm:text-xs ${field.value ? "text-black" : "text-zinc-500"}`}
                      {...field}
                    >
                      <option value="" disabled>
                        Mês de Aniversário
                      </option>
                      {birthMonths.map(function (birthMonth) {
                        return (
                          <option key={birthMonth.value} value={birthMonth.value} className="text-black">
                            {birthMonth.label}
                          </option>
                        );
                      })}
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-500" />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="consent"
            rules={leadFormRules.consent}
            render={({ field }) => (
              <FormItem className="mt-4 border-t border-white pt-4">
                <div className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="mt-0.5 data-[state=checked]:border-[#FF5C00] data-[state=checked]:bg-[#FF5C00]"
                    />
                  </FormControl>
                  <FormLabel className="block cursor-pointer text-sm leading-snug font-normal text-white sm:text-base">
                    Concordo com as <span className="underline">políticas de privacidade</span> e aceito receber as
                    comunicações da Orit.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!formComplete || requestStatus.loading}
            className="mt-2 h-11 w-full bg-[#FF5C00] text-sm font-semibold sm:h-10 tracking-widest text-white hover:bg-[#FF5C00]/90"
          >
            {requestStatus.loading ? "ENVIANDO..." : "CADASTRAR"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
