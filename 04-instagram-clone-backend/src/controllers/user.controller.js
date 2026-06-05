const followModel = require("../models/followModel")


async function followUserController(req, res){
 const followerUsername = req.user.username
 const followeeUsername = req.params.username

 const followRecord = await followModel.create({
  Follower : followerUsername,
  Followee : followeeUsername
 })

 if(followerUsername === followeeUsername){
   return res.status(400).json({
      message : "You cannot folllow yourself"
   })
 }
 const isAlreadyFollowing = await followModel.findOne({
 Follower : followerUsername,
 Followee : followeeUsername
 })

 if(isAlreadyFollowing){
   return res.status(409).json({
      message : `You're already following ${followeeUsername}`,
      follow : isAlreadyFollowing
   })
 }

 const isFolloweeExist = await followModel.findOne({
   Followee : followeeUsername
 })

 if(!isFolloweeExist){
 return res.status(404).json({
   message : "You're trying to follow the user doest not exist"
 })
 }
 res.status(201).json({
    message : `You are now following  ${followeeUsername}`,
    follow : followRecord
 })

 console.log(followRecord);
} 

async function unfollowUserController(req, res){
   const followerUsername = req.user.username
   const followeeUsername = req.params.username

   const isUserFollowing = await followModel.findOne({
      Follower : followerUsername,
      Followee : followeeUsername
   })

   if(!isUserFollowing){
      return res.status(200).json({
         message : `You're not following ${followeeUsername}`
      })
   }

   await followModel.findByIdAndDelete( isUserFollowing._id)
   return res.status(200).json({
      message : `You unfollowed the ${followeeUsername}`
   })
}


module.exports = {
  followUserController, unfollowUserController }