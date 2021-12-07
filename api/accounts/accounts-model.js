const db = require("../../data/db-config");

const getAll = async () => {
  return await db("accounts");
};

const getById = async (id) => {
  const account = await db("accounts")
    .select("id", "name", "budget")
    .where("id", id)
    .first();

  return account;
};

const create = async (account) => {
  const [newAccountId] = await db("accounts").insert(account);

  return await getById(newAccountId);
};

const updateById = async (id, account) => {
  // DO YOUR MAGIC
};

const deleteById = async (id) => {
  // DO YOUR MAGIC
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
