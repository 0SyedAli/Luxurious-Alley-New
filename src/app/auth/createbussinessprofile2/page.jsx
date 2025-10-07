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
              <textarea placeholder='Business Details' rows={6}></textarea>
            </div>
            <div className="col-12">
              <input
                type="text"
                name="fake_user"
                autoComplete="new-username"
                placeholder="Area of Service"
                readOnly
                onFocus={(e) => e.target.removeAttribute("readOnly")}
              />
            </div>
            <div className="col-12">
              <input
                type="password"
                name="fake_pass"
                autoComplete="new-password"
                placeholder="Add Service"
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