import { RegisterOptions, UseFormReturn } from "react-hook-form";

import { HeaderProps, MenuDrawerProps, MenuState, RequestStatus } from "../global/types/global";

export type { HeaderProps, MenuDrawerProps, MenuState, RequestStatus };

export type LeadForm = {
  name: string;
  email: string;
  whatsapp: string;
  birthMonth: string;
  consent: boolean;
};

// Contrato de POST /leads/subscribe (forms.oritlab.com.br):
// phoneNumber só dígitos, monthBirthday por extenso ("Janeiro"),
// conversionIdentifier = formId da landing (identifica a origem do lead).
export type LeadPayload = {
  name: string;
  email: string;
  phoneNumber: string;
  monthBirthday: string;
  conversionIdentifier: string;
};

export type BirthMonthOption = {
  value: string;
  label: string;
};

export type HeroSaleProps = {
  imageSrc: string;
  handleModal: (action: string) => void;
};

export type LeadFormRules = {
  [Field in keyof LeadForm]: RegisterOptions<LeadForm, Field>;
};

export type LeadFormSectionProps = {
  form: UseFormReturn<LeadForm>;
  leadFormRules: LeadFormRules;
  birthMonths: BirthMonthOption[];
  requestStatus: RequestStatus;
  formComplete: boolean;
  handleSubmit: () => void;
};

export type ErrorModalProps = {
  requestStatus: RequestStatus;
  handleModalError: (action: string) => void;
};
