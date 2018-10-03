const friends = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        const bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
        };

        const userData = req.body;
        const userScores = userData.scores;

        const totalDifference = "";

        for (const i = 0; i < friends.length; i++) {
            const currentFriend = friends[i];
            totalDifference = 0;

            console.log(currentFriend.name);

            for (const j = 0; j < currentFriend.scores.length; j++) {
                const currentFriendScore = currentFriend.scores[j];
                const currentUserScore = userScores[j];

                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }

        friends.push(userData);

        res.json(bestMatch);
    });
};