import Modal from "@/app/component/Modal/ModalComponent";
import CreateNewOutletForm from "./CreateNewOutletForm";
export function NewOutlet({ open, setOpen, storeId, countries }) {
  //
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Create Store"
        size="lg"
        // footer={
        //   <ModalFooter
        //     onClose={() => setOpen(false)}
        //     onConfirm={() => setOpen(false)}
        //     confirmText="Create"
        //   />
        // }
      >
        <CreateNewOutletForm
          storeId={storeId}
          countries={countries}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
