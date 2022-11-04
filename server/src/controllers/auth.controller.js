const CryptoJS = require("crypto-js") // https://www.npmjs.com/package/crypto-js encryption
const Joi = require("joi") // https://www.npmjs.com/package/js-joi?activeTab=readme & https://zhongwq.github.io/SystemAnalysis/Node.js%20joi%E4%BD%BF%E7%94%A8  Data format validation
const db = require("../database")// W8 prac

// sign up.
exports.signUp = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    })

    const value = await schema.validateAsync(req.body)

    let user = await db.user.findOne({
      where: {
        username: req.body.username,
      },
    })

    if (user) {
      throw "User already exists"
    }

    user = await db.user.create({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, "123456789", {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding,
      }).toString(),
    })

    const returnData = JSON.parse(JSON.stringify(user))
    delete returnData.password

    return res.json({ success: 1, data: returnData })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.signIn = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    })

    let user = await db.user.findOne({
      where: {
        username: req.body.username,
        state: "1",
      },
    })

    if (!user) {
      throw "User do not exist"
    }

    if (
      CryptoJS.AES.decrypt(user.password, "123456789", {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding,
      }).toString(CryptoJS.enc.Utf8) != req.body.password
    ) {
      throw "password error"
    }

    const returnData = JSON.parse(JSON.stringify(user))
    return res.json({ success: 1, user })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}
