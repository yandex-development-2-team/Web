export type ModalFooter =
  | {
      variant: 'cancel-save';
      onSave: () => void;
      isSaveLoading?: boolean;
    }
  | {
      variant: 'delete-cancel-save';
      onSave: () => void;
      onDelete: () => void;
      isSaveLoading?: boolean;
      isDeleteLoading?: boolean;
    };
