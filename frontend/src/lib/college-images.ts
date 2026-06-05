export function getCollegeCampusPath(id: string): string {
  return `/colleges/${id}-campus.svg`;
}

export function getCollegeLogoPath(id: string): string {
  return `/colleges/${id}-logo.svg`;
}

export function resolveCollegeMedia<T extends { id: string; image: string; logo: string }>(
  college: T
): T {
  const isRemote = (url: string) => url.startsWith('http://') || url.startsWith('https://');
  return {
    ...college,
    image: isRemote(college.image) ? getCollegeCampusPath(college.id) : college.image,
    logo: isRemote(college.logo) ? getCollegeLogoPath(college.id) : college.logo,
  };
}
