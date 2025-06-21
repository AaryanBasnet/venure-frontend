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
    console.log("initialData in useEffect:", initialData);

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

  console.log("Formik initial values log:", {
    venueName: initialData?.venueName,
    capacity: initialData?.capacity,
    pricePerHour: initialData?.pricePerHour,
    description: initialData?.description,
    address: initialData?.location?.address,
    city: initialData?.location?.city,
    state: initialData?.location?.state,
    country: initialData?.location?.country,
  });

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
      <div className="text-red-500 font-semibold">
        Venue not found. Cannot edit without data.
      </div>
    );
  }

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

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {amenitiesOptions.map((item) => (
            <label
              key={item}
              className="inline-flex items-center gap-1 text-sm cursor-pointer"
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
                alt={`Preview ${idx + 1}`}
                className="h-24 w-full object-cover rounded"
              />
            ))}
          </div>
        )}

        {existingVenueImages.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Existing Images
            </p>
            <div className="grid grid-cols-3 gap-3">
              {existingVenueImages.map((src, idx) => (
                <img
                  key={idx}
                  src={typeof src === "string" ? src : ""}
                  alt={`Existing Image ${idx + 1}`}
                  className="h-24 w-full object-cover rounded"
                  onError={(e) => {
                    console.error("Image load error:", src);
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </div>
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
