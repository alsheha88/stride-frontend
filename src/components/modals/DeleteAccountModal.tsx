// DeleteAccountModal.tsx
import { motion } from "motion/react";
import { ThreeDots } from "react-loader-spinner";
import Button from "../subcomponents/Button";
import { useDeleteUser } from "../../hooks/auth/useAuth";
import { useEscapeKey } from "../../hooks/useEscapeKey";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function DeleteAccountModal({ isOpen, onClose }: ModalProps) {
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  useEscapeKey(isOpen, onClose);

  const handleDelete = () => {
    deleteUser();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-2000 px-3 md:px-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="grid gap-6 md:gap-8 p-6 md:p-8 bg-surface border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-paragraph text-xl md:text-2xl font-semibold">
          Delete Account
        </h3>

        <p className="text-paragraph text-sm md:text-base">
          Delete your account? This cannot be undone.
        </p>

        <div className="flex items-center gap-2.5 place-self-end">
          <Button
            variant="ghost"
            type="button"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ThreeDots color="#fffffe" width={16} height={16} />
            ) : (
              "Delete Account"
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default DeleteAccountModal;