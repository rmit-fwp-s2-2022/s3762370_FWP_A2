const _ = require("lodash") // https://www.lodashjs.com/ & https://www.npmjs.com/package/lodash 
const Joi = require("joi")
const db = require("../database")

exports.getUserPostings = async (req, res) => {
  try {
    if (!req.headers.user_id) {
      throw "Auth Failed or session expired"
    }

    let follow = null
    if (req.headers.user_id != req.params.user_id) {
      follow = await db.follow.findOne({
        where: {
          user_id: req.headers.user_id,
          follow_user_id: req.params.user_id,
        },
      })
    }

    if (req.headers.user_id == req.params.user_id || !_.isEmpty(follow)) {
      const postings = await db.posting.findAll({
        where: {
          user_id: req.params.user_id,
        },
      })
      return res.json({ success: 1, data: postings })
    } else {
      throw "Not self or follow"
    }
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.getPosting = async (req, res) => {
  try {
    if (!req.headers.user_id) {
      throw "Auth Failed or session expired"
    }
    const posting = await db.posting.findOne({
      where: {
        posting_id: req.params.posting_id,
      },
    })

    if (req.headers.user_id != posting.user_id) {
      const follow = await db.follow.findOne({
        where: {
          user_id: req.headers.user_id,
          follow_user_id: posting.user_id,
        },
      })

      if (_.isEmpty(follow)) {
        throw "Posting not exist"
      }
    }

    let returnData = JSON.parse(JSON.stringify(posting))

    let query = `
    SELECT
      a.posting_reply_id, a.content, a.createdAt, b.username
    FROM
      posting_replies a
      LEFT JOIN users b ON a.user_id = b.user_id
    where
      a.posting_id = ?
    `
    let replacements = [req.params.posting_id]

    returnData.replies = await db.simpleSelect(query, replacements)
    return res.json({ success: 1, data: returnData })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.getAllPosting = async (req, res) => {
  let query = `
    SELECT
      a.posting_id, a.user_id, a.content, a.url, a.createdAt, a.updatedAt, b.username
    FROM
      postings a
      LEFT JOIN users b ON a.user_id = b.user_id
    `
  const posting = await db.select(query)
  let returnData = JSON.parse(JSON.stringify(posting))
  return res.json(returnData)
}

exports.createPosting = async (req, res) => {
  try {
    if (!req.headers.user_id) {
      throw "Auth Failed or session expired"
    }

    const schema = Joi.object({
      content: Joi.string().empty("").max(3000),
      url: Joi.string().empty("").max(200),
    })

    await schema.validateAsync(req.body)

    const posting = await db.posting.create({
      user_id: req.headers.user_id,
      content: req.body.content,
      url: req.body.url,
    })

    return res.json({ success: 1, data: posting })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.editPosting = async (req, res) => {
  try {
    if (!req.headers.user_id) {
      throw "Auth Failed or session expired"
    }

    const schema = Joi.object({
      content: Joi.string().empty("").max(3000),
      url: Joi.string().empty("").max(200),
    })

    await schema.validateAsync(req.body)

    let posting = await db.posting.findOne({
      where: {
        user_id: req.headers.user_id,
        posting_id: req.params.posting_id,
      },
    })

    if (_.isEmpty(posting)) {
      throw "Posting not exist"
    }

    if (req.body.content) {
      posting.content = req.body.content
    }

    if (req.body.url) {
      posting.url = req.body.url
    }

    posting = await posting.save()

    return res.json({ success: 1, data: posting })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.deletePosting = async (req, res) => {
  try {
    if (!req.headers.user_id) {
      throw "Auth Failed or session expired"
    }

    let posting = await db.posting.findOne({
      where: {
        user_id: req.headers.user_id,
        posting_id: req.params.posting_id,
      },
    })

    if (_.isEmpty(posting)) {
      throw "Posting not exist"
    }

    await db.posting_reply.destroy({
      where: {
        posting_id: req.params.posting_id,
      },
    })

    await posting.destroy()
    return res.json({ success: 1, data: {} })
  } catch (err) {
    return res.json({ success: 0, data: err })
  }
}

exports.delPostingByUser = async (req, res) => {

  await db.posting.destroy({
    where: {
      user_id: req.headers.user_id,
    },
  })
  return res.json({ success: 1, data: {} })
}

exports.replyPosting = async (req, res) => {

  const schema = Joi.object({
    content: Joi.string().empty("").max(500),
  })

  await schema.validateAsync(req.body)

  let posting = await db.posting.findOne({
    where: {
      posting_id: req.params.posting_id,
    },
  })

  if (_.isEmpty(posting)) {
    throw "Posting not exist"
  }

  const reply = await db.posting_reply.create({
    posting_id: req.params.posting_id,
    user_id: req.headers.user_id,
    content: req.body.content,
  })

  return res.json(reply)

}
