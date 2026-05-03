"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Text, Input } from "@chakra-ui/react";

const defaultMetrics = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
  { label: "lb", value: "lb" },
  { label: "oz", value: "oz" },
  { label: "mg", value: "mg" },
];

function WeightInput({
  label,
  error,
  name,
  value,
  onChange,
  metricValue,
  onMetricChange,
  placeholder = "0",
  metrics = defaultMetrics,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const dropdownRef = useRef < HTMLDivElement > null;

  const selectedMetric =
    metrics.find((m) => m.value === metricValue) ?? metrics[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box className="w-full">
      {label && (
        <Text className="text-[14px] font-semibold text-[#303030] mb-[8px]">
          {label}
        </Text>
      )}

      <Box
        className="flex items-center w-full h-[44px] bg-white rounded-lg overflow-visible relative"
        style={{
          border: `1px solid ${
            error ? "#E53E3E" : focused || isOpen ? "#A0A0A0" : "#D4D4D4"
          }`,
          transition: "border-color 0.2s",
        }}
      >
        {/* ── Left: metric picker ── */}
        <Box ref={dropdownRef} className="relative h-full flex-shrink-0">
          <Box
            onClick={() => setIsOpen((prev) => !prev)}
            cursor="pointer"
            className="flex items-center gap-x-[6px] h-full px-[12px]"
            style={{
              borderRight: "1px solid #D4D4D4",
              backgroundColor: "rgba(0,0,0,0.04)",
              minWidth: "70px",
            }}
          >
            <Text className="text-[14px] font-medium text-[#303030]">
              {selectedMetric.label}
            </Text>
            {/* Chevron */}
            <Box
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.865 0.664C1.217 0.312 1.787 0.312 2.138 0.664L6.302 4.827L10.465 0.664C10.817 0.312 11.387 0.312 11.738 0.664C12.089 1.015 12.089 1.585 11.738 1.936L6.938 6.736C6.587 7.088 6.017 7.088 5.665 6.736L0.865 1.936C0.514 1.585 0.514 1.015 0.865 0.664Z"
                  fill="#303030"
                />
              </svg>
            </Box>
          </Box>

          {/* ── Metric dropdown list ── */}
          {isOpen && (
            <Box
              position="absolute"
              top="48px"
              left={0}
              zIndex={200}
              bg="white"
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              overflow="hidden"
              minW="90px"
            >
              {metrics.map((metric) => (
                <Box
                  key={metric.value}
                  onClick={() => {
                    onMetricChange?.(metric.value);
                    setIsOpen(false);
                  }}
                  cursor="pointer"
                  className="px-[14px] py-[9px] flex items-center justify-between gap-x-[8px]"
                  style={{
                    backgroundColor:
                      selectedMetric.value === metric.value
                        ? "#F0FAF8"
                        : "white",
                  }}
                  _hover={{ backgroundColor: "#F6F6F6" }}
                >
                  <Text
                    className="text-[13px]"
                    style={{
                      color:
                        selectedMetric.value === metric.value
                          ? "#007460"
                          : "#303030",
                      fontWeight:
                        selectedMetric.value === metric.value ? 600 : 400,
                    }}
                  >
                    {metric.label}
                  </Text>
                  {selectedMetric.value === metric.value && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 7L5.5 10.5L12 3.5"
                        stroke="#007460"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* ── Right: number input ── */}
        <Input
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          type="number"
          border="none"
          _focus={{ border: "none", boxShadow: "none" }}
          _hover={{ border: "none" }}
          height="100%"
          borderRadius="0"
          className="flex-1 text-[14px] text-[#303030]"
        />
      </Box>

      {error && (
        <Text className="text-red-500 text-[12px] mt-[4px]">{error}</Text>
      )}
    </Box>
  );
}

export default WeightInput;
