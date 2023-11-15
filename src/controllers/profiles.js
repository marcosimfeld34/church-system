import { profileService } from "../services/profiles.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const profileController = {
  getAll: async (req, res) => {
    const profiles = await profileService.getAll({
      $expr: {
        $and: [{ $eq: ["$isDeleted", false] }],
      },
    });

    return res.status(200).json({
      status: 200,
      total: profiles.length,
      data: profiles,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const profile = await profileService.getOne({ _id: id });

    if (!profile) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: profile,
    });
  },
  getOneByDeveloperName: async (req, res) => {
    const { name } = req.params;

    const profile = await profileService.getOne({ developerName: name });

    if (!profile) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: profile,
    });
  },
  store: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const profileToStore = { ...req.body };
    profileToStore.createdBy = req.user.id;
    profileToStore.updatedBy = req.user.id;

    const profileStored = await profileService.store(profileToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: profileStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const profileDeleted = await profileService.delete(id);

    if (!profileDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: profileDeleted,
    });
  },
  update: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
        status: 400,
        isStored: false,
        message: MISSING_FIELDS_REQUIRED,
      });
    }

    const { id } = req.params;

    const oldProfile = await profileService.getOne({ _id: id });

    if (!oldProfile) {
      return res.status(404).json({
        status: 404,
        isUpdated: false,
        message: NOT_FOUND,
      });
    }

    const newProfileData = { ...oldProfile._doc, ...req.body };

    const profilesUpdated = await profileService.update(id, newProfileData);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data: profilesUpdated,
    });
  },
};

export default profileController;
