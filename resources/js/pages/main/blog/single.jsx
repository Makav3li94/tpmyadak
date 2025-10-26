import FrontLayout from "@/layouts/front/front-layout.jsx";
import Breadcrumb from "@/layouts/common/breadcrumb.jsx";
import Review from "@/components/review.jsx";
import ReviewForm from "@/components/review-form.jsx";


export default function BlogSingle({blog, reviews, canReview}) {


    return (
        <>
            <Breadcrumb l1={['وبلاگ', 'home.getBlogs']} l2={[blog.title, 'home.getBlog', blog.slug]}/>
            <section className="relative container">
                <div className="w-full h-full bg-white dark:bg-gray-800">
                    <div className="w-full mx-auto py-10 bg-white dark:bg-gray-800">


                        <h1 className="w-[92%] mx-auto lg:text-4xl md:text-3xl xs:text-2xl text-center font-serif font-semibold pb-4 pt-8 dark:text-white">
                            {blog.title}
                        </h1>

                        <img src={route('file.show', blog.img_cover)}
                             alt="Blog Cover"
                             className="xl:w-[80%] xs:w-[96%] mx-auto lg:h-[560px] md:h-[480px] rounded-lg"/>

                        <div className="w-[90%] mx-auto flex md:gap-4 xs:gap-2 justify-center items-center pt-4">
                            <div className="flex gap-2 items-center">
                                <img
                                    src="https://lh3.googleusercontent.com/a/ACg8ocIexhmmTS8LcwWo1fPGY5Fl3KXpd-JuBE_Gj56P3rUR2g=s96-c"
                                    alt="Bloger Profile"
                                    className="md:w-[2.2rem] md:h-[2.2rem] xs:w-[2rem] xs:h-[2rem] rounded-full"/>
                                <h2 className="text-sm font-semibold dark:text-white">پرهام اکبری</h2>
                            </div>
                            <div className="dark:text-gray-500">|</div>

                            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{blog.published_at}</h3>

                            <div className="dark:text-gray-500">|</div>
                            <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">۱ بازدید</h4>
                        </div>

                        <div className="py-6 bg-white dark:bg-gray-800">
                            <div className="md:w-[80%] xs:w-[90%] mx-auto pt-4">
                                <p className="mx-auto text-md dark:text-gray-300 border border-1 border-gray-300 p-3 mb-6">
                                    {blog.excerpt}
                                </p>
                                <div dangerouslySetInnerHTML={{__html: blog.body}}/>


                            </div>
                        </div>

                    </div>
                    <div className="w-[90%] mx-auto bg-base-100 border-base-300 p-6">
                        {reviews && reviews.map((review, reviewIdx) => (
                            <Review review={review} i={reviewIdx}/>
                        ))}
                        {canReview ? (
                            <ReviewForm reviewType='blog' model_id={blog.id}/>
                        ) : (
                            <div role="alert" className="alert alert-success">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current"
                                     fill="none" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <span>شما دیدگاه خود را قبلا ارسال کرده اید.</span>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </>
    )
}
BlogSingle.layout = (Page) => <FrontLayout isSingle={true}>{Page}</FrontLayout>;
