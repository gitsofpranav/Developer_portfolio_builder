"use client"
import { db } from '@/utils';
import { userInfo } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function CreateUsername() {
  const [username, setUsername] = useState();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const result = await db.select().from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress));

    if (result?.length > 0) {
      router.replace('/admin');
    }
  };

  // ✅ Now this is correctly outside
  const OnCreateBtnClick = async () => {
    if (username.length > 10) {
      toast.error("No More than 10 Characters!", {
        position: "top-right"
      });
      return;
    }

    const result = await db.insert(userInfo).values({
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      username: username.replace(/\s+/g, '')
    });

    if (result) {
      toast.success("Username created successfully!", {
        position: "top-right"
      });
      router.replace('/admin');
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='p-10 border rounded-b-lg flex flex-col'>
        <h2 className='font-bold text-2xl py-5 text-center'>Create Portfolio Username</h2>
        <label className="text-sm font-medium py-2">Add Username for your portfolio</label>
        <input
          type="text"
          placeholder="Type here"
          onChange={(event) => setUsername(event.target.value)}
          className="input input-bordered w-full py-2"
        />
        <button
          disabled={!username}
          onClick={() => OnCreateBtnClick()}
          className={`px-6 py-2 rounded-md font-medium text-white transition 
              ${username ? "bg-[#6366f1] hover:bg-[#4f46e5]" : "bg-gray-400 cursor-not-allowed"}`}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateUsername;
