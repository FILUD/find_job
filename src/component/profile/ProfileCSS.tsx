const cssProfile = {
    titleName: 'font-notoLao 2xl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-2xl text-xl font-bold mt-2.5 flex space-x-4',
    titleWork: 'font-notoLao 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-base text-sm font-normal mb-2 mt-2',
    titleAddress: 'ml-2 font-notoLao 2xl:text-sm xl:text-sm lg:text-xs md:text-xs sm:text-xs text-xs',
    profileImg: '2xl:ml-28 xl:ml-28 lg:ml-24 md:ml-24 sm:ml-16 ml-12  top-0 left-0 2xl:scale-125 xl:scale-125 lg:scale-125 md:scale-150 sm:scale-150 scale-150 2xl:mt-0 xl:mt-0 lg:mt-0 md:mt-3 sm:mt-4 mt-4',
    telephone: 'font-notoLao 2xl:text-base xl:text-base lg:text-sm md:text-sm sm:text-xs text-xs',
    textPopupDes: 'text-white justify-self-center self-center font-notoLao text-base font-semibold 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-xl sm:text-base xl:self-center xl:justify-self-center',
    buttonPostCv: 'rounded-2xl bg-black border-2 px-2 sm:justify-self-center sm:self-center sm:text-white font-notoLao self-end xl:row-span-8 h-8 w-28',
    buttonPostWork: '2xl:text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs mb-5 flex justify-self-center w-fit rounded-full bg-red-600 px-10 py-3 text-md font-semibold font-notoLao text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ',
    container_bottom: '',
    grid_container:'',
    
};

const container_bottom = {
    default: 'row-span-3 rounded-b-3xl grid grid-cols-3 p-4 px-7 gap-4 ',
    sm: 'sm:bg-gray-300 sm:grid-cols-1 sm:grid-rows-8 sm:justify-items-center',
    md: 'md:bg-gray-300 md:grid-cols-1 md:grid-rows-8 md:justify-items-center',
    lg: 'lg:grid-rows-3 lg:grid-cols-3 lg:justify-items-start',
    xl: 'xl:grid-rows-3 xl:grid-cols-3 xl:justify-items-start',
    xxl: '2xl:grid-rows-3 2xl:grid-cols-3 2xl:justify-items-start',
};

cssProfile.container_bottom = container_bottom.default + ' ' + container_bottom.sm + ' ' + container_bottom.md + ' ' + container_bottom.lg + ' ' + container_bottom.xl + ' ' + container_bottom.xxl;

const grid_container = {
    default: 'grid',
    sm: 'sm:grid-rows-1 sm:grid-cols-3 sm:gap-12 sm:pl-4 sm:h-fit sm:ml-auto sm:mt-1 sm:mx-2',
    md: 'md:grid-rows-1 md:grid-cols-3 md:gap-12 md:pl-4 md:h-fit md:ml-auto md:mt-1 md:mx-2',
    lg: 'lg:grid-rows-3 lg:grid-cols-1 lg:gap-5 lg:pl-4 lg:ml-0 lg:text-center',
    xl: 'xl:grid-rows-3 xl:grid-cols-1 xl:gap-5 xl:pl-4 xl:ml-0 xl:text-center',
    xxl: '2xl:grid-rows-3 2xl:grid-cols-1 2xl:gap-5 2xl:pl-4 2xl:ml-0 2xl:text-center',
};

cssProfile.grid_container = grid_container.default + ' ' + grid_container.sm + ' ' + grid_container.md + ' ' + grid_container.lg + ' ' + grid_container.xl + ' ' + grid_container.xxl;

export default cssProfile;