import { useState } from "react";
import "./App.css";

const RISK_COLOR = {
  High: "var(--risk-high)",
  Medium: "var(--risk-medium)",
  Low: "var(--risk-low)"
};

function App() {
  const [formData, setFormData] = useState({
    gender: "Female",
    SeniorCitizen: 0,
    Partner: "Yes",
    Dependents: "No",
    tenure: 5,
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
    MonthlyCharges: 80,
    TotalCharges: 400
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          SeniorCitizen: Number(formData.SeniorCitizen),
          tenure: Number(formData.tenure),
          MonthlyCharges: Number(formData.MonthlyCharges),
          TotalCharges: Number(formData.TotalCharges)
        })
      });

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Could not connect to Flask backend.");
    }
  };

  const churnPct = result ? result.churn_probability * 100 : 0;
  const riskColor = result ? RISK_COLOR[result.risk_level] || "var(--accent)" : "var(--accent)";

  return (
    <div className="app">

      {/* Header */}
      <div className="header">
        <div className="header-text">
          <h1>Customer Churn Prediction</h1>
          <p className="subtitle">
            Enter an account's plan, usage and billing details to estimate
            how likely they are to cancel.
          </p>
        </div>

        <div className="model-status">
          <span className="dot" />
          Model ready
        </div>
      </div>

      {/* Customer Information */}
      <div className="panel">

        <form onSubmit={handleSubmit}>

          <div className="section">
            <h2 className="section-label">Account</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>

              <div className="form-group">
                <label>Senior citizen</label>
                <select name="SeniorCitizen" value={formData.SeniorCitizen} onChange={handleChange}>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Partner</label>
                <select name="Partner" value={formData.Partner} onChange={handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Dependents</label>
                <select name="Dependents" value={formData.Dependents} onChange={handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tenure (months)</label>
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-label">Services</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Phone service</label>
                <select name="PhoneService" value={formData.PhoneService} onChange={handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Multiple lines</label>
                <select name="MultipleLines" value={formData.MultipleLines} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No phone service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Internet service</label>
                <select name="InternetService" value={formData.InternetService} onChange={handleChange}>
                  <option>DSL</option>
                  <option>Fiber optic</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Online security</label>
                <select name="OnlineSecurity" value={formData.OnlineSecurity} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Online backup</label>
                <select name="OnlineBackup" value={formData.OnlineBackup} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Device protection</label>
                <select name="DeviceProtection" value={formData.DeviceProtection} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tech support</label>
                <select name="TechSupport" value={formData.TechSupport} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Streaming TV</label>
                <select name="StreamingTV" value={formData.StreamingTV} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="form-group">
                <label>Streaming movies</label>
                <select name="StreamingMovies" value={formData.StreamingMovies} onChange={handleChange}>
                  <option>No</option>
                  <option>Yes</option>
                  <option>No internet service</option>
                </select>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-label">Billing</h2>

            <div className="form-grid">
              <div className="form-group">
                <label>Contract</label>
                <select name="Contract" value={formData.Contract} onChange={handleChange}>
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </div>

              <div className="form-group">
                <label>Paperless billing</label>
                <select name="PaperlessBilling" value={formData.PaperlessBilling} onChange={handleChange}>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Payment method</label>
                <select name="PaymentMethod" value={formData.PaymentMethod} onChange={handleChange}>
                  <option>Electronic check</option>
                  <option>Mailed check</option>
                  <option>Bank transfer (automatic)</option>
                  <option>Credit card (automatic)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Monthly charges ($)</label>
                <input
                  type="number"
                  name="MonthlyCharges"
                  value={formData.MonthlyCharges}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>Total charges ($)</label>
                <input
                  type="number"
                  name="TotalCharges"
                  value={formData.TotalCharges}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
          </div>

          <button className="predict-button" type="submit">
            <span className="spark" />
            Run prediction
          </button>

        </form>
      </div>

      {/* Prediction Result */}
      {result && (
        <div className="panel result">

          <div
            className="gauge"
            style={{
              background: `conic-gradient(${riskColor} ${churnPct * 3.6}deg, var(--panel-alt) 0deg)`
            }}
          >
            <div className="gauge-reading">
              <span className="value">{churnPct.toFixed(1)}%</span>
              <span className="label">churn probability</span>
            </div>
          </div>

          <div className="verdict-rows">
            <div className="verdict-row">
              <h3>Prediction</h3>
              <span className="verdict-value">
                {result.churn_prediction === 1 ? "Likely to churn" : "Likely to stay"}
              </span>
            </div>

            <div className="verdict-row">
              <h3>Risk level</h3>
              <span className={`verdict-value ${result.risk_level.toLowerCase()}`}>
                {result.risk_level}
              </span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default App;