const getCookieValue = (url: string, name: string) => {
  return new Promise((resolve, reject) => {
      chrome.cookies.get({ url, name }, function (cookie) {
          if (cookie) resolve(cookie.value);
          else reject(new Error(`Cookie ${name} not found`));
      });
  });
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

  return {
      leetcode_session: leetcode_session,
      csrf_token: csrf_token,
      user_name: user_name,
  };
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  main().then((message) => {
      sendResponse(message);
  });

  return true;
});