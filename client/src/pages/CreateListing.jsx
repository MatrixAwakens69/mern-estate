import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFIles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },

        (error) => {
          reject(error);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageUpload = () => {
    setUploading(true);
    setImageError(false);
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageError("Image upload failed. (max 5mb for each image)");
          setUploading(false);
        });
    } else {
      setImageError(
        "You can upload minimum of one image or maximum of six images."
      );
      setUploading(false);
    }
  };

  const handleDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="50"
            minLength="5"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border border-gray-300 rounded-lg max-w-28"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border border-gray-300 rounded-lg max-w-28"
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border border-gray-300 rounded-lg max-w-28"
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <span>Regular price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="p-3 border border-gray-300 rounded-lg max-w-28"
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <span>Discounted price</span>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              onChange={(e) => setFIles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageUpload}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-75 disabled:shadow-none"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageError && imageError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="p-3 bg-red-700 text-white rounded-lg uppercase hover:opacity-90"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
