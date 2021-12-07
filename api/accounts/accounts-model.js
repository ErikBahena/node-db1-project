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
  const count = await db("accounts").where("id", id).update(account);

  if (count) return getById(id);
};

const deleteById = async (id) => {
  await db("accounts").where("id", "=", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
