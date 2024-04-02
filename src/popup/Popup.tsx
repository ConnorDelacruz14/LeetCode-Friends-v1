import { useState, useEffect } from 'react'
import ItemBox from '../components/ItemBox/ItemBox'
import Header from '../components/Header/Header'

import './Popup.css'

export const Popup = () => {


  return (
    <main>
      <Header></Header>
      <div>
        <div className="column-1">
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
        </div>
        <div className="column-2">
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
          <ItemBox></ItemBox>
        </div>
      </div>
    </main>
  )
}

export default Popup
