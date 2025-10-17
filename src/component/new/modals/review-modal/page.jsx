// components/ReviewModal.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import StarRating from "../../star-rating";

// Zod schema for validation
const reviewSchema = z.object({
  stars: z.number().min(1, "Please select a rating").max(5),
  message: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(500, "Review must be less than 500 characters"),
});

const ReviewModal = ({
  show,
  onHide,
  onSubmit,
  salonId,
  userId,
  isLoading = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      stars: 0,
      message: "",
    },
  });

  const currentRating = watch("stars");
  const currentMessage = watch("message");

  const handleRatingChange = (rating) => {
    setValue("stars", rating, { shouldValidate: true });
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      salonId,
      userId,
      stars: data.stars,
      message: data.message,
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onHide();
  };

  // If modal is not shown, return null
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1050,
        }}
        onClick={handleClose}
      >
        {/* Modal Dialog */}
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          style={{
            maxWidth: "400px",
            margin: "1.75rem auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fs-6">Write a Review</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                disabled={isLoading}
              ></button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="modal-body pt-0">
                {/* Star Rating */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-2">
                    Rate your experience
                  </label>
                  <StarRating
                    rating={currentRating}
                    onRatingChange={handleRatingChange}
                    size={20}
                  />
                  {errors.stars && (
                    <p className="text-danger small mt-1 mb-0">
                      {errors.stars.message}
                    </p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="mb-3">
                  <label className="form-label small text-muted mb-2">
                    Your review
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience with this salon..."
                    {...register("message")}
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    style={{ fontSize: "14px" }}
                  />
                  {errors.message && (
                    <div className="text-danger small mt-1">
                      {errors.message.message}
                    </div>
                  )}
                  <div className="text-end small text-muted mt-1">
                    {currentMessage.length}/500
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer border-0 pt-0">
                {/* <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  className="border-tab-custom-button"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
