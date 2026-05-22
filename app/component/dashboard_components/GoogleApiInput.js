"use client";

import { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input, Box, Text } from "@chakra-ui/react";

const PAC_STYLE = `
  .pac-container {
    z-index: 99999 !important;
    pointer-events: auto !important;
  }
`;

export default function LocationInput({
  state,
  country,
  city,
  changes,
  label,
  placing,
  names,
  values,
  updateStates,
  required,
  latName = "lat",
  lngName = "lng",
  cityName,
  stateName,
  countryName,
  countryCodeName, // ← new: e.g. "countryCode" → writes "NG", "UG", "KE"
  isFormik = false,
}) {
  const [autocompleteInstance, setAutocompleteInstance] = useState(null);
  const [inputValue, setInputValue] = useState(values || "");
  const [confirmedAddress, setConfirmedAddress] = useState(values || "");
  const [hasValidSelection, setHasValidSelection] = useState(!!values);

  const handleLoad = (instance) => setAutocompleteInstance(instance);

  const clearDependentFields = () => {
    setField(latName, "");
    setField(lngName, "");
    if (cityName) setField(cityName, "");
    if (stateName) setField(stateName, "");
    if (countryName) setField(countryName, "");
    if (countryCodeName) setField(countryCodeName, "");
    setField(names, "");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setHasValidSelection(false);
    clearDependentFields();
  };

  const handleBlur = () => {
    if (!hasValidSelection) {
      setInputValue(confirmedAddress);
      if (confirmedAddress && typeof changes === "function") {
        changes({ target: { name: names, id: names, value: confirmedAddress } });
      }
    }
  };

  const setField = (fieldName, fieldValue) => {
    if (!updateStates) return;
    if (isFormik) {
      updateStates(fieldName, fieldValue);
    } else {
      updateStates((prev) => ({ ...prev, [fieldName]: fieldValue }));
    }
  };

  const handlePlaceChanged = () => {
    if (!autocompleteInstance) return;

    const place = autocompleteInstance.getPlace();

    if (!place?.address_components || !place?.geometry?.location) {
      console.warn("Select a suggestion from the dropdown list");
      return;
    }

    // ── Parse all components ──────────────────────────────────────────────
    const parsed = {
      city: "",
      state: "",
      country: "",
      countryCode: "", // ← short_name e.g. "NG"
      fullAddress: place.formatted_address || place.name || "",
    };

    place.address_components.forEach(({ types, long_name, short_name }) => {
      if (types.includes("locality")) parsed.city = long_name;
      if (types.includes("administrative_area_level_1"))
        parsed.state = long_name;
      if (types.includes("country")) {
        parsed.country = long_name; // e.g. "Nigeria"
        parsed.countryCode = short_name; // e.g. "NG"
      }
    });

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const displayText = city
      ? parsed.city
      : state
        ? parsed.state
        : country
          ? parsed.country
          : parsed.fullAddress;

    setInputValue(displayText);
    setConfirmedAddress(displayText);
    setHasValidSelection(true);

    if (typeof changes === "function") {
      changes({ target: { name: names, id: names, value: displayText } });
    }

    // ── Write all fields ──────────────────────────────────────────────────
    setField(names, displayText);
    if (cityName) setField(cityName, parsed.city);
    if (stateName) setField(stateName, parsed.state);
    if (countryName) setField(countryName, parsed.country);
    if (countryCodeName) setField(countryCodeName, parsed.countryCode); // ← new
    setField(latName, lat);
    setField(lngName, lng);

    console.log("✅ Place filled:", { displayText, parsed, lat, lng });
  };

  return (
    <Box position="relative">
      <style>{PAC_STYLE}</style>

      <Text fontSize="sm" fontWeight="semibold" mb="10px">
        {required && (
          <span style={{ color: "red", fontSize: "18px", marginRight: 2 }}>
            *
          </span>
        )}
        {label}
      </Text>

      <Box
        w="100%"
        h="76px"
        display="grid"
        alignItems="center"
        bg="#F6F6F6"
        borderRadius="lg"
        fontSize="15px"
        position="relative"
        zIndex={99999}
      >
        <Autocomplete
          onLoad={handleLoad}
          onPlaceChanged={handlePlaceChanged}
          fields={[
            "address_components",
            "geometry.location",
            "formatted_address",
            "name",
          ]}
        >
          <Input
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={placing}
            id={names}
            name={names}
            autoComplete="off"
            border="none"
            bg="transparent"
            h="48px"
            _focus={{ boxShadow: "none" }}
          />
        </Autocomplete>
      </Box>
    </Box>
  );
}
