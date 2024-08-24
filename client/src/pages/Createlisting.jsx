import React, { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from './../firebase';

export default function Createlisting() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageuploaderror , setimageuploaderror] = useState(false);

  console.log(formData);

  const handleImageSubmit = async (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
        setimageuploaderror(false)
      }).catch((error)=>{
        setimageuploaderror('image upload failed (2 MB max per image)')
      })
    }
    else{
        setimageuploaderror('you can only upload 6 images at a time')
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle progress, if necessary
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

  const handleDeleteImage = (urlToDelete) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url) => url !== urlToDelete),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-6">
        {/* Part 1 */}
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
            placeholder="Name"
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            id="description"
            required
            placeholder="Description"
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="address"
            required
            placeholder="Address"
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
              <span>Parking Spot</span>
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
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border rounded-lg border-gray-300"
                min="1"
                max="10"
                id="bedrooms"
                required
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border rounded-lg border-gray-300"
                min="1"
                max="10"
                id="bathrooms"
                required
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border rounded-lg border-gray-300"
                min="1000"
                id="regularprice"
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span>₹ / month</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border rounded-lg border-gray-300"
                min="1000"
                id="discountprice"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span>₹ / month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Note:
            <span className="font-normal text-gray-600 ml-2">The first image will be the cover.</span>
            <span className="font-normal text-gray-600 ml-2">Max 6 images.</span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80"
            >
              Upload
            </button>
            
          </div>
          <p className="text-red-800 text-sm">{imageuploaderror && imageuploaderror}</p>
          {
            formData.imageUrls.length > 0  && formData.imageUrls.map((url, index) => (
              <div key={index} className="flex justify-between p-3">
                <img src={url} alt='listing image' className="w-40 h-40 object-contain rounded-lg"/> 
                <button
                  type="button"
                  onClick={() => handleDeleteImage(url)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          }
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">
            Create Listing
          </button>
        </div>
        
      </form>

    </main>
  );
}
