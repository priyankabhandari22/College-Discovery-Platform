import { redirect } from 'next/navigation';

/** Listing cards link to /colleges/[id]; redirect to existing detail route */
export default async function CollegeListingDetailRedirect({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/college/${id}`);
}
