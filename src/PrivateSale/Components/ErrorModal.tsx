import { Button } from "@/src/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { ErrorModalProps } from "../types";

export default function ErrorModal(props: ErrorModalProps) {
  const { requestStatus, handleModalError } = props;

  return (
    <Dialog open={!!requestStatus.error} onOpenChange={() => handleModalError("close")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>NÃO FOI POSSÍVEL CONCLUIR SEU CADASTRO</DialogTitle>
          <DialogDescription>{requestStatus.error}</DialogDescription>
        </DialogHeader>
        <Button className="w-full text-xs tracking-widest" onClick={() => handleModalError("close")}>
          TENTAR NOVAMENTE
        </Button>
      </DialogContent>
    </Dialog>
  );
}
