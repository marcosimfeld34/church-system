import { clientService } from "../services/clients.js";
import { MISSING_FIELDS_REQUIRED, NOT_FOUND } from "../labels/labels.js";

const clientsController = {
  getAll: async (req, res) => {
    // const createdBy = req.user.id;

    const { id } = req.query;

    const filters = {
      $expr: {
        $and: [{ $eq: ["$isDeleted", false] }],
        $and: [{ $eq: ["$_id", id] }],
      },
    };

    const clients = await clientService.getAll(id ? filters : {});

    return res.status(200).json({
      status: 200,
      total: clients.length,
      data: clients,
    });
  },
  getOne: async (req, res) => {
    const { id } = req.params;

    const client = await clientService.getOne({ _id: id });

    if (!client) {
      return res.status(404).json({
        status: 404,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      data: client,
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

    const clientToStore = { ...req.body };
    clientToStore.createdBy = req.user.id;
    clientToStore.updatedBy = req.user.id;

    const clientStored = await clientService.store(clientToStore);

    return res.status(201).json({
      status: 201,
      isStored: true,
      data: clientStored,
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const clientDeleted = await clientService.delete(id);

    if (!clientDeleted) {
      return res.status(404).json({
        status: 404,
        isDeleted: false,
        message: NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: 200,
      isDeleted: true,
      data: clientDeleted,
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

    const oldClient = await clientService.getOne({ _id: id });

    if (!oldClient) {
      return res.status(404).json({
        status: 404,
        isUpdated: false,
        message: NOT_FOUND,
      });
    }

    const newClientData = { ...oldClient._doc, ...req.body };

    const clientsUpdated = await clientService.update(id, newClientData);

    return res.status(200).json({
      status: 200,
      isUpdated: true,
      data: clientsUpdated,
    });
  },
};

export default clientsController;
