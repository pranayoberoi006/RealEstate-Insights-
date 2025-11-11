import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";


export default function TeamPage() {
  // Team member details
  const teamMembers = [
    {
      name: "Pranay Oberoi",
      role: "Full Stack Developer (AI & Web Integration)",
      bio: "Pranay leads the development and user interface design of our platform. He focuses on combining AI with intuitive UI for smarter real estate insights.",
      imageUrl: "/pranay.jpg",
      linkedin: "https://www.linkedin.com/in/pranay-oberoi-058747312/", // 🔗 change to your real LinkedIn URL
      github: "https://github.com/pranayoberoi006", // 🔗 your GitHub
      gmail: "mailto:oberoipranay0@gmail.com", // ✉️ your Gmail
    },
    {
      name: "Raghav Sharma",
      role: "Backend Developer (Flask & Prediction Systems)",
      bio: "Raghav specializes in backend architecture and AI-powered prediction systems, ensuring accurate and reliable price analysis for every property.",
      imageUrl: "/raghav.jpg",
      linkedin: "https://www.linkedin.com/in/raghav-sharma-9861a6347/", // 🔗 change
      github: "https://github.com/Raghavvvvvvvvvvv", // 🔗 change
      gmail: "mailto:raghav8569.beaift24@chitkara.edu.in", // ✉️ change
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          Meet the Team
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          The professionals driving our mission to bring clarity to real estate.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
        {teamMembers.map((member) => (
          <Card
            key={member.name}
            className="text-center max-w-md mx-auto hover:shadow-xl transition-all duration-300"
          >
            <CardHeader className="items-center">
              <Image
                src={member.imageUrl}
                alt={`Portrait of ${member.name}`}
                width={150}
                height={150}
                unoptimized
                className="rounded-full object-cover aspect-square mb-4 border-4 border-blue-400 shadow-md"
              />
              <CardTitle className="text-xl font-semibold">{member.name}</CardTitle>
              <p className="text-sm text-accent font-medium">{member.role}</p>
            </CardHeader>

            <CardContent>
              <p className="text-muted-foreground text-sm mb-5">{member.bio}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-5">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                  title="LinkedIn"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href={member.gmail}
                  className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110"
                  title="Email"
                >
                  <FaEnvelope size={22} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-black transition-transform transform hover:scale-110"
                  title="GitHub"
                >
                  <FaGithub size={22} />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
