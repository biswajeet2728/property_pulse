import { useFormStatus } from 'react-dom';
import { FaPaperPlane } from 'react-icons/fa';

const SubmitMessageButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className='btn btn-primary fw-bold rounded-pill w-100 d-flex justify-content-center align-items-center'
      type='submit'
      disabled={pending}
    >
      <FaPaperPlane className='mr-2' />{' '}
      {pending ? 'Sending...' : 'Send Message'}
    </button>
  );
};

export default SubmitMessageButton;