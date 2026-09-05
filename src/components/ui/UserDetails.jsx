import React from 'react'

const UserDetails = () => {
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
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                            alt="Alice B."
                            className="w-11 h-11 rounded-full object-cover"
                        />
                        <div className="flex flex-col items-start gap-1">
                            <h3 className="font-bold text-slate-900 text-base leading-none">Alice B.</h3>
                            <span className="bg-[#E0F2FE] text-[#0284C7] text-xs font-medium px-3 py-0.5 rounded-full inline-block">
                                Finder
                            </span>
                        </div>
                    </div>

                    <a
                        href="#profile"
                        className="text-[#0066CC] hover:underline font-semibold text-sm flex items-center gap-1 transition-colors"
                    >
                        View profile <span className="text-xs">→</span>
                    </a>
                </div>
            </div>

            {/* OTHER POSTS BY ALICE */}
            <div>
                <h4 className="text-xs font-bold tracking-wider text-[#94A3B8] uppercase mb-3">
                    OTHER POSTS BY ALICE
                </h4>

                <div className="grid grid-cols-4 gap-3">
                    {/* Նկար 1 */}
                    <div className="h-16 sm:h-20 rounded-2xl overflow-hidden cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200"
                            alt="post 1"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Նկար 2 */}
                    <div className="h-16 sm:h-20 rounded-2xl overflow-hidden cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200"
                            alt="post 2"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Նկար 3 */}
                    <div className="h-16 sm:h-20 rounded-2xl overflow-hidden cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=200"
                            alt="post 3"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* 4-րդը՝ առանձին light blue block "+2" տեքստով */}
                    <div className="h-16 sm:h-20 rounded-2xl bg-[#EBF5FF] flex items-center justify-center text-[#0066CC] font-bold text-base cursor-pointer hover:bg-[#E1F0FF] transition-colors">
                        +2
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserDetails