import express from "express";
import { getMongoRepository } from "typeorm";
import { Day } from "../entity/Day";
import { Icon } from "../entity/Icon";
import { User } from "../entity/User";
const router = express.Router();

/**
 * @body icon: {string} add icon to the day
 * @body username: {string} username
 * @body day: {number: 1-31}
 * @body Month: {number: 0-11}
 */
router.post("/", async (req, res) => {
  const { icon, username, day, month } = req.body;
  console.log("update", {
    icon,
    username,
    day,
    month,
  });
  const user = await getMongoRepository(User).findOne({
    where: { username },
  });
  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "User not found",
      },
    });
  }

  const _icon = await getMongoRepository(Icon).findOne({
    where: { icon },
  });
  const _day = await getMongoRepository(Day).findOne({
    where: { day, userId: user.id, month: month },
  });

  if (!_icon) {
    return res.json({
      success: false,
      error: {
        message: "Icon not registered",
      },
    });
  }

  if (_day) {
    _day.icons.push(icon);
    await getMongoRepository(Day).save(_day);
    return res.json({
      success: true,
      day: _day,
    });
  } else {
    const newDay = new Day();
    newDay.day = day;
    newDay.icons = [icon];
    newDay.userId = user.id;
    newDay.month = month;

    await getMongoRepository(Day).save(newDay);
    return res.json({
      success: true,
      day: newDay,
    });
  }
});

/**
 * @params month: The Month Index (start at 0)
 * @query username: The username of the user
 */
router.get("/month/:month", async (req, res) => {
  const month = req.params.month;
  const username = req.query.username;

  if (!username) {
    return res.json({
      success: false,
      error: {
        message: "Please Provide a username",
      },
    });
  }

  const user = await getMongoRepository(User).findOne({
    where: { username },
  });

  if (!user) {
    return res.json({
      success: false,
      error: {
        message: "User not found",
      },
    });
  }

  console.log({
    month,
    userId: user.id,
  });
  const days = await getMongoRepository(Day).find({
    where: {
      month: Number(month),
      userId: user.id,
    },
  });

  return res.json({
    success: true,
    days,
  });
});

export { router as dayRouter };
