import React from 'react'

export default function Createlisting() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">create listing</h1>
        <form className="flex flex-col sm:flex-row gap-6">
            {/* part 1 */}
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" className="border p-3 rounded-lg" id="name" maxLength='62' minLength="10" required  placeholder="Name"/>
                <textarea type="text" className="border p-3 rounded-lg" id="decription"  required  placeholder="Description"/>
                <input type="text" className="border p-3 rounded-lg" id="address"  required  placeholder="Address"/> 

                <div className="flex gap-6 flex-wrap">
                <div className='flex gap-2'>
                    <input type='checkbox' id="sale" className="w-5 " />
                    <span>sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id="rent" className="w-5 " />
                    <span>rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id="parking" className="w-5 " />
                    <span>parking spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id="furnished" className="w-5 " />
                    <span>furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id="offer" className="w-5 " />
                    <span>offer</span>
                </div>
             </div>
             <div className='flex flex-wrap gap-6 '>
                    <div className='flex items-center gap-2'>
                        <input type="number" className="p-3 border rounded-lg border-gray-300" min='1' max='10' id="bedrooms" required />
                        <p>bedrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" className="p-3 border rounded-lg border-gray-300" min='1' max='10' id="bathrooms" required />
                        <p>bathrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" className="p-3 border rounded-lg border-gray-300" min='1000' id="regularprice" required />
                        <div className='flex flex-col items-center'>
                        <p>regular price</p>
                        <span>₹ / month</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" className="p-3 border rounded-lg border-gray-300" min='1000' id="discountprice" required />
                        <div className='flex flex-col items-center'>
                        <p>discounted price</p>
                        <span>₹ / month</span>
                        </div>
                    </div>
             </div>
            </div>
            

            {/* image vala part 2*/}
            <div className="flex flex-col flex-1 gap-4">
                <p className="font-semibold">Note:
                <span className="font-normal text-gray-600 ml-2">The first image will be the cover.</span>
                <span className="font-normal text-gray-600 ml-2">max 6 images</span>
                </p>
                <div className='felx gap-4'>
                    <input className="p-3 border border-gray-300 rounded w-full" type="file" id="images" accept='image/*' multiple />
                    <button className="p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80">upload</button>
                </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80">Create listing</button>
            </div>
           
        </form>
    </main>
  )
}
