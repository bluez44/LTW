import React, { useRef, useState, useEffect } from 'react';
import { LuChevronDown } from 'react-icons/lu';

import '@/styles/Animation.css';
import { Link } from 'react-router';

function FooterMenu({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const ulRef = useRef(null);
  const n = items.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center"
        onClick={() => {
          if (isMobile) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <p className="position-relative text-vng-text fw-bold fs-5">{title}</p>
        <LuChevronDown
          className={`text-vng-third d-md-none`}
          style={{
            transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} `,
            transformOrigin: 'center',
            transition: 'transform 0.5s ease-in-out',
          }}
        />
      </div>
      <ul
        ref={ulRef}
        className="list-unstyled ps-3 ps-md-0"
        style={{
          maxHeight: `${isMobile ? (isOpen ? `${ulRef.current.scrollHeight}px` : '0') : '1000px'}`,
          overflow: 'hidden',
          transition: `${isMobile && 'max-height 0.3s ease-in-out'}`,
        }}
      >
        {items &&
          items.map((item, index) => (
            <li key={index}>
              <Link
                className="fs-6 py-2 d-inline-block w-100 text-vng-text link-vng-text link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to={item.link}
                rel="noopener noreferrer"
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

export default FooterMenu;
