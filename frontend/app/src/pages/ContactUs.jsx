import React from 'react'

function ContactUs() {
  return (
    <div className='container py-5'>
      <p className='mb-5'>Chúng tôi mong muốn lắng nghe ý kiến của quý khách. Vui lòng gửi mọi yêu cầu, thắc mắc theo thông tin bên dưới, chúng tôi sẽ liên lạc với bạn sớm nhất có thể</p>
      <form action="/" className='form w-100' method='POST'>

        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Họ và tên <span className='text-danger'>*</span></label>
          <input name='fullName' required type="text" className="form-control" id="fullName" aria-describedby="fullName" placeholder='Nhập họ và tên'/>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
          <input name='email' required type="email" className="form-control" id="email" aria-describedby="email" placeholder='Nhập địa chỉ email'/>
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNum" className="form-label">Số điện thoại <span className='text-danger'>*</span></label>
          <input name='phoneNum' required type="tel" className="form-control" id="phoneNum" aria-describedby="phoneNum" placeholder='Nhập số điện thoại'/>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Nội dung <span className='text-danger'>*</span></label>
          <textarea name='content' required rows={10} type="text" className="form-control" id="content" aria-describedby="content" placeholder='Nội dung liên hệ'/>
        </div>

        <button type='submit' className='text-uppercase btn btn-vng-primary text-white d-block mx-auto'>gửi tin nhắn</button>

      </form>
    </div>
  )
}

export default ContactUs