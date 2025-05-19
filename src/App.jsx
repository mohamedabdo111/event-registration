import { useMemo, useState } from "react";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import countryList from "react-select-country-list";
import toast, { Toaster } from "react-hot-toast";

export default function EventRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventType: "",
    location: "",
    attendeeName: "",
    email: "",
    phone: "",
    organization: "",
  });

  console.log(formData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.eventName.trim())
      newErrors.eventName = "Event name is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.eventType) newErrors.eventType = "Event type is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.attendeeName.trim())
      newErrors.attendeeName = "Name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must have at least 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const options = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://api.sheetbest.com/sheets/216e6830-5c84-4cff-a182-fdf3ece51af3",
        formData
      );
      console.log(response);
      toast.success("Form submitted successfully!");

      setFormData({
        eventName: "",
        eventDate: "",
        eventType: "",
        location: "",
        attendeeName: "",
        email: "",
        phone: "",
        organization: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl p-5 lg:px-4 lg:py-10">
      <div className="rounded-lg border border-gray-200 bg-white shadow-md">
        <div className="border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Event Registration
          </h1>
          <p className="text-sm text-gray-600">
            Fill out the form below to register for the event
          </p>
        </div>

        <div className="px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Event Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="eventName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.eventName ? "border-red-300" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    placeholder="Annual Conference 2025"
                    title="text"
                  />
                  {errors.eventName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.eventName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.eventDate ? "border-red-300" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.eventDate}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="eventType"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.eventType ? "border-red-300" : "border-gray-300"
                    } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                  >
                    <option value="">Select event type</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="networking">Networking</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.eventType}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <Select
                    id="location"
                    name="location"
                    options={options}
                    placeholder="Select a country"
                    className={`mt-1 block w-full rounded-md border ${
                      errors.location ? "border-red-300" : "border-gray-300"
                    } px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    value={formData.location}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        location: e,
                      }));

                      setErrors((prev) => ({
                        ...prev,
                        location: "",
                      }));
                    }}
                  />

                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Attendee Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Attendee Information
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="attendeeName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="attendeeName"
                    name="attendeeName"
                    value={formData.attendeeName}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.attendeeName ? "border-red-300" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    placeholder="John Doe"
                  />
                  {errors.attendeeName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.attendeeName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    name="phone"
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.phone ? "border-red-300" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        phone: e,
                      }));

                      setErrors((prev) => ({
                        ...prev,
                        phone: "",
                      }));
                    }}
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organization (Optional)
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Company Name"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Register for Event"
              )}
            </button>
          </form>
        </div>
        <div className="border-t border-gray-200 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            By registering, you agree to our terms of service and privacy
            policy.
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
