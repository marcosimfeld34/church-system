import Profile from "../models/profiles.js";

export const profileService = {
  getAll: (options) => {
    try {
      return Profile.find({ ...options }).sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Profile.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newProfile) => {
    try {
      return Profile.create(newProfile);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Profile.findByIdAndUpdate(
        id,
        {
          deletedAt: new Date(),
          isDeleted: true,
        },
        { new: true }
      );
    } catch (error) {
      return error;
    }
  },
  update: async (id, newProfileData) => {
    try {
      const profile = await Profile.findOne({ _id: id });
      profile.name = newProfileData?.name;
      profile.developerName = newProfileData?.developerName;

      return await profile.save();
    } catch (error) {
      return error;
    }
  },
};
