// pages/otp/page.js
"use client";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { verifyOTP } from "@/redux/features/auth/authSlice"; // Import thunks
import Button from "@/components/MyButton"; // Use your reusable Button component
import Link from "next/link";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
// Assuming you have Toast functions (showErrorToast, showSuccessToast)

const OTP = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // --- Get necessary state from Redux ---
  const {
    tempEmail,
    tempToken,
    otpStatus, // 'loading', 'succeeded', 'failed'
    otpError,
  } = useSelector((state) => state.auth);
  // ----------------------------------------
  console.log(tempEmail);

  const [code, setCode] = useState("");

  // OTP Page Redirect Guard
  // useEffect(() => {
  //   if (!tempEmail || !tempToken) {
  //     // If the data is missing (user navigated directly, or state was cleared)
  //     router.replace('/signup');
  //   }
  // }, [tempEmail, tempToken, router]);


  const handleOTPChange = (otpCode) => {
    // Ensure only numeric input
    if (/^\d*$/.test(otpCode)) {
      setCode(otpCode);
    }
  };

  const handleVerify = async () => {
    if (code.length !== 4) { // Assuming 4 digits based on your example, but using 6 from your component
      return;
    }

    // Dispatch the verification thunk
    const resultAction = await dispatch(verifyOTP({
      // Removed 'email' since it's not in the API body 
      otp: code,
      token: tempToken
    }));

    // Check if verification was successful (fulfilled)
    if (verifyOTP.fulfilled.match(resultAction)) {
      router.push("createprofile"); // Redirect to next step in your flow
      showSuccessToast("OTP has been verified successfully!");
    } else {
      // Failure is handled by otpError state
      showErrorToast(resultAction.payload);
    }
  };

  const isVerifying = otpStatus === 'loading';

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container otp_container">
        <div className="auth_head">
          <h2 className="px-5">Verification Code</h2>
          <p>We have sent the verification code to <b>{tempEmail}</b></p>
        </div>

        <form className="auth_otp" onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
          <OtpInput
            value={code}
            onChange={handleOTPChange}
            numInputs={4}
            separator={<span style={{ width: "8px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            // ... existing styling and input rendering props
            renderInput={(props) => (
              <input
                {...props}
                onKeyDown={(e) => {
                  if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                    e.preventDefault();
                  }
                }}
              />
            )}
          // ... existing inputStyle and focusStyle
          />

          <div className="text-center w-100 mt-3">
            {/* Display verification error */}
            {otpStatus === 'failed' && otpError && <p style={{ color: "red" }}>{otpError}</p>}

            <Button type="submit" className="theme-btn2" isLoading={isVerifying} disabled={code.length !== 4}>
              Continue
            </Button>
          </div>
        </form>

        <div className="resend_code text-center mt-3">
          {/* Display resend success message */}
          <p>Didn't receive the code?</p>
          {/* Fallback to re-signup, replaced by a simple link */}
          <h5 className="mt-2">
            <Link href="signup" style={{ color: "#CD8A1A", cursor: "pointer" }}>
              Pls sign up again
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OTP;