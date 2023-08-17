import Modal from '@mui/material/Modal';

const WelcomeModal = (props: { open: any; onClose: any; }) => {

    const {open, onClose} = props;

    return <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70vw]
         focus:outline-none bg-gray-100 dark:bg-gray-800 shadow-2xl p-4 rounded-lg'>
          <div className=' px-6 py-4 '>

          <h1 className='text-lg md:text-2xl font-semibold text-black dark:text-white'>
            Welcome to Islamicly
          </h1>
          <p className='mt-2 text-sm md:text-lg text-gray-700 dark:text-gray-400 pt-3'> 
            Islamicly is a GPT powered chatbot that refers to Islamic sources to answer your questions.
            <br />
            <br />
            Please note, that this chatbot should not be used for fatwa purposes. It is only a reference tool.
            It&apos;s strengths are retrieving the appropriate sources to answer your questions. Please, always
            double check it&apos;s answer, by reviewing the sources it provides.
            <br />
            <br />
            Thank you, and I hope you benefit from using this tool.
          </p>

          <div className="pt-2 sm:px-6 sm:flex flex flex-col justify-between">
          <button type="button" 
          onClick={onClose}
          className="py-2 px-3 text-sm rounded-md border border-gray-400 dark:border-gray-500 mb-4 text-gray-900 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-gray-200 self-end">
            
            OK
          </button>
        </div>
          </div>
        </div>
        
      </Modal>
}

export default WelcomeModal;