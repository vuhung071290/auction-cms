// linear list:
// linear-gradient(131deg, rgba(0,177,247,1) 35%, rgba(20,124,193,1) 100%) -> blue
// linear-gradient(131deg, rgba(207,8,102,1) 35%, rgba(236,64,157,1) 100%) -> red
// linear-gradient(131deg, rgba(8,207,18,1) 35%, rgba(140,236,64,1) 100%) -> green
// linear-gradient(131deg, rgba(247,230,0,1) 33%, rgba(193,191,20,1) 100%) -> yellow
// linear-gradient(131deg, rgba(237,118,94,1) 35%, rgba(254,168,88,1) 100%) -> orange
export const RecentHomeItems = [
    {
        icon: "solution",
        title: "Account Management",
        description: "View or manage account",
        color: "linear-gradient(131deg, rgba(0,177,247,1) 35%, rgba(20,124,193,1) 100%)",
        link: "/admin/account"
    }, {
        icon: "control",
        title: "Permission Management",
        description: "View or manage account permission",
        color: "linear-gradient(131deg, rgba(207,8,102,1) 35%, rgba(236,64,157,1) 100%)",
        link: "/admin/permission"
    }, {
        icon: "history",
        title: "Account Activity",
        description: "View account activity",
        color: "linear-gradient(131deg, rgba(8,207,18,1) 35%, rgba(140,236,64,1) 100%)",
        link: "/admin/activity"
    },
    {
        icon: "user",
        title: "User Management",
        description: "Retrieve user's information.",
        color: "linear-gradient(131deg, rgba(255,173,236,1) 31%, rgba(255,147,191,1) 70%)",
        link: "/admin/users"
    }
]