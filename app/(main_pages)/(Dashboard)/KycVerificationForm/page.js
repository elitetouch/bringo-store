"use client";
import { useState } from "react";
import { uploadSingleDocument } from "@/app/component/kyc_verification_form_components/UploadSingleDocument";
import { IDENTITY_DOCS, BUSINESS_DOCS } from "@/app/component/kyc_verification_form_components/KycVerificationData";
import { Spinner } from "@/app/component/kyc_verification_form_components/KycVerificationIcon";
import { StepBar } from "@/app/component/kyc_verification_form_components/StepBar";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { GetKycStatus } from "@/app/api/reactQuery";
import UploadPage from "@/app/component/kyc_verification_form_components/UploadPage";
import StatusPage from "@/app/component/kyc_verification_form_components/StatusPage";

export default function Page() {
  const [step, setStep] = useState(0);
  const [idDocType, setIdDocType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [idFiles, setIdFiles] = useState([]);
  const [bizDocType, setBizDocType] = useState("");
  const [bizIdNumber, setBizIdNumber] = useState("");
  const [bizFiles, setBizFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  /*
    FIX 3: Gate the query on the token so it never fires an
    unauthenticated request if the page somehow mounts before
    the token is available.
  */
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const { isPending, data: kycStatusData } = GetKycStatus({
    enabled: !!token,
  });
  const documents = kycStatusData?.data?.data?.documents ?? [];

  const queryClient = useQueryClient();
  const toast = useToast();

  const uploadAll = async ({ docType, files, needsId, idNumber }) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const requests = files
        .filter((file) => file != null)
        .map((file) =>
          uploadSingleDocument({ docType, file, needsId, idNumber }),
        );
      await Promise.all(requests);
      toast({
        title: "Success",
        description: "Upload successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return true;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Upload failed. Please check your connection and try again.";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitId = async () => {
    const selectedDoc = IDENTITY_DOCS.find((d) => d.id === idDocType);
    const ok = await uploadAll({
      docType: idDocType,
      files: idFiles,
      needsId: selectedDoc?.needsId ?? false,
      idNumber,
    });
    /*
      FIX 1: was invalidating BEFORE the ok check — if the upload
      failed the cache was still busted, causing a wasted refetch.
      Now invalidation only runs on success, so step 2 always shows
      the freshest data that actually includes the new document.
    */
    if (!ok) return;
    queryClient.invalidateQueries({ queryKey: ["KycStatus"] });
    setStep(1);
  };

  const submitBiz = async () => {
    const selectedDoc = BUSINESS_DOCS.find((d) => d.id === bizDocType);
    const ok = await uploadAll({
      docType: bizDocType,
      files: bizFiles,
      needsId: selectedDoc?.needsId ?? false,
      idNumber: bizIdNumber,
    });
    if (!ok) return;
    /*
      FIX 2: invalidation was missing entirely from submitBiz — after
      uploading business docs the cache was never refreshed, so the
      status page showed stale data with no business document card.
    */
    queryClient.invalidateQueries({ queryKey: ["KycStatus"] });
    setStep(2);
  };

  const reset = () => {
    setStep(0);
    setIdDocType("");
    setIdNumber("");
    setIdFiles([]);
    setBizDocType("");
    setBizIdNumber("");
    setBizFiles([]);
    setSubmitError(null);
  };

  const goBack = () => {
    setSubmitError(null);
    setStep(0);
  };

  return (
    <div className="kyc-root">
      <div className="kyc-card">
        <StepBar current={step} />

        {step === 0 && (
          <UploadPage
            heading="Upload Your Proof of Identity"
            subtext="Select an identity document type, enter your ID number, and upload a clear photo."
            docList={IDENTITY_DOCS}
            docType={idDocType}
            setDocType={setIdDocType}
            idNumber={idNumber}
            setIdNumber={setIdNumber}
            files={idFiles}
            setFiles={setIdFiles}
            onSubmit={submitId}
            onNext={() => setStep(1)}
            isFirst
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {step === 1 && (
          <UploadPage
            heading="Upload Your Document"
            subtext="Bringo requires that you upload all required documents."
            docList={BUSINESS_DOCS}
            docType={bizDocType}
            setDocType={setBizDocType}
            idNumber={bizIdNumber}
            setIdNumber={setBizIdNumber}
            files={bizFiles}
            setFiles={setBizFiles}
            onSubmit={submitBiz}
            onBack={goBack}
            onNext={() => setStep(2)}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}

        {step === 2 &&
          (isPending ? (
            <div
              className="page-body"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
              }}
            >
              <Spinner />
              <span style={{ marginLeft: 12, color: "#A5A6AB", fontSize: 14 }}>
                Loading document status…
              </span>
            </div>
          ) : (
            <StatusPage documents={documents} onReset={reset} />
          ))}
      </div>
    </div>
  );
}