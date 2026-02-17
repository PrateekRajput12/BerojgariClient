export const roleDashboardData = {
    HR: [
        { title: "Manage Jobs", desc: "Create, edit, close job posts", url: "/hr/jobs" },
        { title: "Offer Management", desc: "Send offers & view all offers", url: "/hr/offers" },
        { title: "Interview Management", desc: "Schedule interviews & track rounds", url: "/hr/interviews" },

        // optional (only add when you actually build these pages)
        // { title: "Manage Recruiters", desc: "View and manage recruiters", url: "/hr/recruiters" },
        // { title: "Company Reports", desc: "Analytics and hiring reports", url: "/hr/reports" },
        // { title: "Post Announcements", desc: "Notify company employees", url: "/hr/announcements" },
    ],

    Recruiter: [
        { title: "View Applications", desc: "Review candidate applications", url: "/recruiter/applications" },
        { title: "Interview Management", desc: "Schedule interviews for shortlisted", url: "/hr/interviews" },
        // If you want recruiter to have a separate page later, change URL then.
    ],

    Interviewer: [
        { title: "My Interviews", desc: "View assigned interviews & submit feedback", url: "/interviewer/my-interviews" },
    ],

    Candidate: [
        { title: "Browse Jobs", desc: "Find jobs that match your skills", url: "/candidate/jobs" },
        { title: "My Applications", desc: "Track your application status", url: "/candidate/applications" },
        { title: "Interview Status", desc: "Check interview schedule & result", url: "/candidate/interviews" },
        { title: "My Offers", desc: "Track your job offers", url: "/candidate/offers" },
    ],
};
