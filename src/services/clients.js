import Client from "../models/clients.js";

export const clientService = {
  getAll: (options) => {
    try {
      return Client.find({ ...options }, ["name"]).sort({ createdAt: -1 });
    } catch (error) {
      return error;
    }
  },
  getOne: (options) => {
    try {
      return Client.findOne({ ...options });
    } catch (error) {
      return error;
    }
  },
  store: (newClient) => {
    try {
      return Client.create(newClient);
    } catch (error) {
      return error;
    }
  },
  delete: (id) => {
    try {
      return Client.deleteOne({ _id: id });
    } catch (error) {
      return error;
    }
  },
  update: async (id, newClientData) => {
    try {
      const client = await Client.findOne({ _id: id });
      client.name = newClientData.name;

      return await client.save();
    } catch (error) {
      return error;
    }
  },
};
