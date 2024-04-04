const getCookieValue = (url: string, name: string) => {
  return new Promise((resolve, reject) => {
      chrome.cookies.get({ url, name }, function (cookie) {
          if (cookie) resolve(cookie.value);
          else reject(new Error(`Cookie ${name} not found`));
      });
  });
}

const queries = [
    {
        query: "query ($username: String!) {\n  matchedUser(username: $username) {\n    contestBadge {\n      name\n      expired\n      hoverText\n      icon\n    }\n    username\n         profile {\n      ranking\n      userAvatar\n      realName\n      aboutMe\n      company\n     }\n  }\n}",
        resultKey: "userProfile",
    },
    {
        query: "query userProfileCalendar($username: String!, $year: Int) {\n  matchedUser(username: $username) {\n    userCalendar(year: $year) {\n      activeYears\n      streak\n      totalActiveDays\n      dccBadges {\n        timestamp\n        badge {\n          name\n          icon\n        }\n      }\n         }\n  }\n}",
        resultKey: "userCalendar",
    },
    {
        query: "query languageStats($username: String!) {\n  matchedUser(username: $username) {\n    languageProblemCount {\n      languageName\n      problemsSolved\n    }\n  }\n}",
        resultKey: "languageStats",
    },
];

let user = {
    token: "",
    session: "",
    username: "", 
    avatar: "",
    streak: 0,
    friends: [],
    friend_requests: [],
    incoming_friend_requests: [],
    sessionCode: "",
    statistics: {
        languageStats: [],
        num_top_three: 0,
        num_first_place: 0,
    },
    currentSession: [],
    ranking: 0,
    level: 0,
    experience: 0,
    awards: []
}

const main = async () => {
  let leetcode_session:any = "";
  let csrf_token:any = "";
  let user_name:any = "";

  try {
      leetcode_session = await getCookieValue(
          "https://leetcode.com",
          "LEETCODE_SESSION"
      );
      csrf_token = await getCookieValue("https://leetcode.com", "csrftoken");
      user_name = await getCookieValue(
          "https://leetcode.com",
          "87b5a3c3f1a55520_gr_cs1"
      );
  } catch (error: any) {
      console.error("Error retrieving cookie: ", error.message);
  }

  user.session = leetcode_session;
  user.token = csrf_token;
  user.username = user_name;

  return fetchAndProcess(queries);
}

const fetchData = async (username: string, leetcode_session: string, query: string, resultKey: any) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `LEETCODE_SESSION=${leetcode_session}`);

    const graphql = JSON.stringify({
        query: `${query}`,
        variables: { username: `${username}` },
    });

    return fetch("https://leetcode.com/graphql/", {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        redirect: "follow",
    })
        .then((response) => response.text())
        .then((result) => {
            // LeetCode API first
            const queryResults = JSON.parse(result).data.matchedUser;
            if (resultKey === "userProfile") {
                user.avatar = queryResults.profile.userAvatar;
                user.ranking = queryResults.profile.ranking;
            } else if (resultKey === "userCalendar") {
                user.streak = queryResults.userCalendar.streak;
            } else if (resultKey === "languageStats") {
                user.statistics.languageStats = queryResults.languageProblemCount;
            }
        })
        .catch((error) => console.error(error));
};

const fetchDBData = (username: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Request-Headers", "*");
    myHeaders.append("Authorization", "Bearer <ACCESS_TOKEN>");
    myHeaders.append("username", username);

    const raw = JSON.stringify({
        "username": username
    });

    return fetch("https://us-west-2.aws.data.mongodb-api.com/app/leetcodefriends-puhne/endpoint/profile", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    })
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => console.error(error));
}

const fetchAndProcess = async (queries: Array<any>) => {
    await Promise.all(queries.map((config) =>
        fetchData(
            user.username,
            user.session,
            config.query,
            config.resultKey
        )
    ));
    try {
        const result = await fetchDBData(user.username);
        user.friends = result.friends;
        user.experience = result.experience;
        user.level = result.level;
        user.friend_requests = result.friend_requests;
        user.incoming_friend_requests = result.incoming_friend_requests;
        user.awards = result.awards;
        user.statistics.num_first_place = result.num_first_place;
        user.statistics.num_top_three = result.num_top_three;
    } catch (error) {
        console.error(error);
    }
    return user;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  main().then((message) => {
    sendResponse(message);
  });

  return true;
});