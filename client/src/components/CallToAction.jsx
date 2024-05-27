import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-6 border border-gray-200 rounded-lg shadow-md items-center'>
        <div className="flex-1 flex flex-col items-center sm:items-start">
            <h2 className='text-2xl mb-2 text-center sm:text-left'>
                Want to take a virtual tour?
            </h2>
            <p className='text-gray-600 mb-4 text-center sm:text-left'>
                Explore some of our virtual tours.
            </p>
            <Button className='gradient-yellow-to-yellow rounded-full text-black'>
                <a href="https://maj.armarchengineering.com/" target='_blank' rel='noopener noreferrer'>
                    Virtual Tour
                </a>
            </Button>
        </div>
        <div className="p-4 flex-1">
            <img src="https://i.ibb.co/Wtf2yCW/D5-Image-43-20231012-181317.png" alt="Virtual Tour Image" className="max-w-full rounded-lg shadow-md" />
        </div>
    </div>
  )
}