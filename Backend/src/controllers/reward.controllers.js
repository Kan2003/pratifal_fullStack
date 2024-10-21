import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Reward } from "../models/rewards.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const createReward = asyncHandler(async (req, res) => {
  try {
    const { title, description, couponCode, expiryDate } = req.body;

    if (!(title && description && couponCode && expiryDate)) {
      throw new ApiError(400, "All fields are required");
    }

    const date = new Date(expiryDate);
    const currentDate = new Date();

    // Set both dates to midnight to compare only the date part
    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Check if the expiry date is in the past
    if (date < currentDate) {
      return res.status(407).json(new ApiResponse(409, "expiry date exceeded"));
    }

    const existed = await Reward.findOne({
      couponCode,
    });

    if (existed) {
      return res.status(409).json(new ApiResponse(409, "coupon alerday exist"));
    }

    const reward = await Reward.create(
      {
        title,
        description,
        couponCode,
        expiryDate: new Date(expiryDate),
        owner: new mongoose.Types.ObjectId(req.user._id),
      }
    );

    await User.findOneAndUpdate(
      req.user._id,
      {
        $push: { rewards: reward._id },
      },
      { new: true }
    );

    return res
      .status(201)
      .json(new ApiResponse(201, "reward created successfully" , reward ));
  } catch (error) {
    throw new ApiError(500, "error on creating reward", error);
  }
});

const editReward = asyncHandler(async (req, res) => {
  try {
    const rewardId = req.params.id;

    const { title, description, couponCode, expiryDate } = req.body;

    console.log(title, description, couponCode, expiryDate);

    if (!rewardId) {
      throw new ApiError(400, "Reward id is required");
    }

    const reward = await Reward.findById({
      _id: new mongoose.Types.ObjectId(rewardId),
    });

    const date = new Date(expiryDate);
    const currentDate = new Date();

    // Set both dates to midnight to compare only the date part
    date.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Check if the expiry date is in the past
    if (date < currentDate) {
      return res.status(407).json(new ApiResponse(409, "expiry date exceeded"));
    }

  


    if (!reward) {
      throw new ApiError(404, "Reward not found");
    }

    const rewardUpdate = await Reward.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(rewardId),
      },
      {
        title,
        description,
        couponCode,
        expiryDate: new Date(expiryDate),
      },
      { new: true }
    );

    console.log("updatedreward", rewardUpdate);

    if (!rewardUpdate) {
      throw new ApiError(404, "editing rewar failed");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "reward updated successfully", rewardUpdate));
  } catch (error) {
    throw new ApiError(400, "unable to edit reward", error);
  }
});

const toggleRedeem = asyncHandler(async (req, res) => {
  // logic for redeeming reward
  const rewardId = req.params.id;

  const reward = await Reward.findById({
    _id: new mongoose.Types.ObjectId(rewardId),
  });

  const updatedreward = await Reward.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(rewardId),
    },
    {
      redeemed: !reward.redeemed,
    },
    { new: true }
  );
  if (!reward) {
    throw new ApiError(404, "Reward not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "reward status updated successfully", updatedreward)
    );
});

const toggleStarred = asyncHandler(async (req, res) => {
  const rewardId = req.params.id;

  const reward = await Reward.findById({
    _id: new mongoose.Types.ObjectId(rewardId),
  });

  if (!reward) {
    throw new ApiError(404, "Reward not found");
  }

  const updatedReward = await Reward.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(rewardId),
    },
    {
      starred: !reward.starred,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "reward status updated successfully", updatedReward)
    );
});

const totalReward = asyncHandler(async (req, res) => {
  try {
    const totalRewards = await Reward.countDocuments({
      owner: req.user._id,
    });

    console.log("total rewards", totalRewards);
    return res
      .status(200)
      .json(new ApiResponse(200, "Total rewards", totalRewards));
  } catch (error) {
    throw new ApiError(500, "error on fetching total rewards", error);
  }
});

const deleteReward = asyncHandler(async (req, res) => {
  const rewardId = req.params.id;

  const reward = await Reward.findById({
    _id: new mongoose.Types.ObjectId(rewardId),
  });

  if (!reward) {
    throw new ApiError(404, "Reward not found");
  }

  // delete reward from database
  await Reward.findByIdAndDelete({
    _id: new mongoose.Types.ObjectId(rewardId),
  });

  // remove reward id from user's rewards array
  await User.findOneAndUpdate(
    req.user._id,
    {
      $pull: { rewards: reward._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "reward deleted successfully"));
});

const getAllRewards = asyncHandler(async (req, res) => {
  const allrewards = await Reward.find({
    owner: new mongoose.Types.ObjectId(req.user._id),
  }).select("-owner");
  // .sort({ starred: -1 });

  if (!allrewards) {
    return res
      .status(200)
      .json(new ApiResponse(200, "there is no rewards available"));
  }

  return res.status(200).json(new ApiResponse(200, "all rewards", allrewards));
});

const redeemedRewards = asyncHandler(async (req, res) => {
  const reward = await Reward.find({
    owner: new mongoose.Types.ObjectId(req.user._id),
    redeemed: true,
  }).select("-owner");

  return res
    .status(200)
    .json(new ApiResponse(200, "redeened rewards fetch successfully", reward));
});

const expiredRewards = asyncHandler(async (req, res) => {
  const expired = await Reward.find({
    owner: new mongoose.Types.ObjectId(req.user._id),
    expiryDate: { $lt: new Date() },
  }).select("-owner");

  return res
    .status(200)
    .json(new ApiResponse(200, "expired rewards fetch successfully", expired));
});

export {
  createReward,
  editReward,
  toggleRedeem,
  totalReward,
  deleteReward,
  getAllRewards,
  redeemedRewards,
  expiredRewards,
  toggleStarred,
};
