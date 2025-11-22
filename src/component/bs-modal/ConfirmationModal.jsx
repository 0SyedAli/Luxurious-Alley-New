"use client";

function DeleteStylistModal({ onConfirm, stylistName }) {
  return (
    <div
      className="modal fade"
      id="deleteStylistModal"
      tabIndex="-1"
      aria-labelledby="deleteStylistLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog noti-modal-dialog delete_modal_dialog">
        <div className="modal-content">
          <div className="modal-body">

            <h3 className="px-4 pb-4">
              Are you sure you want to delete <strong>{stylistName}</strong>?
            </h3>

            <div className="aus_btns d-flex align-items-center justify-content-center gap-3">
              <button
                className="themebtn4 red btn"
                data-bs-dismiss="modal"
              >
                No
              </button>

              <button
                className="themebtn4 green btn"
                onClick={onConfirm}
                data-bs-dismiss="modal"
              >
                Yes
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteStylistModal;
