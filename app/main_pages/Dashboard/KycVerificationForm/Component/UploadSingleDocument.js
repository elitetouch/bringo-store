import axiosInstance from "@/app/api/Api_Instance";
//Function to upload data to backend end point
/* ─────────────────────────────────────────────────────────────────
   API
   Endpoint : POST /api/v1/merchant/kyc-documents
   Payload  : multipart/form-data
              type            → doc definition id  (e.g. "national_id")
              file            → File object (one per request)
              document_number → ID number (only when needsId is true)

   Each side of a document is submitted as its own individual request.
──────────────────────────────────────────────────────────────── */
/**
 * Uploads a single file to the KYC endpoint.
 * @param {string}  docType   - document id from the DOCS array
 * @param {File}    file      - the actual File object
 * @param {boolean} needsId   - whether document_number is required
 * @param {string}  idNumber  - the ID / reference number
 */
const KYC_ENDPOINT = "/api/v1/merchant/kyc-documents";
export async function uploadSingleDocument({
  docType,
  file,
  needsId,
  idNumber,
}) {
  const formData = new FormData();
  formData.append("type", docType);
  formData.append("file", file);

  if (needsId && idNumber?.trim()) {
    formData.append("document_number", idNumber.trim());
  }

  try {
    const response = await axiosInstance.post(KYC_ENDPOINT, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Response:", response.data); // 👈 this is what you want
    return response.data;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    throw error;
  }
}
