# InternConnect

# Inspiration
As students and hackers, we’ve all felt the frustration of applying to internships or entering hackathons without clear feedback on what actually went wrong. Rejections usually come with no explanation, and most resume tools stop at surface-level advice that doesn’t translate into real improvement.

The same issue exists in hackathons. Many talented hackers walk in motivated but unsure of what judges value, how to structure a winning project, or which skills actually make a difference. This often leads to wasted effort and discouragement, especially for newer hackers.

We built InternConnect to change that. The goal is to give hackers clear direction—helping them build stronger skills, better projects, and more competitive resumes—so the entire hacking community becomes more prepared, confident, and collaborative.

# What it does
InternConnect is a personalized platform designed to help hackers succeed in both internships and hackathons by turning feedback into action.

Users can explore internship opportunities gathered through web scraping and refined with AI-based personalization. Along the way, an auditory AI assistant guides users through each step, helping them stay focused instead of overwhelmed.

The resume analyzer allows users to upload resumes and past coding projects. Using AI, InternConnect evaluates technical depth, project quality, and skill coverage, providing a clear score out of 100 along with specific strengths and weaknesses. This is especially useful for hackers, since projects, not just resumes, are often what matter most in hackathons.

From there, users can ask the AI assistant how to improve the exact skills they’re missing. The platform recommends targeted courses and practice paths that directly map to real hackathon needs, such as system design, rapid prototyping, data analysis, or full-stack development. Instead of generic learning, hackers practice skills they can immediately apply in their next event.

InternConnect also helps hackers prepare strategically. Our trends page analyzes in-demand skills and patterns from accepted applicants and successful projects, showing what actually leads to results. This helps hackers understand which technologies, tools, and project ideas are most impactful: both for judges and for recruiters.

To strengthen the community, InternConnect includes peer reviews of companies and opportunities. Hackers can learn from each other’s experiences and contribute their own insights after internships or hackathons, creating a feedback loop that benefits everyone.

# How we built it
Firebase - Utilized Firebase for authentication (Sign-In and Get Started pages) and Firestore for data storage (Saving Progress on the Practice Simulator and Saving the Reviews in the Community Tab).

Tailwind CSS - Stylistically improved our UI.

OpenAI API - Utilized OpenAI API for being the functional backend of the ElevenLabs auditory assistant, while GPT-5 served as a webscraper supplying real-time data to the site.

ElevenLabs - Provided the voice to the auditory assistant of the app, answering user queries about various topics

Gemini - Used to create our Resume AI which analyzed the users resumes and past coding projects to provide detailed analysis on their skills and what to improve. Also, used to webscrape the internet for internships from apps such as LinkedIn and Indeed.

Node.js – Server side rendering technology, running the Gemini, as well as the ElevenLabs models on the dev tunnel.

# Challenges we ran into
Server instability during development

Limited access to the ElevenLabs API

Firebase connection issues

Gemini API crashes with our Node server

These challenges forced us to adapt quickly, simplify where needed, and focus on building a reliable core experience under time pressure.

# Accomplishments that we’re proud of
We built a working, end-to-end system that supports real resumes, real projects, and real learning paths. InternConnect doesn’t just tell users what’s wrong—it helps them fix it. We’re especially proud that the platform supports hackers at every stage, from preparing for a hackathon to reflecting and improving afterward.

# What we learned
We gained hands-on experience integrating multiple APIs into a live system and handling real-world failures. We also learned how to design flows that guide users through complex decisions without overwhelming them. This is something that’s especially important for hackers working under time constraints.

# What’s next for InternConnect

Next, we want to expand InternConnect into a stronger tool for hackathon preparation and collaboration. We plan to add hackathon-specific guidance, including project idea validation, judging-criteria breakdowns, and real-time feedback on project scope and execution.

We also want to grow the community side of the platform by allowing hackers to share past hackathon projects, strategies, and lessons learned. Over time, this would create a knowledge base built by hackers, for hackers. This makes it easier for new participants to succeed and raising the overall quality of hackathon projects.

Long-term, our goal is for InternConnect to help level the playing field. By giving hackers clearer direction and access to the right skills, we believe the hacking community becomes more inclusive, competitive, and innovative as a whole.

