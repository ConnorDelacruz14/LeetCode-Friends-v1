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
          <SmallBox title="Appearance"></SmallBox>
          <SmallBox title="Sign Out"></SmallBox>
        </div>
        <div className="card-column column-2">
          <SmallBox title="Username" height="h-20"></SmallBox>
          <SmallBox title="Session Code:" height="h-20"></SmallBox>
          <ItemBox title="Friends"></ItemBox>
          <SmallBox title="" height="h-20"></SmallBox>
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
