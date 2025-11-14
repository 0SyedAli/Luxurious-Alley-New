"use client";
import OtpInput from "react-otp-input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/component/MyButton";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useDispatch } from "react-redux";
import { verifyUserOTP } from "@/redux/features/auth/authSlice";
const OTP = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // get token from sessionStorage
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  // redirect if no token
  useEffect(() => {
    if (!token) {
      router.replace("/signup");
    }
  }, [token, router]);

  const handleOTPChange = (otpCode) => {
    if (/^\d*$/.test(otpCode)) {
      setCode(otpCode);
    }
  };

  const handleVerify = async () => {
    if (code.length !== 4) return;

    setLoading(true);

    try {
      const result = await dispatch(
        verifyUserOTP({ otp: code, token })
      ).unwrap();

      showSuccessToast("OTP verified successfully!");

      router.push("/user");
    } catch (err) {
      showErrorToast(err || "Invalid OTP");
    }

    setLoading(false);
  };

  // const handleVerify = async () => {
  //   if (code.length !== 4) return;

  //   setLoading(true);

  //   try {
  //     const res = await api.post("/VerifyOtpAndCreate", {
  //       otp: code,
  //       token: token,
  //     });

  //     if (res?.data?.success) {
  //       showSuccessToast(res.data.message || "OTP verified successfully!");

  //       // store admin info in sessionStorage
  //       sessionStorage.setItem("admin", JSON.stringify(res.data.data));
  //       sessionStorage.setItem("token", res.data.token); // update token if backend returns new one

  //       // redirect to admin page
  //       router.push("/user");
  //     } else {
  //       showErrorToast(res?.data?.message || "Invalid OTP");
  //     }
  //   } catch (error) {
  //     showErrorToast(error?.response?.data?.message || "Server Error");
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="content align-self-center mw-600">
      <div className="auth_container otp_container">
        <div className="auth_head">
          <h2>Verification Code</h2>
          <p>Enter 4 digit code we sent to your email</p>
        </div>

        <form
          className="auth_otp"
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify();
          }}
        >
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

          <div className="text-start w-100 mt-3">
            <Button
              type="submit"
              className="theme-btn2"
              isLoading={loading}
              disabled={code.length !== 4}
            >
              Continue
            </Button>
          </div>
        </form>

        <div className="resend_code d-flex align-items-center gap-2 mt-3">
          <p>Code Didn't Receive? </p>
          <h5 className="mt-2">
            <span
              style={{ color: "#CD8A1A", cursor: "pointer" }}
              onClick={() => router.push("/signup")}
            >
              Resend
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default OTP;
