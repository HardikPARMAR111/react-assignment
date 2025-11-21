import React from "react";

export default function PurchaseOrderView({ data, onReset }) {
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
          <h5 className="mb-0" style={{ fontWeight: "600" }}>
            Purchase Order | View
          </h5>
        </div>

        {/* Read-only Purchase Order Details */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h6 className="mb-3" style={{ fontWeight: "600", color: "#495057" }}>
            Purchase Order Details
          </h6>

          <div className="row mb-3">
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Client Name
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.clientName}
              </div>
            </div>
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Purchase Order Type
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.orderType}
              </div>
            </div>
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Purchase Order No
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.poNumber}
              </div>
            </div>
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Received On
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.receivedOn}
              </div>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Received From - Name
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.receivedFromName}
              </div>
            </div>
            <div className="col-md-3">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Received From - Email
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.receivedFromEmail}
              </div>
            </div>
            <div className="col-md-2">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                PO Start Date
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.poStartDate}
              </div>
            </div>
            <div className="col-md-2">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                PO End Date
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.poEndDate}
              </div>
            </div>
            <div className="col-md-2">
              <small
                className="text-muted d-block"
                style={{ fontSize: "11px", marginBottom: "4px" }}
              >
                Budget
              </small>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {data.budget} {data.currency}
              </div>
            </div>
          </div>
        </div>

        {/* Read-only Talent Details */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <h6 className="mb-3" style={{ fontWeight: "600", color: "#495057" }}>
            Talent Details
          </h6>

          {data.talentSections.map((section, idx) => (
            <div key={idx} className="mb-4">
              <div className="row mb-3">
                <div className="col-md-6">
                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "11px", marginBottom: "4px" }}
                  >
                    Job Title/REQ Name
                  </small>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {section.jobTitle}
                  </div>
                </div>
                <div className="col-md-6">
                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "11px", marginBottom: "4px" }}
                  >
                    Job ID/REQ ID
                  </small>
                  <div style={{ fontSize: "14px", fontWeight: "500" }}>
                    {section.reqId}
                  </div>
                </div>
              </div>

              {section.talents.map((talent, tIdx) => (
                <div
                  key={tIdx}
                  className="ms-3 mb-3 p-3"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#212529",
                    }}
                  >
                    {talent.name}
                  </div>

                  <div className="row g-3">
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Contract Duration
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.contractDuration} Months
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Bill Rate
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.billRate} /hr
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Currency
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.billRateCurrency}
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Standard Time BR
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.stdTimeBR} /hr
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Currency
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.stdTimeCurrency}
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Over Time BR
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.overTimeBR} /hr
                      </div>
                    </div>
                    <div className="col-md-2">
                      <small
                        className="text-muted d-block"
                        style={{ fontSize: "10px", marginBottom: "2px" }}
                      >
                        Currency
                      </small>
                      <div style={{ fontSize: "13px" }}>
                        {talent.overTimeCurrency}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {idx < data.talentSections.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-secondary"
            onClick={onReset}
            style={{
              fontSize: "14px",
              padding: "8px 24px",
              borderRadius: "6px",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
