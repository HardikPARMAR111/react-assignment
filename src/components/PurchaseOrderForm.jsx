import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PurchaseOrderView from "./PurchaseOrderView";

const dummyClients = [
  "Collabera - Collabera Inc",
  "Tech Solutions Ltd",
  "Global Systems",
];

const dummyJobs = {
  "Collabera - Collabera Inc": [
    { id: "OWNA3_234", title: "Application Development" },
    { id: "CLK_12880", title: "Business Administrator" },
    { id: "REQ003", title: "DevOps Engineer" },
  ],
};

const dummyTalents = {
  OWNA3_234: [
    { id: "T001", name: "Monika Goyal Test" },
    { id: "T002", name: "shaili khatri" },
    { id: "T003", name: "Rahul Sharma" },
  ],
  CLK_12880: [
    { id: "T004", name: "Sarah Williams" },
    { id: "T005", name: "Tom Brown" },
  ],
};

export default function PurchaseOrderForm() {
  const [clientName, setClientName] = useState("");
  const [orderType, setOrderType] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [receivedOn, setReceivedOn] = useState("");
  const [receivedFromName, setReceivedFromName] = useState("");
  const [receivedFromEmail, setReceivedFromEmail] = useState("");
  const [poStartDate, setPoStartDate] = useState("");
  const [poEndDate, setPoEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");

  // Talent Details State
  const [currDate] = useState(() => Date.now());
  const [talentSections, setTalentSections] = useState([
    {
      id: currDate,
      jobTitle: "",
      reqId: "",
      talents: [],
    },
  ]);

  // Form State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!clientName) newErrors.clientName = "Client Name is required";
    if (!orderType) newErrors.orderType = "Purchase Order Type is required";
    if (!poNumber) newErrors.poNumber = "Purchase Order Number is required";
    if (!receivedOn) newErrors.receivedOn = "Received On date is required";
    if (!receivedFromName) newErrors.receivedFromName = "Name is required";
    if (!receivedFromEmail) {
      newErrors.receivedFromEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(receivedFromEmail)) {
      newErrors.receivedFromEmail = "Email is invalid";
    }
    if (!poStartDate) newErrors.poStartDate = "PO Start Date is required";
    if (!poEndDate) {
      newErrors.poEndDate = "PO End Date is required";
    } else if (poStartDate && poEndDate < poStartDate) {
      newErrors.poEndDate = "End date cannot be before start date";
    }
    if (!budget) {
      newErrors.budget = "Budget is required";
    } else if (!/^\d{1,5}$/.test(budget)) {
      newErrors.budget = "Budget must be numeric (max 5 digits)";
    }
    if (!currency) newErrors.currency = "Currency is required";

    talentSections.forEach((section, index) => {
      if (!section.jobTitle) {
        newErrors[`jobTitle_${index}`] = "Job Title is required";
      }

      const selectedTalents = section.talents.length;

      if (orderType === "Individual PO" && selectedTalents > 1) {
        newErrors[`talents_${index}`] =
          "Only one talent can be selected for Individual PO";
      }

      if (orderType === "Group PO" && selectedTalents < 2) {
        newErrors[`talents_${index}`] =
          "At least two talents must be selected for Group PO";
      }

      section.talents.forEach((talent) => {
        if (!talent.contractDuration) {
          newErrors[`contractDuration_${talent.id}`] = "Required";
        }
        if (!talent.billRate) {
          newErrors[`billRate_${talent.id}`] = "Required";
        }
        if (!talent.stdTimeBR) {
          newErrors[`stdTimeBR_${talent.id}`] = "Required";
        }
        if (!talent.overTimeBR) {
          newErrors[`overTimeBR_${talent.id}`] = "Required";
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        clientName,
        orderType,
        poNumber,
        receivedOn,
        receivedFromName,
        receivedFromEmail,
        poStartDate,
        poEndDate,
        budget,
        currency,
        talentSections,
      };

      setSubmittedData(formData);
      setIsSubmitted(true);
      console.log("Form Data:", formData);
      alert("Purchase Order submitted successfully!");
    }
  };

  // Handle reset
  const handleReset = () => {
    setClientName("");
    setOrderType("");
    setPoNumber("");
    setReceivedOn("");
    setReceivedFromName("");
    setReceivedFromEmail("");
    setPoStartDate("");
    setPoEndDate("");
    setBudget("");
    setCurrency("");
    setTalentSections([
      {
        id: Date.now(),
        jobTitle: "",
        reqId: "",
        talents: [],
      },
    ]);
    setIsSubmitted(false);
    setSubmittedData(null);
    setErrors({});
  };

  // update talent section field
  const updateTalentSection = (index, field, value) => {
    setTalentSections((prevSections) =>
      prevSections.map((section, idx) =>
        idx === index ? { ...section, [field]: value } : section
      )
    );
  };

  // add talent section
  const addTalentSection = () => {
    setTalentSections([
      ...talentSections,
      {
        id: Date.now(),
        jobTitle: "",
        reqId: "",
        talents: [],
      },
    ]);
  };

  // Remove talent section
  const removeTalentSection = (index) => {
    setTalentSections(talentSections.filter((_, i) => i !== index));
  };

  // Toggle talent selection
  const toggleTalent = (sectionIndex, talentId, talentName) => {
    const updatedSections = [...talentSections];
    const section = { ...updatedSections[sectionIndex] };
    const talents = [...section.talents];
    const talentIndex = talents.findIndex((t) => t.id === talentId);

    if (talentIndex >= 0) {
      talents.splice(talentIndex, 1);
    } else {
      talents.push({
        id: talentId,
        name: talentName,
        contractDuration: "",
        contractDurationUnit: "Months",
        billRate: "",
        billRateUnit: "/hr",
        stdTimeBR: "",
        stdTimeBRUnit: "/hr",
        overTimeBR: "",
        overTimeBRUnit: "/hr",
        billRateCurrency: "USD - Dollars ($)",
        stdTimeCurrency: "USD - Dollars ($)",
        overTimeCurrency: "USD - Dollars ($)",
      });
    }

    section.talents = talents;
    updatedSections[sectionIndex] = section;
    setTalentSections(updatedSections);
  };

  // Update talent detail
  const updateTalentDetail = (sectionIndex, talentId, field, value) => {
    const updatedSections = [...talentSections];
    const talentToUpdate = updatedSections[sectionIndex].talents.find(
      (t) => t.id === talentId
    );
    if (talentToUpdate) {
      talentToUpdate[field] = value;
    }
    setTalentSections(updatedSections);
  };

  //  available jobs based on selected client
  const availableJobs = clientName ? dummyJobs[clientName] : [];

  // read-only view after submission
  if (isSubmitted && submittedData) {
    return <PurchaseOrderView data={submittedData} onReset={handleReset} />;
  }

  // main form
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "30px",
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <h3 className="mb-0" style={{ fontWeight: "600" }}>
            Purchase Order | New
          </h3>
        </div>

        {/*  First Row */}
        <div className="row g-3 mb-3">
          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Client Name *
            </label>
            <select
              className={`form-select ${errors.clientName ? "is-invalid" : ""}`}
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);

                setTalentSections([
                  {
                    id: Date.now(),
                    jobTitle: "",
                    reqId: "",
                    talents: [],
                  },
                ]);
              }}
              style={{ fontSize: "14px", height: "38px" }}
            >
              <option value="">Select Client</option>
              {dummyClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
            {errors.clientName && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.clientName}
              </div>
            )}
          </div>

          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Purchase Order Type *
            </label>
            <select
              className={`form-select ${errors.orderType ? "is-invalid" : ""}`}
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              style={{ fontSize: "14px", height: "38px" }}
            >
              <option value="">Select Type</option>
              <option value="Group PO">Group PO</option>
              <option value="Individual PO">Individual PO</option>
            </select>
            {errors.orderType && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.orderType}
              </div>
            )}
          </div>

          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Purchase Order No *
            </label>
            <input
              type="text"
              className={`form-control ${errors.poNumber ? "is-invalid" : ""}`}
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="PO Number"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.poNumber && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.poNumber}
              </div>
            )}
          </div>

          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Received On *
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.receivedOn ? "is-invalid" : ""
              }`}
              value={receivedOn}
              onChange={(e) => setReceivedOn(e.target.value)}
              placeholder="Received On"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.receivedOn && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.receivedOn}
              </div>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Received From *
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.receivedFromName ? "is-invalid" : ""
              }`}
              value={receivedFromName}
              onChange={(e) => setReceivedFromName(e.target.value)}
              placeholder="Received From Name"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.receivedFromName && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.receivedFromName}
              </div>
            )}
          </div>

          <div className="col-md-3">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              &nbsp;
            </label>
            <input
              type="email"
              className={`form-control ${
                errors.receivedFromEmail ? "is-invalid" : ""
              }`}
              value={receivedFromEmail}
              onChange={(e) => setReceivedFromEmail(e.target.value)}
              placeholder="Received From Email ID"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.receivedFromEmail && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.receivedFromEmail}
              </div>
            )}
          </div>

          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              PO Start Date *
            </label>
            <input
              type="date"
              className={`form-control ${
                errors.poStartDate ? "is-invalid" : ""
              }`}
              value={poStartDate}
              onChange={(e) => setPoStartDate(e.target.value)}
              placeholder="Start Date"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.poStartDate && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.poStartDate}
              </div>
            )}
          </div>

          <div className="col-md-2">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              PO End Date *
            </label>
            <input
              type="date"
              className={`form-control ${errors.poEndDate ? "is-invalid" : ""}`}
              value={poEndDate}
              min={poStartDate}
              onChange={(e) => setPoEndDate(e.target.value)}
              placeholder="End Date"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.poEndDate && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.poEndDate}
              </div>
            )}
          </div>

          <div className="col-md-1">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Budget *
            </label>
            <input
              type="text"
              className={`form-control ${errors.budget ? "is-invalid" : ""}`}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Budget"
              maxLength="5"
              style={{ fontSize: "14px", height: "38px" }}
            />
            {errors.budget && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.budget}
              </div>
            )}
          </div>

          <div className="col-md-1">
            <label
              className="form-label"
              style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
            >
              Currency *
            </label>
            <select
              className={`form-select ${errors.currency ? "is-invalid" : ""}`}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ fontSize: "14px", height: "38px" }}
            >
              <option value="">Select</option>
              <option value="USD - Dollars ($)">USD - Dollars ($)</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            {errors.currency && (
              <div className="invalid-feedback" style={{ fontSize: "11px" }}>
                {errors.currency}
              </div>
            )}
          </div>
        </div>

        {/* Talent Detail Section */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0" style={{ fontWeight: "600" }}>
            Talent Detail
          </h6>
          {orderType === "Group PO" && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={addTalentSection}
              style={{ fontSize: "13px", padding: "4px 12px" }}
            >
              + Add Another
            </button>
          )}
        </div>

        {talentSections.map((section, sectionIndex) => (
          <div key={section.id} className="mb-4">
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
                >
                  Job Title/REQ Name*
                </label>
                <select
                  className={`form-select ${
                    errors[`jobTitle_${sectionIndex}`] ? "is-invalid" : ""
                  }`}
                  value={section.jobTitle}
                  onChange={(e) => {
                    const selectedJob = availableJobs.find(
                      (job) => job.title === e.target.value
                    );
                    updateTalentSection(
                      sectionIndex,
                      "jobTitle",
                      e.target.value
                    );
                    if (selectedJob) {
                      updateTalentSection(
                        sectionIndex,
                        "reqId",
                        selectedJob.id
                      );
                    }
                  }}
                  style={{ fontSize: "14px", height: "38px" }}
                >
                  <option value="">Select Job Title</option>
                  {availableJobs.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
                {errors[`jobTitle_${sectionIndex}`] && (
                  <div
                    className="invalid-feedback"
                    style={{ fontSize: "11px" }}
                  >
                    {errors[`jobTitle_${sectionIndex}`]}
                  </div>
                )}
              </div>

              <div className="col-md-5">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", fontWeight: "600", color: "#666" }}
                >
                  Job ID/REQ ID *
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={section.reqId}
                  readOnly
                  style={{
                    fontSize: "14px",
                    height: "38px",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              </div>

              {talentSections.length > 1 && (
                <div className="col-md-1 d-flex align-items-end">
                  <button
                    type="button"
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeTalentSection(sectionIndex)}
                    style={{ fontSize: "20px", textDecoration: "none" }}
                  >
                    −
                  </button>
                </div>
              )}
            </div>

            {/* Talents Listing */}
            {section.reqId && dummyTalents[section.reqId] && (
              <div className="ms-3">
                {errors[`talents_${sectionIndex}`] && (
                  <div
                    className="alert alert-danger py-2 mb-3"
                    style={{ fontSize: "12px" }}
                  >
                    {errors[`talents_${sectionIndex}`]}
                  </div>
                )}

                {dummyTalents[section.reqId].map((talent) => {
                  const isSelected = section.talents.some(
                    (t) => t.id === talent.id
                  );
                  const selectedTalent = section.talents.find(
                    (t) => t.id === talent.id
                  );

                  return (
                    <div key={talent.id} className="mb-3">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`talent_${talent.id}_${sectionIndex}`}
                          checked={isSelected}
                          onChange={() =>
                            toggleTalent(sectionIndex, talent.id, talent.name)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`talent_${talent.id}_${sectionIndex}`}
                          style={{ fontSize: "14px", fontWeight: "500" }}
                        >
                          {talent.name}
                        </label>
                      </div>

                      {isSelected && selectedTalent && (
                        <div className="row g-2 ms-4 mb-2">
                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Contract Duration
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors[`contractDuration_${talent.id}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Contract Duration"
                                value={selectedTalent.contractDuration}
                                onChange={(e) =>
                                  updateTalentDetail(
                                    sectionIndex,
                                    talent.id,
                                    "contractDuration",
                                    e.target.value
                                  )
                                }
                                style={{ fontSize: "13px" }}
                              />
                              <span
                                className="input-group-text"
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                Months
                              </span>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Bill Rate
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className={`form-control ${
                                  errors[`billRate_${talent.id}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Bill Rate"
                                value={selectedTalent.billRate}
                                onChange={(e) =>
                                  updateTalentDetail(
                                    sectionIndex,
                                    talent.id,
                                    "billRate",
                                    e.target.value
                                  )
                                }
                                style={{ fontSize: "13px" }}
                              />
                              <span
                                className="input-group-text"
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                /hr
                              </span>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Currency
                            </label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedTalent.billRateCurrency}
                              onChange={(e) =>
                                updateTalentDetail(
                                  sectionIndex,
                                  talent.id,
                                  "billRateCurrency",
                                  e.target.value
                                )
                              }
                              style={{ fontSize: "13px" }}
                            >
                              <option value="USD - Dollars ($)">
                                USD - Dollars ($)
                              </option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Standard Time BR
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className={`form-control ${
                                  errors[`stdTimeBR_${talent.id}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Std. Time BR"
                                value={selectedTalent.stdTimeBR}
                                onChange={(e) =>
                                  updateTalentDetail(
                                    sectionIndex,
                                    talent.id,
                                    "stdTimeBR",
                                    e.target.value
                                  )
                                }
                                style={{ fontSize: "13px" }}
                              />
                              <span
                                className="input-group-text"
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                /hr
                              </span>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Currency
                            </label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedTalent.stdTimeCurrency}
                              onChange={(e) =>
                                updateTalentDetail(
                                  sectionIndex,
                                  talent.id,
                                  "stdTimeCurrency",
                                  e.target.value
                                )
                              }
                              style={{ fontSize: "13px" }}
                            >
                              <option value="USD - Dollars ($)">
                                USD - Dollars ($)
                              </option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Over Time BR
                            </label>
                            <div className="input-group input-group-sm">
                              <input
                                type="number"
                                className={`form-control ${
                                  errors[`overTimeBR_${talent.id}`]
                                    ? "is-invalid"
                                    : ""
                                }`}
                                placeholder="Over Time BR"
                                value={selectedTalent.overTimeBR}
                                onChange={(e) =>
                                  updateTalentDetail(
                                    sectionIndex,
                                    talent.id,
                                    "overTimeBR",
                                    e.target.value
                                  )
                                }
                                style={{ fontSize: "13px" }}
                              />
                              <span
                                className="input-group-text"
                                style={{
                                  fontSize: "12px",
                                  backgroundColor: "#f8f9fa",
                                }}
                              >
                                /hr
                              </span>
                            </div>
                          </div>

                          <div className="col-md-2">
                            <label
                              className="form-label"
                              style={{ fontSize: "11px", color: "#666" }}
                            >
                              Currency
                            </label>
                            <select
                              className="form-select form-select-sm"
                              value={selectedTalent.overTimeCurrency}
                              onChange={(e) =>
                                updateTalentDetail(
                                  sectionIndex,
                                  talent.id,
                                  "overTimeCurrency",
                                  e.target.value
                                )
                              }
                              style={{ fontSize: "13px" }}
                            >
                              <option value="USD - Dollars ($)">
                                USD - Dollars ($)
                              </option>
                              <option value="EUR">EUR</option>
                              <option value="GBP">GBP</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {sectionIndex < talentSections.length - 1 && (
              <hr className="my-4" />
            )}
          </div>
        ))}
        {/*Buttons*/}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
            style={{
              fontSize: "14px",
              padding: "8px 24px",
              borderRadius: "6px",
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
            style={{
              fontSize: "14px",
              padding: "8px 24px",
              borderRadius: "6px",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
