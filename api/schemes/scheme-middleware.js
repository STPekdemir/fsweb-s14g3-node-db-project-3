const schemeModel = require("./scheme-model");
const checkSchemeId = async (req, res, next) => {
  try {
    const id = req.params["scheme_id"];
    const isExist = await schemeModel.findById(id);
    if (!isExist) {
      res
        .status(404)
        .json({ message: `scheme_id ${id} id li şema bulunamadı` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const validateScheme = (req, res, next) => {
  try {
    const schemeName = req.body.scheme_name;
    if (!schemeName || schemeName === "" || typeof schemeName !== "string") {
      res.status(400).json({ message: "Geçersiz scheme_name" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const validateStep = (req, res, next) => {
  try {
    const { instructions, step_number } = req.body;
    if (
      !instructions ||
      instructions === "" ||
      typeof instructions !== "string" ||
      typeof step_number !== "number" ||
      step_number < 1
    ) {
      res.status(400).json({ message: "Hatalı step" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
