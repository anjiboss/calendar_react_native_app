import express from "express";
import { getMongoRepository } from "typeorm";
import { Day } from "../entity/Day";
import { Icon } from "../entity/Icon";
import { User } from "../entity/User";

// ANCHOR API: /api/v1/day
const router = express.Router();

// ANCHOR Add Icon to day
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

  if (!icon || !username || day === undefined || month === undefined) {
    return res.json({
      error: "Missing fields",
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
 * ANCHOR Get Days Of A Month
 */
router.get("/month/:month", async (req, res) => {
  const month = req.params.month;
  const username = req.query.username;
  console.log("month", month, username);

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

// ANCHOR Delete Icon from day
router.delete("/:day", async (req, res) => {
  const _day = req.params.day;
  const { username, month, icon } = req.body;
  console.log({
    _day,
    username,
    month,
    icon,
  });

  // Check user
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

  // Find Day
  const day = await getMongoRepository(Day).findOne({
    where: { day: Number(_day), userId: user.id, month: month },
  });

  console.log(day);

  if (!day) {
    return res.json({
      success: false,
      error: {
        message: "Day not found",
      },
    });
  }

  // Check if Icon in day
  if (!day.icons.includes(icon)) {
    return res.json({
      success: false,
      error: {
        message: "Icon not in day",
      },
    });
  }

  // Remove 1 Icon from Day
  const clearIcon = day.icons.filter((i) => i !== icon);
  const onlyThatIcon = day.icons.filter((i) => i === icon);
  day.icons = [...clearIcon, ...new Array(onlyThatIcon.length - 1).fill(icon)];

  await getMongoRepository(Day).save(day);

  return res.json({
    success: true,
    day,
  });
});

export { router as dayRouter };
