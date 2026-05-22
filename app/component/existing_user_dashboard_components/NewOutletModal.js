import Modal from "@/app/component/Modal/ModalComponent";
import CreateNewOutletForm from "./CreateNewOutletForm";
export function NewOutlet({ open, setOpen, storeId, countries, outletId, onSuccess }) {
  const isEditMode = Boolean(outletId);
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={isEditMode ? "Edit Outlet" : "Create Store"}
        size="lg"
      >
        <CreateNewOutletForm
          storeId={storeId}
          countries={countries}
          onClose={() => setOpen(false)}
          outletId={outletId}
          onSuccess={onSuccess}
        />
      </Modal>
    </>
  );
}
