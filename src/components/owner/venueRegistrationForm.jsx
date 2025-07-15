import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createVenue, updateVenue } from "../../api/owner/venueApi";
import { AuthContext } from "../../auth/AuthProvider";
import { addVenueService } from "../../services/venueOwner/venueService";

const amenitiesOptions = [
  "WiFi",
  "Parking",
  "AC",
  "Music",
  "Catering",
  "Stage",
];

export default function VenueRegisterForm({
  onSuccess,
  mode = "create",
  initialData = null,
}) {
  const { user } = useContext(AuthContext);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [venueImages, setVenueImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingVenueImages, setExistingVenueImages] = useState([]);

  // Debug: Log initial data
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedAmenities(
        Array.isArray(initialData.amenities) ? initialData.amenities : []
      );

      const images = Array.isArray(initialData.venueImages)
        ? initialData.venueImages
            .map((img) => {
              if (img && typeof img.url === "string") {
                const fullUrl = img.url.startsWith("http")
                  ? img.url
                  : `http://localhost:5050/${img.url.replace(/^\/+/, "")}`;
                console.log("Resolved image URL:", fullUrl);
                return fullUrl;
              } else {
                console.warn("Invalid image object in venueImages:", img);
                return null;
              }
            })
            .filter(Boolean)
        : [];

      setExistingVenueImages(images);
    } else {
      setSelectedAmenities([]);
      setExistingVenueImages([]);
    }
  }, [initialData, mode]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      venueName: initialData?.venueName || "",
      capacity: initialData?.capacity || "",
      pricePerHour: initialData?.pricePerHour || "",
      description: initialData?.description || "",
      address: initialData?.location?.address || "",
      city: initialData?.location?.city || "",
      state: initialData?.location?.state || "",
      country: initialData?.location?.country || "",
    },
    validationSchema: Yup.object({
      venueName: Yup.string().required("Required"),
      capacity: Yup.number().required("Required").min(1, "Minimum 1"),
      pricePerHour: Yup.number().required("Required").min(0),
      description: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!user || !user._id) return console.error("User not available");

      try {
        if (mode === "edit" && initialData?._id) {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) =>
            formData.append(key, value)
          );
          formData.append("amenities", JSON.stringify(selectedAmenities));
          venueImages.forEach((file) => formData.append("venueImages", file));

          await updateVenue(initialData._id, formData);
          onSuccess?.(values);
        } else {
          // ✅ Use service layer to create venue and upload images
          const createdVenue = await addVenueService({
            form: values,
            amenities: selectedAmenities,
            images: venueImages,
            ownerId: user._id,
          });

          onSuccess?.(createdVenue);
        }

        resetForm();
        setVenueImages([]);
        setSelectedAmenities([]);
        setPreviewImages([]);
      } catch (error) {
        console.error("Error submitting venue:", error);
        if (error.response) {
          console.error("Server error:", error.response.data);
        } else if (error.request) {
          console.error("No server response:", error.request);
        } else {
          console.error("Frontend error:", error.message);
        }
      }
    },
  });

  const handleAmenitiesChange = (e) => {
    const { value } = e.target;
    setSelectedAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setVenueImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  if (mode === "edit" && !initialData) {
    return (
      <div className="text-red-500 font-semibold font-poppins">
        Venue not found. Cannot edit without data.
      </div>
    );
  }

  return (
    <div className="p-2 font-poppins">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {mode === "edit" ? "Edit Venue" : "New Venue"}
        </h2>
        <p className="text-xs text-gray-500">
          {mode === "edit"
            ? "Update venue details"
            : "Fill in the information to create a venue."}
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        {/* --- Basic Inputs --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Name", name: "venueName" },
            { label: "Capacity", name: "capacity", type: "number" },
            { label: "Price/hr", name: "pricePerHour", type: "number" },
            { label: "City", name: "city" },
            { label: "State", name: "state" },
            { label: "Country", name: "country" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                placeholder={label}
                className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-purple-500 focus:outline-none"
                {...formik.getFieldProps(name)}
              />
              {formik.touched[name] && formik.errors[name] && (
                <div className="text-red-500 text-xs mt-1">
                  {formik.errors[name]}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- Description and Address --- */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Street address"
            className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-purple-500 focus:outline-none"
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.address}
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={2}
            name="description"
            placeholder="Short description..."
            className="w-full px-2 py-1.5 text-sm border rounded-md focus:ring-purple-500 focus:outline-none resize-none"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.description}
            </div>
          )}
        </div>

        {/* --- Amenities --- */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Amenities
          </label>
          <div className="flex flex-wrap gap-2">
            {amenitiesOptions.map((item) => (
              <label
                key={item}
                className="flex items-center gap-1 border px-2 py-1 rounded-md text-xs text-gray-700 bg-gray-50 hover:bg-purple-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={item}
                  checked={selectedAmenities.includes(item)}
                  onChange={handleAmenitiesChange}
                  className="accent-purple-500"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* --- Image Upload --- */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Venue Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="block w-full text-xs file:px-3 file:py-1 file:rounded file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="h-16 w-full object-cover rounded shadow"
                />
              ))}
            </div>
          )}
          {existingVenueImages.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-medium text-gray-600 mb-1">Existing</p>
              <div className="grid grid-cols-3 gap-2">
                {existingVenueImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    className="h-16 w-full object-cover rounded shadow"
                    onError={(e) => (e.target.style.display = "none")}
                    alt={`Image ${idx}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- Submit --- */}
        <div className="pt-2 text-right">
          <button
            type="submit"
            className="px-5 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md font-semibold transition"
          >
            {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </form>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c4b5fd;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
