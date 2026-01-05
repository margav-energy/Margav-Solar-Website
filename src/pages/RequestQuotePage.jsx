import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import ScrollAnimation from '../components/ScrollAnimation'
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../config/emailjs'
import './RequestQuotePage.css'

const RequestQuotePage = () => {
  const [formData, setFormData] = useState({
    services: [], // Array to allow multiple selections
    name: "",
    email: "",
    phone: "",
    // Property Details
    houseType: "",
    propertyAge: "",
    monthlyUsage: "",
    currentElectricitySupplier: "",
    // Solar
    numberOfBedrooms: "",
    roofType: "",
    roofOrientation: "",
    panelTypePreference: "",
    // Battery
    batteryCapacity: "",
    batteryType: "",
    batteryInstallationType: "",
    // EV
    offStreetParking: "",
    evChargerPreference: "",
    installationLocation: "",
    // Misc
    additionalNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const serviceTypes = [
    {
      id: "solar",
      label: "Solar Panels",
      fields: [
        "numberOfBedrooms",
        "roofType",
        "roofOrientation",
        "panelTypePreference",
      ],
      iconSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      id: "battery",
      label: "Battery Storage",
      fields: ["batteryCapacity", "batteryType", "batteryInstallationType"],
      iconSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="15" height="10" rx="2" />
          <line x1="18" y1="10" x2="21" y2="10" />
          <line x1="18" y1="14" x2="21" y2="14" />
        </svg>
      ),
    },
    {
      id: "ev",
      label: "EV Chargers",
      fields: [
        "offStreetParking",
        "evChargerPreference",
        "installationLocation",
      ],
      iconSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 2h7a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" />
          <path d="M11 22v-4" />
          <path d="M15 7h1a2 2 0 0 1 2 2v3" />
          <path d="M20 10h-2" />
        </svg>
      ),
    },
  ];

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId];

      const next = { ...prev, services };
      // Set sensible defaults when enabling/disabling services
      if (!prev.services.includes("ev") && serviceId === "ev") {
        next.evChargerPreference = "fast";
      }
      if (prev.services.includes("ev") && serviceId === "ev") {
        next.offStreetParking = "";
        next.evChargerPreference = "";
        next.installationLocation = "";
      }
      return next;
    });

    if (errors.services) {
      setErrors((prev) => ({
        ...prev,
        services: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const getVisibleFields = () => {
    // Base fields - always visible
    const visibleFields = ["name", "email", "phone"];

    // Add service-specific fields based on selected services
    formData.services.forEach((serviceId) => {
      const service = serviceTypes.find((s) => s.id === serviceId);
      if (service) {
        visibleFields.push(...service.fields);
      }
    });

    return visibleFields;
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service type";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage("");

    try {
      // Build service details string
      let serviceDetails = [];
      if (formData.services.includes("solar")) {
        serviceDetails.push("SOLAR PANELS:");
        serviceDetails.push(
          `  Roof Type: ${formData.roofType || "Not specified"}`
        );
        serviceDetails.push(
          `  Roof Orientation: ${formData.roofOrientation || "Not specified"}`
        );
      }
      if (formData.services.includes("battery")) {
        serviceDetails.push("BATTERY STORAGE:");
        serviceDetails.push(
          `  Required Capacity: ${
            formData.batteryCapacity || "Not specified"
          } kWh`
        );
        serviceDetails.push(
          `  Current Electricity Supplier: ${
            formData.currentElectricitySupplier || "Not specified"
          }`
        );
      }
      if (formData.services.includes("ev")) {
        serviceDetails.push("EV CHARGERS:");
        serviceDetails.push(
          `  Number of Chargers: ${
            formData.numberOfEvChargers || "Not specified"
          }`
        );
        serviceDetails.push(
          `  Charger Type: ${formData.evChargerType || "Not specified"}`
        );
      }
      if (formData.additionalNotes) {
        serviceDetails.push("ADDITIONAL NOTES:");
        serviceDetails.push(`  ${formData.additionalNotes}`);
      }

      const servicesList = formData.services
        .map((id) => {
          const service = serviceTypes.find((s) => s.id === id);
          return service ? service.label : id;
        })
        .join(", ");

      const templateParams = {
        customer_name: formData.name,
        customer_email: formData.email,
        phone: formData.phone || "Not provided",
        house_type: formData.houseType || "Not specified",
        property_age: formData.propertyAge || "Not specified",
        energy_usage: formData.monthlyUsage || "Not provided",
        services: servicesList || "None selected",
        service_details:
          serviceDetails.length > 0
            ? serviceDetails.join("\n")
            : "No specific service details provided",
        timestamp: new Date().toLocaleString("en-GB", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/London",
        }),
        source: "MarGav Energy Website - Quote Calculator",
      };

      if (
        EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
        EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY"
      ) {
        console.error(
          "EmailJS configuration missing. Please set VITE_EMAILJS_SERVICE_ID and VITE_EMAILJS_PUBLIC_KEY in your .env file."
        );
        setSubmitStatus("error");
        setIsSubmitting(false);
        return;
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus("success");

      // Reset form
      setFormData({
        services: [],
        name: "",
        email: "",
        phone: "",
        houseType: "",
        propertyAge: "",
        monthlyUsage: "",
        currentElectricitySupplier: "",
        numberOfBedrooms: "",
        roofType: "",
        roofOrientation: "",
        panelTypePreference: "",
        batteryCapacity: "",
        batteryType: "",
        batteryInstallationType: "",
        offStreetParking: "",
        evChargerPreference: "",
        installationLocation: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      console.error("Error details:", {
        status: error.status,
        text: error.text,
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
      });

      // Handle specific EmailJS errors
      let message =
        "There was an error sending your request. Please try again or contact us directly.";

      if (error.status === 412) {
        if (error.text?.includes("Gmail_API: Invalid grant")) {
          message =
            "Email service connection expired. Please contact the website administrator to reconnect the email service.";
        } else {
          message =
            "Email service connection issue. Please try again later or contact support.";
        }
      } else if (error.status === 400) {
        message =
          "Invalid email configuration. Please check your email settings.";
      } else if (error.status === 429) {
        message = "Too many requests. Please try again in a few moments.";
      }

      setErrorMessage(message);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleFields = getVisibleFields();

  return (
    <section className="request-quote-page">
      <div className="quote-hero-banner">
        <div className="container">
          <ScrollAnimation animation="fadeInUp" delay={0}>
            <h1 className="quote-page-title">Request a Quote</h1>
            <p className="quote-page-intro">
              Get an instant estimate for your energy solution. Select one or
              more services below to get started.
            </p>
          </ScrollAnimation>
        </div>
      </div>

      <div className="container">
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <form className="quote-form" onSubmit={handleSubmit}>
            {/* Service Type - Multiple Selection */}
            <div className="form-group">
              <label className="form-label">Service Type</label>
              <div className="service-type-grid">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className={`service-type-option ${
                      formData.services.includes(service.id) ? "selected" : ""
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <span className="service-icon" aria-hidden="true">
                      {service.iconSvg}
                    </span>
                    <span className="service-label">{service.label}</span>
                    {formData.services.includes(service.id) && (
                      <span className="service-check" aria-hidden="true">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {errors.services && (
                <span className="error-message">{errors.services}</span>
              )}
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? "error" : ""}`}
                required
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={`form-input ${errors.email ? "error" : ""}`}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`form-input ${errors.phone ? "error" : ""}`}
                required
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            {/* Property Details Section */}
            <div className="form-group">
              <label className="form-label">Property Details</label>
            </div>

            {/* House Type */}
            <div className="form-group">
              <label className="form-label">House Type</label>
              <select
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select house type</option>
                <option value="detached">Detached</option>
                <option value="semi-detached">Semi-Detached</option>
                <option value="terraced">Terraced</option>
                <option value="flat">Flat/Apartment</option>
                <option value="bungalow">Bungalow</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            {/* Property Age */}
            <div className="form-group">
              <label className="form-label">Age of Property</label>
              <select
                name="propertyAge"
                value={formData.propertyAge}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select age range</option>
                <option value="new">New Build (0-5 years)</option>
                <option value="modern">Modern (6-20 years)</option>
                <option value="mid">Mid (21-50 years)</option>
                <option value="older">Older (50+ years)</option>
                <option value="listed">Listed/Historic</option>
              </select>
            </div>

            {/* Monthly Energy Usage */}
            <div className="form-group">
              <label className="form-label">Monthly Energy Usage (kWh)</label>
              <input
                type="number"
                name="monthlyUsage"
                value={formData.monthlyUsage}
                onChange={handleChange}
                placeholder="Enter monthly usage in kWh"
                className="form-input"
                min="0"
                step="10"
              />
            </div>

            {/* Current Electricity Supplier */}
            <div className="form-group">
              <label className="form-label">Current Electricity Supplier</label>
              <select
                name="currentElectricitySupplier"
                value={formData.currentElectricitySupplier}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select electricity supplier</option>
                <option value="British Gas">British Gas</option>
                <option value="EDF Energy">EDF Energy</option>
                <option value="E.ON">E.ON</option>
                <option value="E.ON Next">E.ON Next</option>
                <option value="Octopus Energy">Octopus Energy</option>
                <option value="Scottish Power">Scottish Power</option>
                <option value="SSE">SSE</option>
                <option value="Ovo Energy">Ovo Energy</option>
                <option value="Bulb">Bulb</option>
                <option value="Shell Energy">Shell Energy</option>
                <option value="Utilita">Utilita</option>
                <option value="Utility Warehouse">Utility Warehouse</option>
                <option value="Green Energy UK">Green Energy UK</option>
                <option value="Good Energy">Good Energy</option>
                <option value="Ecotricity">Ecotricity</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* SOLAR PANEL CONFIGURATION */}
            {formData.services.includes("solar") && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Solar Panel Configuration
                  </label>
                </div>
                {visibleFields.includes("numberOfBedrooms") && (
                  <div className="form-group">
                    <label className="form-label">Number of Bedrooms</label>
                    <select
                      name="numberOfBedrooms"
                      value={formData.numberOfBedrooms}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select number of bedrooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("roofType") && (
                  <div className="form-group">
                    <label className="form-label">Roof Type</label>
                    <select
                      name="roofType"
                      value={formData.roofType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select roof type</option>
                      <option value="tiled">Tiled</option>
                      <option value="slate">Slate</option>
                      <option value="metal">Metal</option>
                      <option value="flat">Flat</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("roofOrientation") && (
                  <div className="form-group">
                    <label className="form-label">Roof Orientation</label>
                    <select
                      name="roofOrientation"
                      value={formData.roofOrientation}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select roof orientation</option>
                      <option value="south">South</option>
                      <option value="south-east">South-East</option>
                      <option value="south-west">South-West</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                      <option value="north">North</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("panelTypePreference") && (
                  <div className="form-group">
                    <label className="form-label">Panel Type Preference</label>
                    <select
                      name="panelTypePreference"
                      value={formData.panelTypePreference}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select panel type preference</option>
                      <option value="monocrystalline">Monocrystalline</option>
                      <option value="polycrystalline">Polycrystalline</option>
                      <option value="thin-film">Thin-film</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {/* BATTERY STORAGE CONFIGURATION */}
            {formData.services.includes("battery") && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Battery Storage Configuration
                  </label>
                </div>
                {visibleFields.includes("batteryCapacity") && (
                  <div className="form-group">
                    <label className="form-label">
                      Storage Capacity Needed
                    </label>
                    <select
                      name="batteryCapacity"
                      value={formData.batteryCapacity}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select storage capacity needed</option>
                      <option value="2-5kWh">2–5 kWh</option>
                      <option value="5-10kWh">5–10 kWh</option>
                      <option value="10-15kWh">10–15 kWh</option>
                      <option value=">15kWh">15 kWh+</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("batteryType") && (
                  <div className="form-group">
                    <label className="form-label">Battery Type</label>
                    <select
                      name="batteryType"
                      value={formData.batteryType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select battery type</option>
                      <option value="lithium-ion">Lithium‑ion</option>
                      <option value="lithium-iron-phosphate">LiFePO₄</option>
                      <option value="other">Other / Not sure</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("batteryInstallationType") && (
                  <div className="form-group">
                    <label className="form-label">Installation Type</label>
                    <select
                      name="batteryInstallationType"
                      value={formData.batteryInstallationType}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select installation type</option>
                      <option value="indoor">Indoor</option>
                      <option value="outdoor">Outdoor</option>
                      <option value="unsure">Not sure</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {/* EV CHARGER CONFIGURATION */}
            {formData.services.includes("ev") && (
              <>
                <div className="form-group">
                  <label className="form-label">EV Charger Configuration</label>
                </div>
                {visibleFields.includes("offStreetParking") && (
                  <div className="form-group">
                    <label className="form-label">Off-street Parking</label>
                    <select
                      name="offStreetParking"
                      value={formData.offStreetParking}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Do you have off-street parking?</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("evChargerPreference") && (
                  <div className="form-group">
                    <label className="form-label">
                      Charger Type Preference
                    </label>
                    <select
                      name="evChargerPreference"
                      value={formData.evChargerPreference}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select charger type preference</option>
                      <option value="fast">Fast (7kW)</option>
                    </select>
                  </div>
                )}
                {visibleFields.includes("installationLocation") && (
                  <div className="form-group">
                    <label className="form-label">Installation Location</label>
                    <select
                      name="installationLocation"
                      value={formData.installationLocation}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select installation location</option>
                      <option value="driveway">Driveway</option>
                      <option value="garage">Garage</option>
                      <option value="car-park">Car park</option>
                      <option value="street">On-street</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Additional Notes */}
            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any additional information or questions..."
                className="form-input form-textarea"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Quote →"}
            </button>

            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <div className="form-message success">
                ✓ Quote request submitted successfully! We will contact you
                soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="form-message error">
                ✗{" "}
                {errorMessage ||
                  "There was an error submitting your request. Please try again or contact us directly."}
              </div>
            )}
          </form>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default RequestQuotePage;
