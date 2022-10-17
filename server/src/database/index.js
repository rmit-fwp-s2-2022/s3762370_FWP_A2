const { Sequelize, DataTypes } = require("sequelize");//W8 prac
const CryptoJS = require("crypto-js");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.posting = require("./models/posting.js")(db.sequelize, DataTypes);
db.posting_reply = require("./models/posting_reply.js")(
  db.sequelize,
  DataTypes
);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

db.simpleSelect = async (queryStr, replacements) => {
  return await db.sequelize.query(queryStr, {
    replacements: replacements,
    type: db.sequelize.QueryTypes.SELECT,
  });
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  await db.user.create({
    username: "Shekhar Kalra",
    email: "test@abc.com",
    password: CryptoJS.AES.encrypt("123456", "123456789", {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString(),
  });
  await db.user.create({
    username: "Matthew Bolger",
    email: "test@aaa.com",
    password: CryptoJS.AES.encrypt("123456", "123456789", {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.ZeroPadding,
    }).toString(),
  });
}

module.exports = db;
