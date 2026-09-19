import Dialog from "./Dialog";
import Button from "./Button";

export default function ConfirmDialog({ open, onClose, onConfirm, title = "Are you sure?", description, confirmLabel = "Delete", danger = true }) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      {description && <p className="mb-6 text-sm text-ink-500">{description}</p>}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={danger ? "danger" : "primary"}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
