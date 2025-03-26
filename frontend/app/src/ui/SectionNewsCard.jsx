import React from 'react'
import clsx from 'clsx'
import styles from '@/styles/SectionNewsCard.module.css'

function SectionNewsCard({ imgLink, title, date, description }) {
  return (
    <div 
        className={`${clsx(styles.section_news_card)} h-100 d-flex flex-column position-relative border border-black`} 
        style={{'--bs-border-opacity': '0.2'}}
    >
        <img className='flex-shrink-1 flex-grow-1' src={imgLink} alt="img" width={'100%'} />
        <div className='p-4 bg-white ' style={{minHeight: '260px'}}>
            <p className='fs-5 fw-bold text-vng-text-bold'>{title}</p>
            <p className='fs-6 text-vng-text my-2'>{date}</p>
            <p className='fs-6 text-vng-text'>{description}</p>
        </div>
    </div>
  )
}

export default SectionNewsCard