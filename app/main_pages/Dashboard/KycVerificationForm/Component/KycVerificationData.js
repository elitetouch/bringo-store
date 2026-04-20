/* ─── Document definitions ───────────────────────────────────── */

export const IDENTITY_DOCS = [
  //   {
  //     id: "cac02",
  //     label: "cac02",
  //     sides: ["Front Side", "Back Side"],
  //     needsId: true,
  //     idLabel: "cac02",
  //   },
  //   {
  //     id: "cac07",
  //     label: "cac07",
  //     sides: ["Front Side", "Back Side"],
  //     needsId: true,
  //     idLabel: "cac07",
  //   },
  //   {
  //     id: "drivers_license",
  //     label: "Driver's License",
  //     sides: ["Front Side", "Back Side"],
  //     needsId: true,
  //     idLabel: "License Number",
  //   },
  {
    id: "store_logo",
    label: "Store Logo",
    sides: ["Data Page"],
    needsId: false,
    idLabel: "store_logo",
    hint: "PNG or SVG with transparent background preferred",
  },
  {
    id: "legal_representation_id",
    label: "Legal Representation Id",
    sides: ["Front Side", "Back Side"],
    needsId: true,
    idLabel: "legal_representation_id",
  },
  //   {
  //     id: "nin_slip",
  //     label: "NIN Slip",
  //     sides: ["Front Side"],
  //     needsId: true,
  //     idLabel: "NIN",
  //   },
];
export const BUSINESS_DOCS = [
  {
    id: "cac_cert",
    label: "CAC Certificate",
    sides: ["Upload Document"],
    needsId: true,
    idLabel: "RC Number",
  },
  {
    id: "cac02",
    label: "CAC Form 2",
    sides: ["Upload Document"],
    needsId: true,
    idLabel: "RC Number",
  },
  {
    id: "cac07",
    label: "CAC Form 7",
    sides: ["Upload Document"],
    needsId: true,
    idLabel: "RC Number",
  },
  //   {
  //     id: "store_logo",
  //     label: "Store Logo",
  //     sides: ["Upload Logo"],
  //     needsId: false,
  //     hint: "PNG or SVG with transparent background preferred",
  //   },
  {
    id: "biz_license",
    label: "Business License",
    sides: ["Upload Document"],
    needsId: true,
    idLabel: "License Number",
  },
  {
    id: "utility_bill",
    label: "Utility Bill",
    sides: ["Upload Document"],
    needsId: false,
    hint: "Must be dated within the last 3 months",
  },
  {
    id: "tax_clearance",
    label: "Tax Clearance Certificate",
    sides: ["Upload Document"],
    needsId: true,
    idLabel: "TIN",
  },
];
