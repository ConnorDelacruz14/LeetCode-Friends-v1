import { useState, useEffect } from 'react'
import ItemBox from '../components/ItemBox/ItemBox'
import Header from '../components/Header/Header'
import SmallBox from '../components/SmallBox/SmallBox'

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
          <SmallBox title="Username"></SmallBox>
          <SmallBox title="Session Code:"></SmallBox>
          <ItemBox title="Friends"></ItemBox>
          <SmallBox title=""></SmallBox>
          <SmallBox title="Join Session:"></SmallBox>
        </div>
      </div>
    </main>
  )
}

export default Popup
