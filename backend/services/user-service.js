const BaseService = require('./base-service');
const { User } = require('../models');

class UserService extends BaseService {

    async follow(followedId, followingId) {
        const followedUser = await this.findById(followedId);
        followedUser.followers.push(followingId)
        await followedUser.save();

        const followingUser = await this.findById(followingId);
        followingUser.followings.push(followedId)
        await followingUser.save();

        return followingUser;
    }

    async unFollow(followedId, followingId) {
        const followedUser = await this.findById(followedId);
        followedUser.followers.pull(followingId)
        await followedUser.save();

        const followingUser = await this.findById(followingId);
        followingUser.followings.pull(followedId)
        await followingUser.save();

        return followingUser;
    }

}

module.exports = new UserService(User);