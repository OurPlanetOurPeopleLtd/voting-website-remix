import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

import "./DialogModal.scss";

interface DialogModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export type DialogModalRef = {
  pause: () => void;
  resetVideo: () => void;
};

export const DialogModal = forwardRef<DialogModalRef, DialogModalProps>(
  ({ open, onClose, children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      pause() {
        if (!dialogRef.current) return;

        const videos = dialogRef.current.querySelectorAll("video");
        if (videos.length > 0) {
          videos.forEach((video) => {
            video.pause();
            video.currentTime = 0;
            video.load(); // native video load to show poster
          });
        }

        const muxPlayers = dialogRef.current.querySelectorAll("mux-player");
        muxPlayers.forEach((player) => {
          (player as any).pause?.();
          (player as any).currentTime = 0;

          // DO NOT call .load() on mux-player — unsupported
        });
      },
      resetVideo() {
        this.pause();
      }
    }));

    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal();
        dialog.focus();
      } else if (!open && dialog.open) {
        dialog.close();
      }

      const handleCancel = (e: Event) => {
        e.preventDefault(); // Prevent ESC from closing it without custom onClose
        onClose();
      };

      dialog.addEventListener("cancel", handleCancel);
      return () => dialog.removeEventListener("cancel", handleCancel);
    }, [open, onClose]);

    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (dialog && e.target === dialog) {
        onClose();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        onClick={handleDialogClick}
        className="DialogModal"
        aria-modal="true"
        role="dialog"
      >
        <div className="DialogModal__header">
          <button autoFocus onClick={onClose} className="btn btn--white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              width="40"
              height="40"
              aria-hidden="true"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
            Close <span className="visually-hidden">dialog</span>
          </button>
        </div>

        <div>{children}</div>
      </dialog>
    );
  }
);
