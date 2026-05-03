"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Text, Input, Select } from "@chakra-ui/react";
import LocationInput from "../../component/GoogleApiInput";
import { GoogleMapsWrapper } from "../../component/useJsApiLoader";
import axiosInstance from "@/app/api/Api_Instance";
import Modal from "@/app/component/Modal/ModalComponent";

// ─── Validation Schema ────────────────────────────────────────────────────────
const StoreSettingsSchema = Yup.object().shape({
  outletName: Yup.string().required("Outlet name is required"),
  storeId: Yup.string().required("Store is required"),
  addressOne: Yup.string().required("Address is required"),
  openingHours: Yup.string().required("Opening hours is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  lat: Yup.number()
    .typeError("Select an address from the dropdown")
    .required("Latitude is required"),
  lng: Yup.number()
    .typeError("Select an address from the dropdown")
    .required("Longitude is required"),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Converts "9.00am" → "09:00" (for repopulating time inputs)
const parseTimeToInput = (timeStr) => {
  const match = timeStr?.trim().match(/^(\d+)\.(\d+)(am|pm)$/i);
  if (!match) return "";
  let hour = parseInt(match[1], 10);
  const minute = match[2];
  const period = match[3].toLowerCase();
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${minute}`;
};

// Converts "14:30" → "2.30pm"
const formatTime = (time) => {
  if (!time) return "";
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr || "00";
  const period = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}.${minute}${period}`;
};

// Transforms schedule data → ["monday:9.00am - 5.00pm", ...]
const transformSchedule = (data) => {
  return data
    .filter((item) => item.active && item.left && item.right)
    .map((item) => {
      const open = formatTime(item.left);
      const close = formatTime(item.right);
      return `${item.day.toLowerCase()}:${open} - ${close}`;
    });
};

// For "always open" — builds ["monday:12.00am - 11.59pm", ...] for active days
const transformToggles = (toggles) => {
  const DAY_MAP = {
    mondayOrders: "monday",
    tuesdayOrders: "tuesday",
    wednesdayOrders: "wednesday",
    thursdayOrders: "thursday",
    fridayOrders: "friday",
    saturdayOrders: "saturday",
    sundayOrders: "sunday",
  };
  return Object.entries(toggles)
    .filter(([, active]) => active)
    .map(([key]) => `${DAY_MAP[key]}:12.00am - 11.59pm`);
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }) {
  return (
    <label className="block text-[13px] font-semibold text-[#343538] mb-[10px] tracking-wide">
      {children}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return (
    <p className="mt-[6px] text-[11px] text-red-500 font-medium">{message}</p>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  readOnly,
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          width: "100%",
          height: "76px",
          padding: "0 20px",
          borderRadius: "0.75rem",
          backgroundColor: readOnly ? "#F0F0F0" : "#ECECEC",
          border: "1px solid",
          color: "#343538",
          fontSize: "14px",
          outline: "none",
          transition: "all 200ms",
          borderColor: error && touched ? "#f87171" : "#F9F9F9",
          cursor: readOnly ? "default" : "text",
        }}
      />
      {touched && <FieldError message={error} />}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <Select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          width: "100%",
          height: "78px",
          paddingLeft: "20px",
          borderRadius: "0.75rem",
          backgroundColor: "#ECECEC",
          border: "1px solid",
          fontSize: "14px",
          outline: "none",
          transition: "all 200ms",
          cursor: "pointer",
          color: value ? "#343538" : "#A5A6AB",
          borderColor: error && touched ? "#f87171" : "#F9F9F9",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((opt) => (
          <option key={opt?.value || opt?.id} value={opt?.value || opt?.id}>
            {opt?.label || opt?.name}
          </option>
        ))}
      </Select>
      {touched && <FieldError message={error} />}
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div
      className="flex items-center px-[20px] py-[10px]"
      style={{ maxWidth: "95%" }}
    >
      <div className="flex-1 pr-6 grid grid-cols-2 items-center gap-x-[20px]">
        <p style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>
          {label}
        </p>
        {description && (
          <p className="text-[12px] text-[#A5A6AB] mt-[2px]">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        style={{
          position: "relative",
          flexShrink: 0,
          width: "64px",
          height: "28px",
          borderRadius: "14px",
          backgroundColor: checked ? "#92DF16" : "#D1D5DB",
          border: "none",
          cursor: "pointer",
          transition: "background-color 300ms",
          outline: "none",
          padding: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "12px",
            top: "9px",
            width: "1px",
            height: "10px",
            backgroundColor: "white",
            borderRadius: "999px",
            opacity: checked ? 1 : 0,
            transition: "opacity 200ms",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: checked ? "23px" : "2px",
            width: "39px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
            transition: "left 300ms",
          }}
        />
      </button>
    </div>
  );
}

// ─── Custom Schedule Toggle (Specific Time) ───────────────────────────────────
export const CustomToggle = ({ data, setData }) => {
  const handleChange = (index, field, value) => {
    setData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1.5rem",
        maxWidth: "80%",
      }}
    >
      {data.map((item, index) => (
        <div
          key={item.day}
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>
            {item.day}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {/* Opening time */}
              <div
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  padding: "1px",
                }}
              >
                <input
                  type="time"
                  value={item.left}
                  onChange={(e) => handleChange(index, "left", e.target.value)}
                  disabled={!item.active}
                  style={{
                    width: "120px",
                    height: "40px",
                    padding: "0 0.75rem",
                    borderRadius: "10px",
                    border: "none",
                    outline: "none",
                    opacity: item.active ? 1 : 0.4,
                  }}
                />
              </div>
              {/* Closing time */}
              <input
                type="time"
                value={item.right}
                onChange={(e) => handleChange(index, "right", e.target.value)}
                disabled={!item.active}
                style={{
                  width: "120px",
                  height: "40px",
                  padding: "0 0.75rem",
                  borderRadius: "0.75rem",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  opacity: item.active ? 1 : 0.4,
                }}
              />
            </div>
            {/* Toggle */}
            <button
              type="button"
              onClick={() => handleChange(index, "active", !item.active)}
              style={{
                width: "48px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                borderRadius: "999px",
                padding: "3px",
                backgroundColor: item.active ? "#92DF16" : "#e5e7eb",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.25s ease",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                  transition: "transform 0.25s ease",
                  transform: item.active
                    ? "translateX(22px)"
                    : "translateX(0px)",
                }}
              />
            </button>
          </div>

          {/* Validation hint */}
          {item.active && (!item.left || !item.right) && (
            <p style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>
              Please set opening and closing times
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Constants ────────────────────────────────────────────────────────────────
const TOGGLE_SETTINGS = [
  { key: "mondayOrders", label: "Monday", description: "Open 24hrs" },
  { key: "tuesdayOrders", label: "Tuesday", description: "Open 24hrs" },
  { key: "wednesdayOrders", label: "Wednesday", description: "Open 24hrs" },
  { key: "thursdayOrders", label: "Thursday", description: "Open 24hrs" },
  { key: "fridayOrders", label: "Friday", description: "Open 24hrs" },
  { key: "saturdayOrders", label: "Saturday", description: "Open 24hrs" },
  { key: "sundayOrders", label: "Sunday", description: "Open 24hrs" },
];

const OPENING_OPTIONS = [
  { value: "always", label: "Always Open" },
  { value: "specific", label: "Specific Time" },
];

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateNewOutletForm({
  storeId,
  countries,
  onClose,
  outletId,
  onSuccess,
}) {
  const isEditMode = Boolean(outletId);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const [toggles, setToggles] = useState({
    mondayOrders: true,
    tuesdayOrders: true,
    wednesdayOrders: true,
    thursdayOrders: true,
    fridayOrders: true,
    saturdayOrders: false,
    sundayOrders: false,
  });

  const [scheduleData, setScheduleData] = useState(
    DAYS_OF_WEEK.map((day) => ({ day, left: "", right: "", active: false })),
  );

  // ── Validate specific schedule before submit ──────────────────────────────
  const validateSchedule = () => {
    if (formik.values.openingHours !== "specific") return true;
    const activeItems = scheduleData.filter((d) => d.active);
    if (activeItems.length === 0) {
      setApiError("Please enable at least one day with opening times.");
      return false;
    }
    const incomplete = activeItems.some((d) => !d.left || !d.right);
    if (incomplete) {
      setApiError(
        "Please set both opening and closing times for all active days.",
      );
      return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues: {
      outletName: "",
      storeId: "",
      addressOne: "",
      openingHours: "",
      city: "",
      state: "",
      country: "",
      countryCode: "",
      lat: "",
      lng: "",
    },
    validationSchema: StoreSettingsSchema,
    onSubmit: async (values) => {
      setApiError("");

      if (!validateSchedule()) return;

      // ── Build opening_hours array ─────────────────────────────────────
      //Since the data structure for opening hours for always is different from that of specific then the function to trjansform data actually differs
      const opening_hours =
        values.openingHours === "always"
          ? transformToggles(toggles) // ["monday:12.00am - 11.59pm", ...]
          : transformSchedule(scheduleData); // ["monday:9.00am - 5.00pm", ...]

      if (opening_hours.length === 0) {
        setApiError("Please select at least one operating day.");
        return;
      }

      // ── Find country_id from countries list ───────────────────────────
      const matchedCountry = countries?.find(
        (c) =>
          c?.name?.toLowerCase().trim() ===
          values.country?.toLowerCase().trim(),
      );

      if (!matchedCountry) {
        setApiError(
          `Country "${values.country}" not found. Please select a valid address.`,
        );
        return;
      }

      // ── Build final payload ───────────────────────────────────────────
      const payload = {
        store_brand_id: values.storeId,
        country_id: matchedCountry.id,
        name: values.outletName,
        address: values.addressOne,
        city: values.city,
        state: values.state,
        lat: values.lat,
        lng: values.lng,
        opening_hours,
        is_active: true,
        status: "active",
      };

      console.log("📦 Payload:", payload);

      setIsSaving(true);
      try {
        if (isEditMode) {
          await axiosInstance.patch(
            `/api/v1/merchant/store-outlets/${outletId}`,
            payload,
          );
          console.log("✅ Outlet updated");
        } else {
          const resp = await axiosInstance.post(
            "/api/v1/merchant/store-outlets",
            payload,
          );
          console.log("✅ Outlet created:", resp?.data);
        }
        queryClient.invalidateQueries({ queryKey: ["Outlets"] });
        setSaveSuccess(true);
        setShowSuccessModal(true);
        formik.resetForm();
        setScheduleData(
          DAYS_OF_WEEK.map((day) => ({
            day,
            left: "",
            right: "",
            active: false,
          })),
        );
      } catch (err) {
        console.error("❌ Save failed:", err);
        setApiError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Something went wrong. Please try again.",
        );
      } finally {
        setIsSaving(false);
      }
    },
  });

  const handleToggle = (key) => (val) =>
    setToggles((prev) => ({ ...prev, [key]: val }));

  // ── Fetch outlet data in edit mode and pre-populate form ──────────────────
  useEffect(() => {
    if (!outletId) return;
    setIsFetching(true);
    axiosInstance
      .get(`/api/v1/merchant/store-outlets/${outletId}`)
      .then((resp) => {
        console.log("resp", resp);
        const o =
          resp?.data?.data?.storeOutlet ??
          resp?.data?.data?.storeOutlet ??
          resp?.data;
        if (!o) return;

        // Determine opening hours type
        const hours = Array.isArray(o.opening_hours) ? o.opening_hours : [];
        const isAlways =
          hours.length > 0 &&
          hours.every((h) => h.includes("12.00am - 11.59pm"));
        const hoursType = isAlways
          ? "always"
          : hours.length > 0
            ? "specific"
            : "";

        // Pre-populate formik values
        formik.resetForm({
          values: {
            outletName: o.name ?? "",
            storeId: o.store_brand_id ?? "",
            addressOne: o.address ?? "",
            openingHours: hoursType,
            city: o.city ?? "",
            state: o.state ?? "",
            country: o.country?.name ?? "",
            countryCode: o.country?.code ?? "",
            lat: o.lat ?? "",
            lng: o.lng ?? "",
          },
        });

        // Pre-populate toggles for "always" mode
        if (isAlways) {
          const activeKeys = {};
          Object.keys(toggles).forEach((k) => {
            activeKeys[k] = false;
          });
          hours.forEach((h) => {
            const day = h.split(":")[0].toLowerCase();
            const keyMap = {
              monday: "mondayOrders",
              tuesday: "tuesdayOrders",
              wednesday: "wednesdayOrders",
              thursday: "thursdayOrders",
              friday: "fridayOrders",
              saturday: "saturdayOrders",
              sunday: "sundayOrders",
            };
            if (keyMap[day]) activeKeys[keyMap[day]] = true;
          });
          setToggles((prev) => ({ ...prev, ...activeKeys }));
        }

        // Pre-populate schedule data for "specific" mode
        if (!isAlways && hours.length > 0) {
          setScheduleData(
            DAYS_OF_WEEK.map((day) => {
              const entry = hours.find((h) =>
                h.startsWith(day.toLowerCase() + ":"),
              );
              if (!entry) return { day, left: "", right: "", active: false };
              const timePart = entry.split(":").slice(1).join(":");
              const [openStr, closeStr] = timePart.split(" - ");
              return {
                day,
                left: parseTimeToInput(openStr),
                right: parseTimeToInput(closeStr),
                active: true,
              };
            }),
          );
        }
      })
      .catch((err) => {
        console.error("Failed to fetch outlet:", err);
        setApiError("Failed to load outlet data.");
      })
      .finally(() => setIsFetching(false));
  }, [outletId]);

  // ── Reset schedule when opening hours type changes ────────────────────────
  useEffect(() => {
    if (!outletId) {
      setScheduleData(
        DAYS_OF_WEEK.map((day) => ({
          day,
          left: "",
          right: "",
          active: false,
        })),
      );
    }
    setApiError("");
    console.log("outletId", outletId);
  }, [formik.values.openingHours]);

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    setSaveSuccess(false);
    onClose();
    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/main_pages/Dashboard/Market");
    }
  };

  return (
    <GoogleMapsWrapper>
      <Modal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        title=""
        size="sm"
      >
        <div className="flex flex-col items-center py-[24px] gap-y-[16px]">
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              backgroundColor: "#ECFDF5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Text className="text-[18px] font-bold text-[#343538]">
            {isEditMode ? "Outlet Updated!" : "Outlet Created!"}
          </Text>
          <Text className="text-[13px] text-[#6B7280] text-center">
            {isEditMode
              ? "Your outlet has been successfully updated."
              : "Your new outlet has been successfully created."}
          </Text>
          <button
            type="button"
            onClick={handleSuccessClose}
            style={{ backgroundColor: "#0E4940", color: "white", width: "160px", height: "44px" }}
            className="rounded-[8px] font-semibold text-[14px] mt-[8px] hover:opacity-90 active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </Modal>
      <div>
        <div className="mx-auto rounded-[20px] border border-[#ECECEC] overflow-hidden">
          <div className="lg:px-[132px] lg:pt-[10px] lg:pb-[32px] pb-[20px]">
            <Text className="lg:text-[26px] text-[20px] font-bold text-[#343538] tracking-tight text-center">
              {isEditMode ? "Edit Outlet" : "Create an Outlet"}
            </Text>
          </div>
          {isFetching && (
            <div className="text-center py-[20px] text-[14px] text-[#888888]">
              Loading outlet data...
            </div>
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="lg:w-10/12 w-11/12  m-auto">
              {/* ── Row 1: Store + Outlet Name ── */}
              <div className="grid lg:grid-cols-2 gap-x-[40px] mb-[32px] gap-y-[20px]">
                <SelectField
                  label="Store Name"
                  name="storeId"
                  placeholder="Select store"
                  options={storeId}
                  value={formik.values.storeId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.storeId}
                  touched={formik.touched.storeId}
                />
                <InputField
                  label="Outlet Name"
                  name="outletName"
                  placeholder="Enter outlet name"
                  value={formik.values.outletName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.outletName}
                  touched={formik.touched.outletName}
                />
              </div>

              {/* ── Row 2: Address + City ── */}
              <div className="grid lg:grid-cols-2 gap-x-[40px] mb-[32px] gap-y-[20px]">
                <LocationInput
                  label="Address"
                  placing="Search and select an address..."
                  names="addressOne"
                  values={formik.values.addressOne}
                  changes={formik.handleChange}
                  updateStates={formik.setFieldValue}
                  isFormik={true}
                  latName="lat"
                  lngName="lng"
                  cityName="city"
                  stateName="state"
                  countryName="country"
                  countryCodeName="countryCode"
                  required
                />
                <InputField
                  label="City / Town"
                  name="city"
                  placeholder="Auto-filled from address"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.city}
                  touched={formik.touched.city}
                  readOnly
                />
              </div>

              {/* ── Row 3: State + Opening Hours ── */}
              <div className="grid lg:grid-cols-2 gap-x-[40px] mb-[32px] gap-y-[20px]">
                <InputField
                  label="State / Region"
                  name="state"
                  placeholder="Auto-filled from address"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.state}
                  touched={formik.touched.state}
                  readOnly
                />
                <SelectField
                  label="Opening Hours"
                  name="openingHours"
                  placeholder="Select opening hours type"
                  options={OPENING_OPTIONS}
                  value={formik.values.openingHours}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.openingHours}
                  touched={formik.touched.openingHours}
                />
              </div>

              {/* ── Schedule section (conditional) ── */}

              {/* ── Opening hours preview ── */}
              {/* {formik.values.openingHours && (
                <div className="mb-[32px] p-[16px] bg-[#F8F9F8] rounded-[12px]">
                  <p className="text-[12px] font-semibold text-[#343538] mb-[8px]">
                    Opening hours preview:
                  </p>
                  {(() => {
                    const preview =
                      formik.values.openingHours === "always"
                        ? transformToggles(toggles)
                        : transformSchedule(scheduleData);

                    return preview.length > 0 ? (
                      <div className="flex flex-wrap gap-[8px]">
                        {preview.map((entry, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-white border border-[#ECECEC] rounded-full px-[10px] py-[4px] text-[#343538]"
                          >
                            {entry}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] text-[#A5A6AB]">
                        No days selected yet
                      </p>
                    );
                  })()}
                </div>
              )} */}
            </div>
            <div className=" lg:grid lg:grid-cols-2 flex flex-col-reverse items-center w-10/12 m-auto gap-y-[20px]">
              <div className=" pb-[56px]">
                {/* ── API error ── */}
                {apiError && (
                  <div className="mb-[16px] p-[12px] bg-red-50 border border-red-200 rounded-[8px]">
                    <p className="text-[12px] text-red-600">{apiError}</p>
                  </div>
                )}

                {/* ── Formik field errors summary (on submit) ── */}
                {formik.submitCount > 0 && !formik.isValid && (
                  <div className="mb-[16px] p-[12px] bg-red-50 border border-red-200 rounded-[8px]">
                    <p className="text-[12px] font-semibold text-red-600 mb-[4px]">
                      Please fix the following:
                    </p>
                    <ul className="list-disc list-inside">
                      {Object.values(formik.errors).map((err, i) => (
                        <li key={i} className="text-[11px] text-red-500">
                          {err}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    backgroundColor: "#0E4940",
                    width: "232px",
                    height: "51px",

                    color: "white",
                  }}
                  className="flex items-center justify-center gap-[10px] rounded-[8px] text-white font-semibold text-[14px] transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      {isEditMode ? "Saving changes..." : "Creating outlet..."}
                    </>
                  ) : saveSuccess ? (
                    <>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {isEditMode ? "Saved!" : "Created!"}
                    </>
                  ) : isEditMode ? (
                    "Save Changes"
                  ) : (
                    "Create Outlet"
                  )}
                </button>
              </div>
              <div>
                {formik.values.openingHours && (
                  <div className="mb-[32px]">
                    {/* <FieldLabel>
                      {formik.values.openingHours === "always"
                        ? "Select operating days (open 24hrs)"
                        : "Set opening & closing times per day"}
                    </FieldLabel> */}

                    <div className="border border-[#ECECEC] rounded-[12px] py-[8px]">
                      {formik.values.openingHours === "always" ? (
                        TOGGLE_SETTINGS.map((s) => (
                          <ToggleRow
                            key={s.key}
                            label={s.label}
                            description={s.description}
                            checked={toggles[s.key]}
                            onChange={handleToggle(s.key)}
                          />
                        ))
                      ) : (
                        <CustomToggle
                          data={scheduleData}
                          setData={setScheduleData}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </GoogleMapsWrapper>
  );
}
