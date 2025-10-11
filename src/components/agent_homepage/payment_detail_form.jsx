import React, { useState } from "react";

const PaymentDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    bankName: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Submit Payment Details</h2>
      {submitted ? (
        <p style={{ color: "green" }}> Payment details submitted successfully!</p>
      ) : (
        <form onSubmit={()=>{}} style={styles.form}>
          <label style={styles.label}>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter account holder name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Bank Name *</label>
          <input
            type="text"
            name="bankName"
            placeholder="Enter bank name"
            value={formData.bankName}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>Account Number *</label>
          <input
            type="number"
            name="accountNumber"
            placeholder="Enter account number"
            value={formData.accountNumber}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>IFSC Code *</label>
          <input
            type="text"
            name="ifscCode"
            placeholder="Enter IFSC code"
            value={formData.ifscCode}
            onChange={handleChange}
            style={styles.input}
          />

          <label style={styles.label}>UPI ID (optional)</label>
          <input
            type="text"
            name="upiId"
            placeholder="example@upi"
            value={formData.upiId}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  label: {
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "14px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default PaymentDetailsForm;
