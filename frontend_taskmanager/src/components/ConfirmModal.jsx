import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
  open,
  title,
  message,
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  loading = false
}) => {
  if (!open) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="modal-btn cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="modal-btn confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
