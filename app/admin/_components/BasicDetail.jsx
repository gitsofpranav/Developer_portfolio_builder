import React, { useContext, useEffect, useRef, useState } from 'react'
import { Camera, Link2, MapPin } from 'lucide-react'
import { db } from '@/utils';
import { userInfo } from '@/utils/schema';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { UserDetailContext } from '@/app/-context/UserDetailContext';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/utils/firebaseConfig';

function BasicDetail() {

    const timeoutId = useRef(); // ✅ useRef instead of let
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [selectedOption, setSelectedOption] = useState();

    useEffect(() => {
        userDetail && console.log(userDetail);
    }, [userDetail]);

    const onInputChange = (event, fieldName) => {
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(async () => {
            const result = await db.update(userInfo)
                .set({
                    [fieldName]: event.target.value
                }).where(eq(userInfo.email, user?.primaryEmailAddress.emailAddress));

            if (result) {
                toast.success('Saved!', {
                    position: 'top-right'
                });
            } else {
                toast.error('Error!', {
                    position: 'top-right'
                });
            }

        }, 1000);
    }

    const handleFileUpload=(event)=>{
        const file=event.target.files[0];

        const fileName=Date.now().toString()+'.'+file.type.split('/')[1];
       const storageRef = ref(storage, fileName);

     
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
     });
    }

    return (
        <div className='p-7 rounded-lg bg-gray-800 my-7'>
            <div className='flex gap-6 items-center'>
                <label htmlFor='file-input'>
                <Camera className='p-3 h-12 w-12 bg-gray-500 rounded-full cursor-pointer' />
                </label>
                <input type="file" id='file-input'
                onChange={handleFileUpload} accept="image/png, image/gif, image/jpeg"
                style={{display:'none'}}/>
                <input
                    type="text"
                    placeholder="Username"
                    defaultValue={userDetail?.name}
                    onChange={(event) => onInputChange(event, 'name')}
                    className="bg-gray-900 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-full"
                />
            </div>

            <textarea
                className="bg-gray-900 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-4 py-2 w-full mt-3"
                placeholder="Start writing about yourself"
                defaultValue={userDetail?.bio}
                onChange={(event) => onInputChange(event, 'bio')}
            ></textarea>

            <div>
                <div className='flex gap-3 mt-6'>
  <MapPin
    className={`h-12 w-12 p-3 text-blue-500 rounded-md hover:bg-gray-600 ${selectedOption == 'location' && 'bg-gray-600'}`}
    onClick={() => setSelectedOption('location')}
  />
  <Link2
    className={`h-12 w-12 p-3 text-yellow-500 rounded-md hover:bg-gray-600 ${selectedOption == 'link' && 'bg-gray-600'}`}
    onClick={() => setSelectedOption('link')}
  />
</div>


                {selectedOption == 'location' ? (
                    <div className='mt-2'>
                        <label className="input input-bordered flex items-center gap-4 bg-gray-900 text-white border border-gray-700 rounded-lg w-full">
                            <MapPin />
                            <input
                                type="text"
                                className="grow"
                                placeholder="Location"
                                key={1}
                                defaultValue={userDetail?.location}
                                onChange={(event) => onInputChange(event, 'location')}
                            />
                        </label>
                    </div>
                ) : selectedOption == 'link' ? (
                    <div className='mt-2'>
                        <label className="input input-bordered flex items-center gap-4 bg-gray-900 text-white border border-gray-700 rounded-lg w-full">
                            <Link2 />
                            <input
                                type="text"
                                className="grow"
                                placeholder="Url"
                                key={2}
                                defaultValue={userDetail?.link}
                                onChange={(event) => onInputChange(event, 'link')}
                            />
                        </label>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default BasicDetail;