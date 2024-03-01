import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='text-white fixed bottom-0 w-full flex justify-start items-center'>
      <div className=''>
        <label>All rights are reserved! © {new Date().getFullYear()}</label>
      </div>
      <div className='mx-[1%]'>
        
        <a href="https://github.com/ashdude14" target="_blank" rel="noopener noreferrer">
          <FaGithub size={20} />
        </a>
      </div>
      <div className='mx-[1%]'>
        <a href="https://www.linkedin.com/in/aashish-kumar-singh-499241164/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={20} />
        </a>
      </div>
      <div className='mx-[1%]'>
        <a href="mailto:ashish.kumar.singh.jee@gmail.com">
          <FaEnvelope size={20} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
