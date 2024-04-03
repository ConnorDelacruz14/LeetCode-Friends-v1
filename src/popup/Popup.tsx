import { useState, useEffect, ReactElement } from 'react'
import ItemBox from '../components/ItemBox/ItemBox'
import Header from '../components/Header/Header'
import SmallBox from '../components/SmallBox/SmallBox'
import Award from '../components/Award/Award'

import './Popup.css'

const icons = {
  sun: <svg className="shown light-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18"
                        height="18" stroke="currentColor" fill="none" role="none">
                        <g role="none">
                            <g role="none">
                                <path
                                    d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
                                    stroke-width="1.5" role="none"></path>
                                <path
                                    d="M12.4839 6.69728C12.9641 7.58846 12.7542 8.63364 12.0152 9.03176C11.2763 9.42988 10.288 9.03019 9.80787 8.13902C9.32775 7.24785 9.5376 6.20267 10.2766 5.80454C11.0156 5.40642 12.0038 5.80611 12.4839 6.69728Z"
                                    stroke-width="1.5" role="none"></path>
    </g></g></svg>, 
  moon: <svg className="not-shown dark-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"
      width="18" height="18" stroke="currentColor" fill="none" role="none">
      <g role="none">
          <path
              d="M1.5 8.99955C1.5 13.1417 4.85786 16.4995 9 16.4995C12.5757 16.4995 15.567 13.9972 16.3182 10.6482C16.3182 10.6482 12.4248 10.939 9.59473 8.10893C6.7647 5.2789 7.51531 1.64648 7.51531 1.64648C4.08432 2.33546 1.5 5.3657 1.5 8.99955Z"
              stroke-width="1.5" role="none"></path>
      </g>
    </svg>,
  profile: <img className="avatar shown" src="https://assets.leetcode.com/users/default_avatar.jpg" alt="avatar"></img>,
  empty: <span></span>,
  nostreak: <svg className="streak zero" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="25"
  height="25" fill="currentColor">
  <path fill-rule="evenodd"
      d="M7.19 1.564a.75.75 0 01.729.069c2.137 1.475 3.373 3.558 3.981 5.002l.641-.663a.75.75 0 011.17.115c1.633 2.536 1.659 5.537.391 7.725-1.322 2.282-3.915 2.688-5.119 2.688-1.177 0-3.679-.203-5.12-2.688-.623-1.076-.951-2.29-.842-3.528.109-1.245.656-2.463 1.697-3.54.646-.67 1.129-1.592 1.468-2.492.337-.895.51-1.709.564-2.105a.75.75 0 01.44-.583zm.784 2.023c-.1.368-.226.773-.385 1.193-.375.997-.947 2.13-1.792 3.005-.821.851-1.205 1.754-1.282 2.63-.078.884.153 1.792.647 2.645C6.176 14.81 7.925 15 8.983 15c1.03 0 2.909-.366 3.822-1.94.839-1.449.97-3.446.11-5.315l-.785.812a.75.75 0 01-1.268-.345c-.192-.794-1.04-2.948-2.888-4.625z"
      clip-rule="evenodd">
  </path>
    </svg>,
  streak: <img className="streak not-shown" src="img/streak.png" alt="streak"></img>,
  search: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
  fill="currentColor">
  <path fill-rule="evenodd"
      d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"
      clip-rule="evenodd"></path>
    </svg>
}

let user = {
  token: "",
  session: "",
  username: "", 
  avatar: "",
  streak: "0",
  friends: [{
    username: "",
    avatar: "",
    streak: "0",
  }],
  sessionCode: "",
  statistics: [],
  currentSession: [],
}

// Assume userprofile is a stateful object in your React component

const fetchData = async (username: string, leetcode_session: string, query: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Cookie", `LEETCODE_SESSION=${leetcode_session}`);

  const graphql = JSON.stringify({
      query: query,
      variables: { username: username },
  });

  const response = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: myHeaders,
    body: graphql,
    redirect: "follow",
  });

  const result = await response.json();
  return result.data.matchedUser;
};


export const Popup = () => {
  const [profile, setProfile] = useState(user);
  const [theme, setTheme] = useState(0);

  // Get initial cookie and user info
  useEffect(() => {
    chrome.runtime.sendMessage({ message: "I need the user info" }, (response) => {
      // Construct a new user object with the received information
      const updatedUser = {
        ...user,
        token: response.csrf_token,
        session: response.leetcode_session,
        username: response.user_name,
      };
      setProfile(updatedUser);
    });
  }, []);

  return (
    <main>
      <Header></Header>
      <div className='card-columns-container'>
        <div className="card-column column-1">
          <ItemBox title="Current Session" iterable={profile.currentSession}></ItemBox>
          <ItemBox title="Statistics"iterable={profile.statistics}></ItemBox>
          <SmallBox title="Appearance" icons={[icons.sun, icons.moon]} appearance={true} height="appearance"></SmallBox>
          <SmallBox title="Level 0"></SmallBox>
        </div>
        <div className="card-column column-2">
          <SmallBox title={profile.username} height="h-20" icons={[icons.profile, icons.empty, icons.nostreak, icons.streak]} value={profile.streak}></SmallBox>
          <SmallBox title="Session Code:" height="h-20"></SmallBox>
          <ItemBox title="Friends" iterable={profile.friends}></ItemBox>
          <SmallBox title="" input="add-friend" height="h-20" icons={[icons.search]}></SmallBox>
          <SmallBox title="Join Session:" input="join-session" height="h-20"></SmallBox>
          <div className='awards-container'>
              <Award active="not-active" src="img/award.png" alt="award" desc="Honorable - Place 1st in 3 seperate sessions"></Award>
              <Award active="not-active" src="img/competition.png" alt="competition" desc="Competitor - Get top 3 in a single session"></Award>
              <Award active="not-active" src="img/fire.png" alt="fire" desc="On Fire - Solve problems for 14 consecutive days "></Award>
              <Award active="not-active" src="img/friends.png" alt="friends" desc="Friendly - Add 3 Friends"></Award>
              <Award active="not-active" src="img/gladiator.png" alt="gladiator" desc="Weekend Warrior - Solve a problem on the weekend"></Award>
              <Award active="not-active" src="img/level-up.png" alt="level up" desc="Experienced - Get to level 100"></Award>
              <Award active="not-active" src="img/thumbs-up.png" alt="thumbs up" desc="Likeable - Someone liked your profile"></Award>
              <Award active="not-active" src="img/mountain.png" alt="mountain" desc="First Steps - Solve a LeetCode problem"></Award>
              <Award active="not-active" src="img/rewards.png" alt="reward" desc="Champion - Place first in a single session"></Award>
              <Award active="not-active" src="img/wizard.png" alt="wizard" desc="Wizard - Solve 500 Problems"></Award>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Popup
