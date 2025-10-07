"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Signin = () => {
  return (
    <div className="content align-self-center mw-800">
      <div className='auth_container'>
        <div className='auth_head'>
          <h2>Create a business profile</h2>
        </div>
        <form action="#!" autoComplete="off">
          <div className="row gy-4">
            <div className="col-12">
              <div className="cp_upload_img">
                <Image src="/images/cp_upload_img.png" width={110} height={110} alt='' />
                <input type="file" name="" id="" />
                <label>Add profile picture</label>
              </div>
            </div>
            <div className="col-6">
              <input
                type="text"
                name="fake_user"
                autoComplete="new-username"
                placeholder="Business Name"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="Owner Name"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="Country / Region *"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="PIN Code *"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="Street address "
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="State *"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-6">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="Phone"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
           
            <div className="text-start">
              <Link href="/dashboard" className="theme-btn2">
                Next
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin