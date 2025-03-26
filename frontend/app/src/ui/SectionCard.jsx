import React from 'react'
import clsx from 'clsx'

import styles from '@/styles/SectionCard.module.css'

function SectionCard({ title, icon, description }) {
  return (
    <div className={`${clsx(styles.section_card)} h-100 w-100 py-4 px-3 px-xl-5 border border-vng-secondary rounded-4`}>
      <div className={`d-none d-md-flex h-100 flex-column align-items-center justify-content-between `}>
        <p className='fs-3 fw-bold text-vng-secondary text-center'>{title}</p>
        {icon}
        <p className='text-vng-text w-70 text-center'>{description}</p>
      </div>
      <div className={`d-flex d-md-none h-100 align-items-center justify-content-start gap-3`}>
        {icon}
        <div className='d-flex flex-column'>
          <p className='fs-3 fw-bold text-vng-secondary'>{title}</p>
          <p className='text-vng-text'>{description}</p>
        </div>
      </div>
    </div>
  )
}

export default SectionCard