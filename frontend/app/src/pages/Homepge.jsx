import React, { useRef, useState } from 'react';
import { Link } from 'react-router';
import { IoIosArrowRoundForward, IoIosArrowRoundDown, IoIosTrendingUp } from "react-icons/io";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";

import '@/styles/Homepage.css';
import SectionCard from '@/ui/SectionCard';
import SectionNewsCard from '../ui/SectionNewsCard';

const newsList = [
  'Tất cả',
  'Thông cáo báo chí',
  'Tin tức doanh nghiệp',
  'Báo cáo'
]

function Homepge() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  return (
    <div className="">
      <section ref={ref} id='section1' className='homepage_section1 position-relative'>
        <img src="https://corp.vcdn.vn/upload/vng/source/Banner/BANNER-01.png" alt="banner" width={'100%'} />
        <div 
          className='position-absolute top-50 start-50 start-sm-50 start-md-30 w-100 h-100 w-sm-auto h-sm-auto translate-middle rounded-sm-4 rounded-0'
          style={{backgroundColor: '#ffffff80'}}
        >
          <Link to={'/about-us'} >
            <span className='text-uppercase fs-6 fs-sm-2 fw-bold text-vng-text-bold'>vng corporation</span>
          </Link>
          <p className='fs-6 fs-sm-4 text-vng-text-bold'>Technology champion of Vietnam</p>
          <Link 
            to={'/about-us'}
            target='_blank'
            className='position-absolute top-50 end-0 translate-middle rounded-circle p-1 text-white bg-vng-primary'
          >
              <IoIosArrowRoundForward size={30}/>
          </Link>
        </div>
        <a 
          href='#scroll-position' 
          className="d-none d-xl-flex scroll-btn text-white bg-vng-text-bold"
          onClick={e => {
            e.preventDefault();
            const targetPosition = ref.current.offsetTop + ref.current.offsetHeight - 81;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }}
        >
          <IoIosArrowRoundDown size={40}/>
        </a>


      </section>

      <section id='section2' className='homepage_section2 pt-5 position-relative'>
        <div className='position-absolute top-0 start-0 w-100 h-100 z-n1'>
          <img src="https://corp.vcdn.vn/products/vng/skin-2021/dist/main/images/bg/f2.jpg" alt="background" width={'100%'} height={'100%'} />
        </div>
        <div className="container px-0">
          <p className='fs-3 fw-bold text-vng-secondary'>Sứ mệnh</p>
          <p className='fs-2 fw-bold text-vng-text-bold mw-100 mw-xl-60'>Kiến tạo công nghệ và phát triển con người. Từ Việt Nam vươn tầm thế giới.</p>
          <div className="row py-5">
            <div className="col col-12 col-md-4 my-3">
              <SectionCard 
                title='Sản phẩm'
                icon={<HiOutlineDocumentSearch size={80} className='text-vng-secondary'/>}
                description='Tìm hiểu các sản phẩm của VNG'
              />
            </div>
            <div className="col col-12 col-md-4 my-3">
              <SectionCard 
                title='Con người'
                icon={<FaPeopleGroup size={80} className='text-vng-secondary'/>}
                description='Làm quen với con người và văn hóa tại VNG'
              />
            </div>
            <div className="col col-12 col-md-4 my-3">
              <SectionCard 
                title='Trách nhiệm cộng đồng'
                icon={<IoIosTrendingUp size={80} className='text-vng-secondary'/>}
                description='Khám phá cảm hứng của VNG trong đóng góp xã hội'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='homepage_section3 pt-5'>
        <div className="container px-0">
          <p className='fs-3 fw-bold text-vng-secondary mb-4'>Tin tức</p>
          <ul className='d-flex list-unstyled gap-2 mb-4 flex-column flex-md-row'>
            {
              newsList.map((item, index) => (
                <li key={index} className='fs-6 fw-bold text-vng-text-bold'>
                  <div 
                    href='#' 
                    className={`${activeIndex === index ? 'active' : ''} homepage_section3_btn text-decoration-none text-vng-text-bold py-1 px-3 fst-italic border border-vng-news-list rounded-pill text-vng-news-list`}
                    onClick={() => setActiveIndex(index)}
                  >
                    {item}
                  </div>
                </li>
              ))
            }
          </ul>
          <div className="row mb-5">
            <div className="col col-12 col-md-6 col-xl-4 mb-3">
              <SectionNewsCard 
                imgLink={"//corp.vcdn.vn/products/upload/vng/source/News/LG/GE25/1.jpg"}
                title={'Thể thao điện tử lần đầu tiên được vinh danh tại chương trình "Vi ...'}
                date={'09:00 AM | 24/03/2025'}
                description={'Bộ môn Thể thao điện tử lần đầu được vinh danh tại chương trình “Vinh quang Thể thao Việt Nam 2025” nhờ các thành tích n ...'}
              />
            </div>
            <div className="col col-12 col-md-6 col-xl-4 mb-3">
              <SectionNewsCard 
                imgLink={"//corp.vcdn.vn/products/upload/vng/source/News/LG/ZLP2025/CROSS-BORDER_2x1.jpg"}
                title={'Zalopay ra mắt tính năng “Quét QR quốc tế” tại Singapore '}
                date={'05:00 PM | 20/03/2025'}
                description={'Du khách Việt đến Singapore đã có thể sử dụng ứng dụng Zalopay để quét mã QR và thanh toán dễ dàng như người bản địa.  '}
              />
            </div>
            <div className="col col-12 col-md-6 col-xl-4 mb-3">
              <SectionNewsCard 
                imgLink={"//corp.vcdn.vn/products/upload/vng/source/News/LG/VNG2025/Levelup%20launcher.jpg"}
                title={'VNGGames ra mắt Level Up Launcher - nền tảng game PC đột phá  cho ...'}
                date={'11:00 AM | 20/03/2025'}
                description={'VNGGames chính thức ra mắt Level Up Launcher - nền tảng tích hợp các tựa game PC, mang đến trải nghiệm game toàn diện ch ...'}
              />
            </div>
          </div>
          <div className="float-end homepage_section3_btn text-decoration-none text-vng-text-bold py-1 px-3 fst-italic border border-vng-news-list rounded-pill text-vng-news-list">
            Xem thêm
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepge;
