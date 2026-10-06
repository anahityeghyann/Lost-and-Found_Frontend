import React from 'react'

const UserDetails = ({ user }) => {
    // Կապույտ SVG default ավատար, եթե user.avatar-ը null/undefined է
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/8345/8345328.png"

    // Վերցնում ենք առաջին 3 նկարները grid-ի համար
    const displayImages = user?.item_images ? user.item_images.slice(0, 3) : [];
    const remainingCount = user?.item_images ? user.item_images.length - 3 : 0;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-5">

            {/* POSTED BY */}
            <div>
                <h4 className="text-xs font-bold tracking-wider text-[#94A3B8] uppercase mb-3">
                    POSTED BY
                </h4>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={user?.avatar || defaultAvatar}
                            alt="user-avatar"
                            className="w-11 h-11 rounded-full object-cover bg-sky-100 p-0.5"
                            onError={(e) => {
                                // Եթե Backend-ից եկած avatar URL-ը կոտրված է, դնում ենք default-ը
                                e.target.onerror = null;
                                e.target.src = defaultAvatar;
                            }}
                        />
                        <div className="flex flex-col items-start gap-1">
                            <h3 className="font-bold text-slate-900 text-base leading-none">{user?.fullName}</h3>
                        </div>
                    </div>

                    <a
                        href={`tel:${user?.phone_number}`}
                        className="text-slate-800 hover:underline font-semibold text-sm flex items-center gap-1"
                    >
                        {user?.phone_number}
                    </a>
                </div>
            </div>

            {/* OTHER POSTS BY USER */}
            {user?.item_images && user.item_images.length > 0 && (
                <div>
                    <h4 className="text-xs font-bold tracking-wider text-[#94A3B8] uppercase mb-3">
                        OTHER POSTS BY {user?.fullName}
                    </h4>

                    <div className="grid grid-cols-4 gap-3">
                        {/* Առանձին-առանձին render ենք անում grid-ի յուրաքանչյուր cell-ում */}
                        {displayImages.map((imgUrl, index) => (
                            <div key={index} className="h-16 sm:h-20 rounded-2xl overflow-hidden cursor-pointer">
                                <img 
                                    src={imgUrl} 
                                    alt={`User item ${index + 1}`} 
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" 
                                />
                            </div>
                        ))}

                        {/* 4-րդ cell-ում ցույց ենք տալիս +N քանակը, եթե 3-ից ավելի նկար կա */}
                        {remainingCount > 0 && (
                            <div className="h-16 sm:h-20 rounded-2xl bg-[#EBF5FF] flex items-center justify-center text-[#0066CC] font-bold text-base cursor-pointer hover:bg-[#E1F0FF] transition-colors">
                                +{remainingCount}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default UserDetails