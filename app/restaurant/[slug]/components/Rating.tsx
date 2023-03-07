import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";

export default function Rating({reviews}:{reviews:Review[]}) {
    return (
        <div className='flex item-end'>
            <div className='ratings mt-2 flex items-center'>
                <Stars reviews={reviews}/>
                <p className='text-reg ml-4'>{calculateReviewRatingAverage(reviews).toFixed(1)}</p>
                <div >
                    <p className='text-reg ml-4'>
                        {reviews.length} review{reviews.length===1?"":"s"}
                    </p>
                </div>
            </div>
        </div>
    )
}
