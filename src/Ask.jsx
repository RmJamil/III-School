import React from 'react';

const Ask = () => {
    return (
        <div className=' pb-6 pt-1 rounded-2xl my-12'>
            <div className='w-9/12 mx-auto mb-4'>
            <h1 className='text-4xl text-center text-green-500 font-bold my-12'>Frequently asked questions</h1>
          <div className="collapse collapse-arrow border border-base-300">
  <input type="radio" name="my-accordion-2" defaultChecked />
  <div className="collapse-title font-semibold">How do I create an account?</div>
  <div className="collapse-content text-sm">Click the "Sign Up" button in the top right corner and follow the registration process.</div>
</div>
<div className="collapse collapse-arrow  border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">I forgot my password. What should I do?</div>
  <div className="collapse-content text-sm">Click on "Forgot Password" on the login page and follow the instructions sent to your email.</div>
</div>
<div className="collapse collapse-arrow  border border-base-300">
  <input type="radio" name="my-accordion-2" />
  <div className="collapse-title font-semibold">How do I update my profile information?</div>
  <div className="collapse-content text-sm">Go to "My Account" settings and select "Edit Profile" to make changes.</div>
</div>  
        </div>
        </div>
    );
};

export default Ask;