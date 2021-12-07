const router = require("express").Router();
const AccountsModel = require("./accounts-model");

const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  AccountsModel.getAll()
    .then((accounts) => res.status(200).json(accounts))
    .catch((err) => next(err));
});

router.get("/:id", checkAccountId, (req, res, next) => {
  AccountsModel.getById(req.params.id)
    .then((account) => res.status(200).json(account))
    .catch((err) => next(err));
});

router.post(
  "/",
  checkAccountNameUnique,
  checkAccountPayload,
  (req, res, next) => {
    AccountsModel.create(req.body)
      .then((newAccount) => res.status(201).json(newAccount))
      .catch((err) => next(err));
  }
);

router.put("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete("/:id", (req, res, next) => {
  // DO YOUR MAGIC
});

router.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, stack: err.stack });
});

module.exports = router;
