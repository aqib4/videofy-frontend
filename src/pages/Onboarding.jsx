import React, { useState } from "react";
import { LoaderIcon, ShuffleIcon, MapPinIcon, GlobeIcon, CameraIcon } from "lucide-react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
import { LANGUAGES } from "../constants/index.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnboarding } from "../lib/api";

function Onboarding() {
  
  const queryClient = useQueryClient();
  const { authUser } = useAuthUser();
  const [onboarding, setOnboarding] = useState({
    fullname: authUser?.fullname || "",
    bio: "",
    nativeLanguage: "",
    learningLanguage: "",
    location: "",
    profilePic: authUser?.profilePic || "",
  });

  
  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationKey: "onboard",
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Onboarding completed successfully!")
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(onboarding);
    console.log("Onboarding data submitted:", onboarding);
  };

  const generateRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setOnboarding({ ...onboarding, profilePic: randomAvatar });
    toast.success("Random avatar generated successfully!");
    console.log("Random avatar generated:", onboarding.profilePic);
  };

  return (
    <div
      data-theme="night"
      className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 rounded-md"
    >
      <div className="w-full max-w-3xl mx-auto shadow-xl p-4 sm:p-6 md:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white/65 mt-4">
            Complete Your Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PROFILE PIC CONTAINER */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* IMAGE PREVIEW */}
            <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {onboarding.profilePic ? (
                <img
                  src={onboarding?.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                </div>
              )}
            </div>

            {/* Generate Random Avatar BTN */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={generateRandomAvatar}
                className="btn btn-accent"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="label" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={onboarding.fullname}
              onChange={(e) =>
                setOnboarding({ ...onboarding, fullname: e.target.value })
              }
              placeholder="Full Name"
              className="rounded-full w-full h-12 border border-primary/25 bg-transparent text-white/65 px-4 py-2 focus:outline-none focus:border-primary/65 focus:ring-1 focus:ring-primary/65"
            />
          </div>

          {/* Bio Field */}
          <div>
            <label className="label" htmlFor="bio">
              Bio
            </label>
            <textarea
              name="bio"
              value={onboarding.bio}
              onChange={(e) =>
                setOnboarding({ ...onboarding, bio: e.target.value })
              }
              placeholder="Tell people about yourself and your learning level"
              className="rounded-2xl border border-primary/25 bg-transparent text-white/65 px-4 py-2 w-full focus:outline-none focus:border-primary/65 focus:ring-1 focus:ring-primary/65"
            ></textarea>
          </div>

          {/* Native and Learning Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label" htmlFor="nativeLanguage">
                Native Language
              </label>
              <select
                name="nativeLanguage"
                value={onboarding.nativeLanguage}
                onChange={(e) =>
                  setOnboarding({
                    ...onboarding,
                    nativeLanguage: e.target.value,
                  })
                }
                className="rounded-full w-full h-12 border border-primary/25 bg-transparent text-white/65 px-4 py-2 focus:outline-none focus:border-primary/65 focus:ring-1 focus:ring-primary/65"
              >
                <option value="">Select</option>
                {LANGUAGES.map((lang) => (
                  <option value={lang.toLowerCase()} key={`native${lang}`}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="learningLanguage">
                Learning Language
              </label>
              <select
                name="learningLanguage"
                value={onboarding.learningLanguage}
                onChange={(e) =>
                  setOnboarding({
                    ...onboarding,
                    learningLanguage: e.target.value,
                  })
                }
                className="rounded-full w-full h-12 border border-primary/25 bg-transparent text-white/65 px-4 py-2 focus:outline-none focus:border-primary/65 focus:ring-1 focus:ring-primary/65"
              >
                <option value="">Select</option>
                {LANGUAGES.map((lang) => (
                  <option value={lang.toLowerCase()} key={`learning${lang}`}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location Field */}
          <div className="relative mt-6">
            <MapPinIcon
              size={20}
              className="text-primary/65 absolute top-1/2 transform -translate-y-1/2 left-3"
            />
            <input
              type="text"
              name="location"
              value={onboarding.location}
              onChange={(e) =>
                setOnboarding({ ...onboarding, location: e.target.value })
              }
              placeholder="City, Country"
              className="rounded-full bg-transparent w-full h-12 border border-primary/25 py-2 px-9 text-white/65"
            />
          </div>

          {/* Submit Button */}
          <div className="relative mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center gap-3 w-full bg-primary/75 rounded-full py-3"
            >
              {isPending ? (
                <>
                  <LoaderIcon className="animate-spin size-6" />
                  Onboarding...
                </>
              ) : (
                <>
                  <GlobeIcon className="size-6" />
                  Complete Onboarding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;
