import { getApprovedReviews } from '@/lib/supabase';
import { ReviewsClient } from './ReviewsClient';

export async function ReviewsSection() {
  const reviews = await getApprovedReviews(); // server-side, cached 60s
  return <ReviewsClient initial={reviews} />;
}
