import React, { useMemo } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

function SalonImages({
  existingImages = {},
  value = [],
  onChange,
  onDeleteExisting,
  maxImages = 10,
}) {
  /* ===========================
       SELECT IMAGES
    =========================== */

  const handleSelectImages = (event) => {
    const files = Array.from(event.target.files);

    const totalImages =
      Object.keys(existingImages).length + value.length + files.length;

    if (totalImages > maxImages) {
      alert(`Maximum ${maxImages} images allowed.`);
      return;
    }

    onChange([...value, ...files]);

    event.target.value = "";
  };

  /* ===========================
       REMOVE NEW IMAGE
    =========================== */

  const removeNewImage = (index) => {
    const updatedImages = [...value];

    updatedImages.splice(index, 1);

    onChange(updatedImages);
  };

  /* ===========================
       PREVIEW URLS
    =========================== */

  const previews = useMemo(() => {
    return value.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [value]);

  return (
    <div className="space-y-5">
      {/* ===========================
                HEADER
            =========================== */}

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Salon Images</h3>

          <p className="text-sm text-gray-500">
            Upload up to {maxImages} images.
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleSelectImages}
          />

          <div className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            <ImagePlus size={18} />
            Add Images
          </div>
        </label>
      </div>

      {/* ===========================
                EXISTING IMAGES
            =========================== */}

      {Object.keys(existingImages).length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Existing Images</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(existingImages).map(([publicId, url]) => (
              <div
                key={publicId}
                className="relative rounded-lg overflow-hidden border"
              >
                <img src={url} alt="" className="w-full h-40 object-cover" />

                <button
                  type="button"
                  onClick={() => onDeleteExisting(publicId)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===========================
                NEW IMAGES
            =========================== */}

      {previews.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Selected Images</h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden border"
              >
                <img
                  src={preview.url}
                  alt=""
                  className="w-full h-40 object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SalonImages;
