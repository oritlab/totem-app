"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import { unmaskPhone } from "@/src/global/utils/formatPhone";
import { POSTLeadSubscribe } from "../API/PrivateSaleAPI";
import { birthMonths } from "../birthMonths";
import { LeadForm, LeadFormRules, RequestStatus } from "../types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function useFormPrivateSaleHook(conversionIdentifier: string) {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>({ loading: false, error: null });
  const router = useRouter();

  const form = useForm<LeadForm>({
    defaultValues: { name: "", email: "", whatsapp: "", birthMonth: "", consent: false },
  });
  const leadValues = useWatch({ control: form.control });

  // Botão "CADASTRAR" só habilita com todos os campos preenchidos + aceite marcado.
  const formComplete =
    !!leadValues.name?.trim() &&
    !!leadValues.email?.trim() &&
    !!leadValues.whatsapp?.trim() &&
    !!leadValues.birthMonth &&
    !!leadValues.consent;

  function handleSubmit(data: LeadForm) {
    if (!formComplete) return;
    if (requestStatus.loading) return;

    // O aceite (consent) é obrigatório pra habilitar o envio, mas — igual ao
    // popup do ecommerce — não vai no payload da API de leads.
    POSTLeadSubscribe(
      {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phoneNumber: unmaskPhone(data.whatsapp),
        monthBirthday: data.birthMonth,
        conversionIdentifier,
      },
      setRequestStatus,
      handleRedirect
    );
  }

  // Sucesso na API: limpa os dados do cliente e devolve o totem pra home.
  function handleRedirect() {
    form.reset();
    router.push("/");
  }

  function handleModalError(action: string) {
    if (action === "close") setRequestStatus({ loading: false, error: null });
  }

  return {
    form,
    leadFormRules,
    birthMonths,
    requestStatus,
    formComplete,
    handleSubmit: form.handleSubmit(handleSubmit),
    handleModalError,
  };
}

// Regras de validação dos campos — repassadas ao FormField via `rules`.
const leadFormRules: LeadFormRules = {
  name: { required: "Informe seu nome." },
  email: {
    required: "Informe seu e-mail.",
    pattern: { value: EMAIL_PATTERN, message: "E-mail inválido." },
  },
  whatsapp: {
    required: "Informe seu WhatsApp.",
    minLength: { value: 14, message: "WhatsApp inválido." },
  },
  birthMonth: { required: "Selecione o mês de aniversário." },
  consent: {
    validate: function (value: boolean) {
      return value || "É preciso aceitar para continuar.";
    },
  },
};
