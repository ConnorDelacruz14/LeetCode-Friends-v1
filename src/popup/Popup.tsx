import { useState, useEffect, ReactElement } from 'react'
import ItemBox from '../components/ItemBox/ItemBox'
import Header from '../components/Header/Header'
import Award from '../components/Award/Award'

import './Popup.css'

const icons = {
  sun: <svg className="light-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18"
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
  moon: <svg className="dark-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"
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
  streak: <img className="streak" src="img/streak.png" alt="streak"></img>,
  search: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
  fill="currentColor">
  <path fill-rule="evenodd"
      d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"
      clip-rule="evenodd"></path>
    </svg>,
  open: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" role="none">
  <path fill-rule="evenodd"
      d="M9.293 7.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 12 9.293 7.707z"
      clip-rule="evenodd" role="none"></path>
</svg>
}

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

export const Popup = () => {
  const [profile, setProfile] = useState(user);
  const [theme, setTheme] = useState(0);
  const [loading, setLoading] = useState(true);
  const [friendSearch, setFriendSearch] = useState("");
  const [sessionCode, setSessionCode] = useState(user.sessionCode)

  useEffect(() => {
    chrome.runtime.sendMessage({ message: "Retrieving user" }, (response) => {
      console.log(response);
      setProfile(response);
      setLoading(false);
    });
  }, []);

  const toggleTheme = (desiredTheme: number) => {
    if (theme !== desiredTheme) {
      setTheme(desiredTheme);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <Header></Header>
      <div className='card-columns-container'>
        <div className="card-column column-1">
          <ItemBox title="Current Session" iterable={profile.currentSession}></ItemBox>
          <ItemBox title="Statistics" iterable={profile.statistics.languageStats}></ItemBox>
          <div className="small-card">
            <div className="level-container">
              <span className="level">Level {profile.level}</span>
              <span className="xp">0/100<span className="xp">xp</span></span>
            </div>
            <meter value={profile.experience} min="0" low={10} optimum={50} high={90} max="100"></meter>
          </div>
          <div className="small-card appearance">
            <div className='align-center'>
              {theme ? icons.moon : icons.sun}
              <div>Appearance</div>
              <div className="appearance-options">
                    <div className="option light" onClick={() => toggleTheme(0)}>
                        Light
                        {!theme ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                            fill="currentColor" className="mode">
                            <path fill-rule="evenodd"
                                d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
                                clip-rule="evenodd"></path>
                        </svg> : ""}
                    </div>
                    <div className="option dark" onClick={() => toggleTheme(1)}>
                        Dark
                        {theme ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em"
                            fill="currentColor" className="mode">
                            <path fill-rule="evenodd"
                                d="M9.688 15.898l-3.98-3.98a1 1 0 00-1.415 1.414L8.98 18.02a1 1 0 001.415 0L20.707 7.707a1 1 0 00-1.414-1.414l-9.605 9.605z"
                                clip-rule="evenodd"></path>
                        </svg> : ""}
                    </div>
              </div>
            </div>
            {icons.open}
          </div>
        </div>
        <div className="card-column column-2">
           <div className="small-card h-20">
            <div className="align-center">
              {profile.avatar ? <img className='avatar' src={profile.avatar} alt={profile.username}></img> : icons.profile}
              {profile.username}
            </div>
            <div className="align-center">
              {profile.streak > 0 ? icons.streak : icons.nostreak}
              {profile.streak}
            </div>
          </div>
          <div className="small-card h-20">
            Session Code:
          </div>
          <ItemBox title="Friends" iterable={profile.friends}></ItemBox>
          <div className="small-card h-20">
            {icons.search}
            <input type="text" id="add-friend-input" placeholder="Add friend by username"></input>
          </div>
          <div className="small-card h-20">
            <div>Join Session:</div>
            <input type="text" id="join-session-input" placeholder="ex. H3A87G" maxLength={6}></input>
          </div>
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
