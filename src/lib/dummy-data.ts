
export const teamMembers = [
  {
    name: 'Pranay Oberoi',
    role: 'Full Stack Developer',
    bio: 'Passionate Full Stack Developer specializing in creating seamless web experiences powered by Artificial Intelligence. Skilled in React.js, Next.js, Python, and Flask, with hands-on experience connecting modern UIs to intelligent prediction systems. Focused on building innovative, data-driven solutions that make technology smarter and simpler.',
    imageId: 'team-pranay',
    socials: {
      linkedin: 'https://www.linkedin.com/in/pranay-oberoi-058747312/',
      github: 'https://github.com/pranayoberoi006',
      email: 'mailto:oberoipranay0@gmail.com',
    }
  },
  {
    name: 'Raghav Sharma',
    role: 'Backend Developer',
    bio: 'Dedicated Backend Developer experienced in Python, Flask, APIs, and database design. Skilled at transforming data into meaningful insights through well-structured backend logic and machine learning integration. Focused on creating reliable, optimized systems that power intelligent web applications.',
    imageId: 'team-raghav',
    socials: {
      linkedin: 'https://www.linkedin.com/in/raghav-sharma-9861a6347/',
      github: 'https://github.com/Raghavvvvvvvvvvv',
      email: 'mailto:raghav8569.beaift24@chitkara.edu.in',
    }
  },
];

export type Property = {
    id: string;
    name: string;
    location: string;
    price: number;
    bedrooms: string;
    category: 'house' | 'studio' | 'shop' | 'apartment' | 'villa';
    area: number;
    imageId: string;
    description: string;
}

export const properties: Property[] = [
  {
    id: '1',
    name: 'Sunnyvale Suburban Home',
    location: 'Sunnyvale, CA',
    price: 90000000,
    bedrooms: '3BHK',
    category: 'house',
    area: 1800,
    imageId: 'prop-1',
    description: 'A beautiful family home in the heart of Silicon Valley, featuring a large backyard and modern amenities. Perfect for a growing family.'
  },
  {
    id: '2',
    name: 'Downtown Modern Apartment',
    location: 'New York, NY',
    price: 71250000,
    bedrooms: '2BHK',
    category: 'apartment',
    area: 1100,
    imageId: 'prop-2',
    description: 'A sleek and modern apartment in a luxury building with stunning city views. Includes access to a gym, pool, and rooftop terrace.'
  },
  {
    id: '3',
    name: 'Art-District Studio Loft',
    location: 'Los Angeles, CA',
    price: 48750000,
    bedrooms: '1BHK',
    category: 'studio',
    area: 800,
    imageId: 'prop-3',
    description: 'A chic and spacious studio loft in the vibrant Arts District. High ceilings, large windows, and an open floor plan create a bright, airy living space.'
  },
  {
    id: '4',
    name: 'High-Street Retail Shop',
    location: 'Chicago, IL',
    price: 112500000,
    bedrooms: 'N/A',
    category: 'shop',
    area: 2500,
    imageId: 'prop-4',
    description: 'Prime retail space on a bustling high street. Excellent foot traffic and visibility, ideal for a flagship store or boutique.'
  },
  {
    id: '5',
    name: 'Cozy Family Cottage',
    location: 'Austin, TX',
    price: 56250000,
    bedrooms: '4BHK+',
    category: 'house',
    area: 2200,
    imageId: 'prop-5',
    description: 'A charming and spacious cottage with a large garden. Located in a quiet, family-friendly neighborhood with great schools.'
  },
  {
    id: '8',
    name: 'Tech Hub Office Space',
    location: 'Seattle, WA',
    price: 225000000,
    bedrooms: 'N/A',
    category: 'shop',
    area: 10000,
    imageId: 'prop-8',
    description: 'A state-of-the-art office space in a thriving tech hub. Open-plan layout, meeting rooms, and collaborative spaces designed for innovation.'
  }
];
