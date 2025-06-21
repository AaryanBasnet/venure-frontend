import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createVenue, updateVenue } from "../../api/owner/venueApi";
import { AuthContext } from "../../auth/AuthProvider";

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
  const [existingVenueImages, setExistingVenueImages] = useState([]); // from backend URLs
  // On edit mode, prefill amenities and preview images from initialData
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedAmenities(initialData.amenities || []);
      if (initialData.venueImages && initialData.venueImages.length > 0) {
        setExistingVenueImages(
          initialData.venueImages.map((img) =>
            img.url.startsWith("http")
              ? img.url
              : `http://localhost:5050${img.url}`
          )
        );
      } else {
        setExistingVenueImages([]);
      }
    } else {
      setSelectedAmenities([]);
      setExistingVenueImages([]);
    }
  }, [mode, initialData]);

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
      capacity: Yup.number().required("Required"),
      pricePerHour: Yup.number().required("Required"),
      description: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!user || !user._id) {
        console.error("User is not available");
        return;
      }

      try {
        if (mode === "edit" && initialData?._id) {
          const formData = new FormData();

          // Append form fields
          formData.append("venueName", values.venueName);
          formData.append("capacity", values.capacity);
          formData.append("pricePerHour", values.pricePerHour);
          formData.append("description", values.description);
          formData.append("address", values.address);
          formData.append("city", values.city);
          formData.append("state", values.state);
          formData.append("country", values.country);

          formData.append("amenities", JSON.stringify(selectedAmenities));

          // Append new images only (if any)
          venueImages.forEach((file) => {
            formData.append("venueImages", file);
          });

          // Call update API
          await updateVenue(initialData._id, formData);
          onSuccess?.(values);
          resetForm();
          setVenueImages([]);
          setSelectedAmenities([]);
          setPreviewImages([]);
        } else {
          // CREATE mode
          const venueData = {
            ...values,
            ownerId: user._id,
            amenities: selectedAmenities,
          };

          const createRes = await createVenue(venueData);
          const newVenue = createRes.data.data;

          // Upload images if any
          if (venueImages.length > 0 && newVenue._id) {
            const imageForm = new FormData();
            venueImages.forEach((file) =>
              imageForm.append("venueImages", file)
            );
            await updateVenue(newVenue._id, imageForm); // or uploadVenueImages API if you want separate
          }

          onSuccess?.(newVenue);
          resetForm();
          setVenueImages([]);
          setSelectedAmenities([]);
          setPreviewImages([]);
        }
      } catch (error) {
        console.error("Error submitting venue:", error);
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
    >
      {[
        { label: "Venue Name", name: "venueName" },
        { label: "Capacity", name: "capacity", type: "number" },
        { label: "Price Per Hour", name: "pricePerHour", type: "number" },
        { label: "Description", name: "description", isTextarea: true },
        { label: "Address", name: "address" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Country", name: "country" },
      ].map(({ label, name, type = "text", isTextarea }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          {isTextarea ? (
            <textarea
              name={name}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
              {...formik.getFieldProps(name)}
            />
          ) : (
            <input
              type={type}
              name={name}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-purple-500"
              {...formik.getFieldProps(name)}
            />
          )}
          {formik.touched[name] && formik.errors[name] && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors[name]}
            </div>
          )}
        </div>
      ))}

      {/* Amenities */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {amenitiesOptions.map((item) => (
            <label
              key={item}
              className="inline-flex items-center gap-1 text-sm"
            >
              <input
                type="checkbox"
                value={item}
                checked={selectedAmenities.includes(item)}
                onChange={handleAmenitiesChange}
                className="accent-purple-600"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Images
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full text-sm"
        />
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {previewImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
      >
        {mode === "edit" ? "Update Venue" : "Create Venue"}
      </button>
    </form>
  );
}
