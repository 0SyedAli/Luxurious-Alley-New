"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Signin = () => {
  return (
    <div className="content align-self-center mw-500">
      <div className='auth_container'>
        <div className="logo d-block d-lg-none">
          <Image src={"/images/logo.png"} className="object-fit-contain" alt="Profile" width={200} height={100} />
        </div>
        <div className='auth_head'>
          <h2>Create a business profile</h2>
        </div>
        <form action="#!" autoComplete="off">
          <div className="calender_container text-start">
            <label htmlFor="email" className="mt-2 ">
              Upload Document (LEGAL Docs/Certification/Business License)
            </label>
            <div className="cp_upload_img mt-3">
              <Image src="/images/cp_upload_cover.svg" style={{ width: "100%", height: "auto" }} width={400} height={150} alt='' />
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