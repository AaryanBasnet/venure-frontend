import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAddVenue from "../../hooks/owner/useAddVenue";
import { AuthContext } from "../../auth/AuthProvider";

const amenitiesOptions = ["WiFi", "Parking", "AC", "Music", "Catering", "Stage"];

export default function VenueRegisterForm({ onSuccess }) {
  const { user } = useContext(AuthContext);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [venueImages, setVenueImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const createVenue = useAddVenue();

  const formik = useFormik({
    initialValues: {
      venueName: "",
      capacity: "",
      pricePerHour: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
    //   lat: "",
    //   lng: "",
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
    //   lat: Yup.string().required("Required"),
    //   lng: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!user || !user._id) {
        console.error("User is not available");
        return;
      }

      createVenue.mutate(
        {
          form: values,
          amenities: selectedAmenities,
          images: venueImages,
          ownerId: user._id || user.id,
        },
        {
          onSuccess: (res) => {
            resetForm();
            setVenueImages([]);
            setSelectedAmenities([]);
            setPreviewImages([]);
            onSuccess?.(res.data);
          },
        }
      );
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
    <form onSubmit={formik.handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {/* Text Inputs */}
      {[
        { label: "Venue Name", name: "venueName" },
        { label: "Capacity", name: "capacity", type: "number" },
        { label: "Price Per Hour", name: "pricePerHour", type: "number" },
        { label: "Description", name: "description", isTextarea: true },
        { label: "Address", name: "address" },
        { label: "City", name: "city" },
        { label: "State", name: "state" },
        { label: "Country", name: "country" },
        // { label: "Latitude", name: "lat" },
        // { label: "Longitude", name: "lng" },
      ].map(({ label, name, type = "text", isTextarea }) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
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
            <div className="text-red-500 text-sm mt-1">{formik.errors[name]}</div>
          )}
        </div>
      ))}

      {/* Amenities */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {amenitiesOptions.map((item) => (
            <label key={item} className="inline-flex items-center gap-1 text-sm">
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={createVenue.isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition"
      >
        {createVenue.isLoading ? "Creating Venue..." : "Create Venue"}
      </button>
    </form>
  );
}
