"use client";

import MenuDrawer from "@/src/global/components/MenuDrawer";
import useLandingCampaignHook from "@/src/global/hooks/useLandingCampaignHook";
import useMenuHook from "@/src/Home/Hooks/useMenuHook";

import useFormPrivateSaleHook from "./Hooks/useFormPrivateSaleHook";
import HeroSale from "./Components/HeroSale";
import LeadFormSection from "./Components/LeadFormSection";
import ErrorModal from "./Components/ErrorModal";

export default function Main() {
  const { modalMenu, menuItems, handleModal } = useMenuHook();
  const { landingCampaign, landingAccess } = useLandingCampaignHook("blackfriday-2026-cadastro");
  const { form, leadFormRules, birthMonths, requestStatus, formComplete, handleSubmit, handleModalError } =
    useFormPrivateSaleHook(landingCampaign.formId);

  // Sem acesso liberado (fora da janela ou ainda lendo o token): só o fundo —
  // o hook de landing redireciona pra home quando não houver acesso.
  if (!landingAccess.allowed) return <div className="h-dvh w-full bg-[#111111]" />;

  // Totem na vertical (1080x1920): h-dvh ocupa a tela inteira sem scroll —
  // arte inteira no topo e formulário logo abaixo, como no layout de referência.
  return (
    <div className="flex h-dvh w-full flex-col overflow-x-hidden overflow-y-auto bg-[#111111]">
      <MenuDrawer modalMenu={modalMenu} menuItems={menuItems} handleModal={handleModal} />

      <HeroSale imageSrc={landingCampaign.heroImage} handleModal={handleModal} />

      <div className="flex flex-col items-center">
        <main className="flex w-full flex-col items-center">
          <LeadFormSection
            form={form}
            leadFormRules={leadFormRules}
            birthMonths={birthMonths}
            requestStatus={requestStatus}
            formComplete={formComplete}
            handleSubmit={handleSubmit}
          />
        </main>

        <footer className="flex flex-col items-center gap-1 px-4 pb-6 text-center text-xs text-white">
          <span>ORIT ARTIGOS DE LUXO LTDA</span>
          <span>Especializada em compra e venda de joias e relógios de luxo.</span>
          <span>02.071.667/0001-00</span>
        </footer>
      </div>

      <ErrorModal requestStatus={requestStatus} handleModalError={handleModalError} />
    </div>
  );
}
