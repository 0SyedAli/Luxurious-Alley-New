"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Signin = () => {
  return (
    <div className="content align-self-center mw-500">
      <div className='auth_container'>
        <div className='auth_head'>
          <h2>Create a business profile</h2>
        </div>
        <form action="#!" autoComplete="off">
          <div className="calender_container text-start">
            <label htmlFor="email" className="pb-1">
              Add Category
            </label>
            <div className="d-flex my-3 justify-content-between" style={{ gap: 10 }}>
              <div className="calender_item">
                <input type="radio" defaultChecked id="radio101" name="day1" />
                <label htmlFor="radio101">Mon</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio102" name="day1" />
                <label htmlFor="radio102">Tue</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio103" name="day1" />
                <label htmlFor="radio103">Wed</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio104" name="day1" />
                <label htmlFor="radio104">Thu</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio105" name="day1" />
                <label htmlFor="radio105">Fri</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio106" name="day1" />
                <label htmlFor="radio106">Sat</label>
                <div className="calender_spot"></div>
              </div>
              <div className="calender_item">
                <input type="radio" id="radio107" name="day1" />
                <label htmlFor="radio107">Sun</label>
                <div className="calender_spot"></div>
              </div>
            </div>
            <label htmlFor="email" className="mt-2 ">
              Time Range
            </label>
            <div className="cs-form time_picker d-flex gap-3 align-items-center py-3">
              <input
                type="time"
                id="time"
                placeholder="25min to 30min"
                className="classInput"
              />
              <span>To</span>
              <input
                type="time"
                id="time"
                placeholder="25min to 30min"
                className="classInput"
              />
            </div>
            <label htmlFor="email" className="mt-2 ">
              Upload Document
            </label>
            <div className="cp_upload_img mt-3">
              <Image src="/images/cp_upload_cover.svg" style={{width:"100%", height:"auto"}} width={400} height={150} alt='' />
              <input type="file" name="" id="" />
            </div>
            <label htmlFor="email" className="mt-4 ">
              Upload the Business Cover
            </label>
            <div className="cp_upload_img mt-3">
              <Image src="/images/cp_upload_cover.svg" style={{width:"100%", height:"auto"}} width={400} height={150} alt='' />
              <input type="file" name="" id="" />
            </div>
          </div>
          <div className="text-start">
            <Link href="/dashboard" className="theme-btn2">
              Next
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin