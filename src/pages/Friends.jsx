import React from 'react'
import FriendCard from '../components/FriendCard'

function Friends() {
  return (
    <section className="bg-black py-4 px-10 min-h-screen w-full flex flex-col items-start gap-6">
    {/* page title */}
    <h2 className="font-sans font-semibold text-2xl text-white/90">
      Your Friends
    </h2>
    <FriendCard/>



  </section>
  )
}

export default Friends