import { useState, useEffect } from 'react'
import ItemBox from '../components/ItemBox/ItemBox'
import Header from '../components/Header/Header'
import SmallBox from '../components/SmallBox/SmallBox'
import Award from '../components/Award/Award'

import './Popup.css'

export const Popup = () => {


  return (
    <main>
      <Header></Header>
      <div className='card-columns-container'>
        <div className="card-column column-1">
          <ItemBox title="Current Session"></ItemBox>
          <ItemBox title="Statistics"></ItemBox>
          <SmallBox title="Appearance" icons=
            {[<svg className="shown light-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18"
                        height="18" stroke="currentColor" fill="none" role="none">
                        <g role="none">
                            <g role="none">
                                <path
                                    d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
                                    stroke-width="1.5" role="none"></path>
                                <path
                                    d="M12.4839 6.69728C12.9641 7.58846 12.7542 8.63364 12.0152 9.03176C11.2763 9.42988 10.288 9.03019 9.80787 8.13902C9.32775 7.24785 9.5376 6.20267 10.2766 5.80454C11.0156 5.40642 12.0038 5.80611 12.4839 6.69728Z"
                                    stroke-width="1.5" role="none"></path>
                            </g>
                        </g>
              </svg>, 
            <svg className="not-shown dark-mode-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"
                width="18" height="18" stroke="currentColor" fill="none" role="none">
                <g role="none">
                    <path
                        d="M1.5 8.99955C1.5 13.1417 4.85786 16.4995 9 16.4995C12.5757 16.4995 15.567 13.9972 16.3182 10.6482C16.3182 10.6482 12.4248 10.939 9.59473 8.10893C6.7647 5.2789 7.51531 1.64648 7.51531 1.64648C4.08432 2.33546 1.5 5.3657 1.5 8.99955Z"
                        stroke-width="1.5" role="none"></path>
                </g>
            </svg>]}>
          </SmallBox>
          <SmallBox title="Level 0"></SmallBox>
        </div>
        <div className="card-column column-2">
          <SmallBox title="Username" height="h-20" icons={[<img className="avatar shown" src="https://assets.leetcode.com/users/default_avatar.jpg" alt="avatar"></img>]}></SmallBox>
          <SmallBox title="Session Code:" height="h-20"></SmallBox>
          <ItemBox title="Friends"></ItemBox>
          <SmallBox title="" height="h-20" icons={[
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.527 5.527a7.5 7.5 0 0111.268 9.852l3.581 3.583a1 1 0 01-1.414 1.415l-3.582-3.583A7.501 7.501 0 015.527 5.527zm1.414 1.414a5.5 5.5 0 107.779 7.779A5.5 5.5 0 006.94 6.94z"
                        clip-rule="evenodd"></path>
            </svg>]}></SmallBox>
          <SmallBox title="Join Session:" height="h-20"></SmallBox>
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
