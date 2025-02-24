const Preview: React.FC = () => {
  return (
    <div 

        className='relative h-[800px]'

        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}

    >
      <div className='relative h-[calc(100vh+800px)] -top-[100vh]'>
        <div className="sticky top-[calc(100vh-800px)] h-[800px] w-full bg-white flex justify-center items-center">
          <div className="flex flex-row space-x-12 sm:pace-x-16  md:space-x-24 text-sm sm:text-lg md:text-xl">
            <ul>
              <li className="hover:underline cursor-pointer">Home</li>
              <li className="hover:underline cursor-pointer">Docs</li>
              <li className="hover:underline cursor-pointer">Comps</li>
            </ul>
            <ul>
              <li className="hover:underline cursor-pointer">Github</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
              <li className="hover:underline cursor-pointer">X (Twitter)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
