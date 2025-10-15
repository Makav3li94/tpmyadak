import TemplatePointers from "@/pages/user/auth/partials/TemplatePointers.jsx";

import intro from '../../../../../images/intro.jpg'
function LandingIntro(){

    return(
        <div className="hero min-h-full rounded-l-xl bg-base-200">
            <div className="hero-content py-12">
              <div className="max-w-md">

              <h1 className='text-3xl text-center font-bold '><img src="/logo.png" className="w-12 inline-block mr-2 mask mask-circle" alt="dashwind-logo" />TPM</h1>

                <div className="text-center mt-12"><img src={intro} alt="ورود/ثبت نام" className="w-48 inline-block"></img></div>

              {/* Importing pointers component */}
              <TemplatePointers />

              </div>

            </div>
          </div>
    )

  }

  export default LandingIntro
