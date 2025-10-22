
export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center gap-4 h-[60vh]">
        <div className='flex items-baseline justify-center gap-3'>
          <h1 className='text-white font-bold text-5xl '>Get Me a Chai!</h1>
          <img className='h-14' src="/coffee-lover.gif" alt="" />
        </div  >
        <div className="flex flex-col justify-center items-center gap-1">

          <p className="text-white text-lg">A place where your fans can buy you a chai. Unleash the power of your fans and get your project</p>
          <p className="text-white text-lg">A crowdfunding platform for creators to fund their projects.</p>

        </div>
        <div className="flex justify-center items-center gap-5">
          
          <a href="#moreinfo"><button type="button" className="smoothScroll text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-8 py-2 text-center hover:cursor-pointer">Read More</button></a>
        </div>
      </div>



      <div className="h-1 bg-slate-800"></div>




      <div className="flex flex-col gap-10 justify-center items-center py-15 h-[55vh]" id="moreinfo">
        <h2 className="text-white text-3xl font-bold mb-3">
          Your fans can buy you a chai
        </h2>
        <div className="flex gap-24 ">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-slate-800 rounded-full p-3 w-fit my-2">
              <img className="h-24" src="/man.gif" alt=""/>
            </div>
            <h3 className="text-white text-lg font-bold">
              Fans want to help
            </h3>
            <p className="text-white">
              Your fans are available to support you
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-slate-800 rounded-full p-3 w-fit my-2">
              <img className="h-24" src="/coin.gif" alt=""/>
            </div>
            <h3 className="text-white text-lg font-bold">
              Fans want to contribute
            </h3>
            <p className="text-white">
              Your fans are willing to contribute financially
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="bg-slate-800 rounded-full p-3 w-fit my-2">
              <img className="h-24" src="/group.gif" alt=""/>
            </div>
            <h3 className="text-white text-lg font-bold">
              Fans want to collaborate
            </h3>
            <p className="text-white">
              Your fans are ready to collaborate with you
            </p>
          </div>
        </div>
      </div>





      <div className="h-1 bg-slate-800"></div>




      <div className="flex flex-col justify-center items-center pb-15 h-[90vh]">
        <h2 className="text-white text-3xl font-bold mb-15">
          Learn more about us
        </h2>
        <iframe width="829" height="422" src="https://www.youtube.com/embed/j5a0jTc9S10" title="Cute Little Puppy Doing Cute things" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>




    </div>
  );
}
