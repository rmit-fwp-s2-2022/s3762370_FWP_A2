const _ = require("lodash");
const Joi = require("joi"); 
const db = require("../database");

exports.getProfile = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }
    const user = await db.user.findOne({
      where: {
        user_id: req.user_id,
        state: "1",
      },
    });

    if (_.isEmpty(user)) {
      throw "User do not exit";
    }

    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;

    return res.json({ success: 1, data: returnData });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    const schema = Joi.object({
      
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });

    await schema.validateAsync(req.body);

    let user = await db.user.findOne({
      where: {
        user_id: req.user_id,
        state: "1",
      },
    });

    if (_.isEmpty(user)) {
      throw "User do not exit";
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    user = await user.save();

    const returnData = JSON.parse(JSON.stringify(user));
    delete returnData.password;

    return res.json({ success: 1, data: returnData });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    let user = await db.user.findOne({
      where: {
        user_id: req.user_id,
        state: "1",
      },
    });

    if (_.isEmpty(user)) {
      throw "User do not exit";
    }

    user.state = "0";
    await user.save();
    return res.json({ success: 1, data: {} });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    const schema = Joi.object({
      search_text: Joi.string().empty('').max(20),
    });

    await schema.validateAsync(req.body);

    let query = `
      SELECT
      t.user_id,
      t.username,
      t.email 
    FROM
      users t 
    WHERE
      t.state = '1' 
      AND (
      t.username LIKE ? 
      OR t.email LIKE ? )
    `;
    let search_text = req.body.search_text + "%";
    let replacements = [search_text, search_text];
    let users = await db.simpleSelect(query, replacements);
    return res.json({ success: 1, data: users });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.getFollowUsers = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    let query = `
      SELECT
      b.user_id,
      b.username,
      b.email 
    FROM
      follows a
      LEFT JOIN users b ON a.follow_user_id = b.user_id 
    WHERE
      a.user_id = ?
    `;
    let replacements = [req.user_id];
    let users = await db.simpleSelect(query, replacements);
    return res.json({ success: 1, data: users });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.followUser = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    let fuser = await db.user.findOne({
      where: {
        user_id: req.params.user_id,
        state: "1",
      },
    });

    if (_.isEmpty(fuser)) {
      throw "User not exist";
    }

    let follow = await db.follow.findOne({
      where: {
        user_id: req.user_id,
        follow_user_id: req.params.user_id,
      },
    });

    if (_.isEmpty(follow)) {
      await db.follow.create({
        user_id: req.user_id,
        follow_user_id: req.params.user_id,
      });
    }

    return res.json({ success: 1, data: {} });
  } catch (err) {
    return res.json({ success: 0, data: err });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    if (!req.user_id) {
      throw "Auth Failed or session expired";
    }

    let follow = await db.follow.findOne({
      where: {
        user_id: req.user_id,
        follow_user_id: req.params.user_id,
      },
    });

    if (!_.isEmpty(follow)) {
      await follow.destroy();
    }

    return res.json({ success: 1, data: {} });
  } catch (err) {
    return res.json({ success: 0, data: err });
  };
};
