import { ThemeToggle } from './theme/theme-toggle'

const Navbar = () => {
  return (
    <div className='flex flex-wrap sticky top-0 z-20 font-mono md:ml-2 dark:bg-[#030711] bg-white mb-5 pb-5'>
      <div className='flex-1 text-2xl mt-5 ml-6 cursor-pointer   '>
        Google Docs Clone
      </div>
      <div className='mr-5 mt-5'>
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar
