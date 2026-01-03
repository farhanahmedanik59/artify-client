// ProfilePage.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContex } from "../../contexts/AuthContex";
import { updateProfile } from "firebase/auth";
import { Camera, Save, User, CheckCircle, XCircle, Upload, Copy } from "lucide-react";
import { auth } from "../../../firebase.config";

const ProfilePage = () => {
  const { setUser, user, loading } = useContext(AuthContex);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Profile form state
  const [profileData, setProfileData] = useState({
    displayName: "",
    photoURL: "",
  });

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`,
      });
    }
  }, [user]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    console.log(profileData);
  };

  // Handle URL validation
  const isValidImageUrl = (url) => {
    if (!url) return true; // Allow empty for default avatar
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Handle click to start editing
  const handleEditClick = () => {
    setIsEditing(true);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Handle click to cancel editing
  const handleCancelClick = () => {
    setIsEditing(false);
    setProfileData({
      displayName: user.displayName || "",
      photoURL: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`,
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Handle click to save profile
  const handleSaveClick = async () => {
    // Validation
    if (!profileData.displayName.trim()) {
      setErrorMessage("Display name cannot be empty");
      return;
    }

    if (profileData.photoURL && !isValidImageUrl(profileData.photoURL)) {
      setErrorMessage("Please enter a valid image URL (http:// or https://)");
      return;
    }

    // Check if image URL is accessible (optional)
    if (profileData.photoURL && profileData.photoURL !== user.photoURL) {
      try {
        const response = await fetch(profileData.photoURL, { method: "HEAD" });
        if (!response.ok) {
          setErrorMessage("Image URL is not accessible. Please check the URL.");
          return;
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.startsWith("image/")) {
          setErrorMessage("The URL does not point to a valid image");
          return;
        }
      } catch (error) {
        setErrorMessage("Cannot verify image URL. Please check the URL.");
        return;
      }
    }

    setIsUpdating(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await updateProfile(user, {
        displayName: profileData.displayName.trim(),
        photoURL: profileData.photoURL || null,
      });
      setUser({ ...auth.currentUser });
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
      console.log(user);
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Update error:", error);
      setErrorMessage(error.message || "Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle click to use default avatar
  const handleUseDefaultAvatar = () => {
    const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`;
    setProfileData((prev) => ({ ...prev, photoURL: defaultAvatar }));
  };

  // Handle click to copy avatar URL
  const handleCopyAvatarUrl = () => {
    navigator.clipboard
      .writeText(profileData.photoURL)
      .then(() => {
        setSuccessMessage("Avatar URL copied to clipboard!");
        setTimeout(() => setSuccessMessage(""), 2000);
      })
      .catch(() => {
        setErrorMessage("Failed to copy URL");
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-2xl font-bold text-base-content mb-4">Authentication Required</h3>
          <p className="text-base-content/70 mb-6">Please log in to view your profile</p>
          <button className="btn btn-primary" onClick={() => (window.location.href = "/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">My Profile</h1>
        <p className="text-base-content/70">Manage your profile information</p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="alert alert-success shadow-lg mb-6 animate-fadeIn">
          <CheckCircle className="w-6 h-6" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error shadow-lg mb-6 animate-fadeIn">
          <XCircle className="w-6 h-6" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Overview */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Profile Picture */}
              <div className="relative mx-auto mb-6">
                <div className="avatar">
                  <div className="w-40 h-40 rounded-full ring-4 ring-primary/30 ring-offset-2 ring-offset-base-100 overflow-hidden">
                    <img
                      src={profileData.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`;
                      }}
                    />
                  </div>
                </div>

                {isEditing && (
                  <button onClick={handleUseDefaultAvatar} className="absolute bottom-2 right-2 btn btn-sm btn-circle btn-primary" title="Use default avatar">
                    <Camera size={16} />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-base-content mb-1">{isEditing ? profileData.displayName || "Your Name" : user.displayName || "User"}</h2>
                <p className="text-base-content/70">{user.email}</p>
                <div className="badge badge-primary badge-lg mt-2">Artify Member</div>
              </div>

              {/* Stats */}
              <div className="stats stats-vertical bg-base-200 shadow">
                <div className="stat">
                  <div className="stat-title">Member Since</div>
                  <div className="stat-value text-primary">
                    {new Date(user.metadata?.creationTime).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Account Status</div>
                  <div className="stat-value text-success">Active</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex-col items-center justify-between mb-6  md:flex-row">
                <h2 className="text-2xl font-bold text-base-content">Profile Information</h2>
                {!isEditing ? (
                  <button onClick={handleEditClick} className="btn btn-primary">
                    <User size={18} className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex md:gap-2 mt-3 md:mt-0">
                    <button onClick={handleCancelClick} className="btn btn-ghost" disabled={isUpdating}>
                      <XCircle size={18} className="mr-2" />
                      Cancel
                    </button>
                    <button onClick={handleSaveClick} className="btn btn-primary" disabled={isUpdating}>
                      {isUpdating ? (
                        <>
                          <span className="loading loading-spinner loading-sm"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  {/* Name Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Display Name</span>
                    </label>
                    <input
                      type="text"
                      name="displayName"
                      value={profileData.displayName}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                      className="input input-bordered w-full"
                      disabled={isUpdating}
                    />
                  </div>

                  {/* Photo URL Field */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Profile Photo URL</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        name="photoURL"
                        value={profileData.photoURL}
                        onChange={handleInputChange}
                        placeholder="https://example.com/photo.jpg"
                        className="input input-bordered flex-1"
                        disabled={isUpdating}
                      />
                      {profileData.photoURL && (
                        <button onClick={handleCopyAvatarUrl} className="btn btn-outline" type="button" title="Copy URL">
                          <Copy size={18} />
                        </button>
                      )}
                    </div>
                    <label className="label">
                      <span className="label-text-alt text-base-content/60">Enter a valid image URL. Leave empty for default avatar.</span>
                    </label>

                    {/* Preview Section */}
                    {profileData.photoURL && (
                      <div className="mt-4">
                        <div className="text-sm font-medium text-base-content mb-2">Image Preview:</div>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-16 h-16 rounded-lg">
                              <img
                                src={profileData.photoURL}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=error`;
                                  setErrorMessage("Invalid image URL");
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="text-sm text-base-content/70 break-all">{profileData.photoURL.length > 60 ? `${profileData.photoURL.substring(0, 60)}...` : profileData.photoURL}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Help Tips */}
                  <div className="alert alert-info">
                    <div>
                      <div className="font-medium">Tips:</div>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Use image hosting services like Imgur or Cloudinary</li>
                        <li>• Supported formats: JPG, PNG, GIF, WebP</li>
                        <li>• Click "Use default avatar" to reset to generated avatar</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Display Name</span>
                      </label>
                      <div className="input input-bordered w-full bg-base-200">{user.displayName || "Not set"}</div>
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <div className="input input-bordered w-full bg-base-200">{user.email}</div>
                    </div>
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Profile Photo URL</span>
                    </label>
                    <div className="input input-bordered overflow-hidden w-full bg-base-200 break-all">{user.photoURL || "Using default avatar"}</div>
                  </div>

                  {/* Current Avatar Preview */}
                  <div className="mt-6">
                    <div className="text-sm font-medium text-base-content mb-2">Current Avatar:</div>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-20 h-20 rounded-lg ring-2 ring-base-300">
                          <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || "user"}`} alt="Current Avatar" className="w-full h-full object-cover" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-base-content/70">{user.photoURL ? "Your custom profile photo is displayed" : "Using automatically generated avatar based on your email"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
