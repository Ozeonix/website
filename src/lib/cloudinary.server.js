import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary Server-Side SDK Configuration
 *
 * Handles authenticated uploads, image replacements, and media asset management
 * securely without exposing secrets to client bundles.
 */

const cloud_name =
  process.env.CLOUDINARY_CLOUD_NAME ||
  process.env.VITE_CLOUDINARY_CLOUD_NAME ||
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  "ds3gjhrob";

const api_key = process.env.CLOUDINARY_API_KEY || "223693476611268";
const api_secret = process.env.CLOUDINARY_API_SECRET || "7a0aGsWiNQFyAcN3uJBNdbHpivU";

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
  secure: true,
});

/**
 * Uploads an image (base64 string, remote URL, buffer or file path) to Cloudinary.
 *
 * @param {string|Buffer} file - File path, data URI, remote URL, or readable stream.
 * @param {object} [options={}] - Cloudinary upload options (e.g. folder, public_id, tags).
 * @returns {Promise<object>} Upload response containing public_id, secure_url, width, height, format.
 */
export async function uploadToCloudinary(file, options = {}) {
  const uploadOptions = {
    folder: "ozeonix-infinity",
    resource_type: "image",
    ...options,
  };

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, uploadOptions, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

/**
 * Deletes an image from Cloudinary by its public ID.
 *
 * @param {string} publicId - The Cloudinary public ID.
 * @param {object} [options={}] - Additional deletion options.
 * @returns {Promise<object>} Cloudinary deletion result ({ result: 'ok' }).
 */
export async function deleteFromCloudinary(publicId, options = {}) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export { cloudinary };
