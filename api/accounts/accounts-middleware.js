const { getById, getAll } = require("../accounts/accounts-model");

function checkAccountPayload(req, res, next) {
  if (
    typeof req.body.name === "undefined" ||
    typeof req.body.budget === "undefined"
  ) {
    res.status(400).json({ message: "name and budget are required" });
    return;
  } else if (typeof req.body.budget !== "number") {
    res.status(400).json({ message: "budget of account must be a number" });
    return;
  } else if (typeof req.body.name !== "string") {
    res.status(400).json({ message: "name of account must be a string" });
    return;
  } else if (
    req.body.name.trim().length < 3 ||
    req.body.name.trim().length > 100
  ) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
    return;
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
    return;
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
}

async function checkAccountNameUnique(req, res, next) {
  const accounts = await getAll();

  const foundRepeat = accounts.find((acc) => acc.name === req.body.name);

  if (!foundRepeat) next();
  if (foundRepeat) res.status(400).json({ message: "that name is taken" });
}

async function checkAccountId(req, res, next) {
  const account = await getById(req.params.id);

  if (account) next();

  if (!account) res.status(404).json({ message: "account not found" });
}

module.exports = {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
};
