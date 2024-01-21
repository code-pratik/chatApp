import { User } from "../Models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.status(200).json({
      status: "success",
      message: "All users sent successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const searchData = search.trim()
    const users = await User.find({
      $or: [
        { firstName: { $regex: searchData, $options: "i" } },
        { lastName: { $regex: searchData, $options: "i" } }
      ]
    });

    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body.formData);
    const user = await User.findOne(
      { _id: ObjectId(id) },
      { profileimg: req.body.formData },
      { new: true }
    );
    console.log(user);
    req.status(201).json({
      status: "success",
      message: "Image Updated successfully",
      data: {
        data: {
          user,
        },
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

